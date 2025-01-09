import React from "react";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import InputComponent from "../../shared/InputComponent";
import SearchSVG from "../../svgs/SearchSVG";
import CheckboxComponent from "../../shared/CheckboxComponent";
import styles from "../GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SelectComponent from "../../shared/SelectComponent";
const OdooFormAutomate = ({ type }) => {
  return (
    <div>
      <TitleFormsComponent title="Sincroniza con" type={type} />
      <TitleFormsComponent title="Input" />

      <div>
        <p>
          Ubicación{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Confugra la ubicación donde Odoo guardará los documentos
          </span>
        </p>
        <InputComponent
          textButton="Seleccionar Ubicación"
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
        />

        <TitleFormsComponent title="Output" />
        <p>
          Ubicación{" "}
          <span style={{ color: "#18181B", fontSize: "14px" }}>
            Confugra la ubicación de Factura GPT para exportar los documentos de
            Odoo
          </span>
        </p>
        <InputComponent
          textButton="Seleccionar Ubicación"
          placeholder="/NombredelaCuenta"
          icon={<SearchSVG />}
        />

        <div className={styles.content_input}>
          <p className={styles.title_content_input}>
            Formato del archivo{" "}
            <span style={{ color: "#18181B", fontSize: "14px" }}>
              Selecciona el formato adecuado para la exportación
            </span>{" "}
          </p>

          <SelectComponent options={["FacturaE/UBL/PEPPOL", "Otro", "Otro2"]} />
          <p className={styles.title_content_input}>
            Campos a incluidos{" "}
            <span style={{ color: "#18181B", fontSize: "14px" }}>
              Nº Factura, Fecha de emisión, Datos del cliente (nombre, NIF,
              dirección), Desglose de impuestos (IVA, retenciones, etc.), Total
              de la factura{" "}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OdooFormAutomate;
