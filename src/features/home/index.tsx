import React from 'react';
import { Hero } from './components/Hero';
import { FeaturedListings } from './components/FeaturedListings';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedListings />
    </>
  );
};
