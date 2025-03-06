import React, { useState } from "react";
import styles from "./AddEmailsInput.module.css";
import miniClose from "../../../../assets/miniClose.svg";
import DeleteButton from "../../../DeleteButton/DeleteButton";

const AddEmailsInput = ({ addedEmails, setAddedEmails, placeholder }) => {
  const [value, setValue] = useState("");

  const [error, setError] = useState("");


  const handleButton = () => {

  }

  return (
    <div className={styles.addEmailsInputContainer}>
      <div className={styles.addedEmailsContainer}>
        {addedEmails?.map((email, index) => (
          <div key={index} className={styles.addedEmail}>
            {email}
            <DeleteButton
              action={() =>
                setAddedEmails(addedEmails.filter((e) => e !== email))
              }
            />
            {/* <img
              src={miniClose}
              alt="close"
              className={styles.closeIcon}
            
            /> */}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const testEmail = (email) => emailRegex.test(email);
              if (value !== "" && testEmail(value)) {
                if (addedEmails.includes(value)) {
                  setAddedEmails(
                    addedEmails.filter((email) => email !== value)
                  );
                } else {
                  setAddedEmails([...addedEmails, value]);
                }
                setValue("");
                setError("");
              } else {
                setError("Correo electrónico inválido");
              }
            }
          }}
        />
        {/* <button onClick={handleButton} className={styles.button}>
          +
        </button> */}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default AddEmailsInput;
