import React from 'react';
import styles from './ContactForm.module.css';
import { ReactComponent as HandIcon } from '../../assets/HandIcon.svg';
import handPointer from '../../assets/handPointer.svg';

const ContactForm = () => {
  return (
    <div className={styles.container} id='contact'>
      <div className={styles.header}>
        <img src={handPointer} alt='' className={styles.leftImage} />
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Contáctenos</h2>
          <p className={styles.subtitle}>
            Estamos aquí para ayudar, solicite asistencia personalizada.
          </p>
        </div>
        <img src={handPointer} alt='' className={styles.rightImage} />
      </div>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Su nombre</label>
              <input
                type='text'
                placeholder='Introduce tu nombre'
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Tu correo electrónico</label>
              <input
                type='email'
                placeholder='Introduce tu correo electrónico'
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Tu mensaje</label>
              <textarea
                placeholder='Escribe tu mensaje aquí'
                className={styles.textarea}
              />
            </div>

            <button type='submit' className={styles.button}>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
