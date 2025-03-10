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
} from "../../../../../actions/automate";
import { useNavigate } from "react-router-dom";
import ModalBlackBgTemplate from "../../ModalBlackBgTemplate/ModalBlackBgTemplate";
import chevronLeft from "../../../assets/chevronLeft.svg";
import automation from "../../../assets/automation.svg";
import CustomSearchbar from "../../CustomSearchbar/CustomSearchbar";
import DropboxFormCreateAutomate from "../Components/DropboxFormCreateAutomate/DropboxFormCreateAutomate";
import HoldedFormAutomate from "../Components/HoldedFormAutomate/HoldedFormAutomate";
import FTPFormAutomate from "../Components/FTPFormAutomate/FTPFormAutomate";
import TelematelFormAutomate from "../Components/TelamatelFormAutomate/TelematelFormAutomate";
import SelectCurrencyPopup from "../../SelectCurrencyPopup/SelectCurrencyPopup";
import HeaderCard from "../../HeaderCard/HeaderCard";
import Button from "../../Button/Button";

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
  const { userAutomations } = useSelector((state) => state.automate); // Aca tenemos el array de automates del user (con toda la info dentro, no solo ids)
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState(data || newData);
  const [filterType, setfilterType] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showSelectCurrencyPopup, setShowSelectCurrencyPopup] = useState(false);
  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  //   ================================ INPUT CONFIGS =====================================

  const [gmailConfiguration, setGmailConfiguration] = useState({
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
    totalAmount: {
      currency: "USD",
      min: 0,
      max: 0,
    },

    inputType: true,

    labels: null,
    filesExactMatch: false,
    phoneListNotificate: [],
    showContentSelectInfoToProcess: null,
    showContentImport: null,
    showContentExport: null,
    shotContentNotification: null,
  });

  const [outlookConfiguration, setOutlookConfiguration] = useState({
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

    inputType: true,

    totalAmount: {
      currency: "USD",
      min: 0,
      max: 0,
    },
    labels: null,
    filesExactMatch: false,
    phoneListNotificate: [],
    showContentSelectInfoToProcess: null,
    showContentImport: null,
    showContentExport: null,
    shotContentNotification: null,
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
    inputType: true,
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
    inputType: true,
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
      inputType: true,
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
    inputType: true,
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
    inputType: false,
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
    inputType: false,
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
    inputType: false,
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
    inputType: false,
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
    inputType: false,
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
    inputType: false,
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
    inputType: false,
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
    inputType: false,
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
    inputType: false,
  });

  //   =====================================================================================

  useEffect(() => {
    if (automationData) {
      console.log("AUTOMATIONDATA LOADED", automationData);
      if (automationData.type === "WhatsApp") {
        console.log("Setting whatsAppConfiguration", automationData);
        setWhatsAppConfiguration(automationData.automationData);
      } else if (automationData.type === "Gmail") {
        console.log("Setting gmailAndOutlookConfiguration", automationData);
        // setGmailConfiguration(automationData.automationData);
        setGmailConfiguration(automationData);
      } else if (automationData.type === "Outlook") {
        console.log("Setting OutlookConfiguration", automationData);
        setOutlookConfiguration(automationData);
      } else if (automationData.type === "Google Drive") {
        console.log("Setting googleDriveConfiguration", automationData);
        setGoogleDriveConfiguration(automationData);
      } else if (automationData.type === "esPúblico Gestiona") {
        console.log("Setting esPublicoGestionaConfiguration", automationData);
        setEsPublicoGestionaConfiguration(automationData);
      } else if (automationData.type === "Dropbox") {
        console.log("Setting dropBoxConfiguration", automationData);
        setDropBoxConfiguration(automationData);
      } else if (automationData.type === "Google Sheets") {
        console.log("Setting googleSheetsConfiguration", automationData);
        setGoogleSheetsConfiguration(automationData);
      } else if (automationData.type === "XML") {
        console.log("Setting XML configuration", automationData);
        setXMLConfiguration(automationData.automationData);
      } else if (automationData.type === "Odoo") {
        console.log("Setting Odoo configuration", automationData);
        setOdooConfiguration(automationData);
      } else if (automationData.type === "Wolters") {
        console.log("Setting Wolters configuration", automationData);
        setWoltersConfiguration(automationData);
      } else if (
        automationData.automationData?.type === "whatsApp notifications"
      ) {
        console.log(
          "Setting whatsApp notifications configuration",
          automationData
        );
        setWhatsAppNotificationsConfiguration(automationData);
      } else if (automationData.type === "Agencia Tributaria") {
        console.log("Setting Agencia Tributaria configuration", automationData);
        setAgenciaConfiguration(automationData);
      } else if (automationData.type === "FTP") {
        console.log("FTP configuration", automationData);
        setFtpConfiguration(automationData);
      }
    }
  }, [automationData]);

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

  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

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
    } else if (type === "Telematel") {
      selectedAutomationData = {
        ...telematelConfiguration,
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

    console.log("CREATIING AUTOMATION", selectedAutomationData);
    if (user && selectedAutomationData?.id) {
      console.log("UPDATING AUTOMATION", selectedAutomationData?.id);
      dispatch(
        updateAutomation({
          automationId: selectedAutomationData?.id,
          // toUpdate: { automationData: selectedAutomationData },
          toUpdate: selectedAutomationData,
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
          {/* <div className={styles.headerContainer}>
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
          </div> */}
          <HeaderCard title={"Añadir Automatización"} setState={close}>
            {/* <Button type="white">Atrás</Button> */}
            <Button
              action={async () => {
                await handleAddAutomation();
                close();
                setTimeout(() => {
                  setIsModalAutomate(true);
                }, 300);
              }}
            >
              {" "}
              <img src={automation} alt="automation" />
              Guardar
            </Button>
          </HeaderCard>
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
                    {dataFilter.filter((card) => card.role === "input")
                      .length == 0
                      ? "No hay automatizaciones disponibles de tipo entrada"
                      : dataFilter
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
                    {dataFilter.filter((card) => card.role === "output")
                      .length == 0
                      ? "No hay automatizaciones disponibles de tipo salida"
                      : dataFilter
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
                        setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
                        setSelectedCurrency={setSelectedCurrency}
                        selectedCurrency={selectedCurrency}
                      />
                    );
                  case "Outlook":
                    return (
                      <OutlookCreateAutomate
                        configuration={outlookConfiguration}
                        setConfiguration={setOutlookConfiguration}
                        type={type}
                        setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
                        setSelectedCurrency={setSelectedCurrency}
                        selectedCurrency={selectedCurrency}
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
                        setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
                        setSelectedCurrency={setSelectedCurrency}
                        selectedCurrency={selectedCurrency}
                      />
                    );
                  default:
                    return <div>Falta figma</div>;
                }
              })()}
            </div>
          </div>
          {showSelectCurrencyPopup && (
            <SelectCurrencyPopup
              setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
              setSelectedCurrency={setSelectedCurrency}
              selectedCurrency={selectedCurrency}
            />
          )}
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
