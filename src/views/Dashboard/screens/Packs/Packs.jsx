import React, { useEffect, useState } from 'react';
import styles from './Packs.module.css';
import PricingCards from '../../components/PricingCard/PricingCard';
import BillingSlider from '../../components/BillingSlider/BillingSlider';
import flag from '../../assets/flag.svg';
import heart from '../../assets/heart.svg';
import pdf from '../../assets/pdf.svg';
import jpg from '../../assets/jpg.svg';
import txt from '../../assets/txt.svg';
import png from '../../assets/png.svg';
import outlook from '../../assets/outlook.svg';
import gmail from '../../assets/gmail.svg';
import xslx from '../../assets/xlsx.svg';
import odoo from '../../assets/odoo.svg';
import logoImage from '../../assets/logoImage.svg';
import stripe from '../../assets/stripe.svg';
import excel from '../../assets/excel.svg';
import mail from '../../assets/gmail.svg';
import drive from '../../assets/drive.svg';
import onedrive from '../../assets/onedrive.svg';
import droopbox from '../../assets/droopbox.svg';
import Reviews from '../../components/Reviews/Reviews';
import CompatibleProgramsSection from '../../components/CompatibleProgramsSection/CompatibleProgramsSection';
const Packs = () => {
  const [sliderValue, setSliderValue] = useState(1000000); // Inicializado en 1M
  const [facturasTotales, setFacturasTotales] = useState(0);

  useEffect(() => {
    setFacturasTotales((sliderValue * facturasPorMillon) / 1000000);
  }, [sliderValue]);

  // Calcular el número de facturas según el valor del slider
  const facturasPorMillon = 2000; // 1 millón = 2000 facturas
  //const facturasTotales = (sliderValue * facturasPorMillon) / 1000000; // Dividir por 1 millón para que la multiplicación sea correcta
  // Calcular las horas (cada factura toma 5 minutos)
  const horasTotales = (facturasTotales * 5) / 60; // Convertir minutos a horas

  // Calcular el valor ganado en dólares (10$ por hora)
  const valorEnDolares = horasTotales * 10;

  // Formatear los números con separadores de miles
  const formatNumber = (value) => value.toLocaleString('en-US');

  // Formatear el valor en dólares con el signo €
  const formatCurrency = (value) => {
    return `${new Intl.NumberFormat('en-US').format(value)}€`;
  };

  const cardsData = [pdf, jpg, txt, png];
  const compatiblePrograms = [outlook, gmail, xslx, odoo, logoImage, stripe];

  const steps = [
    {
      step: 'Paso 1',
      title: 'Inicia sesión',
      description:
        'Conecta en un solo paso, gmail, drive, dropbox, etc.. y sincroniza tu bandeja de entrada',
    },
    {
      step: 'Paso 2',
      title: 'Factura con GPT',
      description:
        'Reconoce todas tus facturas, recibos, etc.. y conecta con terceros',
    },
    {
      step: 'Paso 3',
      title: 'Ahorra un 88% de tiempo',
      description:
        'Tu proceso 100% automatizado, 24h y 7 días a la semana disponible',
    },
  ];

  const LogoIcons = [
    {
      title: 'excel',
      image: excel,
    },
    {
      title: 'gmail',
      image: mail,
    },
    {
      title: 'outlook',
      image: outlook,
    },
    {
      title: 'drive',
      image: drive,
    },
    {
      title: 'onedrive',
      image: onedrive,
    },
    {
      title: 'droopbox',
      image: droopbox,
    },
  ];

  return (
    <div className={styles.packsContainer}>
      <div className={styles.logoContainer}>
        {LogoIcons.map((icon, index) => (
          <div key={index}>
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
      <BillingSlider
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
      />
      <span className={styles.packsDescription}>
        Las empresas tardan entre 5 y 10 minutos en gestionar una factura. Una
        empresa con una facturación de{' '}
        <strong>{sliderValue / 1000000} M</strong> genera aproximadamente{' '}
        <strong>{formatNumber(facturasTotales).replace(/,/g, '.')}</strong>{' '}
        facturas al año. Con FacturaGPT, puedes ahorrar más de{' '}
        <strong>{horasTotales.toFixed(2)}</strong> horas en tareas repetitivas y
        obtener un beneficio de más de{' '}
        <strong>{formatCurrency(valorEnDolares)}</strong> anuales.
      </span>
      <PricingCards
        facturasTotales={facturasTotales}
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
        setFacturasTotales={setFacturasTotales}
      />
      <div className={styles.banner}>
        <h3 className={styles.bannerTitle}>
          Reduce la entrada manual en un 88%
        </h3>
        <h3 className={styles.bannerTitle}>
          Reduce la tasa de error promedio en un 30%
        </h3>
        <h3 className={styles.bannerTitle}>
          Reduce el tiempo de respuesta en un 57 %
        </h3>
      </div>
      <div className={styles.extensionsTitle}>
        <img className={styles.flag} src={flag} alt='flag' />
        <h2>Formatos y Extensiones</h2>
      </div>
      <span className={styles.regular08}>
        Puedes conectar cualquier tipo de formato digital, escaneado, foto..
        Disponible en más de +10 formatos disponibles
      </span>
      <div className={styles.dashedContainer}>
        {cardsData.map((card, index) => (
          <div className={styles.innerCard} key={index}>
            <img
              className={index === 0 ? styles.pdfIcon : styles.pdfIcon}
              src={card}
              alt='card'
            />
          </div>
        ))}
      </div>
      <div className={styles.extensionsTitle}>
        <img className={styles.heart} src={heart} alt='heart' />
        <h2>Programas Compatibles</h2>
      </div>
      <span className={styles.regular08}>
        Sube, recibe o emite facturas y automatiza tu proceso de facturación
      </span>
      <CompatibleProgramsSection />
      {/* <div className={styles.compatibleProgramsContainer}>
        {compatiblePrograms.map((card, index) => (
          <div
            className={`${styles.innerCard} ${
              index === 3 && styles.innedOdoo
            } ${index === 5 && styles.innerStripe}`}
            key={index}
          >
            <img src={card} alt='card' />
          </div>
        ))}
      </div> */}
      <Reviews />
    </div>
  );
};

export default Packs;
