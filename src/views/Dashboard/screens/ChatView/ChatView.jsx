import styles from "./ChatView.module.css";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Chat from "../../components/Chat/Chat.jsx";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate.jsx";

import { v4 as uuidv4 } from "uuid"; // Add this import at the top with other imports

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
import facturaGPTWhite from "../../assets/FacturaGPTW.svg";
import createBill from "../../assets/createBill.svg";
import analizeBill from "../../assets/analizeBill.svg";
import askDocument from "../../assets/askDocument.svg";
import askClient from "../../assets/askClient.svg";
import askAssets from "../../assets/askAssets.svg";
import askHelp from "../../assets/askHelp.svg";
import { ReactComponent as DotsOptions } from "../../assets/optionDots.svg";
import searchMagnify from "../../assets/searchMagnify.svg";
import pencilSquareIcon from "../../assets/pencilSquareIcon.svg";
import SearchIconWithIcon from "../../components/SearchIconWithIcon/SearchIconWithIcon.jsx";
import KIcon from "../../assets/KIcon.svg";
import winIcon from "../../assets/winIcon.svg";
const buttons = [
  { id: 0, img: createBill, text: "Crea una Factura" },
  { id: 1, img: analizeBill, text: "Analiza tu facturacion" },
  { id: 2, img: askDocument, text: "Pregunta sobre tus documentos" },
  { id: 3, img: askClient, text: "Pregunta sobre tus clientes" },
  { id: 4, img: askAssets, text: "Pregunta sobre tus activos" },
  { id: 5, img: askHelp, text: "Pide Ayuda" },
];

const ChatMenu = ({ id }) => {
  const [chats, setChats] = useState([
    {
      name: "React Hooks",
      id: "chat-1",
      older: 0,
    },
    {
      name: "JavaScript Async/Await",
      id: "chat-2",
      older: 1,
    },
    {
      name: "CSS Flexbox y Grid",
      id: "chat-3",
      older: 1,
    },
    {
      name: "Node.js y Express",
      id: "chat-4",
      older: 0,
    },
    {
      name: "APIs REST y GraphQL",
      id: "chat-5",
      older: 6,
    },
    {
      name: "MongoDB y Mongoose",
      id: "chat-6",
      older: 13,
    },
    {
      name: "Next.js vs. Remix",
      id: "chat-7",
      older: 28,
    },
    {
      name: "Optimización Web",
      id: "chat-8",
      older: 98,
    },
    {
      name: "Seguridad en Web Apps",
      id: "chat-9",
      older: 58,
    },
    {
      name: "Testing con Jest",
      id: "chat-10",
      older: 0,
    },
    {
      name: "TypeScript en React",
      id: "chat-11",
      older: 1,
    },
    {
      name: "Redux vs. Zustand",
      id: "chat-12",
      older: 1,
    },
    {
      name: "Mejorando el SEO",
      id: "chat-13",
      older: 0,
    },
    {
      name: "Tailwind CSS en proyectos",
      id: "chat-14",
      older: 6,
    },
    {
      name: "Accesibilidad en la Web",
      id: "chat-15",
      older: 13,
    },
    {
      name: "Deploy con Vercel",
      id: "chat-16",
      older: 28,
    },
    {
      name: "Microservicios con Docker",
      id: "chat-17",
      older: 98,
    },
    {
      name: "GraphQL vs. REST",
      id: "chat-18",
      older: 58,
    },
  ]);
  const navigate = useNavigate();
  const sortChat = Object.groupBy(chats, ({ older }) => older);

  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChat = (id) => {
    console.log("3ri48juj");
    switch (id) {
      case 0:
        alert(2);
        break;
    }
  };

  return (
    <div className={styles.chatMenu}>
      <SearchIconWithIcon
        ref={searchInputRef}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        iconRight={pencilSquareIcon}
        classNameIconRight={styles.searchContainerL}
        // onClickIconRight={() => setIsFilterOpen(true)}
      >
        <>
          <div
            style={{ marginLeft: "5px" }}
            className={styles.searchIconsWrappers}
          >
            <img src={winIcon} alt="kIcon" />
          </div>
          <div
            style={{ marginLeft: "5px" }}
            className={styles.searchIconsWrappers}
          >
            <img src={KIcon} alt="kIcon" />
          </div>
        </>
      </SearchIconWithIcon>
      <div className={styles.chatsContainer}>
        {Object.entries(sortChat).map(([group, chatArray]) => {
          let groupTitle = "Antiguo";

          if (group == 0) groupTitle = "Hoy";
          else if (group == 1) groupTitle = "Ayer";
          else if (group > 1 && group < 7) groupTitle = "Esta semana";
          else if (group >= 7 && group < 14) groupTitle = "Semana pasada";
          else if (group >= 14 && group < 30) groupTitle = "Este mes";
          else if (group >= 30 && group < 60) groupTitle = "Mes pasado";
          else if (group >= 60) groupTitle = "Hace varios meses";

          return (
            <div key={group}>
              <h3>{groupTitle}</h3>
              <ul>
                {chatArray.map((chat) => (
                  <li
                    key={chat.id}
                    className={`${id == chat.id && styles.active}`}
                    onClick={() => navigate(`/admin/chat/${chat.id}`)}
                  >
                    {chat.name}
                    <DotsOptions className={styles.icon} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* <ul className={styles.chats}>
        {true ? (
          <b>7 días anteriores</b>
        ) : false ? (
          <b>14 días anteriores</b>
        ) : (
          <b>30 días anteriores</b>
        )}
        {chats.map((chat, index) => (
          <li key={index} onClick={() => handleChat(chat.id)}>
            <span>{chat.name}</span>
            icon settings
          </li>
        ))}
      </ul> */}

      {true && (
        <div className={styles.chatMenuSettings}>
          <ul>
            <li>Compartir</li>
            <li>Cambiar nombre</li>
            <li>Archivars</li>
            <li>Eliminar</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const Chat = () => {
  // const { id } = useParams()

  const { user, updatingUserLoading } = useSelector((state) => state.user);
  console.log(`usuario: ${user}`);

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

  const handleChat = (id) => {
    console.log("3ri48juj");
    switch (id) {
      case 0:
        alert(2);
        break;
    }
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
                <p>{message.text}</p>
                {/* <div className={styles.avatar} /> */}
              </div>
            ) : (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <img src={facturaGPTWhite} className={styles.avatar} />
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
              <button key={index} onClick={() => handleChat(button?.id)}>
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

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("id", id);
    if (!id) {
      const prev_id = uuidv4();
      navigate(`/admin/chat/${prev_id}`);
    }
  }, [id]);

  return (
    <PanelTemplate>
      {/* <Chat /> */}

      <div className={styles.chatSection}>
        <ChatMenu id={id} />
        <Chat />
      </div>
    </PanelTemplate>
  );
};

export default ChatView;
