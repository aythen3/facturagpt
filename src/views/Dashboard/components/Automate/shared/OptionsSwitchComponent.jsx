import React from "react";

const OptionsSwitchComponent = ({ title, icon }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #E5E5E5",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
      }}
    >
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "#233F39",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",

            width: 50,
            textAlign: "center",
            color: "white",
          }}
        >
          <p style={{ fontSize: 20 }}>{icon}</p>
        </div>
        <div>
          <p>{title}</p>
        </div>
      </div>
      <input type="checkbox" />
    </div>
  );
};

export default OptionsSwitchComponent;
