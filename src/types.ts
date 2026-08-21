export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'main-course' | 'biryani' | 'breads' | 'desserts' | 'beverages';
  isVeg: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  image: string;
  portion?: string;
}

export interface MenuCategory {
  id: MenuItem['category'];
  name: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  recommendedDish?: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Food' | 'Ambiance' | 'Kitchen' | 'Desserts';
  image: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  iconName: 'Leaf' | 'Flame' | 'ChefHat' | 'HeartHandshake';
}

export interface SpecialOfferData {
  title: string;
  subtitle: string;
  description: string;
  itemsIncluded: string[];
  price: number;
  originalPrice: number;
  badge: string;
  image: string;
  validity: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  specialRequest?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  type: string;
  city: string;
  state: string;
  fullAddress: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  hours: string;
  days: string;
  googleRating: number;
  ratingCount: string;
  established: number;
  dishesCount: string;
  guestsServed: string;
  mapsUrl: string;
}
