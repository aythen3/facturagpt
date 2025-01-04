import React, { useState } from 'react';
import styles from './Navbar.module.css';
import chevDown from '../../assets/chevDown.svg';
import facturaLogo from '../../assets/facturaLogo.svg';
import menuIcon from '../../assets/Barchart.svg'; // Ícono de menú
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToContact = () => {
    // Redirige y hace scroll después de cargar la página
    navigate('/contact');
  };

  return (
    <nav className={styles.navbar}>
      <img
        onClick={() => navigate('/landing')}
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
        <li onClick={() => navigate('/landing')}>Inicio</li>
        {location.pathname !== '/contact' ? (
          <li onClick={scrollToContact}>Contacto </li>
        ) : (
          <li className={styles.disabledBtn}>Contacto </li>
        )}

        <li onClick={() => navigate('/pricing')}>Precios</li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          Idioma{' '}
          <span
            className={`${styles.chevDownIcon} ${
              menuOpen ? styles.chevDownOpen : ''
            }`}
          >
            <img src={chevDown} alt="chevDown" />
          </span>
        </li>
        <button
          className={styles.button}
          onClick={() => navigate('/freetrial')}
        >
          Probar Gratis
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
