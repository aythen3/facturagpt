import React, { useEffect, useState } from "react";
import styles from "./panelAutomate.module.css";
import CloseSVG from "../svgs/CloseSVG";
import TitleComponent from "../Components/TitleComponent";
import SearchComponent from "../Components/SearchComponent/SearchComponent";
import CardAutomate from "../Components/CardAutomate/CardAutomate";
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
import { useDispatch, useSelector } from "react-redux";
import {
  createAutomation,
  getAllUserAutomations,
} from "../../../../../actions/automations";
import { setUser } from "../../../../../slices/emailManagerSlices";
import { useNavigate } from 'react-router-dom'


const PanelAutomate = ({ type, close, typeContent }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const { userAutomations } = useSelector((state) => state.automations); // Aca tenemos el array de automates del user (con toda la info dentro, no solo ids)
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState(data || newData);
  const [filterType, setfilterType] = useState("Todas");
  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  const typeFilterButton =
    filterType === "Entrada / Input" ? "input" : "output";

  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(id);
  };

  useEffect(() => {
    if (user) {
      dispatch(getAllUserAutomations({ userId: user?.id }));
    }
  }, [user]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    console.log("userAutomations", userAutomations);
  }, [userAutomations]);

  const handleAddAutomation = () => {
    console.log("Adding automation...", type);
    // Aca podes agregar la data hardcodeada por el momento para poder testear, te dejo la action comentada para que puedas probar

    // if (user) {
    //   dispatch(
    //     createAutomation({
    //       userId: user?.id,
    //       email: user?.email,
    //       automationData: {
    //         name: `New ${type} Automation`,
    //         description: "Automation test...",
    //         type, // esto es lo unico que tenemos de estados por el momento...
    //       },
    //     })
    //   );
    // }
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
                onClick={() => setfilterType("Todas")}
                className={`${styles.button_header} ${filterType === "Todas" && styles.button_header_active}`}
              >
                Todas
              </button>
              <button
                onClick={() => setfilterType("Entrada / Input")}
                className={`${styles.button_header} ${filterType === "Entrada / Input" && styles.button_header_active}`}
              >
                Entrada / Input
              </button>
              <button
                onClick={() => setfilterType("Salida / Output")}
                className={`${styles.button_header} ${filterType === "Salida / Output" && styles.button_header_active}`}
              >
                Salida / Output
              </button>
            </div>
            {filterType === "Todas" ? (
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
                      isActive={activeCard === card.id}
                      onCardClick={() => handleCardClick(card.id)}
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
                      isActive={activeCard === card.id}
                      onCardClick={() => handleCardClick(card.id)}
                    />
                  ))}
              </>
            ) : (
              <>
                <p style={{ fontWeight: "bold" }}>{filterType}</p>
                {dataFilter
                  .filter((card) => card.role === typeFilterButton)
                  .map((card) => (
                    <CardAutomate
                      key={card.id}
                      type={card.type}
                      name={card.automateName}
                      image={card.image}
                      contactType={card.contactType}
                      typeContent={typeContent}
                      isActive={activeCard === card.id}
                      onCardClick={() => handleCardClick(card.id)}
                    />
                  ))}
              </>
            )}
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
          <button
            onClick={handleAddAutomation}
            className={`${styles.buttons_footer} ${styles.button_add}`}
          >
            Añadir{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelAutomate;
