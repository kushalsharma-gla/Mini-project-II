import React from 'react';
import { Star } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  avatar: string;
  rating: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jennifer Smith",
    position: "Marketing Director",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "The service was exceptional from start to finish. The car was immaculate, and the pickup process was seamless. I'll definitely be using DriveLuxe for all my future car rental needs."
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Software Engineer",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    text: "I needed a car for a last-minute business trip, and DriveLuxe made it incredibly easy. The app is intuitive, and the selection of vehicles is impressive. Great experience overall."
  },
  {
    id: 3,
    name: "Sarah Johnson",
    position: "Travel Blogger",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "As someone who travels frequently, I've used many car rental services, and DriveLuxe stands out. The pricing is transparent, the cars are top-notch, and the customer service is unmatched."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from some of our satisfied customers about their experience with DriveLuxe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-blue-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              
              <p className="italic mb-6 text-blue-100">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-blue-300">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;