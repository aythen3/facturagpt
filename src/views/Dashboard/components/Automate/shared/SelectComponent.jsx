import React from "react";
import styles from "../Components/GmailAndOutlookFormCreateAutomate/gmailAndOutlook.module.css";

const SelectComponent = ({ options, name, id, isEmail }) => {
  return (
    <>
      {isEmail ? (
        <div
          style={{
            border: "1px solid #D9D9D9",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <select
            style={{ height: 30, border: "none", color: "#71717A" }}
            name={name}
            id={id}
          >
            {options.map((option) => (
              <option>{option}</option>
            ))}
          </select>
        </div>
      ) : (
        <select className={styles.select_attachment} name={name} id={id}>
          {options.map((option) => (
            <option>{option}</option>
          ))}
        </select>
      )}
    </>
  );
};

export default SelectComponent;
