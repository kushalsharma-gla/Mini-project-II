import React, { createContext, useContext, useState } from 'react';
import { BookingDetails } from '../types';

interface BookingContextType {
  bookingDetails: BookingDetails;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;
  resetBooking: () => void;
}

const defaultBookingDetails: BookingDetails = {
  pickupLocation: '',
  dropoffLocation: '',
  pickupDate: '',
  dropoffDate: '',
  carId: null,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(defaultBookingDetails);

  const resetBooking = () => {
    setBookingDetails(defaultBookingDetails);
  };

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};