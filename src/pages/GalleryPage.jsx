import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const GalleryPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');

  const galleryItems = [
    { id: 1, type: 'photo', title: 'Qovunlar ko\'rgazmasi', tag: 'Ko\'rgazma', src: 'https://cdn.uza.uz/2023/05/18/09/24/LIDoXhEw1a29IFkfEKmyFWDWPtXWTZjM_front.jpg' },
    { id: 2, type: 'photo', title: 'Ichan Qal\'a mehmondo\'stligi', tag: 'Xiva', src: 'https://aniq.uz/photos/rasmlar/5bda959a3e506.jpg' },
    { id: 3, type: 'photo', title: 'Milliy folklor va an\'analar', tag: 'Madaniyat', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1EXONJrjDM_38emZRmLkQ49PenGIA9ZwnGD22xF2LaKHCXAU5VYpTpNc&s=10' },
    { id: 4, type: 'photo', title: 'G\'olib dehqonlar taqdirlanishi', tag: 'Sovrinlar', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8nV7U-PL5ISt3a5BSXS-6aXQ-8R3LbOJstl1QzWdrhwCkfywJ-SGGqxP&s=10' },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-content">{t('navlinks.gallery')}</h1>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          Qovun Sayli festivalining unutilmas lahzalari, fotosuratlar va video lavhalar to'plami
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {['all', 'photo', 'video'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer focus-ring ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted hover:text-content'
            }`}
            aria-pressed={activeTab === tab}
          >
            {tab === 'all' ? 'Barchasi' : tab === 'photo' ? 'Rasmlar' : 'Videolar'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div key={item.id} className="card overflow-hidden group border border-border">
            <div className="aspect-[4/3] bg-body dark:bg-card relative overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                {item.tag}
              </span>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-sm text-content">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
