import React from "react";
import ProgramSlider from "../ProgramSlider/ProgramSlider";
import styles from "./CompatibleProgramsSection.module.css";
import stripe from "../../assets/stripeprogram.svg";
import a3 from "../../assets/a3.svg";
import whatsapp from "../../assets/whatsapp.svg";
import odoo from "../../assets/odoo.svg";
import holded from "../../assets/holded.png";
import espublicogestionaLogo from "../../assets/espublico-icon.svg";
import agenciatributariaLogo from "../../assets/agenciatributariaLogo.svg";
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
        description: [
          t("woltersDescription1"),
          t("woltersDescription2"),
          t("woltersDescription3"),
        ],
      },
      {
        logo: whatsapp,
        name: "WhatsApp",
        description: [
          t("whatsAppDesciption1"),
          t("whatsAppDesciption2"),
          t("whatsAppDesciption3"),
          t("whatsAppDesciption4"),
        ],
      },

      {
        logo: odoo,
        name: "Odoo",
        description: [
          t("odooDescription1"),
          t("odooDescription2"),
          t("odooDescription3"),
          t("odooDescription4"),
        ],
      },
      {
        logo: holded,
        name: "Holded",
        description: [
          t("holdedDescripion1"),
          t("holdedDescripion2"),
          t("holdedDescripion3"),
        ],
      },
      {
        logo: espublicogestionaLogo,
        name: "EsPublico Gestiona",
        description: [
          t("espublicoDescripion1"),
          t("espublicoDescripion3"),
          t("espublicoDescripion3"),
          t("espublicoDescripion4"),
        ],
      },
      {
        logo: agenciatributariaLogo,
        name: "Agéncia Tributária",
        description: [
          t("agenciatributariaDescripion1"),
          t("agenciatributariaDescripion2"),
          t("agenciatributariaDescripion3"),
          t("agenciatributariaDescripion4"),
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
