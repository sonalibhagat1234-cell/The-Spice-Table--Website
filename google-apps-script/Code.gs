/**
 * ============================================================================
 * THE SPICE TABLE — GOOGLE APPS SCRIPT RESERVATION AUTOMATION
 * ============================================================================
 * 
 * Workflow:
 * Customer -> Website Form -> Apps Script Web App -> Google Sheet (Status: "Pending")
 * 
 * Features:
 * 1. Server-side validation of all inputs
 * 2. Formula Injection Protection (sanitizes =, +, -, @ triggers)
 * 3. Thread-safe unique Reservation ID generation via LockService (e.g., ST-20260905-001)
 * 4. Server-generated timestamp (does not trust client clock)
 * 5. Honeypot anti-spam check
 * 6. Rate-limiting and duplicate submission protection via CacheService
 * 7. Secure: Keeps Spreadsheet ID and business data private
 */

// ============================================================================
// 1. CONFIGURATION
// ============================================================================

// YOU NEED TO CHANGE THIS:
// Replace the string below with your actual Google Sheet ID.
// (You can copy this from your Google Sheet URL between "/d/" and "/edit")
// Example: const SPREADSHEET_ID = '1BxiMVs0XRn53K...';
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID';

// DO NOT CHANGE THIS:
// The name of the worksheet/tab inside your Google Sheet.
const SHEET_NAME = 'Reservations';

// Allowed columns in Row 1:
// Reservation ID | Timestamp | Full Name | Phone Number | Email Address | Number of Guests | Reservation Date | Preferred Time | Special Request | Status
const EXPECTED_HEADERS = [
  'Reservation ID',
  'Timestamp',
  'Full Name',
  'Phone Number',
  'Email Address',
  'Number of Guests',
  'Reservation Date',
  'Preferred Time',
  'Special Request',
  'Status'
];

// Timezone used for timestamps and date validations (Nagpur, Maharashtra, India)
const TIMEZONE = 'Asia/Kolkata';


// ============================================================================
// 2. HTTP POST HANDLER (Web App Entry Point)
// ============================================================================

/**
 * Handles incoming HTTP POST requests from the restaurant website reservation form.
 * 
 * @param {Object} e - The event object provided by Google Apps Script
 * @returns {TextOutput} JSON response with success status and Reservation ID
 */
function doPost(e) {
  // Use ScriptLock to prevent race conditions and duplicate Reservation IDs
  const lock = LockService.getScriptLock();
  
  try {
    // Wait up to 30 seconds for concurrent requests to serialize cleanly
    const lockAcquired = lock.tryLock(30000);
    if (!lockAcquired) {
      return createJsonResponse({
        success: false,
        message: 'Server is currently busy. Please try again in a few moments.'
      });
    }

    // 1. Verify that request data exists
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        message: 'No reservation data received.'
      });
    }

    // 2. Parse JSON payload safely
    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJsonResponse({
        success: false,
        message: 'Invalid request format.'
      });
    }

    // 3. Honeypot Anti-Spam Check
    // If the hidden bot field contains any text, silently reject
    if (payload.honeypot && String(payload.honeypot).trim() !== '') {
      return createJsonResponse({
        success: false,
        message: 'Unable to submit reservation.'
      });
    }

    // 4. Server-Side Validation
    const validationResult = validateReservationPayload(payload);
    if (!validationResult.isValid) {
      return createJsonResponse({
        success: false,
        message: validationResult.errorMessage || 'Invalid reservation details.'
      });
    }

    // 5. Server-Side Duplicate Submission Check (CacheService)
    // Prevents identical submissions within 2 minutes (120 seconds)
    const duplicateKey = getDuplicateCacheKey(payload);
    const cache = CacheService.getScriptCache();
    if (cache.get(duplicateKey)) {
      return createJsonResponse({
        success: false,
        message: 'A reservation request with these details was just received. Our team will contact you shortly.'
      });
    }

    // 6. Access Google Sheet
    if (!SPREADSHEET_ID || SPREADSHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
      return createJsonResponse({
        success: false,
        message: 'Server configuration incomplete. Please contact the restaurant.'
      });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // If the Reservations sheet does not exist, create it and write headers
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(EXPECTED_HEADERS);
      // Format headers row: bold text, neutral background
      sheet.getRange(1, 1, 1, EXPECTED_HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#F3ECE1');
      sheet.setFrozenRows(1);
    } else {
      // If sheet exists but is completely empty, ensure headers are present
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(EXPECTED_HEADERS);
        sheet.getRange(1, 1, 1, EXPECTED_HEADERS.length)
          .setFontWeight('bold')
          .setBackground('#F3ECE1');
        sheet.setFrozenRows(1);
      }
    }

    // 7. Generate Server-Side Timestamp
    const now = new Date();
    const serverTimestamp = Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
    const dateStamp = Utilities.formatDate(now, TIMEZONE, 'yyyyMMdd');

    // 8. Generate Unique Reservation ID (e.g. ST-20260904-001)
    const reservationId = generateUniqueReservationId(sheet, dateStamp);

    // 9. Extract and Sanitize Customer Data
    const rawName = payload.name || payload.fullName || payload['Full Name'] || '';
    const rawPhone = payload.phone || payload.phoneNumber || payload['Phone Number'] || '';
    const rawEmail = payload.email || payload.emailAddress || payload['Email Address'] || '';
    const rawGuests = payload.guests || payload.numberOfGuests || payload['Number of Guests'] || '';
    const rawDate = payload.date || payload.reservationDate || payload['Reservation Date'] || '';
    const rawTime = payload.time || payload.preferredTime || payload['Preferred Time'] || '';
    const rawSpecialRequest = payload.specialRequest || payload.specialRequests || payload['Special Request'] || '';

    const safeName = sanitizeForSheet(rawName);
    const safePhone = sanitizeForSheet(rawPhone);
    const safeEmail = sanitizeForSheet(rawEmail);
    const safeGuests = sanitizeForSheet(rawGuests);
    const safeDate = sanitizeForSheet(rawDate);
    const safeTime = sanitizeForSheet(rawTime);
    const safeSpecialRequest = sanitizeForSheet(rawSpecialRequest);
    
    // Status is ALWAYS hardcoded to 'Pending' on the server
    const reservationStatus = 'Pending';

    // 10. Append new reservation row to Google Sheet
    const rowData = [
      reservationId,
      serverTimestamp,
      safeName,
      safePhone,
      safeEmail,
      safeGuests,
      safeDate,
      safeTime,
      safeSpecialRequest,
      reservationStatus
    ];

    sheet.appendRow(rowData);

    // 11. Store in cache for 120 seconds to prevent rapid duplicates
    try {
      cache.put(duplicateKey, 'submitted', 120);
    } catch (cacheErr) {
      // Non-critical, continue
    }

    // 12. Return Clean Success Response
    return createJsonResponse({
      success: true,
      reservationId: reservationId,
      message: 'Reservation request received successfully. Your reservation is pending confirmation.'
    });

  } catch (error) {
    // Log internally for debugging, but never expose internal errors or stack traces to client
    Logger.log('Error processing reservation: ' + error.toString());
    return createJsonResponse({
      success: false,
      message: "We couldn't submit your reservation right now. Please try again or contact the restaurant directly."
    });
  } finally {
    // Always release the lock
    lock.releaseLock();
  }
}

/**
 * Handles HTTP GET requests for testing the Web App status.
 */
function doGet(e) {
  return createJsonResponse({
    status: 'online',
    service: 'The Spice Table Reservation Service',
    timestamp: Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss')
  });
}


// ============================================================================
// 3. VALIDATION & SANITIZATION HELPERS
// ============================================================================

/**
 * Validates all reservation payload fields server-side.
 * 
 * @param {Object} data - Parsed reservation input
 * @returns {Object} { isValid: boolean, errorMessage: string }
 */
function validateReservationPayload(data) {
  if (!data || typeof data !== 'object') {
    return { isValid: false, errorMessage: 'Invalid request data.' };
  }

  const name = String(data.name || data.fullName || data['Full Name'] || '').trim();
  const phone = String(data.phone || data.phoneNumber || data['Phone Number'] || '').trim();
  const email = String(data.email || data.emailAddress || data['Email Address'] || '').trim();
  const date = String(data.date || data.reservationDate || data['Reservation Date'] || '').trim();
  const time = String(data.time || data.preferredTime || data['Preferred Time'] || '').trim();
  const guests = String(data.guests || data.numberOfGuests || data['Number of Guests'] || '').trim();
  const specialRequest = String(data.specialRequest || data.specialRequests || data['Special Request'] || '').trim();

  // Name validation: required, 2-80 characters
  if (!name || name.length < 2) {
    return { isValid: false, errorMessage: 'Please enter a valid full name.' };
  }
  if (name.length > 80) {
    return { isValid: false, errorMessage: 'Full name is too long (maximum 80 characters).' };
  }

  // Phone validation: required, 10-15 digits
  if (!phone) {
    return { isValid: false, errorMessage: 'Please enter a valid phone number.' };
  }
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { isValid: false, errorMessage: 'Phone number must contain between 10 and 15 digits.' };
  }

  // Email validation: required, valid email format regex, max 100 chars
  if (!email) {
    return { isValid: false, errorMessage: 'Please enter a valid email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email) || email.length > 100) {
    return { isValid: false, errorMessage: 'Please enter a valid email address.' };
  }

  // Date validation: required, format YYYY-MM-DD, not in past
  if (!date) {
    return { isValid: false, errorMessage: 'Please select a reservation date.' };
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return { isValid: false, errorMessage: 'Invalid date format. Expected YYYY-MM-DD.' };
  }
  const todayStr = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd');
  if (date < todayStr) {
    return { isValid: false, errorMessage: 'Reservation date cannot be in the past.' };
  }

  // Time validation: required, reasonable length
  if (!time || time.length === 0) {
    return { isValid: false, errorMessage: 'Please select a preferred time slot.' };
  }
  if (time.length > 30) {
    return { isValid: false, errorMessage: 'Invalid preferred time.' };
  }

  // Guests validation: required, reasonable length/value
  if (!guests || guests.length === 0) {
    return { isValid: false, errorMessage: 'Please select the number of guests.' };
  }
  if (guests.length > 50) {
    return { isValid: false, errorMessage: 'Invalid guest number selection.' };
  }

  // Special Request validation: optional, max 500 characters
  if (specialRequest && specialRequest.length > 500) {
    return { isValid: false, errorMessage: 'Special request must be 500 characters or less.' };
  }

  return { isValid: true };
}

/**
 * Protects against Spreadsheet Formula Injection.
 * 
 * If a customer enters a string starting with =, +, -, @, \t, or \r,
 * Google Sheets will evaluate it as a formula.
 * Prepending an apostrophe (') forces Google Sheets to treat the value strictly as plain text.
 * 
 * @param {*} value - The value to sanitize
 * @returns {string} Sanitized string safe for sheet insertion
 */
function sanitizeForSheet(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const str = String(value).trim();
  if (str.length === 0) {
    return '';
  }
  // Formula trigger characters: = (formula), + (addition formula), - (subtraction formula), @ (implicit intersection formula), tabs/returns
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

/**
 * Generates a unique Reservation ID with format: ST-YYYYMMDD-001
 * 
 * Inspects existing rows in the sheet for the given date prefix,
 * finds the highest sequence number for that date, and increments by 1.
 * 
 * @param {Sheet} sheet - The Reservations sheet
 * @param {string} dateStamp - Current date in YYYYMMDD format
 * @returns {string} Unique Reservation ID
 */
function generateUniqueReservationId(sheet, dateStamp) {
  const prefix = 'ST-' + dateStamp + '-';
  let maxSeq = 0;
  
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    // Read existing Reservation IDs in Column 1
    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < ids.length; i++) {
      const idStr = String(ids[i][0] || '').trim();
      if (idStr.startsWith(prefix)) {
        const seqPart = idStr.substring(prefix.length);
        const seqNum = parseInt(seqPart, 10);
        if (!isNaN(seqNum) && seqNum > maxSeq) {
          maxSeq = seqNum;
        }
      }
    }
  }

  const nextSeq = maxSeq + 1;
  // Pad with leading zeros to at least 3 digits (001, 002, ...)
  const paddedSeq = ('000' + nextSeq).slice(-3);
  return prefix + paddedSeq;
}

/**
 * Creates a unique cache key for duplicate detection.
 * Based on sanitized phone digits + reservation date + reservation time.
 * 
 * @param {Object} data - Reservation data
 * @returns {string} Cache key
 */
function getDuplicateCacheKey(data) {
  const phone = data.phone || data.phoneNumber || data['Phone Number'] || '';
  const date = data.date || data.reservationDate || data['Reservation Date'] || '';
  const time = data.time || data.preferredTime || data['Preferred Time'] || '';
  const digits = String(phone).replace(/[^0-9]/g, '');
  const dateStr = String(date);
  const timeStr = String(time).replace(/[^a-zA-Z0-9]/g, '');
  return 'res_dup_' + digits + '_' + dateStr + '_' + timeStr;
}

/**
 * Creates a standardized JSON response output for the Web App.
 * 
 * @param {Object} data - Response payload
 * @returns {TextOutput}
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
