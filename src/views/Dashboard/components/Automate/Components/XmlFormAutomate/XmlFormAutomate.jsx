import React from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../../InputComponent/InputComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import CheckboxComponent from "../../shared/CheckboxComponent";
import SearchSVG from "../../svgs/SearchSVG";
import SelectComponent from "../../../SelectComponent/SelectComponent";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";

const XmlFormAutomate = ({ type }) => {
  return (
    <div>
      <TitleFormsComponent title="Genera Archivos" type={type} />
      <div>
        <p>Nombre del archivo</p>
        <InputComponent placeholder="[fecha]-[empresa]-[importe]-[etiqueta]" />
      </div>
      <div className={styles.content_input}>
        <p className={styles.title_content_input}>
          Fuente de Datos{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Conecta la fuente de facturas desde la cual se generarán los XML
          </span>{" "}
        </p>

        <InputComponent
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
          textButton="Seleccionar Ubicación"
          typeInput="text"
        />
      </div>

      <div className={styles.content_input}>
        <p className={styles.title_content_input}>
          Formato del Archivo XML{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Selecciona estándar de exportación
          </span>{" "}
        </p>

        <SelectComponent options={["FacturaE/UBL/PEPPOL", "Otro", "Otro2"]} />
        <p className={styles.title_content_input}>
          Validaciones Automáticas{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Verifica la integridad de los datos antes de la generación.
          </span>{" "}
        </p>

        <p className={styles.title_content_input}>
          Campos a incluidos{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Nº Factura, Fecha de emisión, Datos del cliente (nombre, NIF,
            dirección), Desglose de impuestos (IVA, retenciones, etc.), Total de
            la factura{" "}
          </span>{" "}
        </p>

        <NotificationsConfirmComponent
          placeholder1="[email],..."
          placeholder2="[00000000],..."
          type1="Gmail"
          type2="WhatsApp"
          title="Notificar tras la exportación"
          icons={[
            <GmailIcon style={{ width: 25 }} />,
            <WhatsAppIcon style={{ width: 25 }} />,
          ]}
        />

        <NotificationsConfirmComponent
          placeholder1="[email],..."
          placeholder2="[00000000],..."
          type1="Gmail"
          type2="WhatsApp"
          title="Notificar en el caso de detectar un error en la validación"
          icons={[
            <GmailIcon style={{ width: 25 }} />,
            <WhatsAppIcon style={{ width: 25 }} />,
          ]}
        />
      </div>
    </div>
  );
};

export default XmlFormAutomate;
