import React, { useState, useEffect } from "react";
import styles from "./CookiePopup.module.css";
import cookiesAlert from "../../assets/cookiesAlert.svg";
import { ReactComponent as Arrow } from "../../assets/arrowDiagonalWhite.svg";
import { ReactComponent as Close } from "../../assets/closeGray.svg";
import { useNavigate } from "react-router-dom";
const HelpComponent = ({ setShowHelp }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.HelpComponent}>
      <div className={styles.helpText}>
        <p>¿Cómo podemos ayudarle a mejorar su proceso de facturación? 🚀</p>
        <Close className={styles.icon} onClick={() => setShowHelp(false)} />
      </div>
      <div
        className={styles.helpContentArrow}
        onClick={() => navigate("/contact")}
      >
        <Arrow />
      </div>
    </div>
  );
};

const CookiePopup = () => {
  const [visible, setVisible] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // Comprobar si la cookie de aceptación ya existe
    const cookiesAccepted = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookiesAccepted="));
    if (!cookiesAccepted) {
      setVisible(true);
    }
    setShowHelp(true);
  }, []);

  const handleResponse = (accepted) => {
    // Crear una cookie que almacene la preferencia del usuario
    if (accepted) {
      document.cookie = "cookiesAccepted=true; path=/; max-age=31536000"; // Expira en 1 año
    }
    setVisible(false);

    // Mostrar HelpComponent después de 5 segundos
    setTimeout(() => {
      setShowHelp(true);
    }, 5000);
  };

  // if (!visible && !showHelp) return null;

  return (
    <>
      {visible && (
        <div className={styles.cookiePopup}>
          <p>
            Utilizamos cookies y tecnologías similares para ofrecer, mantener y
            mejorar nuestros servicios y con fines de seguridad. Consulte
            nuestra <a href="/terms">Política de Cookies</a> para obtener más
            información. Haga clic en "Aceptar todo" para permitir que
            FacturaGPT y sus socios utilicen cookies para estos fines. Haga clic
            en "Rechazar todo" para rechazar las cookies, excepto las que sean
            estrictamente necesarias.
          </p>
          <div className={styles.buttons}>
            <button onClick={() => handleResponse(false)}>Rechazar todo</button>
            <button onClick={() => handleResponse(true)}>Aceptar todo</button>
          </div>
        </div>
      )}
      {showHelp && <HelpComponent setShowHelp={setShowHelp} />}
    </>
  );
};

export default CookiePopup;
