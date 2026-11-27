import React from 'react';
import { useTranslation } from 'react-i18next';

export const ContentsPage = () => {
  const { t } = useTranslation();

  const programItems = [
    { num: 1, key: "1" },
    { num: 2, key: "2" },
    { num: 3, key: "3" },
    { num: 4, key: "4" },
    { num: 5, key: "5" },
    { num: 6, key: "6" },
    { num: 7, key: "7" },
    { num: 8, key: "8" },
    { num: 9, key: "9" },
  ];

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-content">{t('navlinks.content')}</h1>
        <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto">
          Qovun Sayli xalqaro festivalining to'liq mundarijasi, asosiy yo'nalishlari va ko'rgazma dasturlari
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programItems.map(({ num, key }) => {
          const title = t(`content.program.${key}.title`, `Bo'lim ${num}`);
          const desc = t(`content.program.${key}.shortDesc`, '');
          return (
            <div
              key={num}
              className="card p-6 border border-border hover:border-primary/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">
                    0{num}
                  </span>
                  <h3 className="text-lg font-bold text-content">{title}</h3>
                </div>
                {desc && <p className="text-sm text-muted leading-relaxed">{desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
