import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import facturaLogo from '../../assets/FacturaLogoGreen.svg';
import styles from './FreeTrial.module.css';
import openai from '../../assets/openaiIcon.svg';
import mail from '../../assets/emailIcon.svg';
import lock from '../../assets/lock.svg';

const FreeTrial = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <a href="/landing" id={styles.logo}>
          <img src={facturaLogo} alt="FacturaGPT" />
        </a>
        <div className={styles.btnContainer}>
          <button onClick={() => navigate('/register')}>
            <img src={mail} alt="Mail Icon" />
            Registrarse con correo electrónico
          </button>
          <button>
            <img src={openai} alt="OpenAI Logo" className={styles.openaiLogo} />
            Empezar con OpenAI
          </button>
        </div>
        <p>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>

        <p className={styles.policy}>
          Creando una cuenta afirmas estar de acuerdo con nuestros{' '}
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
