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
}) => {
  const getDocumentPrice = () => {
    if (sliderValue <= 10) return ""; // Hasta 20 documentos
    if (sliderValue <= 20) return "0,20"; // +20 documentos
    if (sliderValue <= 30) return "0,19"; // +200 documentos
    if (sliderValue <= 40) return "0,18"; // +500 documentos
    if (sliderValue <= 50) return "0,16"; // +1000 documentos
    if (sliderValue <= 60) return "0,15"; // +2.000 documentos
    if (sliderValue <= 70) return "0,13"; // +5.000 documentos
    if (sliderValue <= 80) return "0,11"; // +20.000 documentos
    if (sliderValue <= 90) return "0,09"; // +50.000 documentos
    return "0,05"; // +100.000 documentos
  };

  return (
    <div className={styles.pricingCardContainer}>
      <div className={styles.pricingBox}>
        <p className={styles.price}>
          <strong>{price}€ </strong>
          <span className={styles.perMonth}>/mes</span>
        </p>
        {priceTag && <span className={styles.priceTag}>{priceTag}</span>}
        {sliderValue > 10 && (
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
