import React, { useEffect, useState } from "react";
import styles from "./Packs.module.css";
import PricingCards from "../../components/PricingCard/PricingCard";
import BillingSlider from "../../components/BillingSlider/BillingSlider";
import image from "../../assets/imageIcon.svg";
import code from "../../assets/codeIcon.svg";
import txt from "../../assets/fileIcon.svg";
import imageGreen from "../../assets/imageIconGreen.svg";
import codeGreen from "../../assets/codeIconGreen.svg";
import txtGreen from "../../assets/fileIconGreen.svg";

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
import TagsLanding from "../../components/TagsLanding/TagsLanding";
import CircleProgressBar from "../../components/CircleProgressBar/CircleProgressBar";
import LinesLandingSection from "../../components/LinesLandingSection/LinesLandingSection";
import FlowSection from "../../components/FlowSection/FlowSection";
import SubtitleTemplate from "../../components/SubtitleTemplate/SubtitleTemplate";

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

  const cardsData = [
    imageGreen,
    txtGreen,
    codeGreen,
    imageGreen,
    txtGreen,
    codeGreen,
    image,
    txt,
    code,
    imageGreen,
    txtGreen,
    codeGreen,
    ,
    imageGreen,
    txtGreen,
    codeGreen,
  ];
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
        <section className={styles.wrapper}>
          <div className={styles.stepContainer}>
            <div>
              <h2>¿Recibes documentos de distintos canales? </h2>
              <h3>Te ayudamos.</h3>
            </div>
            <div className={styles.stepsContent}>
              {steps.map((step, index) => (
                <div key={index} className={styles.card}>
                  <p className={styles.step}>{step.step}</p>
                  <h4 className={styles.title}>{step.title}</h4>
                  <SubtitleTemplate text={step.description} />
                  {/* <p className={styles.subtitle}>{step.description}</p> */}
                </div>
              ))}
            </div>
          </div>
        </section>
        <LinesLandingSection />
      </div>

      {/* <section className={styles.sliderWrapperSection}>
        <BillingSlider
          setSliderValue={setSliderValue}
          sliderValue={sliderValue}
        />
        <span className={styles.packsDescription}>
          <p>{t("resume")} </p>
          <p>
            {t("resume_strong")} <span> {sliderValueFormatted} </span>
            {t("resume_strong2")} <span> {totalFacturasFormatted} </span>{" "}
            {t("resume_strong3")}
          </p>
          <p>
            {" "}
            {t("resume_cont")}
            <span>
              {" "}
              {horasTotalesFormatted} {t("resume_hours")}{" "}
            </span>{" "}
            {t("resume_end")}
            <span> {valorEnDolaresFormatted} €</span>.
          </p>
        </span>
      </section> */}
      {/* <PricingCards
        facturasTotales={facturasTotales}
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
        setFacturasTotales={setFacturasTotales}
      /> */}
      {/* 
      <section className={styles.extensionsContainer}>
        <div className={styles.extensionsTitle}>
          <h2>{t("formatsTitle")}</h2>
        </div>
        <SubtitleTemplate text={t("formatsDescription1")} />
        <SubtitleTemplate text={t("formatsDescription2")} />
        <div className={styles.dashedContainer}>
          {cardsData.map((card, index) => (
            <div className={styles.innerCard} key={index}>
              <img className={styles.pdfIcon} src={card} alt="card" />
            </div>
          ))}
        </div>
      </section> */}

      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div className={styles.extensionsTitle}>
            {/* <img className={styles.heart} src={heart} alt="heart" /> */}
            <h2>{t("programsTitle")}</h2>
          </div>
          <div>
            <SubtitleTemplate
              text={t("programsDescription1")}
              stylesProp={{ padding: "0 20px" }}
            />
            {/* <p className={styles.regular08}>{t("programsDescription1")}</p> */}

            {/* <p className={styles.regular08}>{t("programsDescription2")}</p> */}
          </div>
          <FlowSection />
          {/* <CompatibleProgramsSection /> */}
        </div>
      </section>

      {/* <section className={styles.banner}>
        <h3 className={styles.bannerTitle}>{t("reduces1")}</h3>
        <h3 className={styles.bannerTitle}>{t("reduces2")}</h3>
        <h3 className={styles.bannerTitle}>{t("reduces3")}</h3>
      </section> */}
      <Reviews />
    </div>
  );
};

export default Packs;
