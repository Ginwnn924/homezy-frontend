import React from 'react';
import { Hero } from './components/Hero';
import { FeaturedListings } from './components/FeaturedListings';
import { PopularDestinations } from './components/PopularDestinations';
import { CallToAction } from './components/CallToAction';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <FeaturedListings />
      <CallToAction />
    </>
  );
};
