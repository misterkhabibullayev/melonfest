import { Calendar, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CountdownTimer } from "./CountdownTimer";

export const HeroSection = () => {
  const { t } = useTranslation();

  const now = new Date();
  const currentYear = now.getFullYear();
  const targetYear =
    now.getMonth() > 7 || (now.getMonth() === 7 && now.getDate() > 9)
      ? currentYear + 1
      : currentYear;

  const handleScrollToFestival = (e) => {
    e.preventDefault();
    const elem = document.getElementById("festival");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "festival";
    }
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20 min-h-[540px] lg:min-h-[600px] flex items-center">
      {/* Full Section Background Image with Left-to-Right Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/media/qovunsaylihero.jpeg" type="image/webp" />
          <img
            src="/media/qovunsaylihero.jpeg"
            alt={t(
              "hero.bg_alt",
              "Qovun sayli festivali va Xiva Ichan Qal'a manzarasi",
            )}
            className="w-full h-full object-cover object-right lg:object-center"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        {/* Left-to-right gradient: dark on the left for maximum readability, fading to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#14180F] to-[#14180F]/35 sm:via-[#14180F]/55 sm:to-transparent" />
        {/* Bottom transition gradient to smoothly connect with next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14180F] via-transparent to-[#14180F]/25" />

        {/* Warm decorative brand glow */}
        <div
          className="absolute top-1/3 left-10 w-[500px] h-[350px] bg-accent/15 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-left max-w-3xl space-y-5">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-snug sm:leading-tight text-white drop-shadow-md">
            {t("main.title")}
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
            {t("main.description")}
          </p>

          {/* Action Buttons: Festival haqida (Primary CTA with icon) & Biz haqimizda (Secondary CTA without icons) */}
          <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 pt-2">
            {/* Primary Button: Festival haqida */}
            <Link
              to="/contents"
              onClick={handleScrollToFestival}
              className="button-primary relative gap-2 px-6 py-2.5 text-sm sm:text-base rounded-xl hover:shadow-xl focus-ring"
              title={t(
                "hero.about_festival_title",
                "Festival dasturi va ma'lumotlari bilan tanishish",
              )}
              aria-label={t(
                "hero.about_festival_title",
                "Festival dasturi va ma'lumotlari bilan tanishish",
              )}
            >
              <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t("hero.about_festival", "Festival haqida")}</span>
            </Link>

            {/* Secondary Button: Biz haqimizda (No icons as requested) */}
            <Link
              to="/about"
              className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm sm:text-base font-semibold text-white hover:text-[#14180F] bg-white/10 hover:bg-accent border border-white/25 hover:border-accent backdrop-blur-md rounded-xl cursor-pointer focus-ring transition-colors duration-300"
              title={t(
                "hero.about_us_title",
                "Festival haqida batafsil ma'lumot olish",
              )}
              aria-label={t(
                "hero.about_us_title",
                "Festival haqida batafsil ma'lumot olish",
              )}
            >
              <span>{t("hero.about_us", t("navlinks.about", "Biz haqimizda"))}</span>
              <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>

          {/* Countdown to August 7 Timer (Left Side) */}
          <div className="pt-4 max-w-lg sm:max-w-xl">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  );
};
