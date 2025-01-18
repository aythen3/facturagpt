import React from "react";

const TitleFormsComponent = ({ title, type }) => {
  return (
    <div>
      <p style={{ fontWeight: "bold", color: "#929598", fontSize: "18px" }}>
        {title} {type}
      </p>
    </div>
  );
};

export default TitleFormsComponent;
