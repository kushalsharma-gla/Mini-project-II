import React, { useState } from 'react';
import { Calendar, MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';
import { Car } from '../../types';
import { useBooking } from '../../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import { locations } from '../../data/locations';

interface BookingFormProps {
  car: Car;
}

const BookingForm: React.FC<BookingFormProps> = ({ car }) => {
  const navigate = useNavigate();
  const { bookingDetails, setBookingDetails } = useBooking();
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });

  // Calculate rental duration in days
  let rentalDuration = 1;
  if (bookingDetails.pickupDate && bookingDetails.dropoffDate) {
    const pickupDate = new Date(bookingDetails.pickupDate);
    const dropoffDate = new Date(bookingDetails.dropoffDate);
    const diffTime = Math.abs(dropoffDate.getTime() - pickupDate.getTime());
    rentalDuration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const totalPrice = car.dailyRate * rentalDuration;
  const insuranceFee = Math.round(totalPrice * 0.15);
  const serviceFee = 24.99;
  const grandTotal = totalPrice + insuranceFee + serviceFee;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pickupDate' | 'dropoffDate') => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: e.target.value,
      carId: car.id
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>, field: 'pickupLocation' | 'dropoffLocation') => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: e.target.value,
      carId: car.id
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would process the payment and create a booking here
    navigate('/booking-confirmation');
  };

  // Get tomorrow's date for minimum pickup date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Get day after tomorrow for minimum return date
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
  const dayAfterTomorrowStr = dayAfterTomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">Book This Car</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="pickupLocation"
                  value={bookingDetails.pickupLocation}
                  onChange={(e) => handleLocationChange(e, 'pickupLocation')}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select pickup location</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}, {location.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="dropoffLocation"
                  value={bookingDetails.dropoffLocation}
                  onChange={(e) => handleLocationChange(e, 'dropoffLocation')}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select drop-off location</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}, {location.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="pickupDate"
                  min={tomorrowStr}
                  value={bookingDetails.pickupDate}
                  onChange={(e) => handleDateChange(e, 'pickupDate')}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="dropoffDate"
                  min={bookingDetails.pickupDate || dayAfterTomorrowStr}
                  value={bookingDetails.dropoffDate}
                  onChange={(e) => handleDateChange(e, 'dropoffDate')}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Daily Rate:</span>
                <span className="font-medium">${car.dailyRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Rental Duration:</span>
                <span className="font-medium">{rentalDuration} days</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Insurance Fee:</span>
                <span className="font-medium">${insuranceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service Fee:</span>
                <span className="font-medium">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-200 mt-2">
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
            >
              Continue to Personal Information
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={contactInfo.firstName}
                    onChange={handleContactChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={contactInfo.lastName}
                    onChange={handleContactChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between space-x-4 pt-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-1/2 bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={paymentInfo.cardHolder}
                  onChange={handlePaymentChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={paymentInfo.expiry}
                  onChange={handlePaymentChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mt-4">
              <div className="text-lg font-bold text-gray-900 mb-2">Summary</div>
              <div className="text-sm text-gray-600 mb-2">
                {car.name} • {rentalDuration} days
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Rental Cost:</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Insurance Fee:</span>
                <span className="font-medium">${insuranceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service Fee:</span>
                <span className="font-medium">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-200 mt-2">
                <span>Total Payment:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between space-x-4 pt-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Complete Booking
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;