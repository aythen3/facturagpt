import React from "react";
import styles from "./BillingSlider.module.css";
import star from "../../assets/star.svg";

const BillingSlider = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <img className={styles.star} src={star} alt="star" />
        Facturación
      </h1>
      <h3 className={styles.subtitle}>Media de documentos</h3>
      <div className={styles.sliderWrapper}>
        {/* Background Bar */}
        <div className={styles.backgroundBar}>
          {/* Filled Section */}
          <div className={styles.filledBar}></div>
          {/* Slider Thumb */}
          <div className={styles.thumb}></div>
        </div>

        {/* Labels */}
        <div className={styles.labels}>
          <span>1M</span>
          <span>2M</span>
          <span>5M</span>
          <span>10M</span>
          <span>20M</span>
        </div>
        <span className={styles.lastSpan}>+50M</span>
      </div>
    </div>
  );
};

export default BillingSlider;
