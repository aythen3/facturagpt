import React, { useEffect, useRef, useState } from 'react';
import styles from './PricingCard.module.css';

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
}) => {
  const handleClick = () => {
    setSelectedCard(index);
    const validSlidingValue = Number(sliding);
    if (!isNaN(validSlidingValue)) {
      setSliderValue(validSlidingValue);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.card} ${selectedCard ? styles.selectedCard : ''}`}
    >
      <div
        className={`${styles.cardHeader} ${selectedCard ? styles.selectedCardHeader : ''}`}
      >
        {title}
      </div>
      <div className={styles.cardBody}>
        <p
          className={`${styles.price} ${selectedCard ? styles.selectedPrice : ''}`}
        >
          {price}€
        </p>
        <span className={styles.subText}>POR DOCUMENTO</span>
        <button
          className={`${styles.button} ${selectedCard ? styles.selectedButton : ''}`}
        >
          Buy Now
        </button>
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
  const [selectedCard, setSelectedCard] = useState(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cardsData = [
    {
      title: 'Hasta 20 Documentos',
      price: 'FREE',
      min: 0,
      max: 0,
      sliding: 0,
    },
    {
      title: '+2.000 Documentos',
      price: '0,15',
      min: 1000000,
      max: 4999999,
      sliding: 1000000,
    },
    {
      title: '+5.000 Documentos',
      price: '0,14',
      min: 5000000,
      max: 9999999,
      sliding: 5000000,
    },
    {
      title: '+10.000 Documentos',
      price: '0,13',
      min: 10000000,
      max: 19999999,
      sliding: 10000000,
    },
    {
      title: '+20.000 Documentos',
      price: '0,12',
      min: 20000000,
      max: 49999999,
      sliding: 20000000,
    },
    {
      title: '+50.000 Documentos',
      price: '0,11',
      min: 50000000,
      max: 100000000,
      sliding: 50000000,
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
          behavior: 'smooth',
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
      style={{ overflowX: 'auto', cursor: isDragging ? 'grabbing' : 'grab' }}
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
        />
      ))}
    </div>
  );
};

export default PricingCards;
