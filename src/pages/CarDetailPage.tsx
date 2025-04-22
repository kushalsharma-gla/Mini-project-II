import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { cars } from '../data/cars';
import CarDetail from '../components/cars/CarDetail';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const car = cars.find(car => car.id === id);

  if (!car) {
    return <Navigate to="/cars" />;
  }

  return (
    <div className="mt-20">
      <CarDetail car={car} />
    </div>
  );
};

export default CarDetailPage;