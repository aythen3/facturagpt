import React from "react";
import styles from "./LinesLandingSection.module.css";
import { ReactComponent as LinesLandingSectionImg } from "../../assets/linesLandingSection.svg";
import { ReactComponent as ArrowDiagonal } from "../../assets/arrowDiagonalWhite.svg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const LinesLandingSection = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.linesContainer}>
      {/* {icons.map(({ Component, uniqueClass }, index) => (
        <Component key={index} className={`${styles.logo} ${uniqueClass}`} />
      ))} */}
      <h3>
        Una suite completa con funciones avanzadas de análisis, alertas y
        automatización.
      </h3>
      <div className={styles.imgContainerLines}>
        {" "}
        <LinesLandingSectionImg />
      </div>
      {/* <div className={styles.linesContent}>
        <Lines className={styles.lines} />
        <div className={styles.LinesLogoContainer}>
          <LogoGPT className={styles.logo} />
        </div>
        <Lines className={styles.linesR} />
      </div> */}
      <p>¿No encuentras tu conexión?</p>
      <Button
        headerStyle={{
          borderRadius: "999px",
          background: "#10a37e68",
          alignItems: "center",
          display: "flex",
          gap: "10px",
        }}
        action={() => navigate("/contact")}
      >
        Contacta con ventas <ArrowDiagonal style={{ height: "8px" }} />
      </Button>
    </section>
  );
};

export default LinesLandingSection;
