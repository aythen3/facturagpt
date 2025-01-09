import React, { useState } from "react";
import styles from "./optionsSwitch.module.css";

const OptionsSwitchComponent = ({ text, icon }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #E5E5E5",
        height: "46px",
        borderRadius: "8px",
        overflow: "hidden",
        paddingRight: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        <div style={{ backgroundColor: "#233F39" }}>{icon}</div>

        <p>{text}</p>
      </div>
      <label className={styles.switch}>
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default OptionsSwitchComponent;
