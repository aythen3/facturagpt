import React from "react";
import styles from "./NavHeader.module.css";
import ayFolder from "../../assets/folderAy.svg";
import rightGreenArrow from "../../assets/rightGreenArrow.svg";

const NavHeader = () => {

  const handleScrollToFacturation = () => {
    const facturationElement = document.getElementById("facturation");
    if (facturationElement) {
      const rect = facturationElement.getBoundingClientRect();
      const offsetTop = rect.top + window.pageYOffset - (window.innerHeight / 2 - rect.height / 2);

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={styles.navHeaderContainer}>
      <div className={styles.navHeaderTitle}>Ahorra tiempo con</div>
      <div className={styles.navHeaderSubtitle}>
        Factura<span>GPT</span>
      </div>
      <img className={styles.ayFolderImage} src={ayFolder} alt="ayFolder" />
      <span className={styles.navHeaderDescription}>
        Escanea la facturación de tu empresa de forma automatica y automatiza
        tus procesos de venta.
      </span>
      <div className={styles.nextSteps}
       onClick={handleScrollToFacturation}
       style={{ cursor: "pointer" }} >¡Empieza ahora!</div>
    </div>
  );
};

export default NavHeader;
