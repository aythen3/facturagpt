import React, { useEffect, useState } from "react";
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

  const totalFacturasFormatted = formatNumber(totalFacturas);
  const calculateProgress = () => {
    const min = 0;
    const max = 100000;
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

  // Estados adicionales
  const [displayValue, setDisplayValue] = useState("0’00€");
  const [additionalInfo, setAdditionalInfo] = useState("FREE");

  const getDisplayValues = (value) => {
    let newDisplayValue = "";
    let newAdditionalInfo = "";

    switch (true) {
      case value == 0:
        newDisplayValue = "0’00€";
        newAdditionalInfo = "FREE";
        break;
      case value <= 20:
        newDisplayValue = "4€";
        newAdditionalInfo = "0,20€";
        break;
      case value <= 200:
        newDisplayValue = "38€";
        newAdditionalInfo = "0,19€";
        break;
      case value <= 500:
        newDisplayValue = "92€";
        newAdditionalInfo = "0,18€";
        break;
      case value <= 1000:
        newDisplayValue = "172€";
        newAdditionalInfo = "0,16€";
        break;
      case value <= 2000:
        newDisplayValue = "322€";
        newAdditionalInfo = "0,15€";
        break;
      case value <= 5000:
        newDisplayValue = "712€";
        newAdditionalInfo = "0,13€";
        break;
      case value <= 10000:
        newDisplayValue = "1312€";
        newAdditionalInfo = "0,12€";
        break;
      case value <= 20000:
        newDisplayValue = "2412€";
        newAdditionalInfo = "0,11€";
        break;
      case value <= 50000:
        newDisplayValue = "5112€";
        newAdditionalInfo = "0,09€";
        break;
      case value <= 99999:
        newDisplayValue = "7612€";
        newAdditionalInfo = "0,05€";
        break;
      case value == 100000:
        newDisplayValue = "¿Aún más?";
        newAdditionalInfo = "Contacta con Ventas";
        break;
      default:
        newDisplayValue = "0,00€";
        newAdditionalInfo = "FREE";
    }
    // Solo actualiza el estado si el valor ha cambiado
    if (
      newDisplayValue !== displayValue ||
      newAdditionalInfo !== additionalInfo
    ) {
      setDisplayValue(newDisplayValue);
      setAdditionalInfo(newAdditionalInfo);
    }
  };

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(Number(event.target.value));
    getDisplayValues(value); // Calcula los valores asociados al slider
  };

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.title}>
        {t("title")}
      </h2> */}
      <div className={styles.infoContainer}>
        <h3>
          {displayValue} {displayValue !== "¿Aún más?" && <span>/ MES</span>}
        </h3>
        <p>{additionalInfo}</p>
      </div>
      <div className={styles.sliderWrapper}>
        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="100000"
          value={sliderValue} // El valor del slider se toma de sliderValue
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
        {/* <p className={styles.subtitle}>
          {totalFacturasFormatted}{" "}
          {t("subTitle")}
        </p> */}
      </div>
    </div>
  );
};

export default BillingSlider;
