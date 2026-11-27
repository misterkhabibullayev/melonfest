import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Compass, 
  Ticket, 
  User, 
  LogIn, 
  LogOut,
  Sun, 
  Moon, 
  ExternalLink 
} from 'lucide-react';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, grayscale, toggleGrayscale, textSize, changeTextSize } = useAccessibility();
  const { user, logoutUser } = useAuth();

  if (!isOpen) return null;

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
  };

  return (
    <div className="fixed inset-0 z-[1000] xl:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div 
        className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-card border-r border-border p-5 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil navigatsiya menyusi"
      >
        <div className="space-y-6">
          
          {/* Header & Logo */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <Link to="/" onClick={onClose} className="flex items-center gap-3 focus-ring rounded-lg p-1">
              <img
                src="/media/logo.png"
                alt="Qovun sayli logotipi"
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/media/logo.png';
                }}
              />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-black tracking-wide text-content">
                  Qovun Sayli
                </span>
                <span className="text-[11px] text-primary font-medium">
                  festivali
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-body border border-border text-muted hover:text-content cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring"
              title={t('ui.close_menu', 'Menyuni yopish')}
              aria-label={t('ui.close_menu', 'Menyuni yopish')}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* User Profile / Login quick box */}
          <div className="p-3.5 rounded-xl bg-body border border-border">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs" aria-hidden="true">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-content">{user.first_name} {user.last_name}</div>
                    <div className="text-[10px] text-muted">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logoutUser();
                    onClose();
                  }}
                  className="p-2 rounded-lg text-urgent hover:bg-urgent/10 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring"
                  title={t('ui.logout', 'Chiqish')}
                  aria-label={t('ui.logout', 'Chiqish')}
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg button-primary text-xs font-bold cursor-pointer focus-ring"
              >
                <LogIn className="w-4 h-4" aria-hidden="true" />
                <span>{t('ui.login', 'Hisobga kirish')}</span>
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Mobil navigatsiya havolalari">
            {siteConfig.navLinks.map((item) => {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer focus-ring ${
                      isActive
                        ? 'bg-primary/15 text-primary font-bold'
                        : 'text-muted hover:bg-body hover:text-content'
                    }`
                  }
                >
                  <span>{t(item.titleKey)}</span>
                  <span className="text-xs text-muted" aria-hidden="true">→</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Accessibility Settings on Mobile */}
          <div className="p-3.5 rounded-xl bg-body border border-border space-y-3">
            <div className="text-[11px] font-bold text-muted uppercase tracking-wider">
              {t('ui.accessibility', 'Maxsus imkoniyatlar')}
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-content">{t('ui.font_size', 'Yozuv o\'lchami')}:</span>
              <div className="flex gap-1">
                {[
                  { key: 'small', label: 'A-', title: t('ui.font_size_small', "Kichik yozuv o'lchami") },
                  { key: 'normal', label: 'A', title: t('ui.font_size_normal', "O'rta yozuv o'lchami") },
                  { key: 'large', label: 'A+', title: t('ui.font_size_large', "Katta yozuv o'lchami") },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => changeTextSize(item.key)}
                    className={`px-2.5 py-1.5 rounded text-xs font-bold cursor-pointer focus-ring ${
                      textSize === item.key ? 'bg-primary text-primary-foreground' : 'bg-card text-muted'
                    }`}
                    title={item.title}
                    aria-label={item.title}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-content">{t('ui.grayscale', 'Oq-qora rejim')}:</span>
              <button
                onClick={() => toggleGrayscale()}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus-ring ${
                  grayscale ? 'bg-primary' : 'bg-border'
                }`}
                aria-pressed={grayscale}
                title={t('ui.grayscale', 'Oq-qora rejim')}
                aria-label={t('ui.grayscale', 'Oq-qora rejim')}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${
                    grayscale ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-content">{t('ui.theme_select', 'Mavzu')}:</span>
              <button
                onClick={() => toggleTheme()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold cursor-pointer focus-ring"
                title={t('ui.toggle_theme', 'Mavzuni almashtirish')}
                aria-label={t('ui.toggle_theme', 'Mavzuni almashtirish')}
              >
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> : <Sun className="w-3.5 h-3.5 text-accent" aria-hidden="true" />}
                <span>{theme === 'dark' ? t('ui.theme_dark', 'Tungi') : t('ui.theme_light', 'Kunduzgi')}</span>
              </button>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
              {t('ui.change_language', 'Tilni tanlang')}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {siteConfig.languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    changeLang(l.code);
                    onClose();
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer focus-ring min-h-[44px] ${
                    (i18n.language || 'uz').slice(0, 2) === l.code
                      ? 'border-primary bg-primary/15 text-primary font-bold'
                      : 'border-border bg-body text-muted hover:bg-card'
                  }`}
                  title={l.label}
                  aria-label={l.label}
                >
                  <img src={l.flag} alt="" aria-hidden="true" className="w-4 h-3 rounded-sm object-cover" />
                  <span>{l.short}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Contacts & Socials */}
        <div className="pt-6 border-t border-border space-y-3 mt-6">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
            <a
              href={`tel:${siteConfig.phone[0]}`}
              className="hover:text-primary transition-colors"
              title={t('header.call_phone', "Telefon orqali bog'lanish")}
            >
              {siteConfig.phone[0]}
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <MapPin className="w-4 h-4 text-secondary" aria-hidden="true" />
            <span>{siteConfig.map_title}</span>
          </div>
          <a
            href={siteConfig.khiva_360}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-primary font-semibold hover:underline"
            title={t('header.khiva_360_title', 'Xiva shahriga 360° virtual sayohat')}
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Khiva 360° Virtual Tur</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
