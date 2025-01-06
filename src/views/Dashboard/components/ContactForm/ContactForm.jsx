import React, { useState } from "react";
import axios from "axios";
import styles from "./ContactForm.module.css";
import handPointer from "../../assets/handPointer.svg";
import Navbar from "../Navbar/Navbar";
import wsIcon from "../../assets/whatsappIcon.svg";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation("contactForm");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsMessageVisible(false);

    try {
      const response = await axios.post(
        "http://localhost:3006/api/user/newsletter",
        formData
      );

      if (response.status === 200) {
        setFormData({ name: "", email: "", message: "" });
        showMessage("Mensaje enviado exitosamente.", true);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      showMessage(
        "Error al enviar el mensaje. Por favor, inténtelo de nuevo.",
        false
      );
    }
  };

  const showMessage = (message, success) => {
    setStatusMessage(message);
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000); // El mensaje desaparecerá después de 3 segundos
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "584243356112"; // Replace with your WhatsApp number
    const message = `Hola, mi nombre es ${formData.name}. ${formData.message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container} id="contact">
        <div className={styles.header}>
          {/* <img src={handPointer} alt="" className={styles.leftImage} /> */}
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.subtitle}>{t("subTitle")} </p>
          </div>
          {/* <img src={handPointer} alt="" className={styles.rightImage} /> */}
        </div>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>{t("label1")}</label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("placeholder1")}
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>{t("label2")}</label>

                <input
                  type="email"
                  name="email"
                  placeholder={t("placeholder2")}
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>{t("label3")}</label>

                <textarea
                  name="message"
                  placeholder={t("placeholder3")}
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.button}>
                {t("buttonSend")}
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.wsBtn}`}
                onClick={handleWhatsAppClick}
              >
                <img src={wsIcon} alt="" />
                <span> {t("buttonWhatsApp")}</span>
              </button>
            </form>
          </div>
        </div>

        {isMessageVisible && (
          <div
            className={`${styles.statusMessage} ${
              statusMessage.includes("exitosamente")
                ? styles.success
                : styles.error
            }`}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default ContactForm;
