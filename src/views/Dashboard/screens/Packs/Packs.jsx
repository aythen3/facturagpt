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
  const [facturasTotales, setFacturasTotales] = useState(2000);
  const [facturasPorMillon] = useState(2000); // 1 millón = 2000 facturas
  const minutosPorFactura = 5; // Minutos por factura
  const minutosAHoras = 60; // Conversión de minutos a horas
  const tarifaPorHora = 10; // Dólares por hora

  // Configuración del formateador para números
  const numberFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 0, // Sin decimales
    useGrouping: true, // Asegura el uso de separadores de miles
  });
  // Configuración del formateador para monedas
  const currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, // Dos decimales para monedas
    maximumFractionDigits: 2,
  });
  // Variables con cálculos
  const totalFacturas = (sliderValue / 1000000) * 2000; // Facturas al año
  const totalMinutos = totalFacturas * minutosPorFactura; // Total de minutos
  const horasTotales = totalMinutos / minutosAHoras; // Total de horas
  const valorEnDolares = Math.round(horasTotales * tarifaPorHora); // Valor en dólares redondeado

  // Variables formateadas
  const sliderValueFormatted = sliderValue / 1000000;
  const totalFacturasFormatted = numberFormatter.format(totalFacturas);
  const horasTotalesFormatted = numberFormatter.format(horasTotales);
  const valorEnDolaresFormatted = numberFormatter.format(valorEnDolares);

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
  console.log(sliderValueFormatted);
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
      <div className={styles.stepsContainer} id='facturation'>
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
      </div>
      <BillingSlider
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
      />
      <span className={styles.packsDescription}>
        Las empresas tardan entre 5 y 10 minutos en gestionar una factura. Una
        empresa con una facturación de <strong>{sliderValueFormatted}</strong> M
        genera aproximadamente <strong>{totalFacturasFormatted}</strong>{' '}
        facturas al año. Con FacturaGPT, puedes ahorrar más de{' '}
        <strong>{horasTotalesFormatted}</strong> horas en tareas repetitivas y
        obtener un beneficio de más de{' '}
        <strong>{valorEnDolaresFormatted}</strong> anuales.
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
      <section className={styles.extensionsContainer}>
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
      </section>

      <div className={styles.extensionsTitle}>
        <img className={styles.heart} src={heart} alt='heart' />
        <h2>Programas Compatibles</h2>
      </div>
      <span className={styles.regular08}>
        Sube, recibe o emite facturas y automatiza tu proceso de facturación
      </span>
      <CompatibleProgramsSection />
      <Reviews />
    </div>
  );
};

export default Packs;
