import React, { useState, useEffect } from 'react';
import styles from './Pricing.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { plansData } from './plans';
import PricingPlanCard from '../../components/PricingPlanCard/PricingPlanCard';
import { PricingCard } from '../../components/PricingCard/PricingCard';
import star from '../../assets/star.svg';
import topTrustpilotStar from '../../assets/topTrustpilotStar.svg';
import bottomTrustpilotStar from '../../assets/bottomTrustpilotStar.svg';
import googleLogo from '../../assets/googleLogo.svg';
import googleStar from '../../assets/googleStar.svg';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(20);
  const [selectedCard, setSelectedCard] = useState(9);
  const [currentPlan, setCurrentPlan] = useState({
    documents: '+100.000 Documentos',
    price: '0,05',
  });

  const cardsData = [
    { title: 'Hasta 20 Documentos', price: 'FREE' },
    { title: '+20 Documentos', price: '0,20' },
    { title: '+200 Documentos', price: '0,19' },
    { title: '+500 Documentos', price: '0,18' },
    { title: '+1000 Documentos', price: '0,16' },
    { title: '+2.000 Documentos', price: '0,15' },
    { title: '+5.000 Documentos', price: '0,13' },
    { title: '+10.000 Documentos', price: '0,12' },
    { title: '+20.000 Documentos', price: '0,11' },
    { title: '+50.000 Documentos', price: '0,09' },
    { title: '+100.000 Documentos', price: '0,05' },
  ];
  const cards = [
    'Card 1',
    'Card 2',
    'Card 3',
    'Card 4',
    'Card 5',
    'Card 6',
    'Card 7',
    'Card 8',
    'Card 9',
    'Card 10',
    'Card 11',
  ];
  useEffect(() => {
    const index = Math.min(Math.floor(sliderValue / 10), cardsData.length - 1);
    const card = cardsData[index];
    if (card) {
      setCurrentPlan({
        documents: card.title,
        price: card.price,
      });
      setSelectedCard(index);
    }
  }, [sliderValue]);

  const handleSliderChange = (event) => {
    setSliderValue(Number(event.target.value));
  };

  const getSelectedPlanIndex = () => {
    console.log(sliderValue);
    if (sliderValue <= 10) return 0;
    if (sliderValue <= 50) return 1;
    if (sliderValue <= 70) return 2;
    if (sliderValue <= 94) return 3;
    return 4;
  };

  const selectedPlanIndex = getSelectedPlanIndex();
  const selectedPlan = plansData[selectedPlanIndex];

  const calculateProgress = () => {
    const min = 0;
    const max = 100;
    return ((sliderValue - min) / (max - min)) * 100; // Calcula el progreso en porcentaje
  };

  return (
    <div className={styles.pricingContainer}>
      <Navbar />
      <div className={styles.test}>
        <div className={styles.plansHeader}>
          <h1 className={styles.plansTitle}>Planes de precios</h1>
          <p className={styles.plansSubtitle}>
            Elige el mejor plan que se adapte a tus necesidades.
          </p>
          <p className={styles.currentPlan}>{currentPlan.documents}/mes</p>
          <input
            type='range'
            min='0'
            max='100'
            value={sliderValue}
            onChange={handleSliderChange}
            className={styles.slider}
            style={{
              background: `linear-gradient(to right, #16c098 ${calculateProgress()}%, rgba(91, 123, 253, 0.15) ${calculateProgress()}%)`,
            }}
          />
        </div>
        <div className={styles.plansCardsContainer}>
          <PricingPlanCard
            key={selectedPlanIndex}
            title={selectedPlan.title}
            price={selectedPlan.price}
            priceTag={selectedPlan.priceTag}
            documentPrices={selectedPlan.documentPrices}
            features={selectedPlan.features}
            isSelected={true}
            sliderValue={sliderValue}
          />
        </div>
      </div>
      <span className={styles.microText}>
        Impuestos indirectos no incluidos. Sin gastos de instalación. Cancela en
        cualquier momento.
      </span>
      <span className={styles.lightText}>
        Las empresas tardan entre 2 y 5 minutos en gestionar una factura. Con
        FacturaGPT, lo haces en segundos...
      </span>
      <div className={styles.parent}>
        {cardsData.map((card, index) => (
          <div className={styles[`div${index + 1}`]}>
            <PricingCard
              key={index}
              title={card.title || 'Hasta 20 Documentos'}
              price={card.price || 'FREE'}
              setSelectedCard={setSelectedCard}
            />
          </div>
        ))}
      </div>

      <h1 className={styles.pricingStarText}>
        <img className={styles.star} src={star} alt='star' />
        Valoración
      </h1>
      <span className={styles.lightTextSecondary}>
        Escríbenos un email, una reseña en Google, una postal, o incluso puedes
        donar para ayudar a crear más funcionalidades.
      </span>

      <div className={styles.trustContainer}>
        <div className={styles.googleCard}>
          <div className={styles.starsContainer}>
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt='googleStar'
            />
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt='googleStar'
            />
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt='googleStar'
            />
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt='googleStar'
            />
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt='googleStar'
            />
          </div>
          <img className={styles.googleLogo} src={googleLogo} alt='google' />
        </div>
        <div className={styles.trustpilotCard}>
          <div className={styles.topContainer}>
            <img
              className={styles.topTrustpilotStar}
              src={topTrustpilotStar}
              alt='topTrustpilotStar'
            />
            Trustpilot
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.trustpilotBottomStars}>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt='bottomTrustpilotStar' />
              </div>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt='bottomTrustpilotStar' />
              </div>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt='bottomTrustpilotStar' />
              </div>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt='bottomTrustpilotStar' />
              </div>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt='bottomTrustpilotStar' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className={styles.greenLightText}>
        No te olvides, si ha sido útil, escribe una reseña.
      </span>

      <h1 className={styles.reviewsTitle}>¡Únase a nosotros hoy!</h1>
      <span className={styles.reviewsDescriptionLast}>
        Estás un paso más cerca de obtener el mejor servicio...
      </span>
      <button
        className={styles.startButton}
        onClick={() => navigate('/freetrial')}
      >
        Probar Gratis
      </button>
    </div>
  );
};

export default Pricing;
