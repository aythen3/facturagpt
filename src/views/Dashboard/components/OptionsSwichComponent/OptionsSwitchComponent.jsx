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
  subtitle,
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
        height: "46px",
        borderRadius: "8px",
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          {text && (
            <p
              style={{
                margin: "0px 0px 0px 15px",
                color: "#1f184b",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {text}
            </p>
          )}
          {subtitle && (
            <span
              style={{
                margin: "0px 0px 0px 15px",
                color: "#1f184b",
                fontSize: "12px",
                fontWeight: "300",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
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
