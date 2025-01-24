import React, { useState } from "react";
import styles from "./Faqs.module.css";
import arrow from "../../assets/arrowlit.svg";
import arrowDown from "../../assets/arrowRightContact.png";
import { useTranslation } from "react-i18next";
const FAQ = () => {
  const { t } = useTranslation("faq");

  const faqs = [
    {
      question: t("ask1"),
      answer: t("answer1"),
    },
    {
      question: t("ask2"),
      answer: t("answer2"),
    },
    {
      question: t("ask3"),
      answer: t("answer3"),
    },
    ,
    {
      question: t("ask4"),
      answer: t("answer4"),
    },
    {
      question: t("ask5"),
      answer: t("answer5"),
    },
    {
      question: t("ask6"),
      answer: t("answer6"),
    },
    {
      question: t("ask7"),
      answer: t("answer7"),
    },
  ];
  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleFAQ = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <section className={styles.faqSection}>
      <h2>{t("title")}</h2>
      <div className={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span
                className={`${styles.icon} ${
                  activeIndexes.includes(index) ? styles.open : ""
                }`}
              >
                <img src={arrow} alt="" />
              </span>
            </button>
            <div
              className={`${styles.faqAnswer} ${
                activeIndexes.includes(index) ? styles.show : ""
              }`}
            >
              <span>{faq.answer}</span>
            </div>
          </div>
        ))}
        <p className={styles.contact}>
          {t("moreInfo")}{" "}
          <a href="/contact">
            {t("contact")} <img src={arrowDown} alt="" />
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
