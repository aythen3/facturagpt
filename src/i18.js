// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import enTranslation from "./locales/en/translation.json";
// import esTranslation from "./locales/es/translation.json";

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: enTranslation,
//       },
//       es: {
//         translation: esTranslation,
//       },
//     },
//     lng: "es",
//     fallbackLng: "es",
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;
import i18n from "i18next";
import navbar_es from "./translation/navbar/es/navbar.json";
import navbar_en from "./translation/navbar/en/navbar.json";

i18n.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      navBar: navbar_es,
    },
    en: {
      navBar: navbar_en,
    },
  },
});

export default i18n;
