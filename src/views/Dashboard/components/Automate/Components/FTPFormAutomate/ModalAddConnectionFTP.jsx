import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as FTPIcon } from "../../../../assets/ftpWhite.svg";
import styles from "./ModalAddConnectionFTP.module.css";

const ModalAddConnectionFTP = ({ close, addConnection }) => {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [clientId, setClientId] = useState("");
  const [secretKey, setSecretKey] = useState("");

  return (
    <AddConnectionModal
      headerColor={["#208DE6", "#135a94"]}
      close={close}
      type="FTP"
      icon={<FTPIcon />}
    >
      <div className={styles.formContainer}>
        <LabelInputComponent
          label="Port"
          placeholder="Port"
          inputType="text"
          value={port}
          setValue={setPort}
        />

        <LabelInputComponent
          label="Host"
          placeholder="Host"
          inputType="text"
          value={host}
          setValue={setHost}
        />

        <LabelInputComponent
          label="Client ID"
          placeholder="Client ID"
          inputType="text"
          value={clientId}
          setValue={setClientId}
        />

        <LabelInputComponent
          label="Secret Key"
          placeholder="Secret Key"
          inputType="text"
          value={secretKey}
          setValue={setSecretKey}
        />

        <button
          onClick={() => {
            if (!host || !port || !clientId || !secretKey) {
              alert("Porfavor completa los campos");
              return;
            }
            addConnection({ host, port, clientId, secretKey });
            setHost("");
            setPort("");
            setClientId("");
            setSecretKey("");
            close();
          }}
          className={styles.addButton}
        >
          <FTPIcon width={25} height={25} />
          <span className={styles.buttonText}>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionFTP;
