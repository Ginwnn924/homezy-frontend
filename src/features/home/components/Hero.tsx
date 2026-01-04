import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[90vh] w-full bg-primary overflow-hidden flex items-center -mt-24">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}
      ></div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px] h-full pt-20">
        <div className="max-w-4xl text-white mt-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-8 drop-shadow-2xl leading-[1.1]">
            {t('banner.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 font-light max-w-2xl drop-shadow-lg leading-relaxed opacity-90">
            {t('banner.subtitle')}
          </p>

          {/* Glassmorphism Search Bar */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full shadow-2xl max-w-3xl flex items-center transform transition-all duration-300 hover:bg-white/20">
            <div className="flex-grow px-6 border-r border-white/20">
               <label htmlFor="location" className="block text-xs font-bold text-white uppercase tracking-wider mb-1">{t('banner.location')}</label>
               <input
                 type="text"
                 id="location"
                 className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/70 text-lg py-1 focus:outline-none font-medium truncate"
                 placeholder={t('banner.search_placeholder')}
               />
            </div>
            {/* Added Dates section for visual balance (mock) */}
            <div className="hidden md:block px-6 border-r border-white/20 min-w-[140px] whitespace-nowrap">
               <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">{t('banner.check_in')}</label>
               <div className="text-white/70 text-lg font-medium cursor-pointer">{t('banner.add_dates')}</div>
            </div>
             <div className="hidden md:block px-6 min-w-[140px] whitespace-nowrap">
               <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">{t('banner.guests')}</label>
               <div className="text-white/70 text-lg font-medium cursor-pointer">{t('banner.add_guests')}</div>
            </div>

            <button className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 px-8 transition-all duration-300 shadow-lg hover:shadow-primary/50 flex items-center gap-3 ml-2 group shrink-0">
               <FontAwesomeIcon icon={faSearch} className="text-lg group-hover:scale-110 transition-transform" />
               <span className="font-semibold hidden lg:inline">{t('banner.search_button')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
