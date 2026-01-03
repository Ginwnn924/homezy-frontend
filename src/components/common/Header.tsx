import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { AuthModal } from '../../features/auth/components/AuthModal';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isScrolled } = useScrollPosition();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const openAuthModal = (view: 'login' | 'register') => {
    setAuthView(view);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 1)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-shadow duration-300",
          isScrolled ? "shadow-luxury border-transparent" : "shadow-sm border-gray-100"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px]">
          {/* Logo with Cormorant Garamond */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <span className="text-3xl md:text-4xl font-display font-semibold text-primary
                               tracking-wide hover:bg-gradient-to-r hover:from-primary
                               hover:to-secondary hover:bg-clip-text hover:text-transparent
                               transition-all duration-500">
                Homezy
              </span>
            </a>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="luxury-link text-base font-medium tracking-wide">
              {t('header.home')}
            </a>
            <a href="#" className="luxury-link text-base font-medium tracking-wide">
              {t('header.stays')}
            </a>
            <a href="#" className="luxury-link text-base font-medium tracking-wide">
              {t('header.experiences')}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="p-2 text-text-primary hover:bg-gray-100 rounded-full transition-colors relative z-10">
                <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
              </button>

              <div className="absolute right-0 top-full pt-2 w-40 origin-top-right focus:outline-none invisible group-hover:visible
                              transition-all duration-300 transform opacity-0
                              group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 z-50">
                <div className="rounded-2xl bg-white shadow-luxury ring-1 ring-black ring-opacity-5 overflow-hidden py-1">
                  <button
                    onClick={() => changeLanguage('vi')}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                      i18n.language === 'vi' ? 'font-bold text-primary' : 'text-gray-700'
                    )}
                  >
                    <span className="text-lg">🇻🇳</span>
                    Tiếng Việt
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                      i18n.language === 'en' ? 'font-bold text-primary' : 'text-gray-700'
                    )}
                  >
                    <span className="text-lg">🇺🇸</span>
                    English
                  </button>
                </div>
              </div>
            </div>

            {/* User Menu with glass effect */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 rounded-full border border-gray-200 p-1.5 pl-4
                            hover:shadow-lg cursor-pointer transition-all duration-300 glass group bg-white/50 backdrop-blur-md"
              >
                <FontAwesomeIcon icon={faBars} className="h-4 w-4 text-text-secondary group-hover:text-primary transition-colors" />
                <div className="flex h-9 w-9 items-center justify-center rounded-full
                                bg-gradient-to-br from-primary to-primary/80 text-white shadow-md group-hover:scale-105 transition-transform">
                   <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                </div>
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-3 w-64 origin-top-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden z-50 py-2"
                  >
                      <button
                        onClick={() => openAuthModal('login')}
                        className="w-full px-6 py-3 text-left text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {t('header.login')}
                      </button>
                      <button
                        onClick={() => openAuthModal('register')}
                        className="w-full px-6 py-3 text-left text-[15px] text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {t('header.signup')}
                      </button>
                      <div className="border-t border-gray-100 my-2"></div>
                      <a href="#" className="block w-full px-6 py-3 text-left text-[15px] text-gray-700 hover:bg-gray-50 transition-colors">
                        {t('header.host_home')}
                      </a>
                      <a href="#" className="block w-full px-6 py-3 text-left text-[15px] text-gray-700 hover:bg-gray-50 transition-colors">
                        {t('header.help')}
                      </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />
    </>
  );
};
