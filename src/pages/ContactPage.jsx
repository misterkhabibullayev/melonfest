import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../config/siteConfig';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-content">{t('contact.title', 'Biz bilan bog\'lanish')}</h1>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          Qovun Sayli festivali bo'yicha savollar, hamkorlik takliflari yoki ishtirok uchun murojaat qiling
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="card p-6 border border-border space-y-5">
            <h3 className="text-xl font-bold text-content">Aloqa ma'lumotlari</h3>

            <div className="flex items-start gap-3 text-sm">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="font-semibold mb-1 text-content">Telefon raqamlar:</div>
                {siteConfig.phone.map((p, i) => (
                  <a
                    key={i}
                    href={`tel:${p}`}
                    className="block text-muted hover:text-primary transition-colors focus-ring rounded"
                    title={t('header.call_phone', "Telefon orqali bog'lanish")}
                  >
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="font-semibold mb-1 text-content">{t('ui.email', 'Elektron pochta')}:</div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted hover:text-primary transition-colors focus-ring rounded"
                  title={t('header.send_email', 'Elektron pochta')}
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="font-semibold mb-1 text-content">Manzil:</div>
                <span className="text-muted">{siteConfig.map_title}, Arda Xiva majmuasi</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="font-semibold mb-1 text-content">Ish vaqti:</div>
                <span className="text-muted">
                  {siteConfig.work_week.start} - {siteConfig.work_week.end}: {siteConfig.work_hours.start} - {siteConfig.work_hours.end}
                </span>
              </div>
            </div>
          </div>

          {/* Khiva 360 virtual tour button */}
          <a
            href={siteConfig.khiva_360}
            target="_blank"
            rel="noopener noreferrer"
            className="card p-5 bg-gradient-to-r from-primary/10 via-card to-card border border-primary/30 flex items-center justify-between cursor-pointer focus-ring"
            title={t('header.khiva_360_title', 'Xiva shahriga 360° virtual sayohat')}
          >
            <div>
              <span className="text-xs uppercase font-bold text-primary tracking-wider">Virtual sayohat</span>
              <h4 className="text-base font-bold text-content">Khiva 360° Virtual Tur</h4>
            </div>
            <span className="button-secondary text-xs">Ochish →</span>
          </a>
        </div>

        {/* Contact Form */}
        <div className="card p-6 sm:p-8 border border-border">
          <h3 className="text-xl font-bold mb-4 text-content">{t('ui.message', 'Xabar yuborish')}</h3>

          {submitted ? (
            <div className="p-6 rounded-xl bg-secondary/15 border border-secondary/30 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-secondary mx-auto" aria-hidden="true" />
              <h4 className="font-bold text-secondary">Xabaringiz muvaffaqiyatli yuborildi!</h4>
              <p className="text-xs text-muted">Tez orada mas'ul xodimlarimiz siz bilan bog'lanishadi.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.full_name', 'F.I.Sh.')}</label>
                <input
                  type="text"
                  required
                  placeholder="Ismingizni kiriting"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.phone_number', 'Telefon raqami')}</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.email', 'Elektron pochta')}</label>
                <input
                  type="email"
                  placeholder="example@mail.uz"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.message', 'Xabar matni')}</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Xabaringizni yozing..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring resize-none"
                />
              </div>

              <button
                type="submit"
                className="button-primary w-full py-3 flex items-center justify-center gap-2 text-sm focus-ring"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>{t('ui.send', 'Yuborish')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
