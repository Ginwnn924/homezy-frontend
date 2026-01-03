import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[600px] w-full bg-primary overflow-hidden flex items-center">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-10000 hover:scale-105"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}
      ></div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px] py-20">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 drop-shadow-lg">
            {t('banner.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 font-light max-w-2xl drop-shadow-md">
            {t('banner.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-luxury max-w-2xl flex items-center transform transition-transform hover:scale-[1.01]">
            <div className="flex-grow px-6">
               <label htmlFor="search" className="sr-only">{t('banner.search_placeholder')}</label>
               <input
                 type="text"
                 id="search"
                 className="w-full border-none focus:ring-0 text-text-primary placeholder-text-secondary text-lg py-2 focus:outline-none"
                 placeholder={t('banner.search_placeholder')}
               />
            </div>
            <button className="bg-secondary hover:bg-[#b09355] text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
               <FontAwesomeIcon icon={faSearch} />
               <span>{t('banner.search_button')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
