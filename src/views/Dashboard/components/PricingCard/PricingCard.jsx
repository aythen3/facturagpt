import React, { useEffect, useRef, useState } from "react";
import styles from "./PricingCard.module.css";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export const PricingCard = ({
  title,
  price,
  selectedCard,
  setSelectedCard,
  index,
  min,
  sliderValue,
  setSliderValue,
  setFacturasTotales,
  sliding,
  buyBtn = true,
  compareSelected = false,
}) => {
  const { t } = useTranslation("pricingCard");
  const handleClick = () => {
    setSelectedCard(index);
    console.log(index);
    const validSlidingValue = Number(sliding);
    if (!isNaN(validSlidingValue)) {
      setSliderValue(validSlidingValue);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.card} ${styles.cardsPricing} ${compareSelected ? (selectedCard === index ? `${styles.selectedCard} ` : "") : selectedCard ? styles.selectedCard : ""}`}
    >
      <div
        className={`${styles.cardHeader} ${compareSelected ? (selectedCard === index ? styles.selectedCardHeader : "") : selectedCard ? styles.selectedCardHeader : ""}`}
      >
        {title}
      </div>
      <div className={styles.cardBody}>
        <p
          className={`${styles.price} ${compareSelected ? (selectedCard === index ? styles.selectedPrice : "") : selectedCard ? styles.selectedPrice : ""}`}
        >
          {price}
          {price !== "FREE" && price !== "GRATIS" && "€"}
        </p>
        <span className={styles.subText}>{t("items")}</span>
        {buyBtn && (
          <button
            className={`${styles.button} ${compareSelected ? (selectedCard === index ? styles.selectedButton : "") : selectedCard ? styles.selectedButton : ""}`}
          >
            {t("purchase")}
          </button>
        )}
      </div>
    </div>
  );
};

const PricingCards = ({
  facturasTotales,
  setSliderValue,
  sliderValue,
  setFacturasTotales,
}) => {
  const { t } = useTranslation("pricingCard");
  const [selectedCard, setSelectedCard] = useState(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cardsData = [
    {
      title: t("title1"),
      price: t("price1"),
      min: 0,
      max: 0,
      sliding: 0,
    },
    {
      title: t("title2"),
      price: t("price2"),
      min: 20,
      max: 199,
      sliding: 20,
    },
    {
      title: t("title3"),
      price: t("price3"),
      min: 200,
      max: 499,
      sliding: 200,
    },
    {
      title: t("title4"),
      price: t("price4"),
      min: 500,
      max: 999,
      sliding: 500,
    },
    {
      title: t("title5"),
      price: t("price5"),
      min: 1000,
      max: 1999,
      sliding: 1000,
    },
    {
      title: t("title6"),
      price: t("price6"),
      min: 2000,
      max: 4999,
      sliding: 2000,
    },
    {
      title: t("title7"),
      price: t("price7"),
      min: 5000,
      max: 9999,
      sliding: 5000,
    },
    {
      title: t("title8"),
      price: t("price8"),
      min: 10000,
      max: 19999,
      sliding: 10000,
    },
    {
      title: t("title9"),
      price: t("price9"),
      min: 20000,
      max: 49999,
      sliding: 20000,
    },
    {
      title: t("title10"),
      price: t("price10"),
      min: 50000,
      max: 99999,
      sliding: 50000,
    },
    {
      title: t("title11"),
      price: t("price11"),
      min: 100000,
      max: 5000000,
      sliding: 100000,
    },
  ];

  useEffect(() => {
    cardsData.forEach((card, index) => {
      if (sliderValue >= card.min && sliderValue <= card.max) {
        setSelectedCard(index);
      }
    });
  }, [sliderValue, cardsData]);

  useEffect(() => {
    if (containerRef.current && selectedCard !== null) {
      const selectedCardElement = containerRef.current.children[selectedCard];
      if (selectedCardElement) {
        containerRef.current.scrollTo({
          left:
            selectedCardElement.offsetLeft -
            containerRef.current.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [selectedCard]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    setSelectedCard(0);
  }, []);

  return (
    <div
      className={styles.cardContainer}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ overflowX: "auto", cursor: isDragging ? "grabbing" : "grab" }}
    >
      {cardsData.map((card, index) => (
        <PricingCard
          key={index}
          index={index}
          selectedCard={selectedCard === index}
          setSelectedCard={setSelectedCard}
          title={card.title}
          price={card.price}
          min={card.min}
          sliderValue={sliderValue}
          setFacturasTotales={setFacturasTotales}
          setSliderValue={setSliderValue}
          sliding={card.sliding}
          compareSelected={false}
        />
      ))}
    </div>
  );
};

export default PricingCards;
