import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { Phone, Mail, MapPin, Compass, ArrowUp } from 'lucide-react';
import { GirihPattern } from './DecorativePattern';

const footerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const footerCol = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-card text-content border-t border-border mt-auto overflow-hidden">
      <GirihPattern
        id="footer-girih"
        className="absolute -bottom-24 -right-20 w-[320px] h-[320px] opacity-[0.12] dark:opacity-[0.35]"
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10"
          variants={footerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          
          {/* Brand & Slogan */}
          <motion.div variants={footerCol} className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/media/logo.png"
                alt="Qovun sayli logotipi"
                className="h-12 w-auto object-contain cursor-pointer"
                onClick={scrollToTop}
              />
              <div>
                <h3 className="font-extrabold text-base uppercase tracking-wider">{siteConfig.title}</h3>
                <span className="text-xs text-primary font-semibold">{t('main.festival', 'Festivali')}</span>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {t('main.description')}
            </p>
          </motion.div>

          {/* Quick Links 1 */}
          <motion.div variants={footerCol} className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Sahifalar</h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/" className="hover:text-primary transition-colors cursor-pointer">{t('navlinks.home')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors cursor-pointer">{t('navlinks.about')}</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary transition-colors cursor-pointer">{t('navlinks.gallery')}</Link>
              </li>
              <li>
                <Link to="/contents" className="hover:text-primary transition-colors cursor-pointer">{t('navlinks.content')}</Link>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links 2 */}
          <motion.div variants={footerCol} className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Festival</h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/tickets" className="hover:text-primary transition-colors cursor-pointer">{t('ui.tickets', 'Chiptalar')}</Link>
              </li>
              <li>
                <Link to="/nomination" className="hover:text-primary transition-colors cursor-pointer">{t('navlinks.nomination')}</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-primary transition-colors cursor-pointer">{t('navlinks.news')}</Link>
              </li>
              <li>
                <a
                  href={siteConfig.khiva_360}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  title={t('header.khiva_360_title', 'Xiva shahriga 360° virtual sayohat')}
                >
                  <span>Khiva 360°</span>
                  <Compass className="w-3 h-3" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={footerCol} className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">{t('contact.title', 'Aloqa')}</h4>
            <div className="space-y-2 text-xs text-muted">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.phone[0]}`}
                  className="hover:text-primary transition-colors"
                  title={t('header.call_phone', "Telefon orqali bog'lanish")}
                >
                  {siteConfig.phone[0]}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-primary transition-colors"
                  title={t('header.send_email', 'Elektron pochta')}
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={siteConfig.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  title={t('header.open_map', 'Google Maps xaritasida ochish')}
                >
                  {siteConfig.map_title}
                </a>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            © {currentYear} {siteConfig.title}. {t('footer.all_rights_reserved', 'Barcha huquqlar himoyalangan')}.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer focus-ring rounded px-2 py-1"
            title={t('footer.scroll_to_top', 'Sahifa tepasiga qaytish')}
            aria-label={t('footer.scroll_to_top', 'Sahifa tepasiga qaytish')}
          >
            <span>{t('footer.back_to_top', 'Tepaga qaytish')}</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
