import React from "react";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SelectComponent from "../../shared/SelectComponent";
import { ReactComponent as EsPublicoIcon } from "../../../../assets/espublicogestionaLogo.svg";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import OptionsSwitchComponent from "../../shared/OptionsSwitchComponent";
import TextSVG from "../../svgs/TextSVG";
import InputComponent from "../../shared/InputComponent";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import CheckboxComponent from "../../shared/CheckboxComponent";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import HeaderFormsComponent from "../../shared/HeaderFormsComponent";
const EsPublicoGestionaFormAutomate = ({ type }) => {
  return (
    <div>
      <HeaderFormsComponent icon={<EsPublicoIcon />} />

      <TitleFormsComponent title="Sincroniza con" type={type} />
      <div style={{ marginTop: "24px" }}>
        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            icon={<NotificationsSVG />}
            text="Notificar tras la exportación"
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 46,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckboxComponent />
          <GmailIcon style={{ width: 25 }} />
          <p>{type}</p>
        </div>
        <InputComponent placeholder="[email],..." typeInput="text" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 46,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckboxComponent />
          <WhatsAppIcon style={{ width: 25 }} />
          <p>{type}</p>
        </div>
        <InputComponent placeholder="[00000000],..." typeInput="text" />
      </div>

      <div style={{ marginTop: "24px" }}>
        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            icon={<NotificationsSVG />}
            text="Notificar en el caso de detectar un error en la validación"
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 46,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckboxComponent />
          <GmailIcon style={{ width: 25 }} />
          <p>{type}</p>
        </div>
        <InputComponent placeholder="[email],..." typeInput="text" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 46,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckboxComponent />
          <WhatsAppIcon style={{ width: 25 }} />
          <p>{type}</p>
        </div>
        <InputComponent placeholder="[00000000],..." typeInput="text" />
      </div>
    </div>
  );
};

export default EsPublicoGestionaFormAutomate;
