import React, { useEffect, useState } from "react";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import { ReactComponent as GoogleSheetsIcon } from "../../../../assets/excel.svg";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import ModalAddConnectionGoogleSheets from "./ModalAddConnectionGoogleSheets";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import { facturas, clienteProveedores, productosServicios } from "./constants";

const GoogleSheetsFormAutomate = ({
  type,
  configuration,
  setConfiguration,
}) => {
  const [showAddConnection, setShowAddConnection] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState(() => {
    if (
      configuration.generalConfiguration &&
      Object.keys(configuration.generalConfiguration).length > 0
    ) {
      return configuration.generalConfiguration;
    }
    return {
      facturas: facturas.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
      clienteProveedores: clienteProveedores.reduce(
        (acc, item) => ({ ...acc, [item]: false }),
        {}
      ),
      productosServicios: productosServicios.reduce(
        (acc, item) => ({ ...acc, [item]: false }),
        {}
      ),
    };
  });

  const handleCheckboxChange = (category, key, value) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    setConfiguration((prev) => ({
      ...prev,
      generalConfiguration: checkboxStates,
    }));
  }, [checkboxStates]);

  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addConnection = (connection) => {
    console.log("adding connection", connection);
    const updatedConnections = [
      ...(configuration.googleSheetsConnectionData || []),
      connection,
    ];
    handleConfigurationChange("googleSheetsConnectionData", updatedConnections);
    if (!configuration.selectedGoogleSheetsConnection) {
      handleConfigurationChange(
        "selectedGoogleSheetsConnection",
        connection.clientId
      );
    }
  };

  return (
    <div>
      <HeaderFormsComponent
        placeholder="Añade una cuenta de Google Sheets"
        selectedEmailConnection={configuration.selectedGoogleSheetsConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedGoogleSheetsConnection", value)
        }
        emailConnections={(configuration.googleSheetsConnectionData || []).map(
          (connection) => connection.clientId
        )}
        action={() => setShowAddConnection(true)}
        icon={<GoogleSheetsIcon />}
      />
      <TitleFormsComponent title="Actualiza tu" type={type} />

      <div className={styles.content_input}>
        <p className={styles.title_content_input}>ID de la hoja de cálculo</p>

        <InputComponent
          value={configuration.sheetId}
          setValue={(value) => handleConfigurationChange("sheetId", value)}
          icon={<GoogleSheetsIcon style={{ width: 20, height: 20 }} />}
          placeholder="ID de la hoja"
          textButton="Seleccionar"
        />
      </div>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          userSelect: "none",
          backgroundColor: "#6F6F81",
          border: "none",
          width: "118px",
          height: "32px",
          whiteSpace: "nowrap",
          borderRadius: "3px",
          color: "white",
          fontSize: "12px",
          fontWeight: "semibold",
          marginTop: "24px",
        }}
      >
        Crear Nueva Hoja
      </button>

      <div className={styles.content_input}>
        <p className={styles.title_content_input}>
          Título de la hoja de cálculo
        </p>

        <InputComponent
          value={configuration.sheetTitle}
          setValue={(value) => handleConfigurationChange("sheetTitle", value)}
          placeholder="Título de la hoja de cálculo"
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <GoogleSheetsIcon
            style={{ width: 20, height: 20, marginBottom: "3px" }}
          />
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#27A768",
            }}
          >
            Título de la hoja.xls
          </p>
        </div>
        <p
          style={{
            cursor: "pointer",
            fontSize: "12px",
            whiteSpace: "nowrap",
            fontWeight: "bold",
          }}
        >
          Abrir hoja de cálculo
        </p>
      </div>
      <div style={{ display: "grid", gap: "10px" }}>
        <div>
          <p>Facturas</p>
          {facturas.map((factura) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              key={factura}
            >
              <CheckboxComponent
                color="#27A768"
                state={checkboxStates.facturas[factura]}
                setState={(value) =>
                  handleCheckboxChange("facturas", factura, value)
                }
                label={factura}
              />
              <p>{factura}</p>
            </div>
          ))}
        </div>

        <div>
          <p>Clientes y Proveedores</p>
          {clienteProveedores.map((client) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              key={client}
            >
              <CheckboxComponent
                color="#27A768"
                state={checkboxStates.clienteProveedores[client]}
                setState={(value) =>
                  handleCheckboxChange("clienteProveedores", client, value)
                }
                label={client}
              />
              <p>{client}</p>
            </div>
          ))}
        </div>

        <div>
          <p>Productos y Servicios</p>
          {productosServicios.map((product) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              key={product}
            >
              <CheckboxComponent
                color="#27A768"
                state={checkboxStates.productosServicios[product]}
                setState={(value) =>
                  handleCheckboxChange("productosServicios", product, value)
                }
                label={product}
              />
              <p>{product}</p>
            </div>
          ))}
        </div>
      </div>

      <NotificationsConfirmComponent
        mainState={configuration.notificateAfterCreatingRow || false}
        setMainState={(value) =>
          handleConfigurationChange("notificateAfterCreatingRow", value)
        }
        title="Notificar al crear una fila"
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
        setGmailBody={(value) => handleConfigurationChange("gmailBody", value)}
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
        whatsAppMessage={configuration.whatsAppMessage || ""}
        setWhatsAppMessage={(value) =>
          handleConfigurationChange("whatsAppMessage", value)
        }
        icons={[
          <GmailIcon style={{ width: 25 }} />,
          <WhatsAppIcon style={{ width: 25 }} />,
        ]}
      />

      {showAddConnection && (
        <ModalAddConnectionGoogleSheets
          addConnection={addConnection}
          close={() => setShowAddConnection(false)}
        />
      )}
    </div>
  );
};

export default GoogleSheetsFormAutomate;
