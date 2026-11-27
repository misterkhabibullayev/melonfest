import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const CountdownTimer = () => {
  const { t } = useTranslation();

  // Dynamic countdown calculation targeted to August 7th (09:00:00)
  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    // Month index 7 is August in JavaScript Date
    let target = new Date(currentYear, 7, 7, 9, 0, 0);

    if (now.getTime() > target.getTime()) {
      target = new Date(currentYear + 1, 7, 7, 9, 0, 0);
    }

    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, year: target.getFullYear() };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      year: target.getFullYear(),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { key: 'days', value: timeLeft.days, label: t('hero.days', 'Kun') },
    { key: 'hours', value: timeLeft.hours, label: t('hero.hours', 'Soat') },
    { key: 'minutes', value: timeLeft.minutes, label: t('hero.minutes', 'Daqiqa') },
    { key: 'seconds', value: timeLeft.seconds, label: t('hero.seconds', 'Soniya') },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Title Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold shadow-sm w-fit">
        <span className="font-bold text-white tracking-wide">{t('hero.countdown_title', 'Festival boshlanadi')}:</span>
      </div>

      {/* 4 Distinct Standalone Unit Cards */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm sm:max-w-md lg:max-w-lg mt-0.5">
        {units.map((unit, idx) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className="flex flex-col items-center justify-center py-2.5 px-2 sm:py-3.5 sm:px-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-md border border-white/15 hover:border-primary/50 transition-colors shadow-md group min-w-0"
          >
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-timer tracking-tight leading-none"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-white/75 uppercase tracking-wider mt-1.5 sm:mt-2">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
