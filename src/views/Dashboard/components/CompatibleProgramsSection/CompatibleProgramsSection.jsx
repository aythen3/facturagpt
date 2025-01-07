import React from "react";
import ProgramSlider from "../ProgramSlider/ProgramSlider";
import styles from "./CompatibleProgramsSection.module.css";
import stripe from "../../assets/stripeprogram.svg";
import a3 from "../../assets/a3.svg";
import whatsapp from "../../assets/whatsapp.svg";
import odoo from "../../assets/odoo.svg";
import holded from "../../assets/holded.png";
import { useTranslation } from "react-i18next";
const CompatibleProgramsSection = () => {
  const { t } = useTranslation("compatibleProgramsSection");
  // Datos de ejemplo para los sliders
  const slidersData = [
    [
      {
        logo: stripe,
        name: "Stripe",
        description: [
          t("stripeDescription1"),
          t("stripeDescription2"),
          t("stripeDescription3"),
        ],
      },
      {
        logo: a3,
        name: "Wolters Kluwer A3 Software",
        description: [t("woltersDescription1"), t("woltersDescription2")],
      },
      {
        logo: whatsapp,
        name: "WhatsApp",
        description: [
          t("whatsAppDesciption1"),
          t("whatsAppDesciption2"),
          t("whatsAppDesciption3"),
        ],
      },

      {
        logo: odoo,
        name: "Odoo",
        description: [t("odooDescription1"), t("odooDescription2")],
      },
      {
        logo: holded,
        name: "Holded",
        description: [
          "Sincronización bidireccional",
          "Gestión de proyectos y facturación",
        ],
      },
    ],
    // Añade más sliders aquí
  ];

  return (
    <section className={styles.container}>
      {slidersData.map((slider, index) => (
        <ProgramSlider key={index} programs={slider} />
      ))}
    </section>
  );
};

export default CompatibleProgramsSection;
