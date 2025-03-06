import React, { useState, useEffect } from "react";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate";
import styles from "./NotificationsView.module.css";
import FileIcon from "../../assets/S3/fileIcon.svg";
import CodeIcon from "../../assets/S3/codeIcon.svg";
import { ReactComponent as FolderIcon } from "../../assets/S3/folderMail.svg";
import { ReactComponent as CloseMenu } from "../../assets/closeMenu.svg";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";

import { useDispatch } from "react-redux";
import { getAllNotifications } from "@src/actions/user";

const ButtonsOptions = ({ option, index }) => {
  const shareOption = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Compartir documento",
          text: "Mira este documento",
          url: window.location.href,
        });
      } else {
        alert("La función de compartir no está disponible en este dispositivo");
      }
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  const handleClick = (value) => {
    switch (value) {
      case "Reenviar":
        alert(1);
        break;
      case "Responder":
        alert(1);
        break;
      case "Compartir":
        shareOption();
        break;
      case "Ver Email":
        alert(1);
        break;
    }
  };
  return (
    <button
      onClick={() => handleClick(option)}
      key={index}
      style={{
        color: option === "Reenviar" ? "#7B7575" : "#04614b",
        textDecoration: option === "Ver Email" && "underline",
      }}
    >
      {option}
    </button>
  );
};

const NotificationsView = () => {
  const dispatch = useDispatch();

  const [unreadEmails, setUnreadEmails] = useState(true);
  const [expandedNotifications, setExpandedNotifications] = useState({});

  const toggleNotification = (id) => {
    setExpandedNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const response = await dispatch(getAllNotifications());
      // setNotifications(notifications);
      console.log("NOTIFICATIONS", response);
      if (response.payload.success) {
        setNotifications(response.payload.notifications);
      }
    };

    fn();
  }, []);
  const [swiped, setSwiped] = useState(false);
  return (
    <PanelTemplate setSwiped={setSwiped} swiped={swiped}>
      {notifications.length > 0 && (
        <div className={styles.notificationCoontainer}>
          {notifications.map((notification) => (
            <NotificationComponent
              key={notification.id}
              handleHeaderClick={() => toggleNotification(notification.id)}
              isActive={expandedNotifications[notification.id]}
              data={notification}
              type="document"
            />
          ))}
        </div>
      )}

      {notifications.length === 0 && (
        <div className={styles.noNotifications}>
          <span>
            No hay notificaciones
            <br />
            Configura tus notificaciones Analiza los datos de tus facturas y
            presupuestos
          </span>
        </div>
      )}

      {unreadEmails && (
        <div className={styles.unreadEmails}>
          <CloseMenu
            className={styles.closeMenu}
            onClick={() => setUnreadEmails(false)}
          />
          <div className={styles.content}>
            <FolderIcon className={styles.folderIcon} />
            <span>1 Emails no Leídos</span>
            <p>
              Envía facturas y presupuestos por email y podrás saber si han sido
              leídos.
            </p>
          </div>
        </div>
      )}
    </PanelTemplate>
  );
};

export default NotificationsView;
