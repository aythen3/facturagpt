import React from 'react';
import styles from './Reviews.module.css';
import Carousel from '../Carousel/Carousel';
import ContactForm from '../ContactForm/ContactForm';

const Reviews = () => {
  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.reviewsTitle}>
        Resultados que marcan la diferencia
      </h2>
      <span className={styles.reviewsDescription}>
        Ve cómo FacturaGPT ayuda a automatizar y simplificar la facturación de
        negocios como el tuyo
      </span>
      <Carousel />
      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Precios para escalar</h2>
        {/* <span className={styles.reviewsDescriptionSecondary}>
        Nuestros precios están diseño para brindar un valor excepcional para el
        mejor servicio de impuestos.
      </span> */}
        <span className={styles.startsFrom}>A partir de</span>
        <div className={styles.price}>
          €3’99 <span>/mes</span>
        </div>
        <span className={styles.thinSubtitle}>
          Impuestos indirectos no incluidos. Sin gastos de instalación. Cancela
          en cualquier momento.
        </span>
      </section>
      <ContactForm />
      <section className={styles.startNowSection}>
        <h2 className={styles.reviewsTitle}>¡Únase a nosotros hoy!</h2>
        <span className={styles.reviewsDescriptionLast}>
          Estás un paso más cerca de obtener el mejor servicio...
        </span>
        <a href='/login' className={styles.startButton}>
          Comience ahora
        </a>
      </section>
    </div>
  );
};

export default Reviews;
