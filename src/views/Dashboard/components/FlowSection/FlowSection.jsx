import React from "react";
import styles from "./FlowSection.module.css";
import { ReactComponent as EntradaIcon } from "../../assets/entradaIcon.svg";
import { ReactComponent as EstructuracionIcon } from "../../assets/estructuracionIcon.svg";
import { ReactComponent as SalidaIcon } from "../../assets/salidaIcon.svg";
import { ReactComponent as ArrowPointingTop } from "../../assets/arrowPointingTop.svg";
import { ReactComponent as ArrowPointingBottom } from "../../assets/arrowPointingBottom.svg";
const steps = () => [
  {
    icon: (
      <>
        <ArrowPointingTop className={`${styles.Arrow} ${styles.arrow1}`} />
        <EntradaIcon />
      </>
    ),
    title: "Entrada",
    description: "Configura tus cuentas donde recibas documentos.",
  },
  {
    icon: (
      <>
        <ArrowPointingBottom className={`${styles.Arrow} ${styles.arrow2}`} />
        <EstructuracionIcon />
      </>
    ),
    title: "Estructuración",
    description: "Reconocemos y organizamos todos los datos.",
  },
  {
    icon: (
      <>
        <ArrowPointingTop className={`${styles.Arrow} ${styles.arrow3}`} />
        <SalidaIcon />
        <ArrowPointingBottom className={`${styles.Arrow} ${styles.arrow4}`} />
      </>
    ),
    title: "Salida",
    description: "Los conectamos donde necesites y en el formato que sea.",
  },
];
const FlowSection = () => {
  return (
    <div className={styles.stepsContainer}>
      {steps().map((step, index) => (
        <div key={index} className={styles.steps}>
          <div className={styles.iconContainer}>{step.icon}</div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FlowSection;
