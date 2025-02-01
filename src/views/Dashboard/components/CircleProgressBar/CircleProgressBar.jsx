import React from "react";
import styles from "./CircleProgressBar.module.css"; // Asegúrate de importar los estilos

const CircleProgressBar = () => {
  const skills = [
    { id: 1, percentage: "+90%", label: "De ahorro en tiempo" },
    { id: 2, percentage: "+80%", label: "Optimización del trabajo" },
    { id: 2, percentage: "+90%", label: "Mejora la productividad" },
    { id: 2, percentage: "-70%", label: "Errores humanos" },
  ];
  const progressClasses = [styles.pg0, styles.pg1, styles.pg2, styles.pg3];

  return (
    <section className={styles.CircleProgressSection}>
      <div className={styles.CircleProgress}>
        {skills.map((skill, index) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: "1",
              gap: "10px",
            }}
            className={styles.cardPBContainer}
          >
            <div key={skill.id} className={`${styles.skill} `}>
              <div className={styles.outer}>
                <div className={styles.inner}>
                  <div id={styles.number}>{skill.percentage}</div>
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="160px"
                height="160px"
                id={styles.ProgressBarCircle}
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#e91e63" />
                    <stop offset="100%" stopColor="#673ab7" />
                  </linearGradient>
                </defs>
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  strokeLinecap="round"
                  className={progressClasses[index]}
                />
              </svg>
            </div>
            <div className={styles.label}>{skill.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CircleProgressBar;
