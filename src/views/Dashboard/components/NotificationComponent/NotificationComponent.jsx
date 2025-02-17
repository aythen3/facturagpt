import React, { useState } from "react";
import styles from "./NotificationComponent.module.css";

const DocumentHeader = ({ title, date, time, icon }) => (
  <div className={styles.documentHeader}>
    <div className={styles.headerLeft}>
      <img src={icon} alt="" /> <p>{title}</p>
    </div>
    {/* <div className={styles.dateTime}>
      <span>{date}</span> <span>{time}</span>
    </div> */}
  </div>
);

const NotificationItem = ({ email, title, location, icon }) => (
  <div className={styles.notificationItem}>
    <img src={icon} alt="" />
    <p>
      <strong>{email}</strong> ha creado <strong>{title}</strong> en{" "}
      <strong>{location}</strong>
    </p>
  </div>
);

const NotificationComponent = ({ data, handleHeaderClick, isActive, type }) => {
  const [expandedOptions, setExpandedOptions] = useState(false);

  // Función para manejar el click en las opciones
  const toggleOptions = () => {
    setExpandedOptions((prev) => !prev);
  };

  return (
    <div className={styles.activity} onClick={handleHeaderClick}>
      {type === "document" ? (
        <>
          <DocumentHeader
            title={data.title}
            // date={data.date}
            // time={data.time}
            icon={data.icon}
          />
          <div
            className={`${styles.activityHeader} ${styles.activityHeaderDocument}`}
            style={{
              height: isActive ? "auto" : "0px",
              overflow: "hidden",
              transition: "height 0.3s ease-out",
            }}
          >
            <div className={styles.options}>
              {data.options.map((option, index) => (
                <p
                  key={index}
                  onClick={(event) => {
                    event.stopPropagation(); // Detiene la propagación del evento
                    alert(`Opción seleccionada: ${option}`);
                  }}
                  style={{
                    textDecoration: option === "Ver Email" && "underline",
                  }}
                  className={`${option === "Reenviar" ? styles.gray : styles.green}`}
                >
                  {option}
                </p>
              ))}
            </div>
            {data.notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                email={notification.email}
                title={notification.title}
                location={notification.location}
                icon={notification.icon}
              />
            ))}
            {/* Opciones de acción */}
          </div>
          <div className={styles.documentDate}>
            <p>{data.date}</p>
            <p>{data.time}</p>
          </div>

          {/* <button onClick={toggleOptions}>
            {expandedOptions ? "Ocultar opciones" : "Ver opciones"}
          </button> */}
        </>
      ) : (
        <>
          <div
            className={styles.activityHeader}
            style={{
              height: isActive ? "auto" : "0px",
              overflow: "hidden",
              transition: "height 0.3s ease-out",
            }}
          >
            <span
              className={styles.gray}
              onClick={(e) => {
                e.stopPropagation(alert("Opcion seleccionada Reenviar"));
              }}
            >
              Reenviar
            </span>
            <p
              className={styles.green}
              onClick={(e) => {
                e.stopPropagation(alert("Opcion seleccionada Responder"));
              }}
            >
              Responder
            </p>
            <p
              className={styles.green}
              onClick={(e) => {
                e.stopPropagation(alert("Opcion seleccionada Compartir"));
              }}
            >
              Compartir
            </p>
            <p
              className={styles.seeMail}
              onClick={(e) => {
                e.stopPropagation(alert("Opcion seleccionada Ver Email"));
              }}
            >
              Ver Email
            </p>
          </div>
          <div className={styles.info}>
            <img src={data.icon} alt="Icon" />
            <p>
              <strong>{data.email}</strong> ha creado{" "}
              <strong>{data.title}</strong> en <strong>{data.folder}</strong>
            </p>
          </div>
          <div className={styles.date}>
            <p>{data.date}</p>
            <p>{data.time}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationComponent;
