import React, { useState } from "react";
import styles from "./MobileAsidebarNavigation.module.css";

import { ReactComponent as ChatIcon } from "../../../assets/chatIcon.svg";
import { ReactComponent as PanelMobileIcon } from "../../../assets/panelMobileIcon.svg";
import { ReactComponent as FileMobileIcon } from "../../../assets/fileIcon.svg";
import { ReactComponent as BoxIcon } from "../../../assets/boxIcon.svg";
import { ReactComponent as DotsNotification } from "../../../assets/dotsNotification.svg";
import { ReactComponent as ClientIcon } from "../../../assets/clientsIcon.svg";
import { useSelector } from "react-redux";
import GetPlusButton from "../../GetPlusButton/GetPlusButton.jsx";

const MobileAsidebarNavigation = ({
  menuOpen,
  setMenuOpen,
  menuOpenChat,
  setMenuOpenChat,
  fromPath,
}) => {
  const [numNotification, setNumNotification] = useState(0);

  const { user } = useSelector((state) => state.user);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

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

  return (
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
                  {user?.nombre?.split(" ").map((letter) => letter?.[0] || "U")}
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
  );
};

export default MobileAsidebarNavigation;
