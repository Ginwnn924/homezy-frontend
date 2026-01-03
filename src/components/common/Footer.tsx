import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="bg-primary text-white pt-24 pb-12"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px]">
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
             <span className="text-4xl font-display font-semibold text-white mb-6 block tracking-wide">
               Homezy
             </span>
             <p className="text-gray-300 text-base leading-relaxed max-w-xs font-sans">
               {t('banner.subtitle')}
             </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-montserrat font-bold text-secondary text-lg mb-6 tracking-wide uppercase">
              {t('footer.about')}
            </h4>
            <ul className="space-y-4 text-base text-gray-300">
              <li><a href="#" className="hover:text-secondary transition-colors duration-300 inline-block py-1">Newsroom</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors duration-300 inline-block py-1">Careers</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors duration-300 inline-block py-1">Investors</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-montserrat font-bold text-secondary text-lg mb-6 tracking-wide uppercase">
              {t('footer.support')}
            </h4>
            <ul className="space-y-4 text-base text-gray-300">
              <li><a href="#" className="hover:text-secondary transition-colors duration-300 inline-block py-1">Help Center</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors duration-300 inline-block py-1">Safety</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors duration-300 inline-block py-1">Cancellation options</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
             <h4 className="font-montserrat font-bold text-secondary text-lg mb-6 tracking-wide uppercase">Social</h4>
             <div className="flex gap-6">
                <a href="#" className="group">
                   <div className="w-12 h-12 rounded-full border-2 border-gray-500
                                   flex items-center justify-center
                                   hover:border-secondary hover:bg-secondary/10
                                   transition-all duration-300 hover:shadow-gold
                                   hover:scale-110 transform">
                      <FontAwesomeIcon icon={faFacebook} className="h-5 w-5 text-gray-300 group-hover:text-secondary transition-colors" />
                   </div>
                </a>
                <a href="#" className="group">
                   <div className="w-12 h-12 rounded-full border-2 border-gray-500
                                   flex items-center justify-center
                                   hover:border-secondary hover:bg-secondary/10
                                   transition-all duration-300 hover:shadow-gold
                                   hover:scale-110 transform">
                      <FontAwesomeIcon icon={faTwitter} className="h-5 w-5 text-gray-300 group-hover:text-secondary transition-colors" />
                   </div>
                </a>
                <a href="#" className="group">
                   <div className="w-12 h-12 rounded-full border-2 border-gray-500
                                   flex items-center justify-center
                                   hover:border-secondary hover:bg-secondary/10
                                   transition-all duration-300 hover:shadow-gold
                                   hover:scale-110 transform">
                      <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 text-gray-300 group-hover:text-secondary transition-colors" />
                   </div>
                </a>
             </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          className="relative border-t border-gray-700 pt-10 mt-12"
        >
          {/* Gradient divider accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px]
                          bg-gradient-to-r from-transparent via-secondary to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            <p className="font-montserrat text-xs tracking-widest uppercase">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-secondary transition-colors duration-300 text-sm">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-secondary transition-colors duration-300 text-sm">{t('footer.terms')}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
