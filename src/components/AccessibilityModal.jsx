import { Eye, Moon, Sun, Type } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "../context/AccessibilityContext";

export const AccessibilityModal = () => {
  const { t } = useTranslation();
  const {
    theme,
    toggleTheme,
    grayscale,
    toggleGrayscale,
    textSize,
    changeTextSize,
  } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={t("ui.accessibility", "Maxsus imkoniyatlar")}
        className={`py-1 px-1.5 rounded-lg transition-colors flex items-center justify-center cursor-pointer focus-ring ${
          isOpen || grayscale
            ? "text-primary bg-primary/10"
            : "text-muted hover:text-primary hover:bg-primary/10"
        }`}
        aria-label={t("ui.accessibility", "Maxsus imkoniyatlar")}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Eye className="w-4 h-4 stroke-[2]" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] p-5 z-[200] rounded-2xl bg-card border border-border shadow-2xl shadow-black/10 dark:shadow-black/60 animate-in fade-in zoom-in-95 duration-150"
          role="dialog"
          aria-label={t("ui.accessibility", "Maxsus imkoniyatlar")}
        >
          <div className="space-y-5">
            {/* Header */}
            <div className="pb-2 border-b border-border">
              <h4 className="font-bold text-sm text-content">
                {t("ui.accessibility", "Maxsus imkoniyatlar")}
              </h4>
              <p className="text-[11px] text-muted">
                Sayt ko'rinishini o'zingizga moslang
              </p>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-xs font-semibold flex items-center gap-1.5 text-content">
                <Type className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>{t("ui.font_size", "Yozuv o'lchami")}</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-body border border-border">
                {[
                  {
                    key: "small",
                    label: "A-",
                    title: t("ui.font_size_small", "Kichik yozuv o'lchami"),
                  },
                  {
                    key: "normal",
                    label: "A",
                    title: t("ui.font_size_normal", "O'rta yozuv o'lchami"),
                  },
                  {
                    key: "large",
                    label: "A+",
                    title: t("ui.font_size_large", "Katta yozuv o'lchami"),
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => changeTextSize(item.key)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer focus-ring ${
                      textSize === item.key
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted hover:text-content hover:bg-card"
                    }`}
                    title={item.title}
                    aria-label={item.title}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Select */}
            <div className="space-y-2">
              <label className="text-xs font-semibold flex items-center gap-1.5 text-content">
                {theme === "dark" ? (
                  <Moon
                    className="w-3.5 h-3.5 text-primary"
                    aria-hidden="true"
                  />
                ) : (
                  <Sun
                    className="w-3.5 h-3.5 text-accent"
                    aria-hidden="true"
                  />
                )}
                <span>{t("ui.theme_select", "Mavzuni tanlang")}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleTheme("light")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer focus-ring ${
                    theme === "light"
                      ? "border-primary bg-primary/15 text-primary font-bold"
                      : "border-border bg-body text-muted hover:bg-primary/10 hover:text-content"
                  }`}
                  aria-pressed={theme === "light"}
                  title={t("ui.theme_light", "Kunduzgi")}
                  aria-label={t("ui.theme_light", "Kunduzgi")}
                >
                  <Sun className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>{t("ui.theme_light", "Kunduzgi")}</span>
                </button>
                <button
                  onClick={() => toggleTheme("dark")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer focus-ring ${
                    theme === "dark"
                      ? "border-primary bg-primary/15 text-primary font-bold"
                      : "border-border bg-body text-muted hover:bg-primary/10 hover:text-content"
                  }`}
                  aria-pressed={theme === "dark"}
                  title={t("ui.theme_dark", "Tungi")}
                  aria-label={t("ui.theme_dark", "Tungi")}
                >
                  <Moon className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{t("ui.theme_dark", "Tungi")}</span>
                </button>
              </div>
            </div>

            {/* Grayscale Mode */}
            <div
              onClick={() => toggleGrayscale()}
              className="pt-2 border-t border-border flex items-center justify-between select-none cursor-pointer"
            >
              <div>
                <span className="text-xs font-semibold block text-content">
                  {t("ui.grayscale", "Oq-qora rejim")}
                </span>
                <span className="text-[10px] text-muted">
                  Ko'rishni yengillashtirish
                </span>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus-ring ${
                  grayscale ? "bg-primary" : "bg-border"
                }`}
                aria-pressed={grayscale}
                title={t("ui.grayscale", "Oq-qora rejim")}
                aria-label={t("ui.grayscale", "Oq-qora rejim")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${
                    grayscale ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
