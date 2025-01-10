import React from "react";
import CloseSVG from "../../../svgs/CloseSVG";

const Header = ({ icon, type, close }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        padding: "10px",
        height: 44,
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {icon}
        <p style={{ fontWeight: "bold" }}>{type}</p>
      </div>
      <div>
        <CloseSVG action={close} />
      </div>
    </div>
  );
};

export default Header;
