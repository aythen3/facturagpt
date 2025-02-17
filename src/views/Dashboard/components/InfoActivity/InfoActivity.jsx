import React, { useState } from "react";
import styles from "./InfoActivity.module.css";
import fileIcon from "../../assets/fileIcon.svg";
import codeIcon from "../../assets/codeIcon.svg";
import NotificationComponent from "../NotificationComponent/NotificationComponent";

const activities = [
  {
    email: "johndoe@gmail.com",
    title: "Titulo de la factura",
    date: "25 Dec 2025",
    time: "00:00 PM",
    folder: "Q1>Facturas",
    icon: fileIcon,
  },
  {
    email: "johndoe@gmail.com",
    title: "Titulo de la factura",
    date: "25 Dec 2025",
    time: "00:00 PM",
    folder: "Q1>Facturas",
    icon: fileIcon,
  },
  {
    email: "johndoe@gmail.com",
    title: "Titulo de la factura",
    date: "25 Dec 2025",
    time: "00:00 PM",
    folder: "Q1>Facturas",
    icon: codeIcon,
  },
  {
    email: "johndoe@gmail.com",
    title: "Titulo de la factura",
    date: "25 Dec 2025",
    time: "00:00 PM",
    folder: "Q1>Facturas",
    icon: codeIcon,
  },
  {
    email: "johndoe@gmail.com",
    title: "Titulo de la factura",
    date: "25 Dec 2025",
    time: "00:00 PM",
    folder: "Q1>Facturas",
    icon: fileIcon,
  },
  {
    email: "johndoe@gmail.com",
    title: "Titulo de la factura",
    date: "25 Dec 2025",
    time: "00:00 PM",
    folder: "Q1>Facturas",
    icon: fileIcon,
  },
  {
    email: "johndoe@gmail.com",
    title: "Titulo de la factura",
    date: "25 Dec 2025",
    time: "00:00 PM",
    folder: "Q1>Facturas",
    icon: codeIcon,
  },
  {
    email: "johndoe@gmail.com",
    title: "Titulo de la factura",
    date: "25 Dec 2025",
    time: "00:00 PM",
    folder: "Q1>Facturas",
    icon: codeIcon,
  },

  // Agrega más objetos aquí con diferentes íconos
];

const InfoActivity = () => {
  const [expandedNotifications, setExpandedNotifications] = useState({});

  const toggleNotification = (index) => {
    setExpandedNotifications((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={styles.activityContainer}>
      {activities.map((activity, index) => (
        <NotificationComponent
          key={index}
          handleHeaderClick={() => toggleNotification(index)}
          isActive={expandedNotifications[index]}
          data={activity}
          type="activity"
        />
      ))}
    </div>
  );
};

export default InfoActivity;
