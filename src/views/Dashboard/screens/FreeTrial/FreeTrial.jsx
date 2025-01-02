import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import facturaLogo from "../../assets/FacturaLogoGreen.svg";
import styles from "./FreeTrial.module.css";
import openai from "../../assets/openaiIcon.svg";
import mail from "../../assets/emailIcon.svg";
import lock from "../../assets/lock.svg";

const FreeTrial = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <a href="/landing">
          <img src={facturaLogo} alt="FacturaGPT" />
        </a>
        <div className={styles.btnContainer}>
          <button href="/login">
            <img src={mail} alt="Mail Icon" />
            Registrarse con correo electrónico
          </button>
          <button>
            <img src={openai} alt="OpenAI Logo" className={styles.openaiLogo} />
            Empezar con OpenAI
          </button>
        </div>
        <p>
          ¿Ya tienes cuenta? <a href="#">Inicia sesión</a>
        </p>

        <p className={styles.policy}>
          Creando una cuenta afirmas estar de acuerdo con nuestros{" "}
          <a href="termsandconditions">Términos y Política de Privacidad</a>
        </p>
        <p className={styles.safety}>
          <img src={lock} alt="Lock Icon" />
          Tu seguridad nos importa
        </p>
      </div>
    </div>
  );
};

export default FreeTrial;
