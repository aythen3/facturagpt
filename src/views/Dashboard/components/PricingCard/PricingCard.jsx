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
  setFacturasTotales,
}) => {
  const handleClick = () => {
    setSelectedCard(index); // Actualiza la card seleccionada
    setFacturasTotales(min); // Actualiza las facturas directamente al hacer clic
    console.log('Card clicked:', index, 'Min value set:', min);
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
    { title: '200 Documentos', price: '0,19', min: 200, max: 499 },
    { title: '+500 Documentos', price: '0,18', min: 500, max: 999 },
    { title: '+1000 Documentos', price: '0,16', min: 1000, max: 1999 },
    { title: '+2.000 Documentos', price: '0,15', min: 2000, max: 4999 },
    { title: '+5.000 Documentos', price: '0,13', min: 5000, max: 9999 },
    { title: '+10.000 Documentos', price: '0,12', min: 10000, max: 19999 },
    { title: '+20.000 Documentos', price: '0,11', min: 20000, max: 100000 },
  ];

  useEffect(() => {
    const matchingIndex = cardsData.findIndex(
      (card) => facturasTotales >= card.min && facturasTotales <= card.max
    );
    if (matchingIndex !== -1) {
      setSelectedCard(matchingIndex);
    }
  }, [facturasTotales]);

  useEffect(() => {
    console.log('Selected card updated:', selectedCard);
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
    const walk = (x - startX) * 1.5; // Controla la velocidad del scroll
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
        />
      ))}
    </div>
  );
};

export default PricingCards;
