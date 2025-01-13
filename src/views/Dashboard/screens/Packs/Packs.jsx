import React, { useEffect, useState } from "react";
import styles from "./Packs.module.css";
import PricingCards from "../../components/PricingCard/PricingCard";
import BillingSlider from "../../components/BillingSlider/BillingSlider";
import flag from "../../assets/flag.svg";
import heart from "../../assets/heart.svg";
import pdf from "../../assets/pdfIconNew.svg";
import jpg from "../../assets/jpgIconNew.svg";
import png from "../../assets/pngIconNew.svg";
import xml from "../../assets/xmlIconNewGreen.svg";
import outlook from "../../assets/outlook.svg";
import gmail from "../../assets/gmail.svg";
import xslx from "../../assets/xlsx.svg";
import odoo from "../../assets/odoo.svg";
import logoImage from "../../assets/logoImage.svg";
import stripe from "../../assets/stripe.svg";
import excel from "../../assets/excel.svg";
import mail from "../../assets/gmail.svg";
import drive from "../../assets/drive.svg";
import onedrive from "../../assets/onedrive.svg";
import droopbox from "../../assets/droopbox.svg";
import Reviews from "../../components/Reviews/Reviews";
import CompatibleProgramsSection from "../../components/CompatibleProgramsSection/CompatibleProgramsSection";
import { useTranslation } from "react-i18next";

const Packs = () => {
  const { t } = useTranslation("packs");
  const [sliderValue, setSliderValue] = useState(1000000); // Inicializado en 1M
  const [facturasTotales, setFacturasTotales] = useState(2000);
  const [facturasPorMillon] = useState(2000); // 1 millón = 2000 facturas
  const minutosPorFactura = 5; // Minutos por factura
  const minutosAHoras = 60; // Conversión de minutos a horas
  const tarifaPorHora = 10; // Dólares por hora

  // Configuración del formateador para números
  const numberFormatter = new Intl.NumberFormat("en-EN", {
    notation: "compact", // Usa notación compacta
    compactDisplay: "short", // Formato abreviado ("short" o "long")
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 1, // Hasta 1 decimal
    useGrouping: true, // Usa separadores de miles
  });

  const formatNumber = (num) => {
    const roundedNumber = Math.ceil(num); // Redondea hacia el próximo entero
    return new Intl.NumberFormat("es-ES", {
      useGrouping: true, // Usa separadores de miles
      minimumFractionDigits: 0, // Sin decimales
      maximumFractionDigits: 0, // Sin decimales
    }).format(roundedNumber);
  };

  // Configuración del formateador para monedas
  const currencyFormatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Dos decimales para monedas
    maximumFractionDigits: 2,
  });
  // Variables con cálculos
  const totalFacturas = (sliderValue / 1000000) * 2000; // Facturas al año
  const totalMinutos = totalFacturas * minutosPorFactura; // Total de minutos
  const horasTotales = totalMinutos / minutosAHoras; // Total de horas
  const valorEnDolares = Math.round(horasTotales * tarifaPorHora); // Valor en dólares redondeado

  // Variables formateadas
  // const sliderValueFormatted = sliderValue / 1000000;
  const sliderValueFormatted = numberFormatter.format(sliderValue);
  const totalFacturasFormatted = formatNumber(totalFacturas);
  const horasRedondeadas = Math.round(horasTotales);
  const horasTotalesFormatted = numberFormatter.format(horasRedondeadas);
  const valorEnDolaresFormatted = formatNumber(valorEnDolares);

  const cardsData = [pdf, jpg, png, xml];
  const compatiblePrograms = [outlook, gmail, xslx, odoo, logoImage, stripe];

  const steps = [
    {
      step: t("step1"),
      title: t("title1"),
      description: t("description1"),
    },
    {
      step: t("step2"),
      title: t("title2"),
      description: t("description2"),
    },
    {
      step: t("step3"),
      title: t("title3"),
      description: t("description3"),
    },
  ];
  console.log(sliderValueFormatted);
  const LogoIcons = [
    {
      title: "excel",
      image: excel,
    },
    {
      title: "gmail",
      image: mail,
    },
    {
      title: "outlook",
      image: outlook,
    },
    {
      title: "drive",
      image: drive,
    },
    {
      title: "onedrive",
      image: onedrive,
    },
    {
      title: "droopbox",
      image: droopbox,
    },
  ];

  return (
    <div className={styles.packsContainer}>
      <div className={styles.stepsContainer} id="facturation">
        <div className={styles.logoContainer}>
          {LogoIcons.map((icon, index) => (
            <div key={index} className={styles.logo}>
              <img src={icon.image} alt={icon.title} />
            </div>
          ))}
        </div>
        <div className={styles.wrapper}>
          {steps.map((step, index) => (
            <div key={index} className={styles.card}>
              <p className={styles.step}>{step.step}</p>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.subtitle}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <BillingSlider
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
      />
      <span className={styles.packsDescription}>
        {/* Las empresas tardan entre 5 y 10 minutos en gestionar una factura. Una
        empresa con una facturación de{" "} */}
        {t("resume")}
        {/* <strong> {sliderValueFormatted} M </strong> */}
        <span>
          {" "}
          {/* {sliderValueFormatted} {sliderValue <= 999999 ? 'K' : 'M'}{' '} */}
          {sliderValueFormatted}{" "}
          {/* {sliderValue <= 900 ? "" : sliderValue <= 999999 ? "K" : "M"}{" "} */}
        </span>
        {/* genera aproximadamente{" "} */}
        {t("resume_strong")}
        <span>
          {" "}
          {totalFacturasFormatted} {t("resume_strong2")}
        </span>
        {/* . Con FacturaGPT, puedes ahorrar más de{" "} */}
        {t("resume_cont")}
        <span>
          {horasTotalesFormatted} {t("resume_hours")}{" "}
        </span>{" "}
        {t("resume_end")}
        <span>{valorEnDolaresFormatted} €</span>.
      </span>
      <PricingCards
        facturasTotales={facturasTotales}
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
        setFacturasTotales={setFacturasTotales}
      />
      <div className={styles.banner}>
        <h3 className={styles.bannerTitle}>{t("reduces1")}</h3>
        <h3 className={styles.bannerTitle}>{t("reduces2")}</h3>
        <h3 className={styles.bannerTitle}>{t("reduces3")}</h3>
      </div>
      <section className={styles.extensionsContainer}>
        <div className={styles.extensionsTitle}>
          <img className={styles.flag} src={flag} alt="flag" />
          <h2>{t("formatsTitle")}</h2>
        </div>
        <span className={styles.regular08}>{t("formatsDescription")}</span>
        <div className={styles.dashedContainer}>
          {cardsData.map((card, index) => (
            <div className={styles.innerCard} key={index}>
              <img
                className={index === 0 ? styles.pdfIcon : styles.pdfIcon}
                src={card}
                alt="card"
              />
            </div>
          ))}
        </div>
      </section>

      <div className={styles.extensionsTitle}>
        <img className={styles.heart} src={heart} alt="heart" />
        <h2>{t("programsTitle")}</h2>
      </div>
      <span className={styles.regular08}>{t("programsDescription")}</span>
      <CompatibleProgramsSection />
      <Reviews />
    </div>
  );
};

export default Packs;
