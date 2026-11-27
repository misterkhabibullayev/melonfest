import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { useAuth } from '../context/AuthContext';
import { AccessibilityModal } from './AccessibilityModal';
import { LanguageDropdown } from './LanguageDropdown';
import { MobileDrawer } from './MobileDrawer';
import { 
  Menu, 
  Phone, 
  Mail, 
  MapPin, 
  Compass, 
  Ticket, 
  User, 
  CircleUser, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';

export const Header = () => {
  const { t } = useTranslation();
  const { user, logoutUser } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* ================= TOP UTILITY & CONTACT BAR ================= */}
      <div className="w-full bg-card surface-panel border-b border-border transition-colors duration-300 relative z-[60]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-1 text-[11px]">
            
            {/* Left Contact Links (Subtle & Compact) */}
            <div className="flex items-center gap-3.5 sm:gap-5">
              {/* Phone */}
              <a
                href={`tel:${siteConfig.phone[0]}`}
                className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors focus-ring rounded-md py-0.5"
                title={t('header.call_phone', "Telefon orqali bog'lanish")}
              >
                <Phone className="w-3 h-3 text-muted shrink-0" aria-hidden="true" />
                <span className="hidden md:inline font-normal">{siteConfig.phone[0]}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="hidden sm:flex items-center gap-1.5 text-muted hover:text-primary transition-colors focus-ring rounded-md py-0.5"
                title={t('header.send_email', 'Elektron pochta')}
              >
                <Mail className="w-3 h-3 text-muted shrink-0" aria-hidden="true" />
                <span className="hidden lg:inline font-normal">{siteConfig.email}</span>
              </a>

              {/* Map Location */}
              <a
                href={siteConfig.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors focus-ring rounded-md py-0.5"
                title={t('header.open_map', 'Google Maps xaritasida ochish')}
              >
                <MapPin className="w-3 h-3 text-muted shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline font-normal">{siteConfig.map_title}</span>
              </a>

              {/* Khiva 360 Virtual Tour */}
              <a
                href={siteConfig.khiva_360}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-primary hover:text-primary-hover font-medium transition-colors focus-ring rounded-md py-0.5"
                title={t('header.khiva_360_title', 'Xiva shahriga 360° virtual sayohat')}
              >
                <Compass className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span>Khiva 360°</span>
              </a>
            </div>

            {/* Right Utilities: Accessibility & Multi-language Switchers */}
            <div className="flex items-center gap-1.5">
              {/* Accessibility Settings Dropdown Modal */}
              <AccessibilityModal />

              <span className="w-[1px] h-3 bg-border shrink-0" aria-hidden="true" />

              {/* Multi-language Dropdown Switcher */}
              <LanguageDropdown />
            </div>

          </div>
        </div>
      </div>

      {/* ================= MAIN NAVIGATION ROW (STICKY) ================= */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-card surface-panel ${
          isScrolled
            ? 'shadow-md border-b border-border'
            : 'shadow-sm border-b border-border'
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 gap-4">
            
            {/* Logo and Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="xl:hidden p-2 rounded-xl bg-body hover:bg-primary/10 text-content transition-colors focus-ring cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-border"
                title={t('ui.open_menu', 'Mobil menyuni ochish')}
                aria-label={t('ui.open_menu', 'Mobil menyuni ochish')}
              >
                <Menu className="w-6 h-6 stroke-[2]" aria-hidden="true" />
              </button>

              {/* Authentic Logo */}
              <Link
                to="/"
                className="flex items-center gap-3 group focus-ring rounded-xl p-1"
                title={t('ui.home_link', 'Qovun sayli bosh sahifasi')}
                aria-label={t('ui.home_link', 'Qovun sayli bosh sahifasi')}
              >
                <img
                  src="/media/logo.png"
                  alt="Qovun sayli logotipi"
                  className="h-12 sm:h-14 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/media/logo.png';
                  }}
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-base sm:text-lg font-black tracking-wide text-content">
                    Qovun Sayli
                  </span>
                  <span className="text-[11px] sm:text-xs tracking-wider text-primary font-medium">
                    festivali
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2" aria-label="Asosiy menyu">
              {siteConfig.navLinks.map((item) => {
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-xl text-xs font-semibold transition-all relative group cursor-pointer focus-ring ${
                        isActive
                          ? 'text-primary'
                          : 'text-content hover:text-primary'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{t(item.titleKey)}</span>
                        {isActive && (
                          <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right User Auth Action (Prominent & Distinct Standalone CTA) */}
            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/30 hover:border-primary/50 text-content transition-all focus-ring cursor-pointer"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    title={t('ui.user_menu', 'Foydalanuvchi menyusi')}
                    aria-label={t('ui.user_menu', 'Foydalanuvchi menyusi')}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center text-[10px]" aria-hidden="true">
                      {user.first_name?.[0]}{user.last_name?.[0]}
                    </div>
                    <span className="hidden sm:inline text-xs font-bold">{user.first_name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="card absolute right-0 mt-2 w-56 p-2 z-[200] shadow-2xl border border-border backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                      <div className="p-2.5 border-b border-border">
                        <div className="font-bold text-xs text-content">{user.first_name} {user.last_name}</div>
                        <div className="text-[10px] text-muted truncate">{user.email}</div>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-muted hover:bg-body hover:text-content transition-colors cursor-pointer"
                        >
                          <User className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t('ui.profile', 'Profil')}</span>
                        </Link>
                        <Link
                          to="/tickets/me"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-muted hover:bg-body hover:text-content transition-colors cursor-pointer"
                        >
                          <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t('ui.my_tickets', 'Chiptalarim')}</span>
                        </Link>
                      </div>
                      <div className="pt-1 border-t border-border">
                        <button
                          onClick={() => {
                            logoutUser();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-urgent hover:bg-urgent/10 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t('ui.logout', 'Chiqish')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="button-primary group gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm focus-ring"
                  title={t('ui.login', 'Kirish')}
                >
                  <CircleUser className="w-4 h-4 shrink-0 stroke-[2.3]" aria-hidden="true" />
                  <span>{t('ui.login', 'Kirish')}</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
