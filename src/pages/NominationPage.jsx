import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Star } from 'lucide-react';

export const NominationPage = () => {
  const { t } = useTranslation();

  const nominations = [
    {
      title: "Eng shirin Xorazm qovuni",
      desc: "Laboratoriya tahlili va hakamlar hay'ati xulosasiga ko'ra eng yuqori shakar miqdoriga ega qovun navi yetishtiruvchisi.",
      prize: "Chevrolet Tracker avtomobili"
    },
    {
      title: "Eng katta va og'ir vaznli qovun",
      desc: "Festival tarozisida rasman qayd etilgan eng og'ir vaznli qovun yetishtirgan tajribali polizkor.",
      prize: "Maxsus diplom va qimmatbaho esdalik sovg'alari"
    },
    {
      title: "Eng yaxshi qovun kompozitsiyasi",
      desc: "Xorazm milliy arxitekturasi va Ichan Qal'a obidalari aks ettirilgan ijodiy qovun instalyatsiyasi.",
      prize: "Pul mukofoti va sertifikat"
    },
    {
      title: "Eng faol hudud / Tuman ekspozitsiyasi",
      desc: "Festivalda o'z tumanining eng nodir va xilma-xil qovun navlarini taqdim etgan tuman jamoasi.",
      prize: "Festival kubogi"
    }
  ];

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-content">{t('navlinks.nomination')}</h1>
        <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto">
          Qovun Sayli xalqaro festivali doirasida o'tkaziladigan nufuzli tanlovlar, nominatsiyalar va qimmatbaho mukofotlar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nominations.map((nom, i) => (
          <div key={i} className="card p-6 border border-border hover:border-primary/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <Trophy className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-content">{nom.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{nom.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-primary">
              <Star className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
              <span>Sovrin: {nom.prize}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
