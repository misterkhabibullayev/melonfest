import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

export const NewsPage = () => {
  const { t } = useTranslation();

  const newsList = [
    {
      id: 1,
      title: "Xiva qovun sayli festivaliga tayyorgarlik qizg'in davom etmoqda",
      date: "14-Avgust, 2026",
      desc: "Qadimiy Xiva shahrida o'tkazilishi rejalashtirilgan an'anaviy festivalga barcha hududlardan fermerlar va xorijiy delegatsiyalar tashrif buyurmoqda.",
    },
    {
      id: 2,
      title: "Festivalning bosh sovrini — Chevrolet Tracker avtomobili taqdim etildi",
      date: "12-Avgust, 2026",
      desc: "Tashkilotchilar tomonidan ushbu yilgi festivalda eng shirin qovun yetishtirgan g'olibga topshiriladigan bosh sovrin rasman e'lon qilindi.",
    },
    {
      id: 3,
      title: "Xalqaro qovun eksporti bo'yicha biznes forum o'tkaziladi",
      date: "10-Avgust, 2026",
      desc: "Festival doirasida O'zbekiston qovunlarini xorijiy bozorlarga eksport qilish va yangi logistika yo'laklarini rivojlantirishga bag'ishlangan xalqaro forum bo'lib o'tadi.",
    }
  ];

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-content">{t('navlinks.news')}</h1>
        <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto">
          Festival jarayoni, matbuot anjumanlari va rasmiy xabarlar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsList.map((item) => (
          <div key={item.id} className="card p-6 border border-border hover:border-primary/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>{item.date}</span>
              </div>
              <h3 className="text-lg font-bold leading-snug text-content">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
            <Link
              to={`/news/${item.id}`}
              className="mt-6 pt-4 border-t border-border flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer focus-ring rounded"
            >
              <span>{t('ui.view_all', 'Batafsil o\'qish')}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NewsDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-8">
      <Link
        to="/news"
        className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline cursor-pointer focus-ring rounded"
      >
        ← {t('ui.all_news', 'Barcha yangiliklar')}
      </Link>

      <div className="space-y-4">
        <span className="text-xs text-primary font-semibold">Yangilik #{id}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-content">
          Xiva qovun sayli festivaliga tayyorgarlik qizg'in davom etmoqda
        </h1>
        <div className="flex items-center gap-2 text-xs text-muted">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <span>14-Avgust, 2026</span>
        </div>
      </div>

      <div className="card p-8 space-y-4 leading-relaxed text-content/85 border border-border">
        <p>
          Qadimiy Xiva shahrining betakror obidalari bag'rida bo'lib o'tadigan Qovun Sayli festivaliga qizg'in tayyorgarlik ko'rilmoqda. O'zbekistonning barcha viloyatlaridan eng sara polizkorlar, agronomlar va dehqonlar o'z mahsulotlarini taqdim etish uchun Xorazmga yo'l olmoqda.
        </p>
        <p>
          Festival doirasida nafaqat qovun ko'rgazmalari, balki xalq hunarmandchiligi yarmarkalari, gastronomik musobaqalar va madaniy dasturlar tashkil etiladi.
        </p>
      </div>
    </div>
  );
};
