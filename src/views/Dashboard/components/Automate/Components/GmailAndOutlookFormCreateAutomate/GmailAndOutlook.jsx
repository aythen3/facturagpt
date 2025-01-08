import React from "react";
import styles from "./gmailAndOutlook.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import WarningSVG from "../../svgs/WarningSVG";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import SelectComponent from "../../shared/SelectComponent";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../shared/OptionsSwitchComponent";

const GmailAndOutlook = ({ type }) => {
  return (
    <div className={styles.gmailOutlookContainer}>
      <div className={styles.header}>
        <div className={styles.header_mail}>
          <div
            style={{
              border: "1px solid #D9D9D9",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              height: 30,
              width: 30,
            }}
          >
            <GmailIcon style={{ height: 30, width: 30 }} />
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

      <p style={{ fontWeight: "bold", color: "#929598", fontSize: "22px" }}>
        Sube tus facturas de {type}
      </p>

      <div>
        <p>
          Ubicación{" "}
          <span>Configura la ubicación donde Gmail guardará los datos</span>
        </p>
        <div className={styles.inputs}>
          <div className={styles.input_ubication}>
            <SearchSVG />
            <input type="text" placeholder="/NombredelaCuenta" name="" id="" />
          </div>
          <p>Seleccionar Ubicación</p>
        </div>
        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Remitentes</p>
          <div className={styles.inputs}>
            <input
              className={styles.input_remitente}
              type="text"
              placeholder="johndoe@gmail.com"
              name=""
              id=""
            />
          </div>
          <div className={styles.content_checkbox}>
            <CheckboxComponent />
            <p className={styles.text_checkbox}>Incluir todos los remitentes</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Asunto Contine</p>

          <input
            className={styles.inputs}
            type="text"
            placeholder="Palabras clave separadas por coma"
            name=""
            id=""
          />

          <div className={styles.content_checkbox}>
            <CheckboxComponent />

            <p className={styles.text_checkbox}>Exact match</p>
          </div>
        </div>

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>Body Contine</p>

          <input
            className={styles.inputs}
            type="text"
            placeholder="Palabras clave separadas por coma"
            name=""
            id=""
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
          <OptionsSwitchComponent
            icon="Tt"
            title="Cambiar nombre del archivo"
          />

          <OptionsSwitchComponent icon="Aa" title="Añadir etiqueta" />
        </div>
      </div>
    </div>
  );
};

export default GmailAndOutlook;
