import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const CallToAction: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px] py-16">
      <div className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556912172-4545a97795f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")' }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 px-8 md:px-16 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-6"
          >
            Become a Host on Homezy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-8 font-light"
          >
            Earn extra income and unlock new opportunities by sharing your space. We provide everything you need to get started.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            {t('header.become_host')}
          </motion.button>
        </div>
      </div>
    </section>
  );
};
