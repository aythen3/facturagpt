import React, { useState } from "react";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import styles from "../GmailFormCreateAutomate/gmail.module.css";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import SearchSVG from "../../svgs/SearchSVG";
import CircleDeleteSVG from "../../svgs/CircleDeleteSVG";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import ModalAddConnectionWhatsApp from "./ModalAddConnectionWhatsApp";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";

const WhatsAppFormCreateAutomate = ({
  type,
  configuration,
  setConfiguration,
}) => {
  const [showAddConnection, setShowAddConnection] = useState(false);
  const [showSelectLocation, setShowSelectLocation] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");

  const addConnection = (connection) => {
    console.log("adding wp connection", connection);
    const updatedConnections = [
      ...(configuration.whatsAppConnectionData || []),
      connection,
    ];
    console.log("setting whatsAppConnectionData", updatedConnections);
    handleConfigurationChange("whatsAppConnectionData", updatedConnections);
    if (!configuration.selectedWhatsAppConnection) {
      handleConfigurationChange(
        "selectedWhatsAppConnection",
        connection.accountId
      );
    }
  };

  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <HeaderFormsComponent
        placeholder="Añade una cuenta de WhatsApp"
        selectedEmailConnection={configuration.selectedWhatsAppConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedWhatsAppConnection", value)
        }
        emailConnections={(configuration.whatsAppConnectionData || []).map(
          (connection) => connection.accountId
        )}
        action={() => setShowAddConnection(true)}
        icon={<WhatsAppIcon />}
      />
      <TitleFormsComponent title="Recibe Facturas desde" type={type} />

      <div>
        <p>Ubicación</p>
        <InputComponent
          readOnly={true}
          value={configuration.folderLocation}
          setValue={(value) =>
            handleConfigurationChange("folderLocation", value)
          }
          textButton="Seleccionar Ubicación"
          placeholder="/Inicio"
          icon={<SearchSVG />}
          action={() => setShowSelectLocation(true)}
        />

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Teléfono de WhatsApp</p>

          <InputComponent
            icon={<SearchSVG />}
            textButton="Añadir"
            typeInput="number"
            value={phoneNumber}
            setValue={setPhoneNumber}
            action={() => {
              console.log("adding phone", phoneNumber);
              handleConfigurationChange("phoneNumbers", [
                ...configuration.phoneNumbers,
                phoneNumber,
              ]);
              setPhoneNumber("");
            }}
            placeholder="Número de teléfono o nombre del cliente"
          />
          <div styles={{ borderTop: "1px solid #EEEEEE" }}>
            {configuration?.phoneNumbers?.length === 0 && (
              <p style={{ color: "#666666", fontSize: "14px" }}>
                No hay teléfonos de WhatsApp configurado
              </p>
            )}
            {configuration?.phoneNumbers?.length > 0 &&
              configuration.phoneNumbers.map((number) => (
                <p className={styles.singlePhoneNumber}>
                  {number}
                  <div
                    onClick={() =>
                      handleConfigurationChange(
                        "phoneNumbers",
                        (configuration.phoneNumbers || []).filter(
                          (option) => option !== number
                        )
                      )
                    }
                  >
                    <CircleDeleteSVG width={"20px"} height={"20px"} />
                  </div>
                </p>
              ))}
          </div>
          <NotificationsConfirmComponent
            mainState={configuration.notificateAfterExport || false}
            setMainState={(value) =>
              handleConfigurationChange("notificateAfterExport", value)
            }
            placeholder1="[email],..."
            placeholder2="[00000000],..."
            type1="Gmail"
            type2="WhatsApp"
            gmailTo={configuration.gmailTo || ""}
            setGmailTo={(value) => handleConfigurationChange("gmailTo", value)}
            gmailSubject={configuration.gmailSubject || ""}
            setGmailSubject={(value) =>
              handleConfigurationChange("gmailSubject", value)
            }
            gmailBody={configuration.gmailBody || ""}
            setGmailBody={(value) =>
              handleConfigurationChange("gmailBody", value)
            }
            state1={configuration.notificateGmail || false}
            state1Value={configuration.gmailToNotificate || ""}
            setState1={(value) =>
              handleConfigurationChange("notificateGmail", value)
            }
            setState1Value={(value) =>
              handleConfigurationChange("gmailToNotificate", value)
            }
            state2={configuration.notificateWhatsApp || false}
            state2Value={configuration.whatsAppToNotificate || ""}
            setState2={(value) =>
              handleConfigurationChange("notificateWhatsApp", value)
            }
            setState2Value={(value) =>
              handleConfigurationChange("whatsAppToNotificate", value)
            }
            title="Notificar al recibir una factura desde WhatsApp"
            icons={[
              <GmailIcon style={{ width: 25 }} />,
              <WhatsAppIcon style={{ width: 25 }} />,
            ]}
          />
        </div>
      </div>

      {showSelectLocation && (
        <SelectLocation
          onClose={() => setShowSelectLocation(false)}
          pickLocation={(location) => {
            console.log("location", location);
            handleConfigurationChange("folderLocation", location);
          }}
        />
      )}
      {showAddConnection && (
        <ModalAddConnectionWhatsApp
          close={() => setShowAddConnection(false)}
          addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default WhatsAppFormCreateAutomate;
