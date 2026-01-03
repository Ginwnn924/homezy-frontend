import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../../utils/animations';

// Dữ liệu mẫu cho homestay
const HOMESTAYS = [
  {
    id: 1,
    title: "Eco Villa Retreat",
    location: "Da Lat, Vietnam",
    price: 1500000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Villa"
  },
  {
    id: 2,
    title: "Modern Beachfront Condo",
    location: "Da Nang, Vietnam",
    price: 2200000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Apartment"
  },
  {
    id: 3,
    title: "Traditional Wooden House",
    location: "Hoi An, Vietnam",
    price: 900000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    category: "House"
  },
  {
    id: 4,
    title: "Skyline Luxury Penthouse",
    location: "Ho Chi Minh City, Vietnam",
    price: 3500000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80",
    category: "Penthouse"
  },
  {
    id: 5,
    title: "Mountain View Cabin",
    location: "Sapa, Vietnam",
    price: 1200000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    category: "Cabin"
  },
  {
    id: 6,
    title: "Luxury Pool Villa",
    location: "Phu Quoc, Vietnam",
    price: 4500000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    category: "Villa"
  }
];

export const FeaturedListings: React.FC = () => {
  const { t } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <section className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px] py-24">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center md:text-left"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
          {t('home.featured_stays')}
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          Discover our hand-picked selection of the most exquisite properties for your perfect getaway.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        {HOMESTAYS.map((stay) => (
          <motion.div
            key={stay.id}
            variants={fadeInUp}
            className="group cursor-pointer"
          >
            {/* Image Card */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200 mb-5
                            shadow-luxury group-hover:shadow-luxury-hover transition-shadow duration-500">
              <motion.img
                src={stay.image}
                alt={stay.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

              <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full
                              text-xs font-accent font-semibold tracking-widest uppercase
                              shadow-gold z-20 backdrop-blur-md">
                 {stay.category}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-heading font-bold text-2xl text-primary group-hover:text-secondary transition-colors duration-300">
                  {stay.location}
                </h3>
                <div className="flex items-center gap-1.5 bg-accent/50 px-2 py-1 rounded-lg">
                   <FontAwesomeIcon icon={faStar} className="text-secondary text-sm" />
                   <span className="font-semibold text-primary text-sm">{stay.rating}</span>
                </div>
              </div>

              <p className="text-text-secondary text-lg font-light truncate">{stay.title}</p>

              <div className="flex items-baseline gap-2 pt-2 border-t border-gray-100">
                 <span className="font-heading font-bold text-xl text-primary">{formatCurrency(stay.price)}</span>
                 <span className="text-text-secondary text-sm font-light">/ {t('home.per_night')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 text-center">
        <button className="px-8 py-3 border-2 border-primary text-primary font-medium tracking-wide
                           hover:bg-primary hover:text-white transition-all duration-300
                           uppercase text-sm rounded-sm">
          View All Properties
        </button>
      </div>
    </section>
  );
};
