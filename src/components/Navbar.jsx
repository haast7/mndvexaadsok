import React, { useState, useEffect } from 'react';
import useTrackingLink from '../hooks/useTrackingLink';
import { trackTelegramClick } from '../config/tracking';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const trackingLink = useTrackingLink();

  const handleTelegramClick = () => {
    trackTelegramClick('Click');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              <span className="text-white">
                Método <span className="text-primary-500">X</span>
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#sobre" 
              className="font-medium transition-colors text-white/90 hover:text-white"
            >
              Sobre
            </a>
            <a 
              href="#metodo" 
              className="font-medium transition-colors text-white/90 hover:text-white"
            >
              O Método
            </a>
            <a 
              href={trackingLink}
              target="_blank" 
              rel="noopener noreferrer"
              data-telegram-link="true"
              onClick={handleTelegramClick}
              className="relative px-6 py-2 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 animate-shimmer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Ao Vivo
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t ${
          isScrolled 
            ? 'bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="px-4 py-4 space-y-3">
            <a 
              href="#sobre" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 font-medium transition-colors text-white/90 hover:text-white"
            >
              Sobre
            </a>
            <a 
              href="#metodo" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 font-medium transition-colors text-white/90 hover:text-white"
            >
              O Método
            </a>
            <a 
              href={trackingLink}
              target="_blank" 
              rel="noopener noreferrer"
              data-telegram-link="true"
              onClick={(e) => {
                handleTelegramClick();
                setIsMobileMenuOpen(false);
              }}
              className="block py-2 px-4 text-white font-semibold rounded-lg text-center shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden animate-shimmer"
            >
              <span className="flex items-center justify-center gap-2 relative z-10">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Ao Vivo
              </span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

