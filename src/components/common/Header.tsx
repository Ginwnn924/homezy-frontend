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
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
          y: 0,
        }}
        initial={{ y: -100 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "shadow-md py-2" : "py-4"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px]">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 group">
              <span className={cn(
                "text-3xl md:text-4xl font-display font-bold tracking-tight transition-colors duration-300",
                 isScrolled ? "text-primary" : "text-white"
              )}>
                Homezy
              </span>
            </a>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {['header.home', 'header.stays', 'header.experiences'].map((item) => (
              <a
                key={item}
                href="#"
                className={cn(
                  "text-base font-medium tracking-wide transition-all duration-300 relative group",
                  isScrolled ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
                )}
              >
                {t(item)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className={cn(
                "p-2 rounded-full transition-colors relative z-10 flex items-center justify-center w-10 h-10",
                isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}>
                <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
              </button>

              <div className="absolute right-0 top-full pt-2 w-48 origin-top-right focus:outline-none invisible group-hover:visible
                              transition-all duration-300 transform opacity-0
                              group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 z-50">
                <div className="rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden p-1.5">
                  <button
                    onClick={() => changeLanguage('vi')}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 text-left text-sm rounded-lg transition-colors",
                      i18n.language === 'vi' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span className="text-xl">🇻🇳</span>
                    Tiếng Việt
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 text-left text-sm rounded-lg transition-colors",
                      i18n.language === 'en' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span className="text-xl">🇺🇸</span>
                    English
                  </button>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "flex items-center gap-3 rounded-full border p-1.5 pl-4 cursor-pointer transition-all duration-300 backdrop-blur-md",
                  isScrolled
                    ? "bg-white border-gray-200 hover:shadow-md text-gray-700"
                    : "bg-white/10 border-white/30 hover:bg-white/20 text-white"
                )}
              >
                <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-sm">
                   <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                </div>
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-60 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden z-50 p-2"
                  >
                      <button
                        onClick={() => openAuthModal('login')}
                        className="w-full px-4 py-2.5 text-left text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {t('header.login')}
                      </button>
                      <button
                        onClick={() => openAuthModal('register')}
                        className="w-full px-4 py-2.5 text-left text-[15px] text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {t('header.signup')}
                      </button>
                      <div className="border-t border-gray-100 my-2"></div>
                      <a href="#" className="block w-full px-4 py-2.5 text-left text-[15px] text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        {t('header.host_home')}
                      </a>
                      <a href="#" className="block w-full px-4 py-2.5 text-left text-[15px] text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
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
