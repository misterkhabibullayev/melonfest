import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, MapPin } from 'lucide-react';

export const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-content">{t('navlinks.about')}</h1>
        <p className="text-primary font-semibold text-sm uppercase tracking-widest">
          {t('main.title')}
        </p>
      </div>

      <div className="card p-8 sm:p-10 space-y-6 leading-relaxed text-content/85 text-base sm:text-lg border border-border">
        <p>{t('about.info1')}</p>
        <p>{t('about.info2')}</p>
        <p>{t('about.info3')}</p>
      </div>

      {/* Highlights & Grand Prize */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-primary shrink-0" aria-hidden="true" />
            <h3 className="text-xl font-bold text-content">{t('content.additional_info.items.prize', 'Asosiy mukofot:')}</h3>
          </div>
          <p className="text-2xl font-extrabold text-primary mb-2">
            {t('content.additional_info.values.prize', 'Chevrolet Tracker')}
          </p>
          <p className="text-xs text-muted">
            Festivalda "Eng shirin qovun yetishtirgan dehqon" va boshqa bosh nominatsiyalar g'oliblariga topshiriladi.
          </p>
        </div>

        <div className="card p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-secondary shrink-0" aria-hidden="true" />
            <h3 className="text-xl font-bold text-content">{t('content.additional_info.items.location', 'Manzil:')}</h3>
          </div>
          <p className="text-lg font-bold mb-1 text-content">
            {t('content.additional_info.values.location', 'Xiva shahar, Arda Xiva')}
          </p>
          <p className="text-xs text-muted">
            {t('content.additional_info.values.date', '15-20 Avgust, 2026')} • {t('content.additional_info.values.time', '10:00 - 22:00')}
          </p>
        </div>
      </div>
    </div>
  );
};
