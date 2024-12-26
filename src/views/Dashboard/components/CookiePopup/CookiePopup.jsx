import React, { useState } from 'react';
import styles from './CookiePopup.module.css';
import cookiesAlert from '../../assets/cookiesAlert.svg';
const CookiePopup = () => {
  const [visible, setVisible] = useState(true);

  const handleAccept = () => {
    // Aquí puedes agregar lógica para almacenar la preferencia del usuario
    setVisible(false);
  };

  const handleReject = () => {
    // Aquí puedes manejar el rechazo, si es necesario
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.cookiePopup}>
      <div className={styles.about}>
        <span>
          <img src={cookiesAlert} alt='' />
        </span>
        <p>Acerca de nuestras cookies</p>
      </div>
      <p>
        FacturaGPT.com utiliza cookies para ofrecerte la mejor experiencia de
        navegación. Si continúas navegando entendemos que aceptas nuestra
        política de cookies.
      </p>
      <div className={styles.buttons}>
        <button onClick={handleReject}>Más información</button>
        <button onClick={handleAccept}>Entiendo</button>
      </div>
    </div>
  );
};

export default CookiePopup;
