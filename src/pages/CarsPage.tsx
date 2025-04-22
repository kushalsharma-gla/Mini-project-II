import React, { useState } from 'react';
import { cars } from '../data/cars';
import CarCard from '../components/cars/CarCard';
import CarFilter from '../components/cars/CarFilter';
import { Car } from '../types';

const CarsPage: React.FC = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Cars</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CarFilter 
            onFilterChange={setFilteredCars} 
            allCars={cars}
          />
        </div>
        
        <div className="lg:col-span-3">
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No cars found</h3>
              <p className="text-gray-600">Try adjusting your filters to find available cars.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;