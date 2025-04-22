import React from 'react';
import { Search, Calendar, Car, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8 text-blue-800" />,
    title: "Search Cars",
    description: "Browse our extensive collection of vehicles and find the perfect match for your needs."
  },
  {
    icon: <Calendar className="w-8 h-8 text-blue-800" />,
    title: "Choose Date & Location",
    description: "Select your preferred pickup and drop-off locations along with convenient dates."
  },
  {
    icon: <Car className="w-8 h-8 text-blue-800" />,
    title: "Book Your Car",
    description: "Complete your reservation in minutes with our simple booking process."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-800" />,
    title: "Enjoy Your Ride",
    description: "Pick up your vehicle and enjoy the freedom of the open road with confidence."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Renting a car with DriveLuxe is quick and easy. Follow these simple steps to get on the road in no time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M14 5l7 7m0 0l-7 7m7-7H3" 
    />
  </svg>
);

export default HowItWorks;