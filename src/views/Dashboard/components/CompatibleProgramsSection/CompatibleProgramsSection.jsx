import React from 'react';
import ProgramSlider from '../ProgramSlider/ProgramSlider';
import styles from './CompatibleProgramsSection.module.css';
import stripe from '../../assets/stripeprogram.svg';
import a3 from '../../assets/a3.svg';
import whatsapp from '../../assets/whatsapp.svg';
import odoo from '../../assets/odoo.svg';
import holded from '../../assets/holded.svg';
const CompatibleProgramsSection = () => {
  // Datos de ejemplo para los sliders
  const slidersData = [
    [
      {
        logo: stripe,
        name: 'Stripe',
        description: [
          'Gestión automática de facturas por suscripciones',
          'Conciliación de pagos en tiempo real',
          'Notificaciones automáticas de pago',
        ],
      },
      {
        logo: a3,
        name: 'Wolters Kluwer A3 Software',
        description: [
          'Importación de facturas digitales',
          'Reportes financieros automatizados',
        ],
      },
      {
        logo: whatsapp,
        name: 'WhatsApp',
        description: [
          'Comparte facturas',
          'Recordatorios de pago',
          'Chatea con FacturaGPT para crear facturas',
        ],
      },
    ],
    [
      {
        logo: odoo,
        name: 'Odoo',
        description: [
          'Sincronización de datos de clientes y facturas',
          'Gestión de inventarios y facturación',
        ],
      },
      {
        logo: holded,
        name: 'Holded',
        description: [
          'Sincronización bidireccional',
          'Gestión de proyectos y facturación',
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
