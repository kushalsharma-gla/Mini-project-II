import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertCircle, Calendar, MapPin, Car as CarIcon } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { cars } from '../data/cars';
import { locations } from '../data/locations';

const BookingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingDetails, resetBooking } = useBooking();
  
  const car = cars.find(c => c.id === bookingDetails.carId);
  const pickupLocation = locations.find(l => l.id === bookingDetails.pickupLocation);
  const dropoffLocation = locations.find(l => l.id === bookingDetails.dropoffLocation);
  
  // Calculate rental duration in days
  let rentalDuration = 1;
  if (bookingDetails.pickupDate && bookingDetails.dropoffDate) {
    const pickupDate = new Date(bookingDetails.pickupDate);
    const dropoffDate = new Date(bookingDetails.dropoffDate);
    const diffTime = Math.abs(dropoffDate.getTime() - pickupDate.getTime());
    rentalDuration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  // Generate a random booking reference
  const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  const handleBackToHome = () => {
    resetBooking();
    navigate('/');
  };
  
  if (!car || !pickupLocation || !dropoffLocation) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Information Missing</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find all the details for your booking. Please try again or contact customer support.
          </p>
          <button
            onClick={handleBackToHome}
            className="inline-block bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-colors hover:bg-blue-900"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-500 p-6 text-center">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-green-100 text-lg">
            Your reservation has been successfully completed.
          </p>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Booking Reference</h2>
            <div className="text-2xl font-bold text-blue-800 text-center py-2 bg-blue-50 rounded-md">
              {bookingReference}
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Please save this reference code for future inquiries.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Rental Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CarIcon className="h-5 w-5 text-blue-800 mt-0.5 mr-2" />
                <div>
                  <span className="block text-sm text-gray-600">Vehicle</span>
                  <span className="font-medium">{car.name}</span>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-blue-800 mt-0.5 mr-2" />
                <div>
                  <span className="block text-sm text-gray-600">Duration</span>
                  <span className="font-medium">{rentalDuration} days</span>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-800 mt-0.5 mr-2" />
                <div>
                  <span className="block text-sm text-gray-600">Pick-up</span>
                  <span className="font-medium">{pickupLocation.name}, {pickupLocation.city}</span>
                  <span className="block text-sm text-gray-600">{new Date(bookingDetails.pickupDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-800 mt-0.5 mr-2" />
                <div>
                  <span className="block text-sm text-gray-600">Drop-off</span>
                  <span className="font-medium">{dropoffLocation.name}, {dropoffLocation.city}</span>
                  <span className="block text-sm text-gray-600">{new Date(bookingDetails.dropoffDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Rental Cost ({rentalDuration} days × ${car.dailyRate})</span>
                <span className="font-medium">${car.dailyRate * rentalDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance Fee</span>
                <span className="font-medium">${Math.round(car.dailyRate * rentalDuration * 0.15)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium">$24.99</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2 font-bold">
                <span>Total Amount</span>
                <span>${(car.dailyRate * rentalDuration + Math.round(car.dailyRate * rentalDuration * 0.15) + 24.99).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="text-gray-600 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">What's Next?</h2>
            <p className="mb-2">
              You will receive a confirmation email with all your booking details shortly. On the day of your pickup:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Bring your driver's license and booking reference.</li>
              <li>Arrive at the pickup location at your selected time.</li>
              <li>An agent will assist you with the final paperwork.</li>
            </ul>
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={handleBackToHome}
              className="inline-block bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-colors hover:bg-blue-900"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;