import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import facturaLogo from "../../assets/FacturaLogoGreen.svg";
import styles from "./FreeTrial.module.css";
import openai from "../../assets/openaiIcon.svg";
import mail from "../../assets/emailIcon.svg";
import lock from "../../assets/lock.svg";
import { useTranslation } from "react-i18next";

const FreeTrial = () => {
  const { t } = useTranslation("freeTrial");
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <a href="/landing" id={styles.logo}>
          <img src={facturaLogo} alt="FacturaGPT" />
        </a>
        <div className={styles.btnContainer}>
          <button onClick={() => navigate("/register")}>
            <img src={mail} alt="Mail Icon" />
            {t("registerButton")}
          </button>
          <button>
            <img src={openai} alt="OpenAI Logo" className={styles.openaiLogo} />
            {t("loginAIButton")}
          </button>
        </div>
        <p>
          {t("optionLogin")} <a href="/login">{t("login")}</a>
        </p>

        <p className={styles.policy}>
          {t("termAndCon")}
          <a href="termsandconditions">{t("termAndConLink")}</a>
        </p>
        <p className={styles.safety}>
          <img src={lock} alt="Lock Icon" />
          {t("security")}
        </p>
      </div>
    </div>
  );
};

export default FreeTrial;
