import React from 'react';
import styles from './NavHeader.module.css';
import ayFolder from '../../assets/folderAy.svg';
import ArrowDown from '../../assets/ArrowDown.svg';
import flagIcon from '../../assets/flagIcon.svg';
import bombilla from '../../assets/bombilla.svg';
import plusIcon from '../../assets/plusIcon.svg';
import starIcon from '../../assets/starIcon.svg';
const NavHeader = () => {
  const handleScrollToFacturation = () => {
    const facturationElement = document.getElementById('facturation');
    if (facturationElement) {
      const rect = facturationElement.getBoundingClientRect();
      const offsetTop =
        rect.top +
        window.pageYOffset -
        (window.innerHeight / 2 - rect.height / 2);

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className={styles.navHeaderContainer}>
      <img
        src={bombilla}
        className={`${styles.iconfloat} ${styles.bombillaL}`}
      />
      <img
        src={plusIcon}
        className={`${styles.iconfloat} ${styles.plusIconL}`}
      />
      <img
        src={starIcon}
        className={`${styles.iconfloat} ${styles.starIconL}`}
      />
      <div className={styles.navHeaderTitle}>+3M de facturas automatizadas</div>
      <div className={styles.navHeaderSubtitle}>
        Factura<span>GPT</span>
      </div>
      <img
        className={`${styles.ayFolderImage} ${styles.ayFolder}`}
        src={ayFolder}
        alt='ayFolder'
      />
      <span className={styles.navHeaderDescription}>
        Digitaliza tu facturación de forma automática y automatiza tus procesos
        de venta para ahorrar tiempo y reducir el volumen de gestión documental.
      </span>
      <div
        className={styles.nextSteps}
        onClick={handleScrollToFacturation}
        style={{ cursor: 'pointer' }}
      >
        ¡Empieza ahora!
        <span>
          <img src={ArrowDown} alt='' />
        </span>
      </div>
    </div>
  );
};

export default NavHeader;
