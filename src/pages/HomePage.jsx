import React from 'react';
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";

export const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <HeroSection />
      <AboutSection />
    </div>
  );
};
