import React from "react";
import styles from "../Components/GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SelectComponent from "./SelectComponent";

const HeaderFormsComponent = ({ icon, action }) => {
  return (
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
          {/* <EsPublicoIcon /> */}
          {icon}
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
      <p onClick={action} style={{ color: "#159B7C", cursor: "pointer" }}>
        Añadir conexion
      </p>
    </div>
  );
};

export default HeaderFormsComponent;
