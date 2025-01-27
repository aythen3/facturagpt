import React from "react";
import styles from "./HeaderFormsComponent.module.css";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const HeaderFormsComponent = ({
  icon,
  action,
  emailConnections = [],
  selectedEmailConnection = "ejemplo@email.com",
  setSelectedEmailConnection = () => {},
  placeholder = "Añade una cuenta de correo",
  headerStyle = {},
}) => {
  return (
    <div className={styles.header} style={headerStyle}>
      <div className={styles.headerMail}>
        <div className={styles.iconContainer}>{icon}</div>
        <CustomDropdown
          options={emailConnections}
          isEmail={true}
          height="27px"
          borderRadius="0px 8px 8px 0px"
          placeholder={placeholder}
          selectedOption={selectedEmailConnection}
          setSelectedOption={setSelectedEmailConnection}
          emailsDropdown={true}
        />
      </div>
      <p className={styles.addConnection} onClick={action}>
        Añadir conexión
      </p>
    </div>
  );
};

export default HeaderFormsComponent;
