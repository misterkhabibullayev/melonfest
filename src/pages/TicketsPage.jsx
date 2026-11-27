import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Ticket, CheckCircle2, CreditCard } from 'lucide-react';

export const TicketsPage = () => {
  const { t } = useTranslation();
  const [selectedTier, setSelectedTier] = useState(siteConfig.ticketTiers[0].id);

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-content">{t('ui.tickets', 'Chiptalar xaridi')}</h1>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          Qovun Sayli festivaliga tashrif buyurish uchun chipta toifasini tanlang va onlayn xarid qiling
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.ticketTiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`card p-6 cursor-pointer transition-all border relative flex flex-col justify-between ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/40 shadow-glow-primary'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              <div className="space-y-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${tier.badgeClass}`}
                >
                  <Ticket className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-content">{tier.title}</h3>
                  <div className="text-2xl font-extrabold text-primary mt-1">
                    {tier.price.toLocaleString()} <span className="text-xs font-normal text-muted">UZS</span>
                  </div>
                </div>

                <ul className="text-xs text-muted space-y-2 pt-2 border-t border-border">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                    <span>Festival hududiga kirish</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                    <span>Qovunlar degustatsiyasi</span>
                  </li>
                  {tier.id >= 2 && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                      <span>Maxsus sektor o'rindig'i</span>
                    </li>
                  )}
                  {tier.id >= 3 && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                      <span>VIP xizmat va sovg'alar</span>
                    </li>
                  )}
                </ul>
              </div>

              <button
                className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer focus-ring ${
                  isSelected
                    ? 'button-secondary'
                    : 'bg-card border border-border hover:bg-primary/10 text-content'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected ? 'Tanlandi' : 'Tanlash'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment methods support banner */}
      <div className="card p-6 border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
          <span className="text-sm font-semibold text-content">Qulay to'lov tizimlari orqali xarid qiling:</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-content/80">
          <span className="px-3 py-1.5 rounded-lg bg-body border border-border">Click</span>
          <span className="px-3 py-1.5 rounded-lg bg-body border border-border">Payme</span>
          <span className="px-3 py-1.5 rounded-lg bg-body border border-border">Uzcard</span>
          <span className="px-3 py-1.5 rounded-lg bg-body border border-border">Humo</span>
        </div>
      </div>
    </div>
  );
};

export const MyTicketsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-extrabold text-content">{t('ui.my_tickets', 'Chiptalarim')}</h1>

      <div className="card p-10 text-center border border-border space-y-4">
        <Ticket className="w-12 h-12 text-muted mx-auto" aria-hidden="true" />
        <p className="text-muted text-sm">Sizda hozircha xarid qilingan chiptalar mavjud emas.</p>
        <Link
          to="/tickets"
          className="button-primary inline-flex items-center justify-center text-xs font-bold cursor-pointer focus-ring"
        >
          Chipta sotib olish
        </Link>
      </div>
    </div>
  );
};
