import styles from "./ChatView.module.css";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate.jsx";

import { v4 as uuidv4 } from "uuid"; // Add this import at the top with other imports

import { useParams, useNavigate } from "react-router-dom";

import React, { useState } from "react";
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
import pencilSquareIcon from "../../assets/pencilSquareIcon.svg";
import SearchIconWithIcon from "../../components/SearchIconWithIcon/SearchIconWithIcon.jsx";
import l from "../../assets/lIcon.svg";

import {
  fetchByMenu,
  fetchByChat,
  sendMessage,
  deleteChat,
  validateTokenGPT,
} from "@src/actions/chat";

import { clearCurrentChat } from "@src/slices/chatSlices";
import useFocusShortcut from "../../../../utils/useFocusShortcut.js";
import useSwipe from "../../../../utils/useSwipe.jsx";
// import user from "../../../../../app/services/user.js";

const actions = [
  {
    id: 0,
    img: createBill,
    text: "Crea una Factura",
  },
  {
    id: 1,
    img: analizeBill,
    text: "Analiza tu facturación",
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

const ChatMenu = ({ id, leftWidth, toggleMenu }) => {
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
    // {
    //   name: "React Hooks",
    //   id: "chat-1",
    //   older: 0,
    // },
    // {
    //   name: "JavaScript Async/Await",
    //   id: "chat-2",
    //   older: 1,
    // },
    // {
    //   name: "CSS Flexbox y Grid",
    //   id: "chat-3",
    //   older: 1,
    // },
    // {
    //   name: "Node.js y Express",
    //   id: "chat-4",
    //   older: 0,
    // },
    // {
    //   name: "APIs REST y GraphQL",
    //   id: "chat-5",
    //   older: 6,
    // },
    // {
    //   name: "MongoDB y Mongoose",
    //   id: "chat-6",
    //   older: 13,
    // },
    // {
    //   name: "Next.js vs. Remix",
    //   id: "chat-7",
    //   older: 28,
    // },
    // {
    //   name: "Optimización Web",
    //   id: "chat-8",
    //   older: 98,
    // },
    // {
    //   name: "Seguridad en Web Apps",
    //   id: "chat-9",
    //   older: 58,
    // },
    // {
    //   name: "Testing con Jest",
    //   id: "chat-10",
    //   older: 0,
    // },
    // {
    //   name: "TypeScript en React",
    //   id: "chat-11",
    //   older: 1,
    // },
    // {
    //   name: "Redux vs. Zustand",
    //   id: "chat-12",
    //   older: 1,
    // },
    // {
    //   name: "Mejorando el SEO",
    //   id: "chat-13",
    //   older: 0,
    // },
    // {
    //   name: "Tailwind CSS en proyectos",
    //   id: "chat-14",
    //   older: 6,
    // },
    // {
    //   name: "Accesibilidad en la Web",
    //   id: "chat-15",
    //   older: 13,
    // },
    // {
    //   name: "Deploy con Vercel",
    //   id: "chat-16",
    //   older: 28,
    // },
    // {
    //   name: "Microservicios con Docker",
    //   id: "chat-17",
    //   older: 98,
    // },
    // {
    //   name: "GraphQL vs. REST",
    //   id: "chat-18",
    //   older: 58,
    // },
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
    setSelectedOption(false);
  };

  const handleChangeName = async (chatId) => {
    console.log("handleChangeName", chatId);
    // dispatch(deleteChat({ chatId }));
    await dispatch(deleteChat({ chatId }));
    setSelectedOption(false);
  };

  const handleFixChat = async (chatId) => {
    console.log("handleFixChat", chatId);
    // dispatch(deleteChat({ chatId }));
    await dispatch(deleteChat({ chatId }));
    setSelectedOption(false);
  };

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "/");

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

  const [swiped, setSwiped] = useState(false);

  useSwipe(setSwiped);

  const [selectedOption, setSelectedOption] = useState(false);

  useEffect(() => {
    // Manejador para cerrar el menú cuando se hace clic fuera
    const handleClickOutside = (event) => {
      if (selectedOption && !event.target.closest(`.${styles.menuOptions}`)) {
        setSelectedOption(null);
      }
    };

    // Agregar el event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedOption]);
  return (
    <div
      className={styles.chatMenu}
      style={{
        maxWidth: `${leftWidth}px`,
        width: isMobile && "0px",
        minWidth: isMobile && "0px",
      }}
    >
      <div
        className={`${styles.asideBar} ${isMobile ? styles.mobileMenu : ""} ${swiped ? "" : styles.offAsideBar}`}
      >
        {/* {isMobile && (
          <div className={styles.showMobile}>
            <img src={ImageEmpty} alt="" onClick={toggleMenu} />
          </div>
        )} */}
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
          {searchTerm !== "" && Object.keys(sortChat).length === 0 ? (
            <div className={styles.noChats}>
              <p>Ningún chat coincide con esta búsqueda.</p>
            </div>
          ) : Object.keys(sortChat).length === 0 ? (
            <div className={styles.noChats}>
              <p>Actualmente no tienes chats.</p>
              <p>Envía un mensaje para iniciar un chat nuevo.</p>
            </div>
          ) : (
            Object.entries(sortChat).map(([group, chatArray]) => {
              let groupTitle = "Antiguo";

              if (group == 0) groupTitle = "Hoy";
              else if (group == 1) groupTitle = "Ayer";
              else if (group > 1 && group < 7) groupTitle = "Esta semana";
              else if (group >= 7 && group < 14) groupTitle = "Semana pasada";
              else if (group >= 14 && group < 30) groupTitle = "Este mes";
              else if (group >= 30 && group < 60) groupTitle = "Mes pasado";
              else if (group >= 60) groupTitle = "Hace varios meses";
              // console.log(sortChat);
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
                          {true && <div>fix</div>}
                          <input
                            type="text"
                            value={chat.name}
                            onChange={(e) =>
                              handleChangeName(chat.id, e.target.value)
                            }
                          />
                          {/* {chat.name} */}
                          <div className={styles.chatMenuSettings}>
                            <button
                              // onClick={() =>
                              //   setIsOpenMenu({
                              //     ...isOpenMenu,
                              //     [chat.id]: !isOpenMenu[chat.id],
                              //   })
                              // }
                              onClick={(e) =>
                                setSelectedOption({
                                  chat,
                                  x: e.clientX,
                                  y: e.clientY,
                                })
                              }
                            >
                              <DotsOptions className={styles.icon} />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>
        {selectedOption && (
          <ul
            className={styles.menuOptions}
            style={{
              top: selectedOption.y,
              left: selectedOption.x,
            }}
          // className={isOpenMenu[chat.id] ? styles.active : ""}
          // className={true ? styles.active : ""}
          >
            {/* {JSON.stringify(selectedOption)} */}
            <li onClick={() => handleDeleteMessage(selectedOption.chat.id)}>
              Eliminar chat
            </li>
            <li onClick={() => handleChangeName(selectedOption.chat.id)}>
              Cambiar nombre
            </li>
            <li onClick={() => handleFixChat(selectedOption.chat.id)}>
              Fijar chat
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

const ChatBody = ({
  handleChat,
  messages,
  inputValue,
  setInputValue,
  isTokenValid,
}) => {
  // const { id } = useParams()
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { currentChat, loading } = useSelector((state) => state.chat);
  // const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const messageContainerRef = useRef(null);

  // Efecto para hacer scroll cuando cambian los mensajes
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageContainer} ref={messageContainerRef}>
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
            <div className={styles.facturaGPTLogo}>
              <img src={facturaGPT} alt="Icon" />
            </div>

          </>
        )}
        {messages.map((message, index) => (
          <>
            {message.type !== "bot" ? (
              <div className={`${styles.message} ${styles.userMessage}`}>
                <p>{message.text}</p>
                <div className={styles.avatar}>{"A"}</div>
              </div>
            ) : (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <img src={facturaGPTWhite} className={styles.avatar} />
                <p>
                  {message.text}
                </p>
              </div>
            )}
          </>
        ))}
      </div>
      <div className={styles.chatTextContainer}>
        {messages.length === 0 && (
          <div className={styles.buttonContainer}>
            {actions.map((action, index) => (
              <button key={index} onClick={() => handleChat(action)}>
                <img src={action.img} alt="Icon" />
                {action.text}
              </button>
            ))}
          </div>
        )}
        <div className={styles.chat}>
          <textarea
            spellCheck="false"
            type="text"
            placeholder="Habla con FacturaGPT"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevents newline
                handleChat({ text: inputValue });
              }
            }}
          />
          <div
            className={styles.img}
            onClick={() => handleChat({
              text: inputValue
            })}
          >
            <img src={arrowUp} alt="Icon" />
          </div>
        </div>
        {isTokenValid ? (
          <p className={styles.errorAlert}>
            FacturaGPT puede cometer errores. Revise la información importante.
          </p>
        ) : (
          <p className={styles.errorAlert}>
            Introduce un
            <a href="https://platform.openai.com/settings/organization/api-keys" target="_blank">
              token
            </a>
            válido para usar FacturaGPT.
          </p>
        )}
      </div>
    </div>
  );
};

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpenChat, setMenuOpenChat] = useState(false);

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

  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const response = await dispatch(validateTokenGPT());
      console.log("response validateTokenGPT", response);
      setIsTokenValid(response.payload.success);
    };


    fn();
  }, []);


  const handleSendMessage = async (text = false) => {
    try {
      if (text) {
        setMessages([
          ...messages,
          { text: text || inputValue, sender: "user" },
          // { text: response.botMessage.text, sender: "bot" },
        ]);
        // setMessages([
        //   ...messages,
        //   { text: text || inputValue, sender: "user" },
        //   { text: response.botMessage.text, sender: "bot" },
        // ]);
        setInputValue("");
      }

      // const resp = await dispatch(
      //   sendMessage({
      //     chatId: id,
      //     // type: 'me',
      //     text: text,
      //   })
      // );


      // const response = resp.payload;
      // console.log("!WOOORKKK", response);

      // const user = localStorage.getItem("user");
      // const userJson = JSON.parse(user);
      // const token = userJson.accessToken;

      console.log('ini')
      // const id = user._id.split('_').pop()
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;
      console.log('ttt', token)

      // const formData = new URLSearchParams();
      // formData.append('text', text);

      const response = await fetch(`https://facturagpt.com/api/chat/${id}/messages`, {
        method: 'POST',
        // body: JSON.stringify({
        //   text: text,
        //   // chatId: id
        // }),
        body: text,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        if (response.ok) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let accumulatedChunks = '';
          let accumulatedText = '';
          
          const insertMessageBot = (newText) => {
            accumulatedText += newText;
            setMessages(prevMessages => {
              const newMessages = [...prevMessages];
              // Si el último mensaje es del bot, actualizamos su texto
              if (newMessages.length > 0 && newMessages[newMessages.length - 1].type === 'bot') {
                newMessages[newMessages.length - 1].text = accumulatedText;
              } else {
                // Si no hay mensaje del bot o el último no es del bot, agregamos uno nuevo
                newMessages.push({
                  text: accumulatedText,
                  type: 'bot'
                });
              }
              return newMessages;
            });
          };

          const processStream = async () => {
            while (true) {
              // console.log('555')
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              accumulatedChunks += chunk;

              let lines = accumulatedChunks.split('\n');
              accumulatedChunks = lines.pop();

              for (const line of lines) {
                if (line.trim()) {
                  try {
                    const chunk = JSON.parse(line);
                    const text = chunk.data.text
                    console.log('data', chunk)
                    console.log('data1', text)
                    // insertData(data)
                    insertMessageBot(text)

                   
                  } catch (error) {
                    console.error('Failed to parse JSON:', error);
                  }
                }
              }
            }

            // if (accumulatedChunks.trim()) {
            //   try {
            //     const data = JSON.parse(accumulatedChunks);

            //     console.log('data', data)
            //     insertData(data)
            //   } catch (error) {
            //     console.error('Failed to parse final JSON:', error);
            //   }
            // }
          };

          processStream().then(() => {
          }).catch(console.error);
        }
      })

      console.log("responsechat!!", response);

      // setMessages([
      //   ...messages,
      //   // { text: text || inputValue, sender: "user" },
      //   { text: response.botMessage.text, sender: "bot" },
      // ]);
    } catch (error) {
      console.log("error handleSendMessage", error);
    }
  };

  // const handleSendBotMessage = () => {
  //   const botMessage = "Este es un mensaje del bot.";
  //   setMessages([...messages, { text: botMessage, sender: "bot" }]);
  // };

  const handleChat = (action) => {
    console.log("3ri48juj", action);
    // handleSendMessage(actions[id].text);

    if (action.id == 0) {
      navigate(`/admin/panel`);
    } else if (action.id == 1) {
      navigate(`/admin/home`);
    } else if (action.id == 5) {
      navigate(`/contact`);
    } else if (!action.id) {
      handleSendMessage(action.text);
    }
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
  const toggleMenu = () => {
    setMenuOpenChat(!menuOpenChat);
  };
  return (
    <PanelTemplate
      menuOpenChat={menuOpenChat}
      setMenuOpenChat={setMenuOpenChat}
    >

      <div className={styles.chatSection}>
        <ChatMenu
          id={id}
          leftWidth={leftWidth}
          toggleMenu={toggleMenu}
          isMobile={isMobile}
        />
        {!isMobile && (
          <div
            style={{
              height: "100%",
              width: "8px",
              cursor: "ew-resize",
              // background: "white",
            }}
            onMouseDown={handleMouseDown}
          ></div>
        )}
        <ChatBody
          handleChat={handleChat}
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isTokenValid={isTokenValid}
        />
      </div>
    </PanelTemplate>
  );
};

export default ChatView;
