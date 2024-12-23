import React from "react";
import styles from "./ContactForm.module.css";
import { ReactComponent as HandIcon } from "../../assets/HandIcon.svg";
const ContactForm = () => {
  return (
    <div className={styles.container} id="contact">
        <h1 className={styles.title}>Contáctenos</h1>
    <div className={styles.content}>
    <div className={styles.leftSection}>
        <p className={styles.subtitle}>
          Estamos aquí para ayudar, solicite asistencia personalizada.
        </p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Su nombre</label>
            <input
              type="text"
              placeholder="Introduce tu nombre"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tu correo electrónico</label>
            <input
              type="email"
              placeholder="Introduce tu correo electrónico"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tu mensaje</label>
            <textarea
              placeholder="Escribe tu mensaje aquí"
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.button}>
            Enviar mensaje
          </button>
        </form>
      </div>

      <div className={styles.rightSection}>
        {/* <img src={require("../../assets/HandIcon.svg")} alt="Hand Icon" /> */}
        <HandIcon className={styles.handIcon} />
      </div>
    </div>
    </div>
  );
};

export default ContactForm;
