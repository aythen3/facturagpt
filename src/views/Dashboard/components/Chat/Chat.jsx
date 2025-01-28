import React, { useState } from "react";
import styles from "./Chat.module.css";
import arrowUp from "../../assets/arrowUp.svg";
import facturaGPT from "../../assets/FacturaLogoIconGreen.svg";
import createBill from "../../assets/createBill.svg";
import analizeBill from "../../assets/analizeBill.svg";
import askDocument from "../../assets/askDocument.svg";
import askClient from "../../assets/askClient.svg";
import askAssets from "../../assets/askAssets.svg";
import askHelp from "../../assets/askHelp.svg";

const buttons = [
  { img: createBill, text: "Crea una Factura" },
  { img: analizeBill, text: "Analiza tu facturacion" },
  { img: askDocument, text: "Pregunta sobre tus documentos" },
  { img: askClient, text: "Pregunta sobre tus clientes" },
  { img: askAssets, text: "Pregunta sobre tus activos" },
  { img: askHelp, text: "Pide Ayuda" },
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
    }
  };

  const handleSendBotMessage = () => {
    const botMessage = "Este es un mensaje del bot.";
    setMessages([...messages, { text: botMessage, sender: "bot" }]);
  };

  return (
    <div className={styles.chatContainer}>
      <button onClick={handleSendBotMessage}>Enviar mensaje del bot</button>
      <div className={styles.messageContainer}>
        {messages.length === 0 && (
          <>
            <p className={styles.messageSettings}>
              <strong>
                Antes de hablar con FacturaGPT, debes completar tu información
                en la sección de Ajustes.{" "}
              </strong>
              <br />
              Esto garantiza que todos los datos necesarios estén presentes y
              evita errores en el proceso de facturación.
            </p>
            <div className={styles.facturaGPTMessage}>
              <img src={facturaGPT} alt="Icon" />
              <div>
                <p>¡Hola, John Doe! 👋 ¿En qué puedo ayudarte hoy? 🚀</p>
                <p>Estas son mis habilidades:</p>
                <p>
                  <strong>Generar Gráficas</strong>
                </p>
                <ul>
                  <li>
                    ¿Necesitas comparar datos o visualizar una gráfica? ¡Dime
                    qué necesitas y lo haré! 📊
                  </li>
                </ul>
                <p>
                  <strong>Crear Facturas</strong>
                </p>
                <ul>
                  <li>
                    Pasos sencillos para generar tu factura:
                    <ul>
                      <li>
                        Ubicación: Si no indicas una ruta, se guardará
                        automáticamente en /home.
                      </li>
                      <li>
                        Datos del receptor: Añade un cliente por su Nombre,
                        Número Fiscal, Email o Teléfono, o crea uno nuevo
                        fácilmente.
                      </li>
                      <li>
                        Detalles de la factura: Incluye el número, fecha y una
                        descripción de los productos o servicios.
                      </li>
                      <li>
                        Importes e impuestos: Especifica los precios, cantidades
                        y los impuestos aplicables.
                      </li>
                      <li>
                        Personalización: Añade tu logotipo y tu firma digital.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Nota: Si falta algún dato, no te preocupes, te lo pediré
                    para completarla sin errores. 😊
                  </li>
                </ul>
                <p>
                  <strong>Redactar Correos</strong>
                </p>
                <ul>
                  <li>
                    ¿Necesitas enviar un mensaje profesional o personalizado?
                    ¡Lo redacto por ti! ✉️
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
        {messages.map((message, index) => (
          <>
            {/* <p
              key={index}
              className={`${styles.message} ${message.sender === "bot" ? styles.botMessage : styles.userMessage}`}
            >
              {message.text}
            </p> */}
            {message.sender !== "bot" ? (
              <div className={`${styles.message} ${styles.userMessage}`}>
                <p>
                {message.text}
                </p>
                <div 
                  className={styles.avatar}
                />
              </div>
            ) : (
              <div className={`${styles.message} ${styles.botMessage}`} >
              <div 
                className={styles.avatar}
              />
              {message.text}
            </div>
          )}
          </>
        ))}
      </div>
      <div className={styles.chatTextContainer}>
        {messages.length === 0 && (
          <div className={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <button key={index}>
                <img src={button.img} alt="Icon" />
                {button.text}
              </button>
            ))}
          </div>
        )}
        <div className={styles.chat}>
          <textarea
            type="text"
            placeholder="Habla con FacturaGPT"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Evita el salto de línea
                handleSendMessage();
              }
            }}
          />
          <div className={styles.img} onClick={handleSendMessage}>
            <img src={arrowUp} alt="Icon" />
          </div>
        </div>
        <p className={styles.errorAlert}>
          FacturaGPT puede cometer errores. Revise la info importante.
        </p>
      </div>
    </div>
  );
};

export default Chat;
