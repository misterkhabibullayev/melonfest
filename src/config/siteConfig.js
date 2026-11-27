export const siteConfig = {
  title: "Qovun sayli",
  web_title: "qovunsayli.uz",
  map_title: "Xorazm, Xiva shahri",
  map_url: "https://maps.app.goo.gl/eLhSqxC66cmZpBij8",
  map_view: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1863.2674000754719!2d60.37974963965113!3d41.40412425805915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1suz!2s!4v1753272197812!5m2!1suz!2s",
  arda_khiva_map_url: "https://maps.app.goo.gl/dqjbyjXDByp9K7G17",
  khiva_360: "https://khiva360.nazzar.uz",
  phone: ["+998622246736", "+998934661001", "+998985775711"],
  email: "info@qovunsayli.uz",
  work_hours: {
    start: "09:00",
    end: "18:00"
  },
  work_week: {
    start: "Dushanba",
    end: "Juma"
  },
  socials: {
    telegram: "https://t.me/qovunsayli",
    instagram: "https://instagram.com/qovunsayli",
    youtube: "https://instagram.com/qovunsayli",
    facebook: "https://instagram.com/qovunsayli"
  },
  stats: [
    { id: 1, value: "120", titleKey: "stat.participants" },
    { id: 2, value: "24", titleKey: "stat.melon_varieties" },
    { id: 3, value: "1600", titleKey: "stat.visitors" },
    { id: 4, value: "300", titleKey: "stat.sold_products" }
  ],
  navLinks: [
    { path: "/", titleKey: "navlinks.home" },
    { path: "/about", titleKey: "navlinks.about" },
    { path: "/gallery", titleKey: "navlinks.gallery" },
    { path: "/news", titleKey: "navlinks.news" },
    { path: "/contents", titleKey: "navlinks.content" },
    { path: "/nomination", titleKey: "navlinks.nomination" },
    { path: "/contact", titleKey: "navlinks.contact" }
  ],
  ticketTiers: [
    { id: 1, title: "Standard", badgeClass: "bg-body border border-border text-muted", price: 50000 },
    { id: 2, title: "Premium", badgeClass: "bg-primary/15 text-primary", price: 100000 },
    { id: 3, title: "VIP", badgeClass: "bg-accent text-accent-foreground", price: 150000 },
    { id: 4, title: "VVIP", badgeClass: "bg-urgent text-urgent-foreground", price: 200000 }
  ],
  languages: [
    { code: "uz", short: "UZ", label: "O'zbekcha", flag: "/media/flags/uz.svg" },
    { code: "ru", short: "RU", label: "Русский", flag: "/media/flags/ru.svg" },
    { code: "en", short: "EN", label: "English", flag: "/media/flags/en.svg" }
  ]
};
