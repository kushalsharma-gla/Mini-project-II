import React, { useState } from 'react';
import { Car } from '../../types';
import { Search, Filter as FilterIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface CarFilterProps {
  onFilterChange: (filteredCars: Car[]) => void;
  allCars: Car[];
}

const CarFilter: React.FC<CarFilterProps> = ({ onFilterChange, allCars }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    transmission: '',
    minPrice: '',
    maxPrice: '',
    features: [] as string[]
  });

  // Get unique values for filters
  const types = [...new Set(allCars.map(car => car.type))];
  const transmissions = [...new Set(allCars.map(car => car.transmission))];
  const allFeatures = [...new Set(allCars.flatMap(car => car.features))];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleFeatureChange = (feature: string) => {
    let newFeatures;
    if (filters.features.includes(feature)) {
      newFeatures = filters.features.filter(f => f !== feature);
    } else {
      newFeatures = [...filters.features, feature];
    }
    
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let filteredCars = [...allCars];
    
    // Search filter
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase();
      filteredCars = filteredCars.filter(car => 
        car.name.toLowerCase().includes(searchTerm) ||
        car.brand.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm)
      );
    }
    
    // Type filter
    if (currentFilters.type) {
      filteredCars = filteredCars.filter(car => car.type === currentFilters.type);
    }
    
    // Transmission filter
    if (currentFilters.transmission) {
      filteredCars = filteredCars.filter(car => car.transmission === currentFilters.transmission);
    }
    
    // Price range filter
    if (currentFilters.minPrice) {
      filteredCars = filteredCars.filter(car => car.dailyRate >= Number(currentFilters.minPrice));
    }
    
    if (currentFilters.maxPrice) {
      filteredCars = filteredCars.filter(car => car.dailyRate <= Number(currentFilters.maxPrice));
    }
    
    // Features filter
    if (currentFilters.features.length > 0) {
      filteredCars = filteredCars.filter(car => 
        currentFilters.features.every(feature => car.features.includes(feature))
      );
    }
    
    onFilterChange(filteredCars);
  };

  const resetFilters = () => {
    const resetFiltersState = {
      search: '',
      type: '',
      transmission: '',
      minPrice: '',
      maxPrice: '',
      features: [] as string[]
    };
    setFilters(resetFiltersState);
    applyFilters(resetFiltersState);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-gray-600 hover:text-blue-800 transition-colors"
        >
          <FilterIcon className="h-5 w-5 mr-1" />
          <span className="text-sm">Filters</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )}
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by brand, model or name..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} space-y-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type
            </label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
              Transmission
            </label>
            <select
              id="transmission"
              name="transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Transmissions</option>
              {transmissions.map(transmission => (
                <option key={transmission} value={transmission}>{transmission}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price ($/day)
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              min="0"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price ($/day)
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              min="0"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {allFeatures.map(feature => (
              <label 
                key={feature} 
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={filters.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarFilter;