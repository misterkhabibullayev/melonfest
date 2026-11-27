import React from 'react';
import { motion } from 'framer-motion';
import { GirihPattern } from './DecorativePattern';

export const ComingSoon = () => {
  return (
    <section className="relative flex-1 flex items-center justify-center px-4 py-24 overflow-hidden">
      <GirihPattern
        id="coming-soon-girih"
        className="absolute w-[420px] h-[420px] opacity-[0.14] dark:opacity-[0.38]"
      />

      <motion.h1
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-3xl sm:text-5xl font-extrabold text-content tracking-tight text-center"
      >
        Coming soon
      </motion.h1>
    </section>
  );
};
