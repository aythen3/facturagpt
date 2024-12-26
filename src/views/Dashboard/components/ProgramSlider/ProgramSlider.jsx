import React, { useState } from 'react';
import styles from './ProgramSlider.module.css';
import arrow from '../../assets/arrowRight.svg';
import check from '../../assets/checkProgram.svg';
const ProgramSlider = ({ programs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + programs.length) % programs.length
    );
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === programs.length - 1;

  return (
    <div className={styles.slider}>
      <button
        className={`${styles.button} ${isPrevDisabled ? styles.hidden : ''}`}
        onClick={handlePrev}
        disabled={isPrevDisabled}
      >
        <img src={arrow} className={styles.arrowLeft} />
      </button>
      <div className={styles.programsContainer}>
        {programs.map((program, index) => {
          let className = styles.inactive;

          if (index === currentIndex) {
            className =
              direction === 'right' ? styles.enterRight : styles.enterLeft;
          } else if (
            index ===
            (currentIndex - 1 + programs.length) % programs.length
          ) {
            className =
              direction === 'right' ? styles.exitLeft : styles.exitRight;
          }

          return (
            <div key={index} className={`${styles.program} ${className}`}>
              <img
                src={program.logo}
                alt={program.name}
                className={styles.logo}
              />
              <h3 className={styles.name}>{program.name}</h3>
              <div className={styles.descriptionContainer}>
                {program.description.map((description, index) => (
                  <span className={styles.description}>
                    <img src={check} alt='' />
                    {description}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className={`${styles.button} ${isNextDisabled ? styles.hidden : ''}`}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        <img src={arrow} />
      </button>
    </div>
  );
};

export default ProgramSlider;
