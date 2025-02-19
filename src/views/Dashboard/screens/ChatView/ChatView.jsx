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
import l from "../../assets/lIcon.svg";
import winIcon from "../../assets/winIcon.svg";

import {
  fetchByMenu,
  fetchByChat,
  sendMessage,
  deleteChat,
} from "@src/actions/chat";

import { clearCurrentChat } from "@src/slices/chatSlices";
import useFocusShortcut from "../../../../utils/useFocusShortcut.js";

const actions = [
  {
    id: 0,
    img: createBill,
    text: "Crea una Factura",
  },
  {
    id: 1,
    img: analizeBill,
    text: "Analiza tu facturacion",
  },
  {
    id: 2,
    img: askDocument,
    text: "Pregunta sobre tus documentos",
  },
  {
    id: 3,
    img: askClient,
    text: "Pregunta sobre tus clientes",
  },
  {
    id: 4,
    img: askAssets,
    text: "Pregunta sobre tus activos",
  },
  {
    id: 5,
    img: askHelp,
    text: "Pide Ayuda",
  },
];
const ChatMenu = ({ id, leftWidth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    chatList,
    searchTerm: searchTermState,
    loading,
  } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchByMenu({ query: searchTermState }));
  }, [searchTermState, dispatch]);

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
  const [isOpenMenu, setIsOpenMenu] = useState({});

  useEffect(() => {
    if (chatList.length > 0) {
      setChats(chatList);
      console.log("!!!chatList", chatList);
    }
  }, [chatList]);

  // Asegurarse de que sortChat esté correctamente definido
  const sortChat = chats.reduce((acc, chat) => {
    const olderGroup = chat.older || 0; // Asegúrate de que 'older' esté presente
    if (!acc[olderGroup]) acc[olderGroup] = [];
    acc[olderGroup].push(chat);
    return acc;
  }, {});

  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addMessage = () => {
    console.log("addMessage");
    dispatch(clearCurrentChat());
    navigate(`/admin/chat/${uuidv4()}`);
  };

  const handleDeleteMessage = async (chatId) => {
    console.log("handleDeleteMessage", chatId);
    // dispatch(deleteChat({ chatId }));
    await dispatch(deleteChat({ chatId }));
  };

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "/");
  const [left, setLeft] = useState(-100); // Inicialmente oculto a la izquierda
  const startTouch = useRef(0); // Para almacenar la posición inicial del toque o el mouse
  const isMouseDown = useRef(false); // Detecta si el mouse está presionado

  // Lógica para el swipe en el div invisible
  const handleInvisibleTouchStart = (e) => {
    startTouch.current = e.touches[0].clientX; // Guardar la posición inicial del toque
  };

  const handleInvisibleTouchMove = (e) => {
    const currentTouch = e.touches[0].clientX;
    const difference = currentTouch - startTouch.current;

    // Mostrar el menú si el usuario hace swipe a la derecha
    if (difference > 30) {
      setLeft(0);
    }
  };

  const handleInvisibleTouchEnd = () => {
    // Reset o cualquier otra lógica adicional cuando se termina el gesto
  };

  // Lógica para el swipe en el menú (para ocultarlo)
  const handleTouchStart = (e) => {
    startTouch.current = e.touches[0].clientX; // Guardar la posición inicial del toque
  };

  const handleTouchMove = (e) => {
    const currentTouch = e.touches[0].clientX;
    const difference = currentTouch - startTouch.current;

    // Ocultar el menú si el usuario hace swipe a la izquierda
    if (difference < -30) {
      setLeft(-100);
    }
  };
  const handleInvisibleMouseDown = (e) => {
    startTouch.current = e.clientX;
    isMouseDown.current = true;

    // Deshabilitar la selección de texto mientras se mantiene presionado
    document.body.style.userSelect = "none";
  };
  const handleTouchEnd = () => {
    // Reset o cualquier otra lógica adicional cuando se termina el gesto
  };

  // Lógica para el swipe en dispositivos de escritorio (mouse)
  const handleMouseDownResize = (e) => {
    if (window.innerWidth >= 768) return; // Solo habilitar el mouse en pantallas menores a 768px

    isMouseDown.current = true;
    startTouch.current = e.clientX;

    // Deshabilitar la selección de texto mientras el mouse está presionado
    document.body.style.userSelect = "none";
  };
  const handleInvisibleMouseMove = (e) => {
    if (!isMouseDown.current) return;

    const currentTouch = e.clientX;
    const difference = currentTouch - startTouch.current;

    // Mostrar el menú si el usuario hace swipe a la derecha
    if (difference > 30) {
      setLeft(0);
    }
  };
  const handleInvisibleMouseUp = () => {
    isMouseDown.current = false;

    // Habilitar nuevamente la selección de texto
    document.body.style.userSelect = "auto";
  };

  const handleMouseMoveResize = (e) => {
    if (!isMouseDown.current || window.innerWidth >= 768) return;

    const currentTouch = e.clientX;
    const difference = currentTouch - startTouch.current;

    // Mostrar u ocultar el menú según el movimiento del mouse
    if (difference > 30) {
      setLeft(0); // Mostrar el menú
    } else if (difference < -30) {
      setLeft(-100); // Ocultar el menú
    }
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    document.body.style.userSelect = "auto";
  };

  // Establecer los eventos para los dispositivos de escritorio
  useEffect(() => {
    const handleMouseMoveEvent = (e) => handleMouseMoveResize(e);
    const handleMouseUpEvent = () => handleMouseUp();

    if (window.innerWidth < 768) {
      document.addEventListener("mousemove", handleMouseMoveEvent);
      document.addEventListener("mouseup", handleMouseUpEvent);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveEvent);
      document.removeEventListener("mouseup", handleMouseUpEvent);
    };
  }, [left]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Actualizar el ancho de la ventana cuando se cambie el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768; // Usar el ancho de la ventana actualizado
  // Manejador para ocultar el menú
  const handleMenuClose = () => {
    setLeft(-100);
  };
  return (
    <div
      className={styles.chatMenu}
      style={{
        maxWidth: `${leftWidth}px`,
        width: isMobile && "0px",
        minWidth: isMobile && "0px",
      }}
    >
      {/* Div invisible para detectar swipe hacia la derecha */}
      <div
        style={{
          position: "fixed",
          top: "25%",
          left: 0,
          width: "50px",
          height: "50vh",
          zIndex: 1,
          backgroundColor: "transparent",
        }}
        onTouchStart={handleInvisibleTouchStart}
        onTouchMove={handleInvisibleTouchMove}
        onMouseDown={handleInvisibleMouseDown}
        onMouseMove={handleInvisibleMouseMove}
        onMouseUp={handleInvisibleMouseUp}
      ></div>

      <div
        style={{
          position: isMobile ? "absolute" : "initial",
          top: 0,
          left: `${left}vw`,
          width: isMobile && "100vw",
          height: "calc(100vh - 50px)",
          backgroundColor: "white",
          transition: "left 0.3s ease",
          boxSizing: "border-box",
          zIndex: 2,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDownResize}
        onMouseMove={handleMouseMoveResize}
        onMouseUp={handleMouseUp}
      >
        <SearchIconWithIcon
          ref={searchInputRef}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          iconRight={pencilSquareIcon}
          classNameIconRight={styles.searchContainerL}
          onClickIconRight={() => addMessage()}
        >
          <div
            style={{ marginLeft: "5px" }}
            className={styles.searchIconsWrappers}
          >
            <img src={l} alt="kIcon" />
          </div>
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
                  {chatArray.map((chat) => {
                    return (
                      <li
                        key={chat.id}
                        className={`${id == chat.id && styles.active}`}
                        onClick={() => navigate(`/admin/chat/${chat.id}`)}
                      >
                        {chat.name}
                        <div className={styles.chatMenuSettings}>
                          <button
                            onClick={() =>
                              setIsOpenMenu({
                                ...isOpenMenu,
                                [chat.id]: !isOpenMenu[chat.id],
                              })
                            }
                          >
                            <DotsOptions className={styles.icon} />
                          </button>
                          <ul
                            className={isOpenMenu[chat.id] ? styles.active : ""}
                          >
                            <li onClick={() => handleDeleteMessage(chat.id)}>
                              Eliminar chat
                            </li>
                            <li>Cambiar nombre</li>
                            <li>Fijar chat</li>
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ChatBody = ({ handleChat, messages, inputValue, setInputValue }) => {
  // const { id } = useParams()

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { currentChat, loading } = useSelector((state) => state.chat);
  // const { id } = useParams();
  // const { user, updatingUserLoading } = useSelector((state) => state.user);

  return (
    <div className={styles.chatContainer}>
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
            {message.sender !== "bot" ? (
              <div className={`${styles.message} ${styles.userMessage}`}>
                <p>{message.text}</p>
                <div className={styles.avatar}>{"A"}</div>
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
            {actions.map((action, index) => (
              <button key={index} onClick={() => handleChat(action?.text)}>
                <img src={action.img} alt="Icon" />
                {action.text}
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevents newline
                handleChat(inputValue);
              }
            }}
            // onKeyPress={(e) => {
            //   if (e.key === "Enter" && !e.shiftKey) {
            //     e.preventDefault(); // Evita el salto de línea
            //     // handleSendMessage();
            //     // handleThinkMessage();
            //   }
            // }}
          />
          <div className={styles.img} onClick={() => handleChat(inputValue)}>
            <img src={arrowUp} alt="Icon" />
          </div>
        </div>
        <p className={styles.errorAlert}>
          FacturaGPT puede cometer errores. Revise la información importante.
        </p>
      </div>
    </div>
  );
};

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { currentChat, loading } = useSelector((state) => state.chat);

  useEffect(() => {
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!id || !uuidV4Regex.test(id)) {
      const new_id = uuidv4();
      console.log("new_id", new_id);
      navigate(`/admin/chat/${new_id}`);
    } else {
      console.log("loading id", id);
      dispatch(fetchByChat({ chatId: id }));
    }
  }, [id]);

  useEffect(() => {
    console.log("currentChat!1", currentChat);
    if (currentChat.messages.length > 0) {
      setMessages(currentChat.messages);
    } else {
      setMessages([]);
    }
  }, [currentChat]);

  useEffect(() => {
    // const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    // if (!id || !uuidV4Regex.test(id)) {
    //   const new_id = uuidv4();
    //   console.log("new_id", new_id);
    //   navigate(`/admin/chat/${new_id}`);
    // } else {
    // }
    // dispatch(fetchByChat({ chatId: id }));
  }, [id, dispatch]);

  // useEffect(() => {
  //   console.log("id", id);
  //   if (!id) {
  //     const prev_id = uuidv4();
  //     navigate(`/admin/chat/${prev_id}`);
  //   }
  // }, [id]);

  // const handleSendMessage = async (text = false) => {
  //   try {

  //     const response = await dispatch(sendMessage({
  //       text: text || inputValue,
  //       chatId: id
  //     }));
  //     console.log("response", response);
  //     if (text || inputValue.trim()) {
  //       setMessages([...messages, { text: text || inputValue, sender: "user" }]);
  //       setInputValue("");
  //     }
  //   } catch (error) {
  //     console.log("error handleSendMessage", error);
  //   }

  // };

  const handleSendMessage = async (text = false) => {
    try {
      const resp = await dispatch(
        sendMessage({
          text: text || inputValue,
          chatId: id,
        })
      );

      const response = resp.payload;

      // const user = localStorage.getItem("user");
      // const userJson = JSON.parse(user);
      // const token = userJson.accessToken;

      console.log("!WOOORKKK", response);
      // const response = await fetch(`https://facturagpt.com/api/chat/${id}/messages`, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     text: text || inputValue,
      //     chatId: id
      //   }),
      //   headers: {
      //     'Content-Type': 'application/octet-stream',
      //     'Authorization': `Bearer ${token}`
      //   }
      // }).then(response => {
      //   if (response.ok) {
      //     const reader = response.body.getReader();
      //     const decoder = new TextDecoder();
      //     let accumulatedChunks = '';

      //     const processStream = async () => {
      //       while (true) {
      //         const { done, value } = await reader.read();
      //         if (done) break;

      //         const chunk = decoder.decode(value, { stream: true });
      //         accumulatedChunks += chunk;

      //         let lines = accumulatedChunks.split('\n');
      //         accumulatedChunks = lines.pop();

      //         for (const line of lines) {
      //           if (line.trim()) {
      //             try {
      //               const data = JSON.parse(line);
      //               console.log('data', data)
      //               insertData(data)
      //             } catch (error) {
      //               console.error('Failed to parse JSON:', error);
      //             }
      //           }
      //         }
      //       }

      //       if (accumulatedChunks.trim()) {
      //         try {
      //           const data = JSON.parse(accumulatedChunks);

      //           console.log('data', data)
      //           insertData(data)
      //         } catch (error) {
      //           console.error('Failed to parse final JSON:', error);
      //         }
      //       }
      //     };

      //     processStream().then(() => {
      //     }).catch(console.error);
      //   }
      // })

      console.log("responsechat!!", response);
      if (text || inputValue.trim()) {
        setMessages([
          ...messages,
          { text: text || inputValue, sender: "user" },
          { text: response.botMessage.text, sender: "bot" },
        ]);
        setInputValue("");
      }
    } catch (error) {
      console.log("error handleSendMessage", error);
    }
  };

  const handleSendBotMessage = () => {
    const botMessage = "Este es un mensaje del bot.";
    setMessages([...messages, { text: botMessage, sender: "bot" }]);
  };

  const handleChat = (text) => {
    console.log("3ri48juj");
    // handleSendMessage(actions[id].text);
    handleSendMessage(text);
  };
  const [leftWidth, setLeftWidth] = useState(200); // Establecer el ancho inicial al 50%
  const isResizing = useRef(false); // Para detectar cuando el usuario está arrastrando
  const startX = useRef(0); // Almacenar la posición inicial del ratón

  // Lógica de redimensionamiento
  const handleMouseDown = (e) => {
    isResizing.current = true;
    startX.current = e.clientX;
    // Cambiar el cursor a 'ew-resize' durante el redimensionamiento
    document.body.style.cursor = "ew-resize";
    // Deshabilitar la selección de texto mientras se está redimensionando
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    const offset = e.clientX - startX.current; // Calculamos el desplazamiento
    const newWidth = leftWidth + (offset / window.innerWidth) * 2000; // Ajustamos el ancho en porcentaje

    if (newWidth > 200 && newWidth < 700) {
      setLeftWidth(newWidth); // Actualizamos el ancho solo si está dentro de los límites
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    // Restaurar el cursor y la selección de texto
    document.body.style.cursor = "auto";
    document.body.style.userSelect = "auto";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Función para actualizar el ancho de la ventana
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Añadir el event listener para resize
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // El efecto se ejecuta solo una vez cuando el componente se monta

  const isMobile = windowWidth <= 768; // Usar el ancho de la ventana actualizado

  return (
    <PanelTemplate>
      {/* <Chat /> */}
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={handleSendBotMessage}>Enviar mensaje del bot</button>
        <button onClick={handleSendBotMessage}>Enviar grafica del bot</button>
        <button onClick={handleSendBotMessage}>
          Enviar code block del bot
        </button>
        <button onClick={handleSendBotMessage}>
          Enviar formulario del bot
        </button>
        <button onClick={handleSendBotMessage}>Crear conexion del bot</button>
        <button onClick={handleSendBotMessage}>Crear conocimiento</button>
        <button onClick={handleSendBotMessage}>Crear calculadora</button>
        <button onClick={handleSendBotMessage}>Insertar cliente</button>
        <button onClick={handleSendBotMessage}>Insertar producto</button>
        <button onClick={handleSendBotMessage}>Insertar activo</button>
        <button onClick={handleSendBotMessage}>Nueva factura</button>
      </div> */}
      <div className={styles.chatSection}>
        <ChatMenu id={id} leftWidth={leftWidth} />
        {!isMobile && (
          <div
            style={{
              height: "100%",
              width: "8px",
              cursor: "ew-resize",
              background: "white",
            }}
            onMouseDown={handleMouseDown}
          ></div>
        )}
        <ChatBody
          handleChat={handleChat}
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
    </PanelTemplate>
  );
};

export default ChatView;
