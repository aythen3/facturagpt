import React, { useState } from "react";
import styles from "./panelAutomate.module.css";
import CloseSVG from "../svgs/CloseSVG";
import TitleComponent from "../Components/TitleComponent";
import SearchComponent from "../Components/SearchComponent/SearchComponent";
import CardAutomate from "../Components/CardAutomate/CardAutomate";
import { useDispatch } from "react-redux";
import { data } from "../utils/automatesJson";
import GmailAndOutlook from "../Components/GmailAndOutlookFormCreateAutomate/GmailAndOutlook";
import GoogleDriveFormCreateAutomate from "../Components/GoogleDriveFormCreateAutomate/GoogleDriveFormCreateAutomate";
import WhatsAppFormCreateAutomate from "../Components/WhatsAppFormCreateAutomate/WhatsAppFormCreateAutomate";
import EsPublicoGestionaFormAutomate from "../Components/EsPublicoGestionaFormAutomate/EsPublicoGestionaFormAutomate";
import GoogleSheetsFormAutomate from "../Components/GoogleSheetsFormAutomate/GoogleSheetsFormAutomate";
import XmlFormAutomate from "../Components/XmlFormAutomate/XmlFormAutomate";
import OdooFormAutomate from "../Components/OdooFormAutomate/OdooFormAutomate";
import WoltersKluwerA3FormAutomate from "../Components/WoltersKluwerA3/WoltersKluwerA3FormAutomate";
import AgencyTributFormAutomate from "../Components/AgencyTributFormAutomate/AgencyTributFormAutomate";
import WhatsAppSendNotificationsFormAutomate from "../Components/WhatsAppSendNotificationsFormAutomate/WhatsAppSendNotificationsFormAutomate";

const PanelAutomate = ({ type, close, typeContent }) => {
  const [dataFilter, setDataFilter] = useState(data || newData);
  const dispach = useDispatch();
  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_header}>
          <div className={styles.header}>
            <TitleComponent title="Añadir Automatización" />
            <div>
              <CloseSVG action={close} />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div>
            <SearchComponent onSearch={handleDataFilter} />
            <div className={styles.buttons_header}>
              <button
                className={`${styles.button_header} ${styles.button_header_all}`}
              >
                Todas
              </button>
              <button className={`${styles.button_header}`}>
                Entrada / Input
              </button>
              <button className={`${styles.button_header}`}>
                Salida / Output
              </button>
            </div>
            <>
              <p style={{ fontWeight: "bold" }}>Entrada / Input</p>
              {dataFilter
                .filter((card) => card.role === "input")
                .map((card) => (
                  <CardAutomate
                    key={card.id}
                    type={card.type}
                    name={card.automateName}
                    image={card.image}
                    contactType={card.contactType}
                    typeContent={typeContent}
                  />
                ))}

              <p style={{ fontWeight: "bold" }}>Salida / Output</p>
              {dataFilter
                .filter((card) => card.role === "output")
                .map((card) => (
                  <CardAutomate
                    key={card.id}
                    type={card.type}
                    name={card.automateName}
                    image={card.image}
                    contactType={card.contactType}
                    typeContent={typeContent}
                  />
                ))}
            </>
          </div>

          <div>
            {(() => {
              switch (type) {
                case "Gmail":
                case "Outlook":
                  return <GmailAndOutlook type={type} />;
                case "Google Drive":
                  return <GoogleDriveFormCreateAutomate type={type} />;
                case "WhatsApp":
                  return <WhatsAppFormCreateAutomate type={type} />;
                case "esPúblico Gestiona":
                  return <EsPublicoGestionaFormAutomate type={type} />;
                case "Google Sheets":
                  return <GoogleSheetsFormAutomate type={type} />;
                case "XML para Declaciones Físcales":
                  return <XmlFormAutomate type={type} />;
                case "Odoo":
                  return <OdooFormAutomate type={type} />;
                case "Wolters Kluwer A3":
                  return <WoltersKluwerA3FormAutomate type={type} />;
                case "Facturas automáticamente a tu portal de la Agencia Tributaria":
                  return <AgencyTributFormAutomate type={type} />;
                case "whatsApp notifications":
                  return <WhatsAppSendNotificationsFormAutomate type={type} />;
                default:
                  return <div>OTRO</div>;
              }
            })()}
          </div>
        </div>

        <div className={styles.container_buttons_footer}>
          <button
            onClick={close}
            className={`${styles.buttons_footer} ${styles.button_back}`}
          >
            {" "}
            Atrás
          </button>
          <button className={`${styles.buttons_footer} ${styles.button_add}`}>
            Añadir{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelAutomate;
