import React from "react";
import Automate from "../Automate";

const PanelAutomate = ({ children }) => {
  return (
    <div>
      <Automate />
      {children}
    </div>
  );
};

export default PanelAutomate;
