import React, { useState } from "react";
import styles from "./optionsSwitch.module.css";

const OptionsSwitchComponent = ({
  text,
  icon,
  notSwitch,
  isChecked,
  setIsChecked,
  border = "1px solid #E5E5E5",
  marginLeft,
}) => {
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: border,
        height: "46px",
        borderRadius: "8px",
        overflow: "hidden",
        paddingRight: "10px",
        marginLeft,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        {icon && <div style={{ backgroundColor: "#233F39" }}>{icon}</div>}

        {text && <p style={{ marginLeft: "15px" }}>{text}</p>}
      </div>
      {!notSwitch && (
        <label className={styles.switch}>
          <input type="checkbox" checked={isChecked} onChange={handleToggle} />
          <span className={styles.slider}></span>
        </label>
      )}
    </div>
  );
};

export default OptionsSwitchComponent;
