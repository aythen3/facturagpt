import React, { useState } from "react";
import styles from "./Pricing.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { plansData } from "./plans";
import PricingPlanCard from "../../components/PricingPlanCard/PricingPlanCard";
import { PricingCard } from "../../components/PricingCard/PricingCard";
import star from "../../assets/star.svg";
import topTrustpilotStar from "../../assets/topTrustpilotStar.svg";
import bottomTrustpilotStar from "../../assets/bottomTrustpilotStar.svg";
import googleLogo from "../../assets/googleLogo.svg";
import googleStar from "../../assets/googleStar.svg";

const Pricing = () => {
  const [selectedCard, setSelectedCard] = useState(3);
  const cardsData = [
    { title: "Hasta 20 Documentos", price: "FREE" },
    { title: "+20 Documentos", price: "0,20" },
    { title: "+200 Documentos", price: "0,19" },
    { title: "+500 Documentos", price: "0,18" },
    { title: "+1000 Documentos", price: "0,16" },
    { title: "+2.000 Documentos", price: "0,15" },
    { title: "+5.000 Documentos", price: "0,13" },
    { title: "+20.000 Documentos", price: "0,11" },
    { title: "+50.000 Documentos", price: "0,09" },
    { title: "+100.000 Documentos", price: "0,05" },
  ];

  return (
    <div className={styles.pricingContainer}>
      <Navbar />
      <div className={styles.plansHeader}>
        <h1 className={styles.plansTitle}>Planes de precios</h1>
        <p className={styles.plansSubtitle}>
          Elige el mejor plan que se adapte a tus necesidades.
        </p>
        <div className={styles.backgroundBar}>
          <div className={styles.filledBar}></div>
          <div className={styles.thumb}></div>
          <div className={styles.absoluteText}>+100.000 Documentos/mes</div>
        </div>
      </div>
      <div className={styles.plansCardsContainer}>
        {plansData.map((plan, index) => (
          <PricingPlanCard
            key={index}
            title={plan.title}
            price={plan.price}
            priceTag={plan.priceTag}
            documentPrices={plan.documentPrices}
            features={plan.features}
          />
        ))}
      </div>
      <span className={styles.microText}>
        Impuestos indirectos no incluidos. Sin gastos de instalación. Cancela en
        cualquier momento.
      </span>
      <span className={styles.lightText}>
        Las empresas tardan entre 2 y 5 minutos en gestionar una factura. Con
        FacturaGPT, lo haces en segundos...
      </span>

      <div className={styles.cardContainer}>
        {cardsData.map((card, index) => (
          <PricingCard
            fromPricing={true}
            key={index}
            index={index}
            selectedCard={selectedCard === index}
            setSelectedCard={setSelectedCard}
            title={card.title}
            price={card.price}
          />
        ))}
      </div>
      <h1 className={styles.pricingStarText}>
        <img className={styles.star} src={star} alt="star" />
        Facturación
      </h1>
      <span className={styles.lightTextSecondary}>
        Escríbenos un email, una reseña en Google, una postal, o incluso puedes
        donar para ayudar a crear más funcionalidades.
      </span>

      {/* aca google y trust */}
      <div className={styles.trustContainer}>
        <div className={styles.googleCard}>
          <div className={styles.starsContainer}>
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt="googleStar"
            />
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt="googleStar"
            />
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt="googleStar"
            />
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt="googleStar"
            />
            <img
              className={styles.topTrustpilotStar}
              src={googleStar}
              alt="googleStar"
            />
          </div>
          <img className={styles.googleLogo} src={googleLogo} alt="google" />
        </div>
        <div className={styles.trustpilotCard}>
          <div className={styles.topContainer}>
            <img
              className={styles.topTrustpilotStar}
              src={topTrustpilotStar}
              alt="topTrustpilotStar"
            />
            Trustpilot
          </div>
          <div className={styles.bottomContainer}>
            <span>Excellent</span>
            <div className={styles.trustpilotBottomStars}>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt="bottomTrustpilotStar" />
              </div>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt="bottomTrustpilotStar" />
              </div>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt="bottomTrustpilotStar" />
              </div>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt="bottomTrustpilotStar" />
              </div>
              <div className={styles.trustStarContainer}>
                <img src={bottomTrustpilotStar} alt="bottomTrustpilotStar" />
              </div>
            </div>
            <div className={styles.bottomText}>
              Based on <span>456 reviews</span>
            </div>
          </div>
        </div>
      </div>
      <span className={styles.greenLightText}>
        No te olvides, si ha sido útil, escribe una reseña.
      </span>
      {/* aca google y trust */}

      <h1 className={styles.reviewsTitle}>¡Únase a nosotros hoy!</h1>
      <span className={styles.reviewsDescriptionLast}>
        Estás un paso más cerca de obtener el mejor servicio...
      </span>
      <button className={styles.startButton}>Comience ahora</button>
    </div>
  );
};

export default Pricing;
