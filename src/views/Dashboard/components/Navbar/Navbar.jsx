import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import chevDown from "../../assets/chevDown.svg";
import facturaLogo from "../../assets/FacturaGPTBlack.svg";
import menuIcon from "../../assets/menuIconBlack.svg"; // Ícono de menú
import { useNavigate, useLocation } from "react-router-dom";
import english_flag from "../../assets/english_flag.svg";
import spain_flag from "../../assets/spain_flag.svg";
import { ReactComponent as ArrowGray } from "../../assets/arrowDownGray.svg";
import { ReactComponent as MessageIcon } from "../../assets/messageIcon.svg";
import { ReactComponent as InformationIcon } from "../../assets/informationIcon.svg";
import { ReactComponent as RocketIcon } from "../../assets/rocketIcon.svg";
import { ReactComponent as PaperClipsIcon } from "../../assets/paperClipsIcon.svg";
import { ReactComponent as StadisticsIcon } from "../../assets/stadisticsIcon.svg";
import { ReactComponent as PencilPaperIcon } from "../../assets/pencilPaperIcon.svg";
import { ReactComponent as MoneyIcon } from "../../assets/moneyIcon.svg";
import { ReactComponent as RingIcon } from "../../assets/ringIcon.svg";
import { ReactComponent as BalanceIcon } from "../../assets/balanceIcon.svg";

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
  }, [location.pathname]); // Agrega user.nombre como dependencia

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
    navigate("/admin/chat");
  };

  const solutions = [
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <RocketIcon className={styles.iconSolutions} />
          Automatización de documentos
        </p>
      ),
      desc: "Subida, clasificación y procesamiento automático de documentos desde múltiples plataformas como Gmail, Drive y SharePoint. Optimiza la gestión documental y evita tareas manuales.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <InformationIcon className={styles.iconSolutions} /> Centralización de
          información
        </p>
      ),
      desc: "Gestiona contactos, activos, precios y descuentos en un sistema unificado. Centraliza documentos de múltiples fuentes, facilitando el acceso colaborativo rápido y organizado.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <PencilPaperIcon className={styles.iconSolutions} />
          Generación de facturas y presupuestos
        </p>
      ),
      desc: "Simplifica el proceso de gestión de facturas. Crea y envía documentos recurrentes de forma rápida, adaptados a las necesidades de cada cliente. Configura condiciones comerciales y agiliza el flujo de trabajo.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <PaperClipsIcon className={styles.iconSolutions} />
          Conecta con terceros
        </p>
      ),
      desc: "Sincronización fluida con ERP, CRM y sistemas de gestión empresarial a través de FTP, asegurando un intercambio seguro y eficiente de datos.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <BalanceIcon className={styles.iconSolutions} />
          Cumplimiento normativo
        </p>
      ),
      desc: "Exportación automática de datos a la Agencia Tributaria (EAT) con reportes fiscales compatibles con normativas locales e internacionales.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <RingIcon className={styles.iconSolutions} />
          Alertas y validación de datos
        </p>
      ),
      desc: "Configura notificaciones por correo o WhatsApp con validación de datos en tiempo real, evitando errores y garantizando precisión en la facturación.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <MoneyIcon className={styles.iconSolutions} />
          Automatiza la facturación
        </p>
      ),
      desc: "Optimiza la gestión financiera de tu empresa desde hoy. Automatiza documentos facturables, cobros recurrentes y facturación periódica para clientes y proveedores de forma eficiente y monitorizada.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <MessageIcon className={styles.iconSolutions} />
          Chatea con FacturaGPT
        </p>
      ),
      desc: "Accede instantáneamente a reportes, consultas específicas y métricas clave desde cualquier dispositivo, en cualquier momento.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <StadisticsIcon className={styles.iconSolutions} />
          Análisis predictivos y comparativas
        </p>
      ),
      desc: "Usa el panel de control para obtener una visión general de tu negocio. Para un análisis avanzado, pídeselo a FacturaGPT y obtén informes detallados y análisis de datos que te ayudarán a tomar mejores decisiones.",
    },
  ];

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
        className={`${styles.navLinks} ${
          menuOpen ? styles.navLinksOpen : styles.navLinksClosed
        }`}
      >
        <div className={styles.navFlex}>
          <div className={styles.nav}>
            {["landing", "soluciones", "contact", "pricing"].map(
              (link, index) => (
                <div
                  key={index}
                  {...(link !== "soluciones"
                    ? { onClick: () => navigate(`/${link}`) }
                    : {})}
                  className={`${location.pathname.slice(1) !== link ? styles.disabledBtn : ""}`}
                >
                  {link === "soluciones" ? (
                    <div className={styles.solucionesWrapper}>
                      <span className={styles.solucionesHover}>
                        {t(`item${index + 1}`)}
                        <ArrowGray className={styles.icon} />
                      </span>
                      <div className={styles.solutionsContainer}>
                        {solutions.map((solution, index) => (
                          <div key={index}>
                            <p>{solution.title}</p>
                            <span>{solution.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    t(`item${index + 1}`)
                  )}
                </div>
              )
            )}
          </div>

          <div className={styles.flagContainer}>
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
          <div className={styles.btnContainerNavbar}>
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
          </div>
        ) : (
          <div onClick={handleProfileClick} className={styles.profileContainer}>
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
