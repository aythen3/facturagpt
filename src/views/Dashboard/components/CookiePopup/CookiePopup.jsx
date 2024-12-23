import React, { useState } from "react";
import styles from "./CookiePopup.module.css";
import cookiesAlert from '../../assets/cookiesAlert.svg'
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
            <span><img src={cookiesAlert} alt="" /></span>
            <p>About our cookies</p>
        </div>
      <p>
      WinPaying.com uses cookies to give you the best browsing experience. If you continue browsing we understand that you accept our cookies policy.
      </p>
      <div className={styles.buttons}>
        <button onClick={handleReject}>More information</button>
        <button onClick={handleAccept}>Got it</button>
      </div>
    </div>
  );
};

export default CookiePopup;
