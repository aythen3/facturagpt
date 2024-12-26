import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import facturaLogo from '../../assets/FacturaLogoGreen.svg';
import styles from './FreeTrial.module.css';
import google from '../../assets/Google.svg';
import mail from '../../assets/mail.svg';
// import lock from '../../assets/Lock.svg';

const FreeTrial = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <a href='/landing'>
          <img src={facturaLogo} alt='FacturaGPT' />
        </a>
        <div className={styles.btnContainer}>
          <a href='/login'>
            <img src={mail} alt='Mail Icon' />
            Registrarse con correo electrónico
          </a>
          <button>
            <img src={google} alt='Google Logo' />
            Empezar con Google
          </button>
        </div>
        <p>
          ¿Ya tienes cuenta? <a href='#'>Inicia sesión</a>
        </p>

        <p className={styles.policy}>
          Creando una cuenta afirmas estar de acuerdo con nuestros{' '}
          <a href='#'>Términos y Política de Privacidad</a>
        </p>
        <p className={styles.safety}>
          {/* <img src={lock} alt='Lock Icon' /> */}
          Tu seguridad nos importa
        </p>
      </div>
    </div>
  );
};

export default FreeTrial;
