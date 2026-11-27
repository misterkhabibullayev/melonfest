import React from 'react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../config/siteConfig';

export const HeroStats = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 flex-1">
      {siteConfig.stats.map((s) => (
        <div
          key={s.id}
          className="h-full p-4 sm:p-4.5 text-left rounded-2xl bg-card/85 backdrop-blur-md border border-border hover:border-primary/50 transition-all shadow-xl flex flex-col justify-between"
        >
          <div className="text-2xl sm:text-3xl font-black text-primary leading-tight">
            {s.value}+
          </div>
          <div className="text-xs text-muted font-medium leading-snug">
            {t(s.titleKey)}
          </div>
        </div>
      ))}
    </div>
  );
};
