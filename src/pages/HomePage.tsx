import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCars from '../components/home/FeaturedCars';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import Cta from '../components/home/Cta';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedCars />
      <HowItWorks />
      <Testimonials />
      <Cta />
    </div>
  );
};

export default HomePage;