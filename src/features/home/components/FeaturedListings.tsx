import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../utils/animations';
import { cn } from '../../../utils/cn';

// Dữ liệu mẫu cho homestay
const HOMESTAYS = [
  {
    id: 1,
    title: "Eco Villa Retreat",
    location: "Da Lat, Vietnam",
    distance: "15 km to center",
    dates: "Oct 15 - 20",
    price: 1500000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Villa",
    isGuestFavorite: true
  },
  {
    id: 2,
    title: "Modern Beachfront Condo",
    location: "Da Nang, Vietnam",
    distance: "Beachfront",
    dates: "Nov 2 - 7",
    price: 2200000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Apartment",
    isGuestFavorite: false
  },
  {
    id: 3,
    title: "Traditional Wooden House",
    location: "Hoi An, Vietnam",
    distance: "Old Town area",
    dates: "Dec 10 - 15",
    price: 900000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    category: "House",
    isGuestFavorite: true
  },
  {
    id: 4,
    title: "Skyline Luxury Penthouse",
    location: "Ho Chi Minh City, Vietnam",
    distance: "City Center",
    dates: "Jan 5 - 10",
    price: 3500000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80",
    category: "Penthouse",
    isGuestFavorite: true
  },
  {
    id: 5,
    title: "Mountain View Cabin",
    location: "Sapa, Vietnam",
    distance: "Mountain view",
    dates: "Feb 14 - 18",
    price: 1200000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    category: "Cabin",
    isGuestFavorite: false
  },
  {
    id: 6,
    title: "Luxury Pool Villa",
    location: "Phu Quoc, Vietnam",
    distance: "Private beach",
    dates: "Mar 1 - 5",
    price: 4500000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    category: "Villa",
    isGuestFavorite: true
  }
];

const ListingCard = ({ stay }: { stay: any }) => {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="group cursor-pointer flex flex-col gap-3 min-w-[280px] md:min-w-[300px] snap-start"
    >
      {/* Image Container */}
      <div className="relative aspect-[10/9] overflow-hidden rounded-xl bg-gray-200">
        <motion.img
          src={stay.image}
          alt={stay.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Guest Favorite Tag */}
        {stay.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm z-10">
            <span className="text-xs font-bold text-primary">Guest favorite</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 z-10 transition-transform active:scale-90 hover:scale-110"
        >
          <FontAwesomeIcon
            icon={isLiked ? faHeart : faHeartRegular}
            className={cn(
              "text-2xl drop-shadow-md transition-colors",
              isLiked ? "text-red-500" : "text-white/70 hover:text-white"
            )}
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base text-gray-900 truncate pr-4">{stay.location}</h3>
          <div className="flex items-center gap-1">
             <FontAwesomeIcon icon={faStar} className="text-sm text-gray-900" />
             <span className="text-sm text-gray-900">{stay.rating}</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm font-light">{stay.distance}</p>
        <p className="text-text-secondary text-sm font-light">{stay.dates}</p>

        <div className="mt-1 flex items-baseline gap-1">
           <span className="font-semibold text-gray-900">{formatCurrency(stay.price)}</span>
           <span className="text-gray-900 font-light text-sm">{t('home.per_night')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedListings: React.FC = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px] py-16 border-t border-gray-100">
      <div className="flex items-end justify-between mb-8">
        <div>
           <h2 className="text-3xl font-heading font-bold text-primary tracking-tight">
            {t('home.featured_stays')}
          </h2>
          <p className="text-text-secondary mt-2">Top-rated places to stay for your next trip</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Layout */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-6 px-6 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {HOMESTAYS.map((stay) => (
          <ListingCard key={stay.id} stay={stay} />
        ))}
        {/* View All Card */}
        <div className="min-w-[280px] md:min-w-[300px] snap-start flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors group">
            <div className="text-center">
              <span className="block font-semibold text-lg text-gray-500 group-hover:text-primary transition-colors">View all 1,000+ stays</span>
              <span className="text-sm text-gray-400 group-hover:text-primary/70">Show more</span>
            </div>
        </div>
      </div>
    </section>
  );
};

