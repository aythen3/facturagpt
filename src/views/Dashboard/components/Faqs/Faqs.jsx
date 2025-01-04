import React, { useState } from 'react';
import styles from './Faqs.module.css';
import arrow from '../../assets/arrowlit.svg';
import arrowDown from '../../assets/arrowRightContact.png';
const FAQ = () => {
  const faqs = [
    {
      question: '¿Qué es FacturaGPT?',
      answer:
        'FacturaGPT es una herramienta de gestión y análisis financiero que utiliza inteligencia artificial para simplificar y optimizar el análisis de facturas y datos contables. FacturaGPT és una solución basada en la nube, accesible desde cualquier dispositivo con conexión a internet.',
    },
    {
      question: '¿Qué formatos de archivos acepta Factura GPT?',
      answer:
        'Aceptamos archivos Excel, CSV y PDF, entre otros formatos estándar.',
    },
    {
      question: '¿Cómo ayuda Factura GPT en la planificación financiera?',
      answer:
        'Proporciona insights clave como márgenes de ganancia, patrones de gasto y recomendaciones personalizadas.',
    },
    ,
    {
      question:
        '¿Se pueden integrar otras herramientas de software con Factura GPT?',
      answer:
        'Sí, es compatible con ERP y sistemas de contabilidad populares como SAP, QuickBooks y Odoo.',
    },
    {
      question: '¿Factura GPT detecta errores en las facturas?',
      answer:
        'Sí, identifica discrepancias y posibles errores en las facturas automáticamente.',
    },
    {
      question: '¿Factura GPT realiza cálculos de impuestos?',
      answer:
        'Sí, identifica y calcula automáticamente impuestos aplicables en las facturas.',
    },
    {
      question: '¿Factura GPT se actualiza automáticamente?',
      answer:
        'Sí, todas las actualizaciones y mejoras se implementan automáticamente sin costo adicional.',
    },
  ];
  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleFAQ = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <div className={styles.faqSection}>
      <h2>¿Tienes alguna pregunta?</h2>
      <div className={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span
                className={`${styles.icon} ${
                  activeIndexes.includes(index) ? styles.open : ''
                }`}
              >
                <img src={arrow} alt="" />
              </span>
            </button>
            <div
              className={`${styles.faqAnswer} ${
                activeIndexes.includes(index) ? styles.show : ''
              }`}
            >
              <span>{faq.answer}</span>
            </div>
          </div>
        ))}
        <p className={styles.contact}>
          ¿Quieres saber más?{' '}
          <a href="/contact">
            Contacta <img src={arrowDown} alt="" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
