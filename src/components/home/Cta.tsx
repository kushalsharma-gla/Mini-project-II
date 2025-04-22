import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

const Cta: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready for your next adventure?</h2>
              <p className="text-blue-200 mb-8 text-lg">
                Experience the freedom of the open road with our premium rental cars. Book today and enjoy exclusive discounts.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/cars" 
                  className="inline-block bg-white text-blue-800 font-medium px-6 py-3 rounded-md transition-colors hover:bg-gray-100 text-center"
                >
                  Browse Cars
                </Link>
                <a 
                  href="tel:+18001234567" 
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-medium px-6 py-3 rounded-md transition-colors hover:bg-white/10 text-center"
                >
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Call Us
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Car on the road" 
                className="w-full h-full object-cover object-center"
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;