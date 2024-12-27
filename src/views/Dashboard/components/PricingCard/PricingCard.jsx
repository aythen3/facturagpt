import React, { useRef, useState } from 'react';
import styles from './PricingCard.module.css';

export const PricingCard = ({
  title,
  price,
  selectedCard,
  setSelectedCard,
  index,
}) => {
  return (
    <div
      onClick={() => setSelectedCard(index)}
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

const PricingCards = () => {
  const [selectedCard, setSelectedCard] = useState(2);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cardsData = [
    { title: '200 Documentos', price: '0,19' },
    { title: '+500 Documentos', price: '0,18' },
    { title: '+1000 Documentos', price: '0,16' },
    { title: '+2.000 Documentos', price: '0,15' },
    { title: '+5.000 Documentos', price: '0,13' },
    { title: '+10.000 Documentos', price: '0,12' },
    { title: '+20.000 Documentos', price: '0,11' },
  ];

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
        />
      ))}
    </div>
  );
};

export default PricingCards;
