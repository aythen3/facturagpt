import React from "react";
import styles from "./TagsLanding.module.css";
import { ReactComponent as Arrow } from "../../assets/grayArrow.svg";
import MessageIcon from "../../assets/messageIcon.svg";
import InformationIcon from "../../assets/informationIcon.svg";
import RocketIcon from "../../assets/rocketIcon.svg";
import PaperClipsIcon from "../../assets/paperClipsIcon.svg";
import StadisticsIcon from "../../assets/stadisticsIcon.svg";
import PencilPaperIcon from "../../assets/pencilPaperIcon.svg";
import MoneyIcon from "../../assets/moneyIcon.svg";
import RingIcon from "../../assets/ringIcon.svg";
import ManagePartner from "../../assets/managePartner.svg";
import checkedIconGreen from "../../assets/checkedIconGreen.svg";
import trafficLightIcon from "../../assets/trafficLightIcon.svg";
import sandClockIcon from "../../assets/sandClockIcon.svg";
import MedalIcon from "../../assets/medalIcon.svg";

const TagsLanding = () => {
  const tags1 = [
    <>
      <img src={sandClockIcon} alt="" />
      Ahorra tiempo
    </>,
    <>
      <img src={checkedIconGreen} alt="" />
      Datos disponibles y en tiempo real
    </>,

    <>
      <img src={trafficLightIcon} alt="" />
      Reduce errores
    </>,
    <>
      <img src={ManagePartner} alt="" />
      Gestiona Contactos, Clientes y Proveedores
    </>,
  ];
  const tags2 = [
    <>
      <img src={MedalIcon} alt="" />
      Gestiona tus Activos
    </>,
    <>
      <img src={RingIcon} alt="" />
      Recibe notificaciones y alertas
    </>,
    <>
      <img src={PencilPaperIcon} alt="" />
      Emite y Recibe facturas
    </>,
    <>
      <img src={StadisticsIcon} alt="" />
      Analiza tus datos
    </>,
  ];
  const tags3 = [
    <>
      <img src={MoneyIcon} alt="" />
      Automatiza Pagos
    </>,

    <>
      <img src={PaperClipsIcon} alt="" />
      Conecta con terceros
    </>,
    <>
      <img src={RocketIcon} alt="" /> Chatea con FacturaGPT{" "}
    </>,
  ];
  return (
    <div className={styles.TagsLandingContainer}>
      <div className={styles.tagLanding}>
        {tags1.map((tag) => (
          <div className={styles.tag}>
            {tag} <Arrow />
          </div>
        ))}
      </div>
      <div className={styles.tagLanding}>
        {tags2.map((tag) => (
          <div className={styles.tag}>
            {tag} <Arrow />
          </div>
        ))}
      </div>
      <div className={styles.tagLanding}>
        {tags3.map((tag) => (
          <div className={styles.tag}>
            {tag} <Arrow />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsLanding;
