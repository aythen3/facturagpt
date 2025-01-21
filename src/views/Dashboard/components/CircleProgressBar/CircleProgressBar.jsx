import React from "react";
import styles from "./CircleProgressBar.module.css"; // Asegúrate de importar los estilos

const data = [
  { text: "De ahorro en tiempo", percentage: "+90%" },
  { text: "Optimización del trabajo", percentage: "+80%" },
  { text: "Mejora la productividad", percentage: "+90%" },
  { text: "Errores humanos", percentage: "-70%" },
];
const progressClasses = [styles.pg0, styles.pg1, styles.pg2, styles.pg3];

const CircleProgressBar = () => {
  return (
    <div className={styles.cpb}>
      {data.map((item, index) => (
        <div key={index} className={styles.circleProgressBarContainer}>
          <div className={styles.circular}>
            <div className={styles.inner}></div>
            <div className={styles.numb}>{item.percentage}</div>
            <div className={styles.circle}>
              <div className={`${styles.bar} ${styles.left}`}>
                <div className={`${styles.progress} `}></div>
              </div>
              <div
                className={`${styles.bar} ${styles.right} ${progressClasses[index]}`}
              >
                <div className={styles.progress}></div>
              </div>
            </div>
          </div>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default CircleProgressBar;
