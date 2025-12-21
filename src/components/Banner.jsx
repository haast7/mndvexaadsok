import React from 'react';
import useTrackingLink from '../hooks/useTrackingLink';
import { trackTelegramClick } from '../config/tracking';

const Banner = ({ imagePath = '/banner-pagina.jpg', alt = 'Banner' }) => {
  const trackingLink = useTrackingLink();

  const handleClick = () => {
    trackTelegramClick('Click');
  };

  return (
    <div className="w-full bg-gray-900 flex items-center justify-center">
      <a 
        href={trackingLink}
        target="_blank" 
        rel="noopener noreferrer"
        data-telegram-link="true"
        onClick={handleClick}
        className="w-full cursor-pointer hover:opacity-95 transition-opacity duration-300"
      >
        <div className="relative w-full h-auto min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center py-8">
          <picture>
            <source srcSet={imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
            <img 
              src={imagePath} 
              alt={alt}
              className="w-full h-auto max-h-[600px] object-contain"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          </picture>
          <div className="w-full h-full flex items-center justify-center bg-gray-800" style={{ display: 'none' }}>
            <div className="text-center p-8">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 font-semibold">Banner</p>
              <p className="text-gray-500 text-sm mt-2">Adicione a imagem em /public/banner-pagina.jpg</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Banner;

