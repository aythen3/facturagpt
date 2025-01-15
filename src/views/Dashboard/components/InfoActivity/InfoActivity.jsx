import React, { useState } from "react";
import styles from "./InfoActivity.module.css";
import fileIcon from "../../assets/fileIcon.svg";
import codeIcon from "../../assets/codeIcon.svg";

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

  // Agrega más objetos aquí con diferentes íconos
];

const InfoActivity = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleHeaderClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.activityContainer}>
      {activities.map((activity, index) => (
        <div
          className={styles.activity}
          key={index}
          onClick={() => {
            handleHeaderClick(index);
            console.log("hola");
          }}
        >
          <div
            className={styles.activityHeader}
            style={{ height: activeIndex === index ? "auto" : "0px" }}
          >
            <span>Reenviar</span>
            <p>Responder</p>
            <p>Compartir</p>
            <p className={styles.seeMail}>Ver Email</p>
          </div>
          <div className={styles.info}>
            <img src={activity.icon} alt="Icon" />
            <p>
              <strong>{activity.email}</strong> ha creado{" "}
              <strong>{activity.title}</strong> en{" "}
              <strong>{activity.folder}</strong>
            </p>
          </div>
          <div className={styles.date}>
            <p>{activity.date}</p>
            <p>{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoActivity;
