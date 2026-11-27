import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../config/siteConfig';
import { ChevronDown } from 'lucide-react';

export const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize current language code (e.g., 'uz-UZ' -> 'uz')
  const currentLangCode = (i18n.language || 'uz').slice(0, 2);
  const currentLang = siteConfig.languages.find((l) => l.code === currentLangCode) || siteConfig.languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLang = (targetLang) => {
    i18n.changeLanguage(targetLang.code);
    localStorage.setItem('i18nextLng', targetLang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors text-[11px] font-medium cursor-pointer focus-ring ${
          isOpen
            ? 'text-primary bg-primary/10'
            : 'text-muted hover:text-primary hover:bg-primary/10'
        }`}
        title={t('ui.change_language', 'Tilni tanlash')}
        aria-label={t('ui.change_language', 'Tilni tanlash')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <img
          src={currentLang.flag}
          alt={currentLang.code}
          className="w-4 h-2.5 object-cover rounded-xs shadow-xs ring-1 ring-border shrink-0"
        />
        <span className="font-bold tracking-wide text-content">{currentLang.label}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : 'text-muted'
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-44 max-w-[calc(100vw-2rem)] p-1.5 z-[200] rounded-2xl bg-card border border-border shadow-2xl shadow-black/10 dark:shadow-black/60 animate-in fade-in zoom-in-95 duration-150"
          role="listbox"
          aria-label={t('ui.change_language', 'Mavjud tillar')}
        >
          <div className="space-y-1">
            {siteConfig.languages.map((item) => {
              const isSelected = currentLang.code === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => handleSelectLang(item)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer focus-ring ${
                    isSelected
                      ? 'bg-primary/15 text-primary font-bold border border-primary/30'
                      : 'text-content hover:bg-body border border-transparent'
                  }`}
                  role="option"
                  title={item.label}
                  aria-label={item.label}
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.flag}
                      alt={item.code}
                      className="w-5 h-3.5 object-cover rounded-sm shadow-sm ring-1 ring-border"
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
