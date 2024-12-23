import React from "react";
import styles from "./PricingPlanCard.module.css";
import tick from "../../assets/pricingCardTick.svg";
const PricingPlanCard = ({
  title,
  price,
  documentPrices,
  features,
  priceTag,
}) => {
  return (
    <div className={styles.pricingCardContainer}>
      <div className={styles.pricingBox}>
        <p className={styles.price}>
          <strong>{price}€ </strong>
          <span className={styles.perMonth}>/mes</span>
        </p>
        {priceTag && <span className={styles.priceTag}>{priceTag}</span>}
        {documentPrices.map((docPrice, index) => (
          <p key={index} className={styles.docPrice}>
            {docPrice}
          </p>
        ))}
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
