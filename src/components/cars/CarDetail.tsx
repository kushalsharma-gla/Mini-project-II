import React from 'react';
import { Fuel, Car as CarIcon, Users, Gauge, Calendar, Star, ChevronRight } from 'lucide-react';
import { Car } from '../../types';
import BookingForm from '../bookings/BookingForm';

interface CarDetailProps {
  car: Car;
}

const CarDetail: React.FC<CarDetailProps> = ({ car }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center mb-4 text-sm text-gray-600">
        <span>Cars</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>{car.brand}</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-blue-800">{car.name}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="h-64 sm:h-96 overflow-hidden">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{car.name}</h1>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-600 text-sm ml-1">(24 reviews)</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Experience luxury and performance with the {car.year} {car.name}. This {car.type.toLowerCase()} vehicle offers exceptional comfort and style for your journey.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <CarIcon className="h-6 w-6 text-blue-800 mb-2" />
                  <span className="text-sm text-gray-800 font-medium">{car.type}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Fuel className="h-6 w-6 text-blue-800 mb-2" />
                  <span className="text-sm text-gray-800 font-medium">{car.fuelType}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-800 mb-2" />
                  <span className="text-sm text-gray-800 font-medium">{car.seats} Seats</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Gauge className="h-6 w-6 text-blue-800 mb-2" />
                  <span className="text-sm text-gray-800 font-medium">{car.transmission}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Basic Info</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Brand</span>
                        <span className="font-medium text-gray-900">{car.brand}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Model</span>
                        <span className="font-medium text-gray-900">{car.model}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Year</span>
                        <span className="font-medium text-gray-900">{car.year}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium text-gray-900">{car.type}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Specs</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Fuel Type</span>
                        <span className="font-medium text-gray-900">{car.fuelType}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Transmission</span>
                        <span className="font-medium text-gray-900">{car.transmission}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Seats</span>
                        <span className="font-medium text-gray-900">{car.seats}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Daily Rate</span>
                        <span className="font-medium text-gray-900">${car.dailyRate}/day</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-2 w-2 bg-blue-800 rounded-full mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Rental Policy</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Minimum rental period: 1 day</li>
                    <li>• Valid driver's license required</li>
                    <li>• Minimum age: 21 years</li>
                    <li>• Insurance included in the rate</li>
                    <li>• Fuel policy: Return with same level</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <BookingForm car={car} />
        </div>
      </div>
    </div>
  );
};

export default CarDetail;