import styles from "./ChatView.module.css";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Chat from "../../components/Chat/Chat.jsx";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate.jsx";
import l from "../../assets/lIcon.svg";

import { v4 as uuidv4 } from 'uuid';  // Add this import at the top with other imports

import { useParams, useNavigate } from "react-router-dom";

const company = {
  email: "coolmail@mail.com",
  phone: "341-59-15",
  website: "www.domain.com",
  address:
    "Pasaje Barcelona núm. 8, (08130), Santa Perpetua De Mogoda, Barcelona, Cataluña",
  cnae: "1234",
};



import React, { useState } from "react";
// import styles from "./Chat.module.css";
import arrowUp from "../../assets/arrowUp.svg";
import facturaGPT from "../../assets/FacturaLogoIconGreen.svg";
import createBill from "../../assets/createBill.svg";
import analizeBill from "../../assets/analizeBill.svg";
import askDocument from "../../assets/askDocument.svg";
import askClient from "../../assets/askClient.svg";
import askAssets from "../../assets/askAssets.svg";
import askHelp from "../../assets/askHelp.svg";

import searchMagnify from "../../assets/searchMagnify.svg";


const buttons = [
  { id: 0, img: createBill, text: "Crea una Factura" },
  { id: 1, img: analizeBill, text: "Analiza tu facturacion" },
  { id: 2, img: askDocument, text: "Pregunta sobre tus documentos" },
  { id: 3, img: askClient, text: "Pregunta sobre tus clientes" },
  { id: 4, img: askAssets, text: "Pregunta sobre tus activos" },
  { id: 5, img: askHelp, text: "Pide Ayuda" },
];


const ChatMenu = () => {

  const [chats, setChats] = useState([{
    name: "Chat 1",
    id: 1,
  }, {
    name: "Chat 2",
    id: 2,
  }]);


  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChat = (id) => {
    console.log('3ri48juj')
    switch(id){
      case 0:
        // alert(2)
      
        break;
    }
  }

  return (
    <div className={styles.chatMenu}>
      <div className={styles.searchInputWrapper}>
        <div className={styles.searchIcon}>
          <img src={searchMagnify} alt="searchMagnify" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Buscar"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          style={{ marginLeft: "5px" }}
          className={styles.searchIconsWrappers}
        >
          <img src={l} alt="kIcon" />
        </div>
      </div>

      <ul>
        {true ? (
          <b>
            7 días anteriores
          </b>
        ) : false ? (
          <b>
            14 días anteriores
          </b>
        ) : (
          <b>
            30 días anteriores
          </b>
        )}
        {chats.map((chat, index) => (
          <li 
          key={index}
          onClick={() => handleChat(chat.id)}
          >
            <span>
              {chat.name}
            </span>

            icon settings
          </li>
        ))}
      </ul>

      {true && (
        <div className={styles.chatMenuSettings}>
          <ul>
            <li>
              Compartir
            </li>
            <li>
              Cambiar nombre
            </li>
            <li>
              Archivars
            </li>
            <li>
              Eliminar
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}


const Chat = () => {

  // const { id } = useParams()

  const { user, updatingUserLoading } = useSelector((state) => state.user);
  console.log(`usuario: ${user}`);


  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { text: inputValue, sender: "user" }
      ]);
      setInputValue("");
    }
  };

  const handleSendBotMessage = () => {
    const botMessage = "Este es un mensaje del bot.";
    setMessages([...messages, { text: botMessage, sender: "bot" }]);
  };


  const handleChat = (id) => {
    console.log('3ri48juj')
    setInputValue(buttons[id].text)
    // switch(id){
    //   case 0:
    //     break;
    // }
  }

  useEffect(() => {
    if(inputValue !== "") {
      handleSendMessage()
    }
  }, [inputValue])

  return (
    <div className={styles.chatContainer}>
      <button onClick={handleSendBotMessage}>
        Enviar mensaje del bot
      </button>
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
                >
                  {'A'}
                </div>
              </div>
            ) : (
              <div className={`${styles.message} ${styles.botMessage}`} >
                <div
                  className={styles.avatar}
                >
                  {'A'}
                </div>
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
              <button 
              key={index} 
              onClick={() => handleChat(button?.id)}
              >
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
  )
}


const ChatView = () => {
  const {id } = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    console.log('id', id)
    if(!id){
      const prev_id = uuidv4()
      navigate(`/admin/chat/${prev_id}`)
    }
  },[id])

  return (
    <PanelTemplate>
      {/* <Chat /> */}

      <div className={styles.chatSection}>
        <ChatMenu />
        <Chat />
      </div>
    </PanelTemplate>
  );
}


export default ChatView;