import React, { useState } from "react";
import styles from "./Navbar.module.css";
import chevDown from "../../assets/chevDown.svg";
import facturaLogo from "../../assets/facturaLogo.svg";
import menuIcon from "../../assets/Barchart.svg"; // Ícono de menú
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18";

const Navbar = () => {
  const [t] = useTranslation("navBar");

  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToContact = () => {
    // Redirige y hace scroll después de cargar la página
    navigate("/contact");
  };

  return (
    <nav className={styles.navbar}>
      <img
        onClick={() => navigate("/landing")}
        src={facturaLogo}
        alt="FacturaGPT"
        className={styles.logo}
      />
      <button className={styles.hamburger} onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu Icon" />
      </button>
      <ul
        className={`${styles.navLinks} ${
          menuOpen ? styles.navLinksOpen : styles.navLinksClosed
        }`}
      >
        <div>
          <button onClick={() => i18n.changeLanguage("es")}>Es</button>
          <button onClick={() => i18n.changeLanguage("en")}>En</button>
        </div>

        <li onClick={() => navigate("/landing")}>{t("item1")}</li>
        {location.pathname !== "/contact" ? (
          <li onClick={scrollToContact}>{t("item2")} </li>
        ) : (
          <li className={styles.disabledBtn}>{t("item2")}</li>
        )}

        <li onClick={() => navigate("/pricing")}>{t("item3")}</li>
        {/* <li style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          Idioma{" "}
          <span
            className={`${styles.chevDownIcon} ${
              menuOpen ? styles.chevDownOpen : ""
            }`}
          >
            <img src={chevDown} alt="chevDown" />
          </span>
        </li> */}
        <button
          className={styles.button}
          onClick={() => navigate("/freetrial")}
        >
          {t("button")}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
