import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { ReactComponent as ChevDown } from "../../assets/arrowDownGray.svg";
import facturaLogo from "../../assets/FacturaGPTBlack.svg";
import menuIcon from "../../assets/menuIconBlack.svg"; // Ícono de menú
import { useNavigate, useLocation } from "react-router-dom";
import english_flag from "../../assets/english_flag.svg";
import spain_flag from "../../assets/spain_flag.svg";
import { ReactComponent as ArrowGray } from "../../assets/arrowDownGray.svg";
import { ReactComponent as SearchWhite } from "../../assets/searchWhite.svg";
import { ReactComponent as FolderClosedWhite } from "../../assets/folderClosedWhite.svg";
import { ReactComponent as BillingWhite } from "../../assets/billingWhite.svg";
import { ReactComponent as WorldWhite } from "../../assets/worldWhite.svg";
import { ReactComponent as StandardsWhite } from "../../assets/standardsWhite.svg";
import { ReactComponent as WhiteCheck } from "../../assets/whiteCheck.svg";
import { ReactComponent as Automation } from "../../assets/automation.svg";
import { ReactComponent as ChatIconWhite } from "../../assets/chatIconWhite.svg";
import { ReactComponent as ImageIconWhite } from "../../assets/imageIconWhite.svg";

import { useTranslation } from "react-i18next";
import i18n from "../../../../i18";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "../HeaderCard/HeaderCard";
const Navbar = () => {
  const [t] = useTranslation("navBar");

  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
  const [showSolutions, setShowSolutions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Detectar tamaño de pantalla para saber si es móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000); // Define el breakpoint para mobile
    };
    handleResize(); // Verificar al cargar la página
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <div className={styles.iconContainerSolutions}>
            <SearchWhite className={styles.iconSolutions} />
          </div>
          Extracción inteligente de datos
        </p>
      ),
      desc: "Subida, clasificación y procesamiento automático de documentos desde múltiples fuentes como Gmail, Drive y SharePoint. Extrae automáticamente la información que necesites. Optimiza la gestión documental y evita tareas manuales.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <div className={styles.iconContainerSolutions}>
            <FolderClosedWhite className={styles.iconSolutions} />{" "}
          </div>
          Centralización total de información
        </p>
      ),
      desc: "Gestiona contactos, activos, precios y descuentos en un sistema unificado. Captura y recopila documentos de múltiples fuentes, facilitando el acceso colaborativo rápido y organizado.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <div className={styles.iconContainerSolutions}>
            <BillingWhite className={styles.iconSolutions} />
          </div>
          Facturación y presupuestos sin esfuerzo
        </p>
      ),
      desc: "Simplifica el proceso de gestión de facturas. Crea y envía documentos recurrentes de forma rápida, adaptados a las necesidades de cada cliente. Configura condiciones comerciales y agiliza el flujo de trabajo.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <div className={styles.iconContainerSolutions}>
            <WorldWhite className={styles.iconSolutions} />
          </div>
          Conecta con terceros
        </p>
      ),
      desc: "Sincronización ininterrumpida con ERP, CRM y sistemas de gestión empresarial a través de FTP, asegurando un intercambio de datos seguro y eficiente con tus herramientas favoritas.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <div className={styles.iconContainerSolutions}>
            <StandardsWhite className={styles.iconSolutions} />
          </div>
          Cumplimiento normativo
        </p>
      ),
      desc: "Exportación automática de datos con Hacienda, FacturaGPT está listo para cumplir con normativas locales e internacionales.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <div className={styles.iconContainerSolutions}>
            <WhiteCheck className={styles.iconSolutions} />
          </div>
          Alertas y validación de datos
        </p>
      ),
      desc: "Configura notificaciones por correo o WhatsApp con validación de datos en tiempo real, evitando errores y garantizando precisión en la facturación.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <div className={styles.iconContainerSolutions}>
            <Automation className={styles.iconSolutions} />
          </div>
          Automatización personalizada
        </p>
      ),
      desc: "Optimiza la gestión financiera de tu empresa desde hoy, con flujos de aprobación automáticos. Automatiza tu flujo de trabajo o contacta con el equipo de ventas para soluciones a medida.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <div className={styles.iconContainerSolutions}>
            <ChatIconWhite className={styles.iconSolutions} />
          </div>
          Chatea con FacturaGPT
        </p>
      ),
      desc: "Consulta métricas clave, genera reportes y resuelve dudas en cualquier momento, desde cualquier dispositivo. Tu asistente financiero siempre disponible.",
    },
    {
      title: (
        <p className={styles.solutionTextHeader}>
          <div className={styles.iconContainerSolutions}>
            <ImageIconWhite className={styles.iconSolutions} />
          </div>
          Análisis predictivos y comparativas
        </p>
      ),
      desc: "Usa el panel de control para obtener una visión general de tu negocio. Para un análisis avanzado, pídeselo a FacturaGPT y descubre patrones, anticipa problemas y toma decisiones estratégicas basadas en datos.",
    },
  ];

  return (
    <nav className={styles.navbar}>
      {showSolutions && isMobile ? (
        <div
          className={styles.buttonContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <HeaderCard
            title={"Soluciones"}
            setState={setShowSolutions}
            headerStyle={{
              width: "100%",
              background: "transparent",
              padding: "0",
            }}
          ></HeaderCard>
          {/* <button
          className={styles.toggleButton}
          onClick={(e) => {
            e.stopPropagation();
            setShowSolutions(false);
          }}
        >
          <ChevDown className={styles.icon} />
        </button> */}
        </div>
      ) : (
        <img
          onClick={() => navigate("/home")}
          src={facturaLogo}
          alt="FacturaGPT"
          className={styles.logo}
        />
      )}
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
            {["home", "soluciones", "contact", "pricing"].map((link, index) => (
              <div
                key={index}
                {...(link !== "soluciones"
                  ? { onClick: () => navigate(`/${link}`) }
                  : {})}
                className={`${
                  location.pathname.slice(1) !== link ? styles.disabledBtn : ""
                }`}
              >
                {link === "soluciones" ? (
                  <div
                    className={styles.solucionesWrapper}
                    onClick={(e) => {
                      e.stopPropagation();
                      isMobile && setShowSolutions(true);
                      setMenuOpen(false);
                    }}
                  >
                    <span className={styles.solucionesHover}>
                      {t(`item${index + 1}`)}
                      <ArrowGray className={styles.icon} />
                    </span>
                    <div
                      className={`${styles.solutionsContainer} ${
                        showSolutions
                          ? styles.display
                          : isMobile
                            ? styles.none
                            : ""
                      }`}
                    >
                      {/* {isMobile && (
                        <div
                          className={styles.buttonContainer}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <HeaderCard
                            title={"Soluciones"}
                            setState={setShowSolutions}
                            headerStyle={{
                              width: "100%",
                              background: "transparent",
                              padding: "0",
                            }}
                          ></HeaderCard>
                        
                        </div>
                      )} */}
                      <div className={styles.showGrid}>
                        {solutions.map((solution, index) => (
                          <div key={index}>
                            <p>{solution.title}</p>
                            <span>{solution.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.test}>{t(`item${index + 1}`)}</div>
                )}
              </div>
            ))}
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
