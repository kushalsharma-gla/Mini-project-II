import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CarCard from '../cars/CarCard';
import { cars } from '../../data/cars';

const FeaturedCars: React.FC = () => {
  // Get only the first 3 featured cars
  const featuredCars = cars.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
            <p className="text-gray-600 mt-2">Explore our top rated vehicles for your next journey</p>
          </div>
          <Link to="/cars" className="flex items-center text-blue-800 font-medium transition-colors hover:text-blue-700">
            View all cars <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;