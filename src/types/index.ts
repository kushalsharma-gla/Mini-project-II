export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  dailyRate: number;
  image: string;
  type: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  features: string[];
  available: boolean;
  location: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
}

export interface BookingDetails {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  carId: string | null;
}