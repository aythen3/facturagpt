import React from "react";
import styles from "./Navbar.module.css";
import chevDown from "../../assets/chevDown.svg";
import facturaLogo from "../../assets/facturaLogo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <img src={facturaLogo} alt="FacturaGPT" />
      <ul className={styles.navLinks}>
        <li onClick={() => navigate("/dashboard/landing")}>Inicio</li>
        <li>Contacto</li>
        <li onClick={() => navigate("/dashboard/pricing")}>Precios</li>
        <li>
          Idioma <img src={chevDown} alt="chevDown" />
        </li>
        <button className={styles.button}>Probar Gratis</button>
      </ul>
    </nav>
  );
};

export default Navbar;
