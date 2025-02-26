import React, { useState } from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import styles from "../GmailFormCreateAutomate/gmail.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import CircleDeleteSVG from "../../svgs/CircleDeleteSVG";
import CheckboxComponent from "../../shared/CheckboxComponent";
import ModalAddConnectionWhatsAppSendNotifications from "./ModalAddConnectionWhatsAppSendNotifications";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import SelectLocation from "../../../SelectLocation/SelectLocation";

const WhatsAppSendNotificationsFormAutomate = ({
  type,
  configuration,
  setConfiguration,
}) => {
  const [isAddConnection, setIsAddConnection] = useState(false);
  const [showSelectInputLocation, setShowSelectInputLocation] = useState(false);

  const openAddConnection = () => {
    setIsAddConnection(true);
  };

  const closeAddConnection = () => {
    setIsAddConnection(false);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const addConnection = (connection) => {
    console.log("adding wp connection", connection);
    const updatedConnections = [
      ...(configuration?.whatsAppConnectionData || []),
      connection,
    ];
    console.log("setting whatsAppConnectionData", updatedConnections);
    handleConfigurationChange("whatsAppConnectionData", updatedConnections);
    if (!configuration?.selectedWhatsAppConnection) {
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
        selectedEmailConnection={configuration?.selectedWhatsAppConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedWhatsAppConnection", value)
        }
        emailConnections={(configuration?.whatsAppConnectionData || []).map(
          (connection) => connection.accountId
        )}
        action={openAddConnection}
        icon={<WhatsAppIcon />}
      />

      <TitleFormsComponent title="Envia una Notificación por WhatsApp" />
      <div>
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
              ...configuration?.phoneNumbers,
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
            configuration?.phoneNumbers.map((number) => (
              <p className={styles.singlePhoneNumber}>
                {number}
                <div
                  onClick={() =>
                    handleConfigurationChange(
                      "phoneNumbers",
                      (configuration?.phoneNumbers || []).filter(
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
        <div>
          <p className={styles.title_content_input}>
            Quiero recibir notificaciónes de...
          </p>

          <InputComponent
            readOnly={true}
            value={configuration?.notificationsFromFolder}
            setValue={(value) =>
              handleConfigurationChange("notificationsFromFolder", value)
            }
            textButton="Seleccionar Ubicación"
            placeholder="/Inicio"
            icon={<SearchSVG />}
            action={() => setShowSelectInputLocation(true)}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <CheckboxComponent
              color="#11A380"
              state={configuration?.newFileNotification}
              setState={(value) =>
                handleConfigurationChange("newFileNotification", value)
              }
            />
            <p style={{ color: "#71717A" }}>
              Notificar cuando se añade una factura a una ubicación
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <CheckboxComponent
              color="#11A380"
              state={configuration?.tagUpdateNotification}
              setState={(value) =>
                handleConfigurationChange("tagUpdateNotification", value)
              }
            />
            <p style={{ color: "#71717A" }}>
              Notificar cuando se actualiza una etiqueta de una factura en una
              ubicación concreta
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <CheckboxComponent
              color="#11A380"
              state={configuration?.notificateDaysBeforeDueDate}
              setState={(value) =>
                handleConfigurationChange("notificateDaysBeforeDueDate", value)
              }
            />
            <p style={{ color: "#71717A" }}>
              Notificar días antes del vencimiento de las facturas para su pago
            </p>
          </div>
        </div>
      </div>
      {showSelectInputLocation && (
        <SelectLocation
          onClose={() => setShowSelectInputLocation(false)}
          pickLocation={(location) => {
            console.log("location", location);
            handleConfigurationChange("notificationsFromFolder", location);
          }}
        />
      )}
      {isAddConnection && (
        <ModalAddConnectionWhatsAppSendNotifications
          close={closeAddConnection}
          addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default WhatsAppSendNotificationsFormAutomate;
