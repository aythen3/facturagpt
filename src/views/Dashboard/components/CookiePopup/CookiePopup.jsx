import React, { useState, useEffect } from "react";
import styles from "./CookiePopup.module.css";
import { ReactComponent as Arrow } from "../../assets/arrowDiagonalWhite.svg";
import { ReactComponent as Close } from "../../assets/closeGray.svg";
import { useNavigate, useLocation } from "react-router-dom";

const HelpComponent = ({ setShowHelp }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setShowHelp(false);
    sessionStorage.setItem("showHelp", "false"); // Guardar en sessionStorage
  };

  return (
    <div className={styles.HelpComponent}>
      <div className={styles.helpText}>
        <p>¿Cómo podemos ayudarle a mejorar su proceso de facturación? 🚀</p>
        <Close className={styles.icon} onClick={handleClose} />
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
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [showHelp, setShowHelp] = useState(() => {
    return sessionStorage.getItem("showHelp") !== "false"; // Si es "false", mantenerlo oculto
  });

  useEffect(() => {
    // Comprobar si la cookie de aceptación ya existe
    const cookiesAccepted = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookiesAccepted="));

    if (!cookiesAccepted) {
      setVisible(true);
    }

    // Verificar la última página visitada
    const prevPage = sessionStorage.getItem("prevPage");

    if (prevPage !== location.pathname) {
      // Si la página cambió, restablecer showHelp a true
      setShowHelp(true);
      sessionStorage.setItem("showHelp", "true");
    }

    // Guardar la página actual en sessionStorage
    sessionStorage.setItem("prevPage", location.pathname);
  }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta

  const handleResponse = (accepted) => {
    if (accepted) {
      document.cookie = "cookiesAccepted=true; path=/; max-age=31536000"; // Expira en 1 año
    }
    setVisible(false);

    setTimeout(() => {
      setShowHelp(true);
      sessionStorage.setItem("showHelp", "true"); // Guardar como "true" por si se refresca la página
    }, 5000);
  };

  return (
    <>
      {visible ? (
        <div className={styles.cookiePopup}>
          <p>
            Utilizamos cookies y tecnologías similares para ofrecer, mantener y
            mejorar nuestros servicios y con fines de seguridad. Consulte
            nuestra <a href="/terms">Política de Cookies</a> para obtener más
            información. Haga clic en "Aceptar todo" para permitir que
            FacturaGPT y sus socios utilicen cookies para estos fines. Haga clic
            en "Rechazar todo" para rechazar las cookies, excepto las que sean
            estrictamente necesarias. {showHelp ? "true" : "false"}
          </p>
          <div className={styles.buttons}>
            <button onClick={() => handleResponse(false)}>Rechazar todo</button>
            <button onClick={() => handleResponse(true)}>Aceptar todo</button>
          </div>
        </div>
      ) : (
        showHelp && <HelpComponent setShowHelp={setShowHelp} />
      )}
    </>
  );
};

export default CookiePopup;
