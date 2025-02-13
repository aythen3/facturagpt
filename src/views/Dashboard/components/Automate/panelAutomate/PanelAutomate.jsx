import React, { useEffect, useState } from "react";
import styles from "./panelAutomate.module.css";
import CardAutomate from "../Components/CardAutomate/CardAutomate";
import { data } from "../utils/automatesJson";
import GmailCreateAutomate from "../Components/GmailFormCreateAutomate/Gmail";
import OutlookCreateAutomate from "../Components/OutlookFormCreateAutomate/Outlook";
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
  updateAutomation,
} from "../../../../../actions/automations";
import { useNavigate } from "react-router-dom";
import ModalBlackBgTemplate from "../../ModalBlackBgTemplate/ModalBlackBgTemplate";
import chevronLeft from "../../../assets/chevronLeft.svg";
import automation from "../../../assets/automation.svg";
import CustomSearchbar from "../../CustomSearchbar/CustomSearchbar";
import DropboxFormCreateAutomate from "../Components/DropboxFormCreateAutomate/DropboxFormCreateAutomate";
import HoldedFormAutomate from "../Components/HoldedFormAutomate/HoldedFormAutomate";
import FTPFormAutomate from "../Components/FTPFormAutomate/FTPFormAutomate";
import TelematelFormAutomate from "../Components/TelamatelFormAutomate/TelematelFormAutomate";

const PanelAutomate = ({
  type,
  close,
  typeContent,
  isAnimating,
  automationData,
  setIsModalAutomate,
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

  //   ================================ INPUT CONFIGS =====================================

  const [gmailConfiguration, setGmailConfiguration] =
    useState({
      folderLocation: "/Inicio/",
      includeAllRemitents: true,
      subjectExactMatch: true,
      bodyExactMatch: true,
      attachmentExactMatch: true,
      selectedTypes: [],
      addedRemitents: [],
      subjectKeyWords: [],
      bodyKeyWords: [],
      emailConnectionData: [],
      selectedEmailConnection: "",
      fileName: "",
      tags: "",
      notificateAfterExport: false,
      notificateGmail: false,
      notificateWhatsApp: false,
      gmailTo: "",
      gmailSubject: "",
      gmailBody: "",
      whatsAppToNotificate: "",
      whatsAppMessage: "",
    });

  const [outlookConfiguration, setOutlookConfiguration] =
    useState({
      folderLocation: "/Inicio/",
      includeAllRemitents: true,
      subjectExactMatch: true,
      bodyExactMatch: true,
      attachmentExactMatch: true,
      selectedTypes: [],
      addedRemitents: [],
      subjectKeyWords: [],
      bodyKeyWords: [],
      emailConnectionData: [],
      selectedEmailConnection: "",
      fileName: "",
      tags: "",
      notificateAfterExport: false,
      notificateGmail: false,
      notificateWhatsApp: false,
      gmailTo: "",
      gmailSubject: "",
      gmailBody: "",
      whatsAppToNotificate: "",
      whatsAppMessage: "",
    });

  const [whatsAppConfiguration, setWhatsAppConfiguration] = useState({
    type: "WhatsApp",
    phoneNumber: "",
    folderLocation: "/Inicio/",
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

  const [googleDriveConfiguration, setGoogleDriveConfiguration] = useState({
    type: "Google Drive",
    folderLocation: "/Inicio/",
    selectedGoogleDriveConnection: "",
    googleDriveConnectionData: [],
    filesKeyWords: [],
    filesKeyWordsExactMatch: true,
    selectedFileTypes: [],
    allowAllFileTypes: true,
    changeFileName: false,
    fileName: "",
    notificateAfterExport: true,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppToNotificate: "",
    whatsAppMessage: "",
  });

  const [esPublicoGestionaConfiguration, setEsPublicoGestionaConfiguration] =
    useState({
      type: "esPúblico Gestiona",
      folderLocation: "/Inicio/",
      selectedPublicoGestionaConnection: "",
      publicoGestionaConnectionData: [],
      notificateAfterExport: false,
      notificateGmail: false,
      notificateWhatsApp: false,
      gmailTo: "",
      gmailSubject: "",
      gmailBody: "",
      whatsAppToNotificate: "",
      whatsAppMessage: "",
      notificateAfterError: false,
      notificateErrorGmail: false,
      notificateErrorWhatsApp: false,
      errorGmailTo: "",
      errorGmailSubject: "",
      errorGmailBody: "",
      errorWhatsAppToNotificate: "",
      errorWhatsAppMessage: "",
    });

  const [dropBoxConfiguration, setDropBoxConfiguration] = useState({
    type: "Dropbox",
    folderLocation: "/Inicio/",
    selectedDropboxConnection: "",
    dropboxConnectionData: [],
    filesKeyWords: [],
    filesKeyWordsExactMatch: true,
    selectedFileTypes: [],
    allowAllFileTypes: true,
    changeFileName: false,
    fileName: "",
    notificateAfterExport: true,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppToNotificate: "",
    whatsAppMessage: "",
  });

  //   ================================ OUTPUT CONFIGS =====================================

  const [googleSheetsConfiguration, setGoogleSheetsConfiguration] = useState({
    type: "Google Sheets",
    selectedGoogleSheetsConnection: "",
    googleSheetsConnectionData: [],
    sheetId: "",
    sheetTitle: "",
    generalConfiguration: {},
    notificateAfterCreatingRow: true,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppToNotificate: "",
    whatsAppMessage: "",
  });

  const [XMLConfiguration, setXMLConfiguration] = useState({
    type: "XML",
    fileName: "",
    filesSource: "/Inicio/",
    folderLocation: "/Inicio/",
    formatType: "",
    notificateAfterExport: true,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppToNotificate: "",
    whatsAppMessage: "",
    notificateAfterError: false,
    notificateErrorGmail: false,
    notificateErrorWhatsApp: false,
    errorGmailTo: "",
    errorGmailSubject: "",
    errorGmailBody: "",
    errorWhatsAppToNotificate: "",
    errorWhatsAppMessage: "",
  });

  const [odooConfiguration, setOdooConfiguration] = useState({
    type: "Odoo",
    selectedOdooConnection: "",
    odooConnectionData: [],
    filesSource: "/Inicio/",
    folderLocation: "/Inicio/",
    formatType: "",
    changeFileName: false,
    fileName: "",
    addTag: false,
    tags: [],
    notificateAfterExport: true,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppToNotificate: "",
    whatsAppMessage: "",
    notificateAfterError: false,
    notificateErrorGmail: false,
    notificateErrorWhatsApp: false,
    errorGmailTo: "",
    errorGmailSubject: "",
    errorGmailBody: "",
    errorWhatsAppToNotificate: "",
    errorWhatsAppMessage: "",
  });

  const [woltersConfiguration, setWoltersConfiguration] = useState({
    type: "Wolters",
    selectedWoltersConnection: "",
    woltersConnectionData: [],
    filesSource: "",
    folderLocation: "/Inicio/",
    formatType: "",
    changeFileName: false,
    fileName: "",
    notificateAfterExport: true,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppToNotificate: "",
    whatsAppMessage: "",
    notificateAfterError: false,
    notificateErrorGmail: false,
    notificateErrorWhatsApp: false,
    errorGmailTo: "",
    errorGmailSubject: "",
    errorGmailBody: "",
    errorWhatsAppToNotificate: "",
    errorWhatsAppMessage: "",
  });

  const [agenciaConfiguration, setAgenciaConfiguration] = useState({
    type: "Agencia",
    selectedAgenciaConnection: "",
    agenciaConnectionData: [],
    notificateAfterExport: true,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppToNotificate: "",
    whatsAppMessage: "",
    notificateAfterError: false,
    notificateErrorGmail: false,
    notificateErrorWhatsApp: false,
    errorGmailTo: "",
    errorGmailSubject: "",
    errorGmailBody: "",
    errorWhatsAppToNotificate: "",
    errorWhatsAppMessage: "",
  });

  const [
    whatsAppNotificationsConfiguration,
    setWhatsAppNotificationsConfiguration,
  ] = useState({
    type: "whatsApp notifications",
    selectedWhatsAppConnection: "",
    whatsAppConnectionData: [],
    phoneNumbers: [],
    notificationsFromFolder: "/Inicio/",
    newFileNotification: true,
    tagUpdateNotification: true,
    notificateDaysBeforeDueDate: true,
  });

  const [holdedConfiguration, setHoldedConfiguration] = useState({
    type: "Holded",
    selectedHoldedConnection: "",
    holdedConnectionData: [],
    filesSource: "",
    folderLocation: "/Inicio/",
    formatType: "",
    changeFileName: false,
    fileName: "",
    notificateAfterExport: true,
    notificateGmail: false,
    notificateWhatsApp: false,
    gmailTo: "",
    gmailSubject: "",
    gmailBody: "",
    whatsAppToNotificate: "",
    whatsAppMessage: "",
    notificateAfterError: false,
    notificateErrorGmail: false,
    notificateErrorWhatsApp: false,
    errorGmailTo: "",
    errorGmailSubject: "",
    errorGmailBody: "",
    errorWhatsAppToNotificate: "",
    errorWhatsAppMessage: "",
  });

  const [ftpConfiguration, setFtpConfiguration] = useState({
    type: "FTP",
    filesSource: "/FTP",
    selectedFTPConnection: "",
    ftpConnectionData: [],
    filesKeyWords: [],
    filesKeyWordsExactMatch: true,
    selectedFileTypes: [],
    allowAllFileTypes: true,
    changeFileName: false,
    fileName: "",
  });

  

  const [telematelConfiguration, setTelematelConfiguration] = useState({
    type: "Telematel",
    filesSource: "/Telematel",
    selectedTelematelConnection: "",
    telematelConnectionData: [],
    filesKeyWords: [],
    filesKeyWordsExactMatch: true,
    selectedFileTypes: [],
    allowAllFileTypes: true,
    changeFileName: false,
    fileName: "",
  });

  //   =====================================================================================

  useEffect(() => {
    if (automationData) {
      console.log("AUTOMATIONDATA LOADED", automationData);
      if (automationData.automationData.type === "WhatsApp") {
        console.log(
          "Setting whatsAppConfiguration",
          automationData.automationData
        );
        setWhatsAppConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "Gmail") {
        console.log(
          "Setting gmailAndOutlookConfiguration",
          automationData.automationData
        );
        setGmailConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "Google Drive") {
        console.log(
          "Setting googleDriveConfiguration",
          automationData.automationData
        );
        setGoogleDriveConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "esPúblico Gestiona") {
        console.log(
          "Setting esPublicoGestionaConfiguration",
          automationData.automationData
        );
        setEsPublicoGestionaConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "Dropbox") {
        console.log(
          "Setting dropBoxConfiguration",
          automationData.automationData
        );
        setDropBoxConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "Google Sheets") {
        console.log(
          "Setting googleSheetsConfiguration",
          automationData.automationData
        );
        setGoogleSheetsConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "XML") {
        console.log("Setting XML configuration", automationData.automationData);
        setXMLConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "Odoo") {
        console.log(
          "Setting Odoo configuration",
          automationData.automationData
        );
        setOdooConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "Wolters") {
        console.log(
          "Setting Wolters configuration",
          automationData.automationData
        );
        setWoltersConfiguration(automationData.automationData);
      } else if (
        automationData.automationData.type === "whatsApp notifications"
      ) {
        console.log(
          "Setting whatsApp notifications configuration",
          automationData.automationData
        );
        setWhatsAppNotificationsConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "Agencia Tributaria") {
        console.log(
          "Setting Agencia Tributaria configuration",
          automationData.automationData
        );
        setAgenciaConfiguration(automationData.automationData);
      } else if (automationData.automationData.type === "FTP") {
        console.log("FTP configuration", automationData.automationData);
        setFtpConfiguration(automationData.automationData);
      }
    }
  }, [automationData]);

  useEffect(() => {
    console.log("type changed to", type);
  }, [type]);
  useEffect(() => {
    console.log(
      "gmailAndOutlookConfiguration changed to:",
      gmailConfiguration
    );
  }, [gmailConfiguration]);
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

  const handleAddAutomation = async () => {
    console.log("Adding automation...", type);

    let selectedAutomationData;

    if (type === "Gmail") {
      selectedAutomationData = {
        ...gmailConfiguration,
        type: type,
      };
    } else if (type === "Outlook") {
      selectedAutomationData = {
        ...outlookConfiguration,
        type: type,
      };
    } else if (type === "WhatsApp") {
      selectedAutomationData = {
        ...whatsAppConfiguration,
        type: type,
      };
    } else if (type === "Google Drive") {
      selectedAutomationData = {
        ...googleDriveConfiguration,
        type: type,
      };
    } else if (type === "esPúblico Gestiona") {
      selectedAutomationData = {
        ...esPublicoGestionaConfiguration,
        type: type,
      };
    } else if (type === "Dropbox") {
      selectedAutomationData = {
        ...dropBoxConfiguration,
        type: type,
      };
    } else if (type === "Google Sheets") {
      selectedAutomationData = {
        ...googleSheetsConfiguration,
        type: type,
      };
    } else if (type === "XML") {
      selectedAutomationData = {
        ...XMLConfiguration,
        type: "XML",
      };
    } else if (type === "Odoo") {
      selectedAutomationData = {
        ...odooConfiguration,
        type: "Odoo",
      };
    } else if (type === "Wolters") {
      selectedAutomationData = {
        ...woltersConfiguration,
        type: "Wolters",
      };
    } else if (type === "Agencia Tributaria") {
      selectedAutomationData = {
        ...agenciaConfiguration,
        type: "Agencia Tributaria",
      };
    } else if (type === "whatsApp notifications") {
      selectedAutomationData = {
        ...whatsAppNotificationsConfiguration,
        type: "whatsApp notifications",
      };
    } else if (type === "Holded") {
      selectedAutomationData = {
        ...holdedConfiguration,
        type: "Holded",
      };
    } else if (type === "FTP") {
      selectedAutomationData = {
        ...ftpConfiguration,
        type: "FTP",
      };
    } else if (type === "Acrobat") {
      selectedAutomationData = {
        ...acrobatConfiguration,
        type: "Acrobat",
      };
    }
    // Por el momento testeamos con gmail y outlook

    if (user && selectedAutomationData?.id) {
      console.log("UPDATING AUTOMATION", selectedAutomationData?.id);
      dispatch(
        updateAutomation({
          automationId: selectedAutomationData?.id,
          toUpdate: { automationData: selectedAutomationData },
          userId: user?.id,
        })
      );
    } else if (user) {
      console.log("CREATING AUTOMATION");
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
                onClick={() => {
                  close();
                  setTimeout(() => {
                    setIsModalAutomate(true);
                  }, 300);
                }}
                className={`${styles.buttons_footer} ${styles.button_back}`}
              >
                Atrás
              </button>
              <button
                onClick={async () => {
                  await handleAddAutomation();
                  close();
                  setTimeout(() => {
                    setIsModalAutomate(true);
                  }, 300);
                }}
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
                          available={card.available}
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
                          available={card.available}
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
                          available={card.available}
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
                    return (
                      <GmailCreateAutomate
                        configuration={gmailConfiguration}
                        setConfiguration={setGmailConfiguration}
                        type={type}
                      />
                    );
                  case "Outlook":
                    return (
                      <OutlookCreateAutomate
                        configuration={outlookConfiguration}
                        setConfiguration={setOutlookConfiguration}
                        type={type}
                      />
                    );
                  case "Google Drive":
                    return (
                      <GoogleDriveFormCreateAutomate
                        configuration={googleDriveConfiguration}
                        setConfiguration={setGoogleDriveConfiguration}
                        type={type}
                      />
                    );
                  case "Dropbox":
                    return (
                      <DropboxFormCreateAutomate
                        configuration={dropBoxConfiguration}
                        setConfiguration={setDropBoxConfiguration}
                        type={type}
                      />
                    );
                  case "WhatsApp":
                    return (
                      <WhatsAppFormCreateAutomate
                        type={type}
                        configuration={whatsAppConfiguration}
                        setConfiguration={setWhatsAppConfiguration}
                      />
                    );
                  case "esPúblico Gestiona":
                    return (
                      <EsPublicoGestionaFormAutomate
                        configuration={esPublicoGestionaConfiguration}
                        setConfiguration={setEsPublicoGestionaConfiguration}
                        type={type}
                      />
                    );
                  case "Google Sheets":
                    return (
                      <GoogleSheetsFormAutomate
                        configuration={googleSheetsConfiguration}
                        setConfiguration={setGoogleSheetsConfiguration}
                        type={type}
                      />
                    );
                  case "XML":
                    return (
                      <XmlFormAutomate
                        type={type}
                        configuration={XMLConfiguration}
                        setConfiguration={setXMLConfiguration}
                      />
                    );
                  case "Odoo":
                    return (
                      <OdooFormAutomate
                        type={type}
                        configuration={odooConfiguration}
                        setConfiguration={setOdooConfiguration}
                      />
                    );
                  case "Wolters":
                    return (
                      <WoltersKluwerA3FormAutomate
                        type={type}
                        configuration={woltersConfiguration}
                        setConfiguration={setWoltersConfiguration}
                      />
                    );
                  case "Agencia Tributaria":
                    return (
                      <AgencyTributFormAutomate
                        type={type}
                        configuration={agenciaConfiguration}
                        setConfiguration={setAgenciaConfiguration}
                      />
                    );
                  case "whatsApp notifications":
                    return (
                      <WhatsAppSendNotificationsFormAutomate
                        type={type}
                        configuration={whatsAppNotificationsConfiguration}
                        setConfiguration={setWhatsAppNotificationsConfiguration}
                      />
                    );
                  case "Holded":
                    return (
                      <HoldedFormAutomate
                        type={type}
                        configuration={holdedConfiguration}
                        setConfiguration={setHoldedConfiguration}
                      />
                    );
                  case "FTP":
                    return (
                      <FTPFormAutomate
                        type={type}
                        configuration={ftpConfiguration}
                        setConfiguration={setFtpConfiguration}
                      />
                    );
                  case "Telematel":
                    return (
                      <TelematelFormAutomate
                        type={type}
                        configuration={telematelConfiguration}
                        setConfiguration={setTelematelConfiguration}
                      />
                    );
                  default:
                    return <div>Falta figma</div>;
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
