import React, { useState } from "react";
import axios from "axios";
import styles from "./ContactForm.module.css";
import handPointer from "../../assets/handPointer.svg";
import Navbar from "../Navbar/Navbar";
import wsIcon from "../../assets/whatsappIcon.svg";
import { useTranslation } from "react-i18next";
import diagonalArrow from "../../assets/diagonalArrow.svg";

const ContactForm = () => {
  const { t } = useTranslation("contactForm");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    work: "",
    phone: "",
    keepInformed: false,
  });
  const handleCheckboxChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData, // Copia los valores actuales
      keepInformed: !prevFormData.keepInformed, // Invierte el valor de keepInformed
    }));
  };

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
        setFormData({
          name: "",
          email: "",
          message: "",
          work: "",
          phone: "",
          keepInformed: false,
        });
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
    const phoneNumber = "34629571058"; // Replace with your WhatsApp number
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
            <button
              type="button"
              className={`${styles.button} ${styles.wsBtn}`}
              onClick={handleWhatsAppClick}
            >
              <img src={wsIcon} alt="" />
              <span> {t("buttonWhatsApp")}</span>
            </button>
          </div>
          {/* <img src={handPointer} alt="" className={styles.rightImage} /> */}
        </div>
        {/* Separador con líneas y círculo */}
        <div className={styles.separator}>
          <span className={styles.line}></span>
          <div className={styles.circle}>O</div>
          <span className={styles.line}></span>
        </div>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroupContainer}>
                <div className={styles.inputGroup}>
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
                  <input
                    type="text"
                    name="work"
                    placeholder={t("placeholder2")}
                    className={styles.input}
                    value={formData.work}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.inputGroupContainer}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("placeholder3")}
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="phone"
                    placeholder={t("placeholder4")}
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.inputGroupContainer}>
                <div className={styles.inputGroup}>
                  <textarea
                    name="message"
                    placeholder={t("placeholder5")}
                    className={styles.textarea}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <button
                    type="submit"
                    className={`${styles.button} ${styles.buttonForm}`}
                  >
                    {t("buttonSend")}
                  </button>
                </div>
              </div>
              <div className={styles.infoContact}>
                <div className={styles.keepInformed}>
                  <input
                    type="checkbox"
                    name="keepInformed"
                    checked={formData.keepInformed}
                    onChange={handleCheckboxChange}
                  />{" "}
                  <p>
                    Quiero mantenerme informado sobre novedades y ofertas de
                    FacturaGPT
                  </p>
                </div>
                <p className={styles.infoText}>
                  <span>Responsable del tratamiento:</span> FacturaGPT.{" "}
                  <span>Finalidad</span>: a) Gestionar tu solicitud y responder
                  tus consultas. b) Mantener relaciones comerciales con la
                  entidad a la que representas. c) En caso de que aceptes,
                  enviarte información sobre productos, servicios y actividades
                  de FacturaGPT, incluso por medios electrónicos.{" "}
                  <span>Derechos: </span>
                  Puedes ejercer tus derechos de acceso, rectificación,
                  cancelación y oposición enviando un correo a
                  <a href=""> info@facturagpt.com</a> o por correo postal. Para
                  más detalles, consulta nuestra{" "}
                  <a href="/terms">Política de Privacidad</a>.
                </p>
              </div>
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
        <section className={styles.startNowSection}>
          <h2 className={styles.reviewsTitle}>¡Únase a nosotros hoy!</h2>
          <span className={styles.reviewsDescriptionLast}>
            ¡Estás un paso más cerca de obtener el mejor servicio!
          </span>
          <a href="/freetrial" className={styles.startButton}>
            Probar Gratis <img src={diagonalArrow} />
          </a>
        </section>
      </div>
    </>
  );
};

export default ContactForm;
