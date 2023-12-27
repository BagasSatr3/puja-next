// components/Navbar.tsx

import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  const handleScroll = () => {
    const navbar = document.querySelector('.fixed');
    if (window.scrollY > 0) {
      navbar?.classList.add('shadow');
    } else {
      navbar?.classList.remove('shadow');
    }
  };

  // Event listener untuk scroll
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white-800 p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-20 h-20 mr-2 object-cover" />
          <span className="text-white text-lg font-semibold">The Planets</span>
        </div>

        <div className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <span key={item} className="text-white">
              {item}
            </span>
          ))}
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            Menu
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-gray-700 p-4 rounded">
            {menuItems.map((item) => (
              <span key={item} className="text-white block mb-2">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-b border-gray-600"></div>
    </nav>
  );
};

export default Navbar;
