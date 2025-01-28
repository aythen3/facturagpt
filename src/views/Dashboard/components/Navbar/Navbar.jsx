import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import chevDown from "../../assets/chevDown.svg";
import facturaLogo from "../../assets/FacturaGPTBlack.svg";
import menuIcon from "../../assets/menuIconBlack.svg"; // Ícono de menú
import { useNavigate, useLocation } from "react-router-dom";
import english_flag from "../../assets/english_flag.svg";
import spain_flag from "../../assets/spain_flag.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const [t] = useTranslation("navBar");

  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToContact = () => {
    // Redirige y hace scroll después de cargar la página
    navigate("/contact");
  };

  const handleLanguage = (lng) => {
    localStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
  };


  const handleProfileClick = () => {
    navigate('/panel')
  }

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
      <div
        className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : styles.navLinksClosed
          }`}
      >
        <div className={styles.navFlex}>
          <div className={styles.nav}>
            {["landing", "contact", "pricing"].map((link, index) => (
              <div
                onClick={() => navigate(`/${link}`)}
                className={
                  location.pathname.slice(1) !== link ? styles.disabledBtn : ""
                }
              >
                {t(`item${index + 1}`)}
              </div>
            ))}
          </div>

          {/* <div onClick={() => navigate('/pricing')}>{t('item3')}</div> */}

          <div style={{ display: "flex", gap: "30px" }}>
            <img
              onClick={() => handleLanguage("en")}
              src={english_flag}
              alt="img"
              style={{
                width: 30,
                height: 30,
                cursor: "pointer",
                borderRadius: "12px",
              }}
            />
            <img
              onClick={() => handleLanguage("es")}
              src={spain_flag}
              alt="img"
              style={{
                width: 30,
                height: 30,
                cursor: "pointer",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
        {!user ? (
          <>
            <button
              className={`${styles.button} ${styles.buttonLogIn}`}
              onClick={() => navigate("/login")}
            >
              {t("logIn")}
            </button>
            <button
              className={styles.button}
              onClick={() => navigate("/freetrial")}
            >
              {t("button")}
            </button>
          </>
        ) : (
            <div
              onClick={handleProfileClick}
              className={styles.profileContainer}
            >
              <div className={styles.profileText}>
                <p>{user?.nombre}</p>
                <span>{user?.role}</span>
              </div>
              {user?.profileImage ? (
                <img
                  className={styles.profileImage}
                  src={user?.profileImage}
                  alt=""
                />
              ) : (
                <div className={styles.initials}>
                  {user?.nombre?.split(" ").map((letter) => letter?.[0] || "U")}
                </div>
              )}
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
