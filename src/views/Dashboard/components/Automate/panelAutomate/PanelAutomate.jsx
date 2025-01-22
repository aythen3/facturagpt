import React, { useEffect, useState } from "react";
import styles from "./panelAutomate.module.css";
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
import { useNavigate } from "react-router-dom";
import ModalBlackBgTemplate from "../../ModalBlackBgTemplate/ModalBlackBgTemplate";
import chevronLeft from "../../../assets/chevronLeft.svg";
import automation from "../../../assets/automation.svg";
import CustomSearchbar from "../../CustomSearchbar/CustomSearchbar";

const PanelAutomate = ({
  type,
  close,
  typeContent,
  isAnimating,
  automationData,
}) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { userAutomations } = useSelector((state) => state.automations); // Aca tenemos el array de automates del user (con toda la info dentro, no solo ids)
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState(data || newData);
  const [filterType, setfilterType] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  //   ================================ CONFIGS =====================================

  const [gmailAndOutlookConfiguration, setGmailAndOutlookConfiguration] =
    useState({
      type: "Gmail",
      folderLocation: "/Inicio",
      includeAllRemitents: true,
      subjectExactMatch: true,
      bodyExactMatch: true,
      attachmentExactMatch: true,
      selectedTypes: [],
      addedRemitents: [],
      subjectKeyWords: [],
      bodyKeyWords: [],
      notificateGmail: false,
      notificateWhatsApp: false,
      emailConnectionData: [],
      selectedEmailConnection: "",
      fileName: "",
      tags: "",
      gmailTo: "",
      gmailSubject: "",
      gmailBody: "",
      whatsAppToNotificate: "",
      whatsAppMessage: "",
      notificateAfterExport: false,
    });

  const [whatsAppConfiguration, setWhatsAppConfiguration] = useState({
    type: "WhatsApp",
    phoneNumber: "",
    folderLocation: "/Inicio",
    selectedWhatsAppConnection: "",
    whatsAppConnectionData: [],
    phoneNumbers: [],
    notificateAfterExport: false,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppMessage: "",
  });

  useEffect(() => {
    if (automationData) {
      if (automationData.automationData.type === "WhatsApp") {
        setWhatsAppConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "Gmail") {
        setGmailAndOutlookConfiguration(automationData.automationData);
      }
    }
  }, []);

  useEffect(() => {
    console.log("type changed to", type);
  }, [type]);
  useEffect(() => {
    console.log(
      "gmailAndOutlookConfiguration changed to:",
      gmailAndOutlookConfiguration
    );
  }, [gmailAndOutlookConfiguration]);
  //   ==============================================================================
  useEffect(() => {
    if (searchTerm === "") {
      setDataFilter(data || newData);
    } else {
      handleDataFilter(searchTerm);
    }
  }, [searchTerm]);

  const typeFilterButton =
    filterType === "Entrada / Input" ? "input" : "output";

  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(id);
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const handleAddAutomation = () => {
    console.log("Adding automation...", type);

    let selectedAutomationData;

    if (type === "Gmail") {
      selectedAutomationData = {
        ...gmailAndOutlookConfiguration,
        type: type,
      };
    } else if (type === "Outlook") {
      selectedAutomationData = {
        ...gmailAndOutlookConfiguration,
        type: type,
      };
    } else if (type === "WhatsApp") {
      selectedAutomationData = {
        ...whatsAppConfiguration,
        type: type,
      };
    }

    // Por el momento testeamos con gmail y outlook

    if (user) {
      dispatch(
        createAutomation({
          userId: user?.id,
          email: user?.email,
          automationData: selectedAutomationData,
        })
      );
    }
  };

  return (
    <ModalBlackBgTemplate close={close} isAnimating={isAnimating}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
              <div onClick={close} className={styles.backButton}>
                <img src={chevronLeft} alt="chevronLeft" />
              </div>
              <h2>Añadir Automatización</h2>
            </div>
            <div className={styles.buttonsContainer}>
              <button
                onClick={close}
                className={`${styles.buttons_footer} ${styles.button_back}`}
              >
                Atrás
              </button>
              <button
                onClick={handleAddAutomation}
                className={`${styles.buttons_footer} ${styles.button_add}`}
              >
                <img src={automation} alt="automation" /> Guardar
              </button>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.leftContainer}>
              <CustomSearchbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
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
                  Entrada
                </button>
                <button
                  onClick={() => setfilterType("Salida / Output")}
                  className={`${styles.button_header} ${filterType === "Salida / Output" && styles.button_header_active}`}
                >
                  Salida
                </button>
              </div>
              {filterType === "Todas" ? (
                <>
                  <p style={{ fontWeight: "bold" }}>Entrada</p>
                  <div className={styles.cardsContainer}>
                    {dataFilter
                      .filter((card) => card.role === "input")
                      .map((card) => (
                        <CardAutomate
                          fromPanel={true}
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
                  </div>

                  <p style={{ fontWeight: "bold" }}>Salida</p>
                  <div className={styles.cardsContainer}>
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
                          fromPanel={true}
                          isActive={activeCard === card.id}
                          onCardClick={() => handleCardClick(card.id)}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontWeight: "bold" }}>
                    {filterType === "Entrada / Input" ? "Entrada" : "Salida"}
                  </p>
                  <div className={styles.cardsContainer}>
                    {dataFilter
                      .filter((card) => card.role === typeFilterButton)
                      .map((card) => (
                        <CardAutomate
                          key={card.id}
                          fromPanel={true}
                          type={card.type}
                          name={card.automateName}
                          image={card.image}
                          contactType={card.contactType}
                          typeContent={typeContent}
                          isActive={activeCard === card.id}
                          onCardClick={() => handleCardClick(card.id)}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>

            <div className={styles.formAutomateContainer}>
              {(() => {
                switch (type) {
                  case "Gmail":
                  case "Outlook":
                    return (
                      <GmailAndOutlook
                        configuration={gmailAndOutlookConfiguration}
                        setConfiguration={setGmailAndOutlookConfiguration}
                        type={type}
                      />
                    );
                  case "Google Drive":
                    return <GoogleDriveFormCreateAutomate type={type} />;
                  case "WhatsApp":
                    return (
                      <WhatsAppFormCreateAutomate
                        type={type}
                        configuration={whatsAppConfiguration}
                        setConfiguration={setWhatsAppConfiguration}
                      />
                    );
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
                    return (
                      <WhatsAppSendNotificationsFormAutomate type={type} />
                    );
                  default:
                    return <div>OTRO</div>;
                }
              })()}
            </div>
          </div>

          {/* <div className={styles.container_buttons_footer}>
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
          </div> */}
        </div>
      </div>
    </ModalBlackBgTemplate>
  );
};

export default PanelAutomate;
