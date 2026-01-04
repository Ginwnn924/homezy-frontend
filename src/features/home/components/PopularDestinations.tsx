import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const DESTINATIONS = [
  {
    id: 1,
    name: "Hoi An",
    properties: 1240,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    size: "large" // Spans 2 rows, 2 cols
  },
  {
    id: 2,
    name: "Da Lat",
    properties: 856,
    image: "https://images.unsplash.com/photo-1558619819-3382753303c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    size: "medium" // Normal
  },
  {
    id: 3,
    name: "Ho Chi Minh City",
    properties: 2100,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    size: "medium" // Normal
  },
  {
    id: 4,
    name: "Da Nang",
    properties: 1540,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    size: "wide" // Spans 2 cols
  }
];

export const PopularDestinations: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px] py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 tracking-tight"
          >
            {t('home.popular_destinations')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-lg max-w-xl"
          >
            Explore the most beloved destinations chosen by our community of travelers.
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group flex items-center gap-2 font-semibold text-primary hover:text-secondary transition-colors"
        >
          View all destinations
          <FontAwesomeIcon icon={faArrowRight} className="transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[600px]">
        {DESTINATIONS.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative rounded-3xl overflow-hidden cursor-pointer group shadow-lg",
              dest.size === "large" && "md:col-span-2 md:row-span-2",
              dest.size === "wide" && "md:col-span-2",
              dest.size === "medium" && "md:col-span-1"
            )}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Content */}
            <div className="absolute bottom-6 left-6 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
              <h3 className={cn(
                "font-heading font-bold mb-1",
                dest.size === "large" ? "text-4xl" : "text-2xl"
              )}>
                {dest.name}
              </h3>
              <p className="text-white/80 font-light flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span>{dest.properties} properties</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
