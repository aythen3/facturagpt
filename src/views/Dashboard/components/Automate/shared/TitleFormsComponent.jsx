import React from "react";

const TitleFormsComponent = ({ title, type }) => {
  return (
    <div>
      <p style={{ fontWeight: "bold", color: "#929598", fontSize: "18px",  marginTop: "0px" }}>
        {title} {type}
      </p>
    </div>
  );
};

export default TitleFormsComponent;
