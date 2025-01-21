import React, { useState } from "react";
import styles from "./AddEmailsInput.module.css";
import miniClose from "../../../../assets/miniClose.svg";

const AddEmailsInput = ({ addedEmails, setAddedEmails, placeholder }) => {
  const [value, setValue] = useState("");
  return (
    <div className={styles.addEmailsInputContainer}>
      <div className={styles.addedEmailsContainer}>
        {addedEmails?.map((email, index) => (
          <div key={index} className={styles.addedEmail}>
            {email}
            <img
              src={miniClose}
              alt="close"
              className={styles.closeIcon}
              onClick={() =>
                setAddedEmails(addedEmails.filter((e) => e !== email))
              }
            />
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
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const testEmail = (email) => emailRegex.test(email);
              e.preventDefault();
              if (value !== "" && testEmail(value)) {
                if (addedEmails.includes(value)) {
                  setAddedEmails(
                    addedEmails.filter((email) => email !== value)
                  );
                } else {
                  setAddedEmails([...addedEmails, value]);
                }
                setValue("");
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default AddEmailsInput;
