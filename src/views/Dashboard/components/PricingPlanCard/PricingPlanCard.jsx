import React from "react";
import styles from "./PricingPlanCard.module.css";
import tick from "../../assets/pricingCardTick.svg";

const PricingPlanCard = ({
  title,
  price,
  documentPrices,
  features,
  priceTag,
  sliderValue,
  monthlyPrice,
}) => {
  const getDocumentPrice = () => {
    if (sliderValue <= 10) return "0";
    if (sliderValue <= 20) return "0,20";
    if (sliderValue <= 30) return "0,19";
    if (sliderValue <= 40) return "0,18";
    if (sliderValue <= 50) return "0,16";
    if (sliderValue <= 60) return "0,15";
    if (sliderValue <= 70) return "0,13";
    if (sliderValue <= 80) return "0,11";
    if (sliderValue <= 90) return "0,09";
    return (
      documentPrices.find((item) => item.documents === sliderValue)?.price || 0
    );
  };

  return (
    <div className={styles.pricingCardContainer}>
      <div className={styles.pricingBox}>
        {monthlyPrice < 5000 ? (
          <p className={styles.price}>
            <strong>{monthlyPrice}€ </strong>
            <span className={styles.perMonth}>/mes</span>
          </p>
        ) : (
          <p className={styles.price}>
          <strong>-€ </strong>
          <span className={styles.perMonth}>/mes</span>
        </p>
        )}
        {priceTag && <span className={styles.priceTag}>{priceTag}</span>}
        {sliderValue < 91 && (
          <p className={styles.docPrice}>{getDocumentPrice()}€ por documento</p>
        )}
      </div>
      <div className={styles.planDetails}>
        <h2 className={styles.planTitle}>
          Plan <strong>{title}</strong>
        </h2>
        <ul className={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <img src={tick} alt="tick" />
              {feature}
            </li>
          ))}
        </ul>
        <button className={styles.button}>Comience su prueba gratuita</button>
      </div>
    </div>
  );
};

export default PricingPlanCard;
