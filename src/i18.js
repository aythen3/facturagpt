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
import reviews_es from "./translation/reviews/es/reviews.json";
import reviews_en from "./translation/reviews/en/reviews.json";
import faq_es from "./translation/faq/es/faq.json";
import faq_en from "./translation/faq/en/faq.json";
import contactForm_es from "./translation/contactForm/es/contactForm.json";
import contactForm_en from "./translation/contactForm/en/contactForm.json";

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
      reviews: reviews_es,
      faq: faq_es,
      contactForm: contactForm_es,
    },
    en: {
      navBar: navbar_en,
      navBarHeader: navbarHeader_en,
      packs: packs_en,
      billingSlides: billingSlider_en,
      pricingCard: pricingCard_en,
      compatibleProgramsSection: compatibleProgramsSection_en,
      reviews: reviews_en,
      faq: faq_en,
      contactForm: contactForm_en,
    },
  },
});

export default i18n;
