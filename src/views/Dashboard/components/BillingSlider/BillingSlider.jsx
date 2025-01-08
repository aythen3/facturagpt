import React, { useState } from 'react';
import styles from './BillingSlider.module.css';
import star from '../../assets/star.svg';
import { useTranslation } from 'react-i18next';

const BillingSlider = ({ sliderValue, setSliderValue }) => {
  const { t } = useTranslation('billingSlides');
  const formatNumber = (value) => value.toLocaleString('en-US');

  // Calcular el número de facturas según el valor del slider
  const facturasPorMillon = 2000; // 1 millón = 2000 facturas
  const facturasTotales = (sliderValue * facturasPorMillon) / 1000;
  const handleSliderChange = (event) => {
    setSliderValue(Number(event.target.value));
    console.log('Slider value:', event.target.value);
  };

  const calculateProgress = () => {
    const min = 1000;
    const max = 5000000;
    return ((sliderValue - min) / (max - min)) * 100; // Calcula el progreso en porcentaje
  };

  const marks = [
    { value: 1000, label: '1k', position: 'calc(1% + 4px)' }, // Mover la primera marca un poco más a la derecha
    { value: 10000, label: '10k', position: 'calc(19% + 2px)' },
    { value: 100000, label: '100k', position: 'calc(39% + 1px)' },
    { value: 1000000, label: '1M', position: 'calc(58% + 5px)' },
    { value: 2000000, label: '2M', position: 'calc(78% + 4px)' },
    { value: 5000000, label: '5M', position: 'calc(100% - 10px)' }, // Mover la última marca más a la izquierda
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <img className={styles.star} src={star} alt="star" />
        {t('title')}
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
          {formatNumber(facturasTotales).replace(/,/g, '.')} {t('subTitle')}
        </p>
      </div>
    </div>
  );
};

export default BillingSlider;
