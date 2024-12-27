import React, { useState, useRef, useEffect } from 'react';
import styles from './Carousel.module.css';
import { FaStar } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { reviews } from './reviews';
import rightTicks from '../../assets/rightTicks.svg';
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const cardsRef = useRef();

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 900);
  };

  useEffect(() => {
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const transitionEnd = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(transitionEnd);
  }, [currentIndex]);

  const translateX = isMobile
    ? -currentIndex * 85
    : -(currentIndex - 1) * (100 / 3);

  return (
    <div className={styles.reviewContainer} initial='hidden' animate='visible'>
      <div className={styles.carousel}>
        <div
          className={styles.cardsContainer}
          ref={cardsRef}
          style={{
            transform: `translateX(${translateX}%)`,
            transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`${styles.card} ${
                index === currentIndex ? styles.activeCard : ''
              }`}
            >
              <p className={styles.text}>{review.text}</p>
              <div className={styles.cardContent}>
                <div className={styles.image} />
                <div>
                  <h3 className={styles.clientName}>{review.name}</h3>
                  <div className={styles.stars}>
                    {Array(review.stars)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                </div>
                <img src={rightTicks} alt='rightTicks' />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button className={styles.controlButton} onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        <button className={styles.controlButton} onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
