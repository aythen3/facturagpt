import styles from "./PanelTemplate.module.css";
import FileExplorer from "../../components/FileExplorer/FileExplorer.jsx";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.jsx";
import Preview from "../../components/Preview/Preview.jsx";
import FloatingMenu from "../../components/FloatingMenu/FloatingMenu.jsx";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as AddPlus } from "../../assets/addPlus.svg";
import { ReactComponent as ChatIcon } from "../../assets/chatIcon.svg";
import { ReactComponent as PanelMobileIcon } from "../../assets/panelMobileIcon.svg";
import { ReactComponent as FileMobileIcon } from "../../assets/fileIcon.svg";
import { ReactComponent as BoxIcon } from "../../assets/boxIcon.svg";
import { ReactComponent as DotsNotification } from "../../assets/dotsNotification.svg";
import { ReactComponent as ClientIcon } from "../../assets/clientsIcon.svg";
import Automate from "../../components/Automate/Automate.jsx";
import PanelAutomate from "../../components/Automate/panelAutomate/PanelAutomate.jsx";
import { useDispatch, useSelector } from "react-redux";
// import Chat from "../../components/Chat/Chat.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GetPlusButton from "../GetPlusButton/GetPlusButton.jsx";
const PanelTemplate = ({ menuOpenChat, setMenuOpenChat, children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation("navbarAdmin");
  const { user } = useSelector((state) => state.user);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [numNotification, setNumNotification] = useState(0);
  const handleProfileClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const timer = setTimeout(() => {
      if (clickCount === 0) {
        // Single click
        setShowSidebar(!showSidebar);
      } else {
        // Double click
        // window.location.href = "/admin/home";
        navigate("/admin/home");
      }
      setClickCount(0);
    }, 300); // 300ms window for double click

    setClickTimer(timer);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const [fromPath, setFromPath] = useState("chat");

  // useEffect(() => {
  //   setFromPath(fromPath);
  //   navigate("/admin/"+fromPath);
  // }, [fromPath]);

  // const [fromPath, setFromPath] = useState(() => {
  //   const savedPath = localStorage.getItem('lastPath');
  //   return savedPath || "chat";
  // });

  const [fromPath, setFromPath] = useState(() => {
    const savedPath = localStorage.getItem("lastPath");
    const currentPath = window.location.pathname.split("/admin/")[1];
    return currentPath && currentPath !== savedPath
      ? currentPath
      : savedPath || "chat";
  });

  const [pagePath, setPagePath] = useState(() => {
    const path = window.location.pathname.split("/")[2];

    return path;
  });

  useEffect(() => {
    localStorage.setItem("lastPath", fromPath);
    navigate("/admin/" + fromPath);
  }, [fromPath]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavbarAdmin fromPath={fromPath} setFromPath={setFromPath} />
      <div className={styles.container}>
        {pagePath !== "accounts" &&
          pagePath !== "chat" &&
          pagePath !== "users" && (
            <FileExplorer
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleMenu={toggleMenu}
            />
          )}
        <>
          <div
            className={`${styles.mobileMenuOverlay} ${(menuOpen && styles.activeMenuOverlay) || (menuOpenChat && styles.activeMenuOverlay)} `}
            onClick={() => {
              setMenuOpenChat !== undefined && setMenuOpenChat(false);
              setMenuOpen(false);
            }}
          ></div>
          <div
            className={`${styles.mobileMenu} ${(menuOpen && styles.activeMobileMenu) || (menuOpenChat && styles.activeMobileMenu)}`}
          >
            <ul>
              {/* <li onClick={() => setIsOpen((prev) => !prev)}>
                <AddPlus />
                Automatizar
              </li> */}
              <li>
                <a
                  href="/admin/chat"
                  className={fromPath == "chat" ? styles.active : ""}
                >
                  <ChatIcon />
                  Chat
                </a>
              </li>
              <li>
                <a
                  href="/admin/panel"
                  className={fromPath == "panel" ? styles.active : ""}
                >
                  <PanelMobileIcon />
                  Panel
                </a>
              </li>
              <li>
                <a
                  href="/admin/documents"
                  className={fromPath == "documents" ? styles.active : ""}
                >
                  <FileMobileIcon />
                  Documentos
                </a>
              </li>
              <li>
                <a
                  href="/admin/contacts"
                  className={fromPath == "contacts" ? styles.active : ""}
                >
                  <ClientIcon />
                  Contactos
                </a>
              </li>{" "}
              <li>
                <a
                  href="/admin/products"
                  className={fromPath == "products" ? styles.active : ""}
                >
                  <BoxIcon />
                  Activos
                </a>
              </li>{" "}
              <li>
                <a
                  href="/admin/notification"
                  className={`${styles.number} 
                ${fromPath == "notification" ? styles.active : ""}`}
                >
                  <DotsNotification />
                  Notificaciones
                  {numNotification !== 0 && <span>{numNotification}</span>}
                </a>
              </li>
              <li>
                {" "}
                <div
                  onClick={handleProfileClick}
                  className={styles.profileContainer}
                >
                  {user?.profileImage ? (
                    <img
                      className={styles.profileImage}
                      src={user?.profileImage}
                      alt=""
                    />
                  ) : (
                    <div className={styles.initials}>
                      {user?.nombre
                        ?.split(" ")
                        .map((letter) => letter?.[0] || "U")}
                    </div>
                  )}{" "}
                  <div className={styles.profileText}>
                    <p>{user?.nombre || "Not found"}</p>
                    <span>{user?.role || "Not found"}</span>
                  </div>
                </div>
              </li>
              <li>
                {" "}
                <GetPlusButton />
              </li>
            </ul>
          </div>
        </>
        <div className={styles.contentTemplate}>{children}</div>
      </div>
    </div>
  );
};

export default PanelTemplate;
