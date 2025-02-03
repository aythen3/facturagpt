import React, { useState } from "react";
import styles from "./BillingSlider.module.css";
import star from "../../assets/star.svg";
import { useTranslation } from "react-i18next";

const BillingSlider = ({ sliderValue, setSliderValue }) => {
  const { t } = useTranslation("billingSlides");

  // Configuración del formateador para números
  const numberFormatter = new Intl.NumberFormat("es-ES", {
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

  // Calcular el número de facturas según el valor del slider
  const facturasPorMillon = 2000; // 1 millón = 2000 facturas
  const totalFacturas = (sliderValue / 1000000) * 2000; // Facturas al año
  const handleSliderChange = (event) => {
    setSliderValue(Number(event.target.value));
    console.log("Slider value:", event.target.value);
  };
  const totalFacturasFormatted = formatNumber(totalFacturas);
  const calculateProgress = () => {
    const min = 1000;
    const max = 5000000;
    return ((sliderValue - min) / (max - min)) * 100; // Calcula el progreso en porcentaje
  };

  const marks = [
    { value: 1000, label: "Hasta 20", position: "5%" }, // Inicial
    { value: 500000, label: "+20", position: "14%" }, // +9%
    { value: 1000000, label: "+200", position: "23%" }, // +9%
    { value: 1500000, label: "+500", position: "32%" }, // +9%
    { value: 2000000, label: "+1K", position: "41%" }, // +9%
    { value: 2500000, label: "2K", position: "50%" }, // +9%
    { value: 3000000, label: "5K", position: "59%" }, // +9%
    { value: 3500000, label: "+10K", position: "68%" }, // +9%
    { value: 4000000, label: "+20K", position: "77%" }, // +9%
    { value: 4500000, label: "+50K", position: "86%" }, // +9%
    { value: 5000000, label: "+100K", position: "95%" }, // +9%
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {/* <img className={styles.star} src={star} alt="star" /> */}
        {t("title")}
      </h2>

      <div className={styles.sliderWrapper}>
        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="5000000"
          step="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className={styles.slider}
          style={{
            background: `linear-gradient(to right, #16c098 ${calculateProgress()}%, rgba(91, 123, 253, 0.15) ${calculateProgress()}%)`,
          }}
        />

        {/* Labels */}
        <div className={styles.labels}>
          {marks.map((mark) => (
            <div
              key={mark.value}
              className={styles.mark}
              style={{ left: mark.position }}
            >
              {/* <div className={styles.connector}></div> */}
              <span className={styles.label}>{mark.label}</span>
            </div>
          ))}
        </div>

        {/* Output Value */}
        <p className={styles.subtitle}>
          {totalFacturasFormatted}{" "}
          {/* {sliderValue <= 900 ? "" : sliderValue <= 999999 ? "K" : "M"}{" "} */}
          {t("subTitle")}
        </p>
      </div>
    </div>
  );
};

export default BillingSlider;
