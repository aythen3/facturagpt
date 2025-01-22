import React from "react";
import styles from "./SelectComponent.module.css";

const SelectComponent = ({
  options = [],
  name,
  id,
  isEmail = false,
  setSelectedEmailConnection,
  selectedEmailConnection,
}) => {
  return (
    <>
      {isEmail ? (
        <div className={styles.emailSelectContainer}>
          <select
            className={styles.emailSelect}
            name={name}
            id={id}
            value={selectedEmailConnection}
            onChange={(e) => setSelectedEmailConnection(e.target.value)}
          >
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <select className={styles.selectAttachment} name={name} id={id}>
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default SelectComponent;
