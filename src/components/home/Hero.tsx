import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { locations } from '../../data/locations';
import { useBooking } from '../../contexts/BookingContext';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { bookingDetails, setBookingDetails } = useBooking();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/cars');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pickupDate' | 'dropoffDate') => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>, field: 'pickupLocation' | 'dropoffLocation') => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: e.target.value
    }));
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
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Luxury car" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 mt-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Find Your Perfect <span className="text-blue-400">Drive</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Premium car rental services with a diverse fleet of luxury, economy, and specialty vehicles.
          </p>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-500 hover:shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pickup Location */}
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
                
                {/* Drop-off Location */}
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
                
                {/* Pickup Date */}
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
                
                {/* Drop-off Date */}
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
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Search Available Cars
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;