import React from "react";
import styles from "../Components/GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import SelectComponent from "./SelectComponent";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";

const HeaderFormsComponent = ({
  icon,
  action,
  emailConnections = [],
  selectedEmailConnection = "ejemplo@email.com",
  setSelectedEmailConnection = () => {},
}) => {
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
            height: 27,
            width: 30,
          }}
        >
          {icon}
        </div>
        <CustomDropdown
          options={emailConnections}
          isEmail={true}
          height="27px"
          borderRadius="0px 8px 8px 0px"
          placeholder="Añade una cuenta de correo"
          selectedOption={selectedEmailConnection}
          setSelectedOption={setSelectedEmailConnection}
          emailsDropdown={true}
        />

        {/* <SelectComponent
          options={emailConnections}
          name="mail"
          id="mail"
          isEmail={true}
          selectedEmailConnection={selectedEmailConnection}
          setSelectedEmailConnection={setSelectedEmailConnection}
        /> */}
      </div>
      <p onClick={action} style={{ color: "#159B7C", cursor: "pointer" }}>
        Añadir conexion
      </p>
    </div>
  );
};

export default HeaderFormsComponent;
