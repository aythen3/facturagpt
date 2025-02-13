import React from "react";
// import styles from "../Components/GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const CheckboxComponent = ({ state, setState, color = "#0A5B48" }) => {
  return (
    <div>
      {state ? (
        <MdCheckBox
          style={{ cursor: "pointer" }}
          onClick={() => setState(false)}
          size={20}
          color={color}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          style={{ cursor: "pointer" }}
          onClick={() => setState(true)}
          size={20}
          color="#b9b9b9"
        />
      )}
    </div>
  );
};

export default CheckboxComponent;
