import React from "react";
import styles from "./gmailAndOutlook.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import WarningSVG from "../../svgs/WarningSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsapp.svg";
import SelectComponent from "../../shared/SelectComponent";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../shared/OptionsSwitchComponent";
import TextSVG from "../../svgs/TextSVG";
import LabelSVG from "../../svgs/LabelSVG";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import InputComponent from "../../shared/InputComponent";
import TitleFormsComponent from "../../shared/TitleFormsComponent";

const GmailAndOutlook = ({ type }) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header_mail}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #D9D9D9",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              height: 30,
              width: 30,
            }}
          >
            {type === "Gmail" ? (
              <GmailIcon style={{ width: 25, height: 25 }} />
            ) : (
              <OutlookIcon style={{ width: 25, height: 25 }} />
            )}{" "}
          </div>

          <SelectComponent
            options={[
              "example1@gmail.com",
              "example2@gmail.com",
              "example3@gmail.com",
            ]}
            name="mail"
            id="mail"
            isEmail={true}
          />
        </div>
        <p style={{ color: "#159B7C" }}>Añadir conexion</p>
      </div>

      <TitleFormsComponent type={type} title="Sube tus facturas de" />

      <div>
        <p>
          Ubicación{" "}
          <span>Configura la ubicación donde Gmail guardará los datos</span>
        </p>
        <InputComponent
          textButton="Seleccionar Ubicación"
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
        />

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Remitentes</p>

          <InputComponent labelTag="johndoe@gmail.com" />
          <div className={styles.content_checkbox}>
            <CheckboxComponent />
            <p className={styles.text_checkbox}>Incluir todos los remitentes</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Asunto Contine</p>

          <InputComponent
            placeholder="Palabras clave separadas por coma"
            typeInput="text"
          />

          <div className={styles.content_checkbox}>
            <CheckboxComponent />

            <p className={styles.text_checkbox}>Exact match</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Body Contine</p>
          <InputComponent
            placeholder="Palabras clave separadas por coma"
            typeInput="text"
          />

          <div className={styles.content_checkbox}>
            <CheckboxComponent />

            <p className={styles.text_checkbox}>Exact match</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Attachment Type</p>

          <div className={styles.content_checkbox}>
            <CheckboxComponent />

            <p className={styles.text_checkbox}>Exact match</p>
          </div>

          <SelectComponent options={["PDF/PNG/JPG", "Otro", "Otro2"]} />
          <div className={styles.advertency}>
            <WarningSVG />
            <p>
              Si el correo no tiene archivos adjuntos no se guardará ninguna
              factura
            </p>
          </div>
          <div style={{ display: "grid", gap: "10px" }}>
            <OptionsSwitchComponent
              icon={<TextSVG />}
              text="Cambiar nombre del archivo"
            />
            <InputComponent
              placeholder="[fecha]-[empresa]-[importe]-[etiqueta]"
              typeInput="text"
            />
          </div>
          <div style={{ display: "grid", gap: "10px" }}>
            <OptionsSwitchComponent
              icon={<LabelSVG />}
              text="Añadir etiqueta"
            />
            <InputComponent
              placeholder="Buscar etiqueta"
              typeInput="text"
              textButton="Crear"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <OptionsSwitchComponent
              icon={<NotificationsSVG />}
              text="Notificar tras la exportacion"
            />
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
      </div>
    </div>
  );
};

export default GmailAndOutlook;
