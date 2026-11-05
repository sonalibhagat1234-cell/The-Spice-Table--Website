/**
 * Google Apps Script Web App Configuration for The Spice Table
 * 
 * Uses the environment variable VITE_GOOGLE_APPS_SCRIPT_URL.
 * Do NOT hardcode the Apps Script URL in source files.
 */

export const GOOGLE_APPS_SCRIPT_URL: string =
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string)?.trim() || '';

/**
 * Checks if the Google Apps Script Web App URL has been configured.
 */
export function isAppsScriptConfigured(): boolean {
  return (
    Boolean(GOOGLE_APPS_SCRIPT_URL) &&
    GOOGLE_APPS_SCRIPT_URL.startsWith('https://script.google.com/macros/s/')
  );
}

