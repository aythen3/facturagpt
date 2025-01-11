import React, { useState } from "react";
import { ReactComponent as WoltersIcon } from "../../../../assets/wolters-icon.svg";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../shared/InputComponent";
import SearchSVG from "../../svgs/SearchSVG";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SelectComponent from "../../shared/SelectComponent";
import OptionsSwitchComponent from "../../shared/OptionsSwitchComponent";
import TextSVG from "../../svgs/TextSVG";
import LabelSVG from "../../svgs/LabelSVG";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import ModalAddConnectionWoltersKluwerA3 from "./ModalAddConnectionWoltersKluwerA3";

const WoltersKluwerA3FormAutomate = ({ type }) => {
  const [isAddConnection, setIsAddConnection] = useState(false);

  const openAddConnection = () => {
    setIsAddConnection(true);
  };

  const closeAddConnection = () => {
    setIsAddConnection(false);
  };

  return (
    <div>
      <HeaderFormsComponent action={openAddConnection} icon={<WoltersIcon />} />

      <TitleFormsComponent title="Exporta Facturas a" type={type} />
      <TitleFormsComponent title="Input" />

      <div>
        <p>
          Ubicación{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Configura la ubicación donde Wolters Kluwer guardará los documentos
          </span>{" "}
        </p>
        <InputComponent
          textButton="Seleccionar Ubicación"
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
        />
      </div>

      <TitleFormsComponent title="Output" />

      <div>
        <p>
          Ubicación{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Configura la ubicación de Factura GPT para exportar los documentos a
            Wolters Kluwer{" "}
          </span>{" "}
        </p>
        <InputComponent
          textButton="Seleccionar Ubicación"
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
        />
      </div>

      <p className={styles.title_content_input}>
        Formato del Archivo
        <span style={{ color: "#18181B", fontSize: "14px" }}>
          Selecciona el formato adecuado para la exportación
        </span>{" "}
      </p>

      <SelectComponent options={["XML/FacturaE/UBL/PEPPOL", "Otro", "Otro2"]} />

      <div style={{ display: "grid", gap: "10px", marginTop: "24px" }}>
        <OptionsSwitchComponent
          icon={<TextSVG />}
          text="Cambiar nombre del archivo"
          notSwitch={true}
        />
        <InputComponent
          placeholder="[fecha]-[empresa]-[importe]-[etiqueta]"
          typeInput="text"
        />

        <OptionsSwitchComponent
          icon={<LabelSVG />}
          text="Añadir etiqueta"
          notSwitch={true}
        />
        <InputComponent
          icon={<SearchSVG />}
          placeholder="Buscar etiqueta"
          textButton="Crear"
          typeInput="text"
        />

        <NotificationsConfirmComponent
          placeholder1="[email],..."
          placeholder2="[00000000],..."
          type1="Gmail"
          type2="WhatsApp"
          title="Añadir notificación tras la exportación

"
          icons={[
            <GmailIcon style={{ width: 25 }} />,
            <WhatsAppIcon style={{ width: 25 }} />,
          ]}
        />
      </div>
      {isAddConnection && (
        <ModalAddConnectionWoltersKluwerA3 close={closeAddConnection} />
      )}
    </div>
  );
};

export default WoltersKluwerA3FormAutomate;
