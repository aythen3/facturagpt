import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CookiePopup.module.css';
import cookiesAlert from '../../assets/cookiesAlert.svg';

const CookiePopup = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobar si la cookie de aceptación ya existe
    const cookiesAccepted = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookiesAccepted='));
    if (!cookiesAccepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Crear una cookie que almacene la preferencia del usuario
    document.cookie = 'cookiesAccepted=true; path=/; max-age=31536000'; // Expira en 1 año
    setVisible(false);
  };

  const handleReject = () => {
    // Manejar rechazo (opcional)
    setVisible(false);
    navigate('/termsandconditions'); // Redirigir a la página de información de cookies
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
