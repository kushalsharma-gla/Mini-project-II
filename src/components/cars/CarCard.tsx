import React from 'react';
import { Star, Users, Fuel, Zap } from 'lucide-react';
import { Car } from '../../types';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Currently Unavailable</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium ml-1">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm">{car.brand} • {car.year}</p>
        
        <div className="grid grid-cols-2 gap-2 my-3">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1 text-blue-800" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Fuel className="h-4 w-4 mr-1 text-blue-800" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Zap className="h-4 w-4 mr-1 text-blue-800" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium text-blue-800">{car.type}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-blue-800">${car.dailyRate}</span>
            <span className="text-gray-600 text-sm">/day</span>
          </div>
          <Link 
            to={`/car/${car.id}`}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md transition-colors duration-300"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;