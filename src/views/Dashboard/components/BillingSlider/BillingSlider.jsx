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
    { value: 1000, label: "1k", position: "calc(1% + 4px)" }, // Mover la primera marca un poco más a la derecha
    { value: 10000, label: "900k", position: "calc(19% + 2px)" },
    { value: 2000000, label: "2M", position: "calc(39% + 1px)" },
    { value: 3000000, label: "3M", position: "calc(58% + 5px)" },
    { value: 4000000, label: "4M", position: "calc(78% + 4px)" },
    { value: 5000000, label: "+5M", position: "calc(100% - 10px)" }, // Mover la última marca más a la izquierda
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <img className={styles.star} src={star} alt="star" />
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
              style={{
                left: `${((mark.value - 1000000) / 49000000) * 100}%`,
                left: mark.position, // Ajusta la posición personalizada para la primera y última marca
              }}
            >
              <div className={styles.connector}></div>
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
