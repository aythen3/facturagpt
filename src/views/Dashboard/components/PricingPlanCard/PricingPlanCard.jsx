import React from "react";
import styles from "./PricingPlanCard.module.css";
import tick from "../../assets/pricingCardTick.svg";
import { useNavigate } from "react-router-dom";
const PricingPlanCard = ({
  title,
  price,
  documentPrices,
  features,
  priceTag,
  sliderValue,
  documentos,
}) => {
  const navigate = useNavigate();
  const getDocumentPrice = () => {
    if (sliderValue <= 9) return 0;
    if (sliderValue <= 20) return 0.2;
    if (sliderValue <= 30) return 0.19;
    if (sliderValue <= 40) return 0.18;
    if (sliderValue <= 49) return 0.16;
    if (sliderValue <= 69) return 0.15;
    if (sliderValue <= 70) return 0.13;
    if (sliderValue <= 80) return 0.11;
    if (sliderValue <= 94) return 0.09;
    return 0.05;
  };
  const documentPrice = getDocumentPrice();
  const calculatePrice = () => {
    // if (sliderValue <= 10) return "0,00";
    if (sliderValue > 94) return "¿Aún más?";
    console.log(sliderValue);
    if (sliderValue <= 9) return 0;
    if (sliderValue <= 20) return "3.99";
    if (sliderValue <= 30) return "3.80";
    if (sliderValue <= 40) return "3.60";
    if (sliderValue <= 49) return "3.20";
    if (sliderValue <= 69) return "299";
    if (sliderValue <= 70) return "259";
    if (sliderValue <= 80) return "2,199.00";
    if (sliderValue <= 94) return "1,799.00";
    // console.log((documentos * documentPrice).toFixed(2).replace('.', ','));
    // return (documentos * documentPrice).toFixed(2).replace('.', ',');
    return price;
  };

  const calculatedPrice = calculatePrice();

  return (
    <div className={styles.pricingCardContainer}>
      <div className={styles.pricingBox}>
        <p className={styles.price}>
          <strong>
            {calculatedPrice === "¿Aún más?"
              ? calculatedPrice
              : `${calculatedPrice}€`}{" "}
          </strong>
          {calculatedPrice !== "¿Aún más?" && (
            <span className={styles.perMonth}>/mes</span>
          )}
        </p>
        {priceTag && <span className={styles.priceTag}>{priceTag}</span>}
        {sliderValue > 9 && sliderValue <= 94 && (
          <p className={styles.docPrice}>
            {getDocumentPrice().toFixed(2)}€ por documento
          </p>
        )}
      </div>
      <div className={styles.planDetails}>
        {title !== "¿Aún más?" ? (
          <h2 className={styles.planTitle}>
            Plan <strong>{title}</strong>
          </h2>
        ) : (
          ""
        )}
        <ul className={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <img src={tick} alt="tick" />
              {feature}
            </li>
          ))}
        </ul>
        <button
          className={styles.button}
          onClick={() => navigate("/freetrial")}
        >
          Comience su prueba gratuita
        </button>
      </div>
    </div>
  );
};

export default PricingPlanCard;
