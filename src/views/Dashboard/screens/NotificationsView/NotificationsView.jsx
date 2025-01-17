import React, { useState } from "react";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate";
import styles from "./NotificationsView.module.css";
import { ReactComponent as FileIcon } from "../../assets/S3/fileIcon.svg";
import { ReactComponent as CodeIcon } from "../../assets/S3/codeIcon.svg";
import { ReactComponent as FolderIcon } from "../../assets/S3/folderMail.svg";
import { ReactComponent as CloseMenu } from "../../assets/closeMenu.svg";

const notifications = [
  {
    id: 1,
    title: "Document Title",
    date: "25 Dec 2025",
    time: "00:00 PM",
    icon: <FileIcon alt="Icon" />,
    notifications: [
      {
        title: "Titulo de la factura",
        email: "johndoe@email.com",
        icon: <FileIcon alt="Icon" />,
        location: "Q1>Facturas",
      },
    ],
    options: ["Compartir"], // Solo 2 opciones
  },
  {
    id: 2,
    title: "Document Title",
    date: "25 Dec 2025",
    time: "00:00 PM",
    icon: <FileIcon alt="Icon" />,
    notifications: [
      {
        title: "Titulo de la factura",
        email: "johndoe@email.com",
        icon: <FileIcon alt="Icon" />,
        location: "Q1>Facturas",
      },
      {
        title: "Titulo de la factura",
        email: "johndoe@email.com",
        icon: <CodeIcon alt="Icon" />,
        location: "Q1>Facturas",
      },
      {
        title: "Titulo de la factura",
        email: "johndoe@email.com",
        icon: <CodeIcon alt="Icon" />,
        location: "Q1>Facturas",
      },
    ],
    options: ["Compartir"], // 3 opciones
  },
  {
    id: 3,
    title: "Document Title",
    date: "25 Dec 2025",
    time: "00:00 PM",
    icon: <FileIcon alt="Icon" />,
    notifications: [
      {
        title: "Titulo de la factura",
        email: "johndoe@email.com",
        icon: <FileIcon alt="Icon" />,
        location: "Q1>Facturas",
      },
    ],
    options: ["Reenviar", "Responder", "Compartir", "Ver Email"], // 4 opciones
  },
];

const ButtonsOptions = ({ option, index }) => {
  return (
    <button
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
  const [unreadEmails, setUnreadEmails] = useState(true);

  return (
    <PanelTemplate>
      <div className={styles.notificationCoontainer}>
        {notifications.map((notification) => (
          <div key={notification.id} className={styles.notification}>
            <div className={styles.notificationHeader}>
              <div>
                {notification.icon} <p>{notification.title}</p>
              </div>
              <div>
                {notification.options.map((option, index) => (
                  <ButtonsOptions option={option} index={index} />
                ))}
              </div>
            </div>
            {notification.notifications.map((noti) => (
              <div className={styles.notificationContent} key={noti.email}>
                {noti.icon}
                <p>
                  <strong>{noti.email}</strong> ha creado{" "}
                  <strong>{noti.title}</strong> factura en{" "}
                  <strong>{noti.location}</strong>{" "}
                </p>
              </div>
            ))}

            <div className={styles.notificationDate}>
              <span>{notification.date}</span>
              <span>{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

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
