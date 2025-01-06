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
import navbarHeader_es from "./translation/navBarHeader/es/navbarHeader.json";
import navbarHeader_en from "./translation/navBarHeader/en/navbarHeader.json";
import packs_es from "./translation/packs/es/packs.json";
import packs_en from "./translation/packs/en/packs.json";
import billingSlider_es from "./translation/billingSlider/es/billingSlider.json";
import billingSlider_en from "./translation/billingSlider/en/billingSlider.json";
import pricingCard_es from "./translation/pricingCard/es/pricingCard.json";
import pricingCard_en from "./translation/pricingCard/en/pricingCard.json";
import compatibleProgramsSection_es from "./translation/compatibleProgramsSection/es/compatibleProgramsSection.json";
import compatibleProgramsSection_en from "./translation/compatibleProgramsSection/en/compatibleProgramsSection.json";

i18n.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      navBar: navbar_es,
      navBarHeader: navbarHeader_es,
      packs: packs_es,
      billingSlides: billingSlider_es,
      pricingCard: pricingCard_es,
      compatibleProgramsSection: compatibleProgramsSection_es,
    },
    en: {
      navBar: navbar_en,
      navBarHeader: navbarHeader_en,
      packs: packs_en,
      billingSlides: billingSlider_en,
      pricingCard: pricingCard_en,
      compatibleProgramsSection: compatibleProgramsSection_en,
    },
  },
});

export default i18n;
