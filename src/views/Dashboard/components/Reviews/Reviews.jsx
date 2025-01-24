import React from "react";
import styles from "./Reviews.module.css";
import Carousel from "../Carousel/Carousel";
import ContactForm from "../ContactForm/ContactForm";
import FAQ from "../Faqs/Faqs";
import diagonalArrow from "../../assets/diagonalArrow.svg";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation("reviews");
  return (
    <div className={styles.reviewsContainer}>
      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>{t("priceTitle")}</h2>
        {/* <span className={styles.reviewsDescriptionSecondary}>
        Nuestros precios están diseño para brindar un valor excepcional para el
        mejor servicio de impuestos.
      </span> */}
        <p className={styles.startsFrom}>
          <div>
            <span>{t("plan")}</span>
            <span>{t("planType")}</span>
          </div>
          {t("priceSubTitle")}
        </p>
        <div className={styles.price}>
          €3’99 <span>/{t("priceTime")}</span>
        </div>
        <span className={styles.thinSubtitle}>{t("priceFooter")}</span>
      </section>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <h2 className={styles.reviewsTitle}>{t("title")}</h2>
        <span className={styles.reviewsDescription}>{t("subTitle")}</span>
        <Carousel />
      </section>

      {/* <ContactForm /> */}
      <FAQ />
      <section className={styles.startNowSection}>
        <h2 className={styles.reviewsTitle}>{t("joinUsTitle")}</h2>
        <span className={styles.reviewsDescriptionLast}>
          {t("joinUsSubTitle")}
        </span>
        <a href="/freetrial" className={styles.startButton}>
          {t("joinUsButton")} <img src={diagonalArrow} />
        </a>
      </section>
    </div>
  );
};

export default Reviews;
