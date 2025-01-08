import React from "react";

const CardAutomate = ({ name, image, contactType }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "8px",
          gap: "8px",
          justifyItems: "center",
          justifyItems: "center",
          borderBottom: "3px solid #E2F4F0",

          height: 60,
        }}
      >
        <div style={{ padding: "10px" }}>
          <img src={image} alt="logo" style={{ backgroundColor: "red" }} />
        </div>
        <div>
          <p style={{ fontSize: 13, color: "#222222" }}>{name}</p>
          <p style={{ fontSize: 13, color: "#71717A" }}>{contactType}</p>
        </div>
      </div>
    </>
  );
};

export default CardAutomate;
