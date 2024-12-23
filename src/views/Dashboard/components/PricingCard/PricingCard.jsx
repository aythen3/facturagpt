import React, { useState } from "react";
import styles from "./PricingCard.module.css";

export const PricingCard = ({
  title,
  price,
  selectedCard,
  setSelectedCard,
  index,
  fromPricing,
}) => {
  return (
    <div
      onClick={() => setSelectedCard(index)}
      className={`${styles.card} ${selectedCard ? styles.selectedCard : ""}`}
    >
      <div
        className={`${fromPricing ? styles.cardHeaderPricing : styles.cardHeader} ${selectedCard ? styles.selectedCardHeader : ""}`}
      >
        {title}
      </div>
      <div className={styles.cardBody}>
        <p
          className={`${styles.price} ${selectedCard ? styles.selectedPrice : ""}`}
        >
          {price}€
        </p>
        <span className={`${styles.subText}`}>POR DOCUMENTO</span>
        <button
          className={`${styles.button} ${selectedCard ? styles.selectedButton : ""}`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

const PricingCards = () => {
  const [selectedCard, setSelectedCard] = useState(2);
  const cardsData = [
    { title: "200 Documentos", price: "0,19" },
    { title: "+500 Documentos", price: "0,18" },
    { title: "+1000 Documentos", price: "0,16" },
    { title: "+2.000 Documentos", price: "0,15" },
    { title: "+5.000 Documentos", price: "0,13" },
    { title: "+20.000 Documentos", price: "0,11" },
  ];

  return (
    <div className={styles.cardContainer}>
      {cardsData.map((card, index) => (
        <PricingCard
          key={index}
          index={index}
          selectedCard={selectedCard === index}
          setSelectedCard={setSelectedCard}
          title={card.title}
          price={card.price}
        />
      ))}
    </div>
  );
};

export default PricingCards;
