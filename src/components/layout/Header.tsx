import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Menu, X, User, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Car className={`h-8 w-8 ${isScrolled ? 'text-blue-800' : 'text-white'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-blue-800' : 'text-white'}`}>
              DriveLuxe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-blue-800' : 'text-white hover:text-gray-200'}`}>
              Home
            </Link>
            <Link to="/cars" className={`font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-blue-800' : 'text-white hover:text-gray-200'}`}>
              Cars
            </Link>
            <Link to="/locations" className={`font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-blue-800' : 'text-white hover:text-gray-200'}`}>
              Locations
            </Link>
            <Link to="/about" className={`font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-blue-800' : 'text-white hover:text-gray-200'}`}>
              About
            </Link>
            <Link to="/contact" className={`font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-blue-800' : 'text-white hover:text-gray-200'}`}>
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              <Search className="h-5 w-5" />
            </button>
            <button className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              <User className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium px-4 py-2 rounded-md ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/cars" 
                className={`font-medium px-4 py-2 rounded-md ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cars
              </Link>
              <Link 
                to="/locations" 
                className={`font-medium px-4 py-2 rounded-md ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Locations
              </Link>
              <Link 
                to="/about" 
                className={`font-medium px-4 py-2 rounded-md ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium px-4 py-2 rounded-md ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4 mt-4 px-4">
              <button className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
                <Search className="h-5 w-5" />
              </button>
              <button className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;