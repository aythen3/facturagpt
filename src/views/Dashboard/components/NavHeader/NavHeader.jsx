import React from 'react';
import starIcon from '../../assets/starGroup.svg';
import logo from '../../assets/facturaLogoIcon.svg';
import styles from './NavHeader.module.css';
import ArrowDown from '../../assets/ArrowDown.svg';

import { useTranslation } from 'react-i18next';
const NavHeader = () => {
  const { t } = useTranslation('navBarHeader');

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
      <img src={logo} alt='FacturaGPT Logo' />
      <div className={styles.navHeaderTitle}>{t('publicity')}</div>
      <div className={styles.navHeaderSubtitle}>
        <span className={styles.factura}>Factura</span>
        <span className={styles.gpt}>GPT</span>
      </div>

      <img
        src={starIcon}
        className={`${styles.iconfloat} ${styles.starIconR} `}
      />

      <span className={styles.navHeaderDescription}>{t('description')}</span>
      <div
        className={styles.nextSteps}
        onClick={handleScrollToFacturation}
        style={{ cursor: 'pointer' }}
      >
        {t('invitation')}
        <span>
          <img src={ArrowDown} alt='' />
        </span>
      </div>
    </div>
  );
};

export default NavHeader;
