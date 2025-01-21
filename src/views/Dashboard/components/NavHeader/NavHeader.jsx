import React from "react";
import starIcon from "../../assets/starGroup.svg";
import logo from "../../assets/FacturaLogoIconGreen.svg";
import styles from "./NavHeader.module.css";
import ArrowDown from "../../assets/ArrowDown.svg";

import { useTranslation } from "react-i18next";
import FreeTrialButton from "../FreeTrialButton/FreeTrialButton";
const NavHeader = () => {
  const { t } = useTranslation("navBarHeader");

  const handleScrollToFacturation = () => {
    const facturationElement = document.getElementById("facturation");
    if (facturationElement) {
      const rect = facturationElement.getBoundingClientRect();
      const offsetTop =
        rect.top +
        window.pageYOffset -
        (window.innerHeight / 2 - rect.height / 2);

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={styles.navHeaderContainer}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "35px",
        }}
      >
        <img src={logo} alt="FacturaGPT Logo" className={styles.logo} />
        <div className={styles.navHeaderTitle}>{t("publicity")}</div>
        <div className={styles.navHeaderSubtitle}>
          <span className={styles.factura}>Factura</span>
          <span className={styles.gpt}>GPT</span>
        </div>
      </div>
      <img
        src={starIcon}
        className={`${styles.iconfloat} ${styles.starIconR} `}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span className={styles.navHeaderDescription}>{t("description")}</span>
        <FreeTrialButton />
      </div>
    </div>
  );
};

export default NavHeader;
