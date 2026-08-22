import { RestaurantInfo, Feature, SpecialOfferData } from '../types';

export const restaurantInfo: RestaurantInfo = {
  name: 'THE SPICE TABLE',
  tagline: 'Authentic Flavours. Memorable Experiences.',
  type: 'Contemporary Indian Restaurant',
  city: 'Nagpur',
  state: 'Maharashtra',
  fullAddress: '123 Main Road, Civil Lines, Nagpur, Maharashtra 440001',
  phone: '+91 87883 25718',
  phoneRaw: '+918788325718',
  whatsapp: '+91 87883 25718',
  whatsappRaw: '918788325718',
  email: 'hello@thespicetable.com',
  hours: '11:00 AM – 11:00 PM',
  days: 'Monday – Sunday',
  googleRating: 4.8,
  ratingCount: '1,240+ reviews',
  established: 2018,
  dishesCount: '50+',
  guestsServed: '10K+',
  mapsUrl: 'https://maps.google.com/?q=Nagpur+Maharashtra+India',
};

export const features: Feature[] = [
  {
    title: 'Fresh Ingredients',
    description: 'Carefully selected ingredients prepared fresh every day from trusted local growers.',
    iconName: 'Leaf',
  },
  {
    title: 'Authentic Flavours',
    description: "Traditional recipes inspired by India's rich culinary heritage, spiced with precision.",
    iconName: 'Flame',
  },
  {
    title: 'Expert Chefs',
    description: 'Passionate culinary masters creating memorable, artfully plated dining experiences.',
    iconName: 'ChefHat',
  },
  {
    title: 'Warm Hospitality',
    description: 'Thoughtful, attentive service designed to make every family visit and celebration special.',
    iconName: 'HeartHandshake',
  },
];

export const specialOffer: SpecialOfferData = {
  title: 'Weekend Family Feast',
  subtitle: 'Specially Curated Dining Experience',
  description: 'Bring everyone together with our royal culinary ensemble designed for a complete family feast.',
  itemsIncluded: [
    'Choice of Hyderabadi Dum Biryani (Chicken or Veg)',
    '2 Signature Starters (Paneer Tikka & Murgh Malai)',
    'Assorted Tandoori Breads with Signature Dips',
    '4 Refreshing Artisanal Beverages / Mocktails',
    'Chef’s Gulab Jamun Platter for Dessert',
  ],
  price: 1499,
  originalPrice: 1999,
  badge: 'Weekend Special',
  image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop',
  validity: 'Friday – Sunday | Dine-in & Pre-booking',
};
