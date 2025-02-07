import React, { useState, useEffect } from "react";
import styles from "./Pricing.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { plansData } from "./plans";
import PricingPlanCard from "../../components/PricingPlanCard/PricingPlanCard";
import { PricingCard } from "../../components/PricingCard/PricingCard";
import star from "../../assets/star.svg";
import diagonalArrow from "../../assets/diagonalArrow.svg";
import topTrustpilotStar from "../../assets/topTrustpilotStar.svg";
import bottomTrustpilotStar from "../../assets/bottomTrustpilotStar.svg";
import googleLogo from "../../assets/googleLogo.svg";
import googleStar from "../../assets/googleStar.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CookiePopup from "../../components/CookiePopup/CookiePopup";
import SubtitleTemplate from "../../components/SubtitleTemplate/SubtitleTemplate";

const Pricing = () => {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(10);
  const [selectedCard, setSelectedCard] = useState(0);
  const [currentPlan, setCurrentPlan] = useState({
    documents: "+100.000 Documentos",
    price: "0,05",
  });

  // const cardsData = [
  //   { title: "Hasta 20 Documentos", price: "GRATIS" },
  //   { title: "+20 Documentos", price: "0,20" },
  //   { title: "+200 Documentos", price: "0,19" },
  //   { title: "+500 Documentos", price: "0,18" },
  //   { title: "+1000 Documentos", price: "0,16" },
  //   { title: "+2.000 Documentos", price: "0,15" },
  //   { title: "+5.000 Documentos", price: "0,13" },
  //   { title: "+10.000 Documentos", price: "0,12" },
  //   { title: "+20.000 Documentos", price: "0,11" },
  //   { title: "+50.000 Documentos", price: "0,09" },
  //   { title: "+100.000 Documentos", price: "0,05" },
  // ];
  const { t } = useTranslation("pricingCard");

  const cardsData = [
    {
      title: t("title1"),
      price: t("price1"),
      min: 0,
      max: 0,
      sliding: 0,
    },
    {
      title: "20 Documentos",
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
    const index = cardsData.findIndex(
      (card) => sliderValue >= card.min && sliderValue <= card.max
    );
    const card = cardsData[index];
    if (card) {
      setCurrentPlan({
        documents: card.title,
        price: card.price,
      });
      setSelectedCard(index);
    }
    console.log(card);
  }, [sliderValue]);

  const handleSliderChange = (event) => {
    setSliderValue(Number(event.target.value));
  };

  const getSelectedPlanIndex = () => {
    if (sliderValue <= 9000) return 0;
    if (sliderValue <= 49000) return 1;
    if (sliderValue <= 69000) return 2;
    if (sliderValue <= 99000) return 3;
    return 4;
  };

  const selectedPlanIndex = getSelectedPlanIndex();
  const selectedPlan = plansData[selectedPlanIndex];

  const calculateProgress = () => {
    const min = 0;
    const max = 100;
    return (sliderValue - min) / (max - min) / 10; // Calcula el progreso en porcentaje
  };

  return (
    <div className={styles.pricingContainer}>
      <Navbar />
      <div className={styles.containerP}>
        <div className={styles.plansHeader}>
          <h1 className={styles.plansTitle}>Planes de precios</h1>
          <SubtitleTemplate
            text={"Elige el mejor plan que se adapte a tus necesidades."}
          />
          {/* <p className={styles.currentPlan}>{currentPlan.documents}</p> */}
          <p className={styles.currentPlan}>
            {sliderValue.toLocaleString("es-ES")} Documentos
          </p>

          <input
            type="range"
            min="0"
            max="100000"
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
        <SubtitleTemplate
          text={
            "Impuestos indirectos no incluidos. Sin gastos de instalación. Cancela en cualquier momento."
          }
        />
        {/* <span className={styles.microText}>
          Impuestos indirectos no incluidos. Sin gastos de instalación. Cancela
          en cualquier momento.
        </span> */}
      </div>
      <SubtitleTemplate
        stylesProp={{ marginTop: "80px" }}
        text={
          "Las empresas tardan entre 2 y 5 minutos en gestionar una factura. Con FacturaGPT, lo haces en segundos..."
        }
      />

      <div className={styles.parent}>
        {cardsData.map((card, index) => (
          <div className={styles[`div${index + 1}`]}>
            <PricingCard
              key={index}
              index={index}
              title={card.title || "Hasta 20 Documentos"}
              price={card.price || "FREE"}
              setSelectedCard={setSelectedCard}
              selectedCard={selectedCard}
              buyBtn={false}
              compareSelected={true}
            />
          </div>
        ))}
      </div>
      <h1 className={styles.pricingStarText}>
        <img className={styles.star} src={star} alt="star" />
        Valoración
      </h1>
      <SubtitleTemplate
        stylesProp={{ maxWidth: "800px" }}
        text={
          "Escríbenos un email, una reseña en Google, una postal, o incluso puedes donar para ayudar a crear más funcionalidades."
        }
      />

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
          </div>
        </div>
      </div>
      <SubtitleTemplate
        stylesProp={{ maxWidth: "800px" }}
        text={"No te olvides, si ha sido útil, escribe una reseña."}
      />

      <h1 className={styles.reviewsTitle}>¡Únase a nosotros hoy!</h1>
      <SubtitleTemplate
        stylesProp={{ maxWidth: "800px" }}
        text={"Estás un paso más cerca de obtener el mejor servicio..."}
      />

      <a href="/freetrial" className={styles.startButton}>
        Probar Gratis <img src={diagonalArrow} />
      </a>
      <CookiePopup />
    </div>
  );
};

export default Pricing;
