import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Users, Sprout, Eye, ShoppingCart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { GirihPattern, TitleOrnament } from './DecorativePattern';

const statIcons = {
  1: Users,
  2: Sprout,
  3: Eye,
  4: ShoppingCart,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const AboutSection = () => {
  const { t } = useTranslation();
  const info2Text = t(
    'about.info2',
    "Festival yildan yilga kengayib, nafaqat O‘zbekistonning turli hududlaridan, balki chet ellardan ham minglab mehmonlarni birlashtirmoqda. Bu yerda eng mazali qovunlarning nodir navlari taqdim etilib, har bir mehmon ularning betakror ta’mini tatib ko‘rish imkoniyatiga ega bo‘ladi."
  );
  const info2Short = `${info2Text.split('. ').slice(0, 2).join('. ').replace(/\.$/, '')}.`;

  return (
    <section id="about" className="relative py-16 sm:py-24 bg-surface/40 text-content overflow-hidden">
      {/* Tasteful corner Khiva historical ornament accents */}
      <GirihPattern
        id="about-girih-tr"
        className="absolute -top-20 -right-20 w-[380px] h-[380px] opacity-[0.14] dark:opacity-[0.38]"
      />
      <GirihPattern
        id="about-girih-bl"
        className="absolute -bottom-24 -left-24 w-[360px] h-[360px] opacity-[0.14] dark:opacity-[0.38]"
      />

      {/* Subtle decorative background glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header: Title & Subtitle */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-flex items-center justify-center gap-3 sm:gap-5">
            <TitleOrnament
              side="left"
              className="w-12 sm:w-24 lg:w-28 h-6 sm:h-7 text-primary/75 dark:text-accent/80"
            />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-content leading-tight">
              {t('navlinks.about', 'Biz haqimizda')}
            </h2>
            <TitleOrnament
              side="right"
              className="w-12 sm:w-24 lg:w-28 h-6 sm:h-7 text-primary/75 dark:text-accent/80"
            />
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-muted leading-relaxed font-normal max-w-2xl mx-auto">
            {t(
              'about.subtitle',
              "Qadimiy Xiva zaminida asrlar davomida sayqal topgan polizchilik san'ati, milliy madaniyat va samimiy mehmondo'stlik bayrami."
            )}
          </p>
        </motion.div>

        {/* Left: 3 Photos Collage | Right: Concise Text + 2x2 Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 3 Photos */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Photo 1 (Main wide photo) */}
            <motion.div
              variants={fadeUp}
              custom={0.05}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative h-52 sm:h-60 lg:h-auto lg:flex-[1.35] rounded-2xl overflow-hidden border border-border shadow-md bg-card"
            >
              <img
                src="/media/about1.jpg"
                alt="Qovun sayli festivali manzarasi"
                className="lg:absolute lg:inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Photos 2 & 3 (Two balanced photos below) */}
            <div className="grid grid-cols-2 gap-4 h-40 sm:h-44 lg:h-auto lg:flex-1">
              <motion.div
                variants={fadeUp}
                custom={0.14}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative h-full rounded-2xl overflow-hidden border border-border shadow-md bg-card"
              >
                <img
                  src="/media/about2.jpg"
                  alt="Qovun sayli ko'rgazmasi"
                  className="lg:absolute lg:inset-0 w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={0.22}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative h-full rounded-2xl overflow-hidden border border-border shadow-md bg-card"
              >
                <img
                  src="/media/about3.jpg"
                  alt="Qovun sayli an'analari"
                  className="lg:absolute lg:inset-0 w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: About Text + Statistics Grid + CTA */}
          <div className="lg:col-span-6 lg:pt-1 space-y-4">
            {/* Unified single paragraph answering "Biz haqimizda" */}
            <motion.p
              variants={fadeUp}
              custom={0.08}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-sm sm:text-base leading-relaxed text-content"
            >
              {t(
                'about.info1',
                "Har yili qadimiy Xiva shahrining Ichan qal’asi bag‘rida o‘tkaziladigan Qovun Sayli – bu nafaqat shirin qovunlarning ko‘rgazmasi, balki asrlar davomida sayqal topgan milliy an’analar, mehmondo‘stlik va dehqonchilik madaniyatining yorqin ifodasidir."
              )}{' '}
              {info2Short}
            </motion.p>

            {/* Compact 2x2 Statistics Grid with Icons */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              variants={fadeUp}
              custom={0.14}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {siteConfig.stats.map((stat) => {
                const Icon = statIcons[stat.id] || Users;
                return (
                  <div
                    key={stat.id}
                    className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <div className="inline-flex items-start font-extrabold tracking-tight leading-none">
                        <span className="text-xl sm:text-2xl text-primary">
                          {stat.value}
                        </span>
                        <span className="text-xs font-bold text-accent ml-0.5 -mt-0.5">
                          +
                        </span>
                      </div>
                      <div className="text-xs font-medium text-muted mt-1 truncate">
                        {t(stat.titleKey)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Action CTA Link */}
            <motion.div
              variants={fadeUp}
              custom={0.22}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                to="/about"
                className="button-primary gap-2 px-6 py-2.5 rounded-xl text-sm sm:text-base focus-ring"
                title={t('about.read_more_title', "Festival haqida to'liq ma'lumot olish")}
              >
                <span>{t('about.read_more', 'Batafsil tanishish')}</span>
                <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
