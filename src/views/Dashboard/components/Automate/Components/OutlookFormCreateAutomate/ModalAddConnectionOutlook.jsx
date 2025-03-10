import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";
import { ReactComponent as EmailIcon } from "../../../../assets/email-icon-connection.svg";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import styles from "./ModalAddConnectionOutlook.module.css";
import { ReactComponent as Outlook } from "../../../../assets/outlook-icon.svg";
import Button from "../../../Button/Button";

const ModalAddConnectionOutlook = ({ close, addConnection }) => {
  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [imapServer, setImapServer] = useState("");
  const [smtpServer, setSmtpServer] = useState("");
  const [imapPort, setImapPort] = useState("");
  const [smtpPort, setSmtpPort] = useState("");
  const [selectedImapEncryption, setSelectedImapEncryption] =
    useState("TLS/SSL o Ninguno");
  const [selectedSmtpEncryption, setSelectedSmtpEncryption] =
    useState("TLS/SSL o Ninguno");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const testEmail = (email) => emailRegex.test(email);

  const handleAddConnection = () => {
    const connection = {
      email,
      appPassword,
      imapServer,
      smtpServer,
      imapPort,
      smtpPort,
      selectedImapEncryption,
      selectedSmtpEncryption,
    };

    const isEmailValid = testEmail(email);
    const isAppPasswordProvided = appPassword.trim() !== "";
    const isImapServerValid = imapServer.trim() !== "";
    const isSmtpServerValid = smtpServer.trim() !== "";
    const isImapPortValid = imapPort.trim() !== "" && !isNaN(imapPort);
    const isSmtpPortValid = smtpPort.trim() !== "" && !isNaN(smtpPort);

    if (!isEmailValid) {
      console.error("Invalid email address.");
      return;
    }

    if (!isAppPasswordProvided) {
      console.error("App password is required.");
      return;
    }

    if (!isImapServerValid && !isSmtpServerValid) {
      console.error("At least one of IMAP or SMTP servers must be provided.");
      return;
    }

    if (!isImapPortValid && !isSmtpPortValid) {
      console.error(
        "At least one of IMAP or SMTP ports must be provided and valid."
      );
      return;
    }

    console.log("Adding connection with values:", connection);
    addConnection(connection);
    close();
  };

  return (
    <AddConnectionModal
      close={close}
      type="Outlook"
      icon={<EmailIcon />}
      iconHeader={Outlook}
    >
      <div className={styles.gridContainer}>
        <div className={styles.signInOption}>
          <Outlook width={28} height={28} />
          <p>Sign in with Outlook</p>
        </div>

        <div className={styles.serverConfigContainer}>
          <LabelInputComponent
            value={imapServer}
            setValue={setImapServer}
            label="Servidor IMAP"
            placeholder="imap.dominio.com"
            inputType="text"
          />

          <LabelInputComponent
            value={smtpServer}
            setValue={setSmtpServer}
            label="Servidor SMTP"
            placeholder="smtp.dominio.com"
            inputType="text"
          />

          <LabelInputComponent
            value={imapPort}
            setValue={setImapPort}
            label="PUERTO IMAP"
            placeholder="993"
            inputType="number"
            maxLength="3"
          />

          <LabelInputComponent
            value={smtpPort}
            setValue={setSmtpPort}
            label="PUERTO SMTP"
            placeholder="587"
            inputType="number"
            maxLength="3"
          />

          <div className={styles.dropdownContainer}>
            <label>Método de Cifrado IMAP</label>
            <CustomDropdown
              borderRadius="8px"
              height="31px"
              selectedOption={selectedImapEncryption}
              setSelectedOption={setSelectedImapEncryption}
              label="Método de Cifrado IMAP"
              options={["TLS/SSL o Ninguno", "Otro"]}
            />
          </div>

          <div className={styles.dropdownContainer}>
            <label>Método de Cifrado SMTP</label>
            <CustomDropdown
              borderRadius="8px"
              height="31px"
              selectedOption={selectedSmtpEncryption}
              setSelectedOption={setSelectedSmtpEncryption}
              label="Método de Cifrado SMTP"
              options={["TLS/SSL o Ninguno", "Otro"]}
            />
          </div>
        </div>
        <Button action={handleAddConnection}>
          <span>Add Connection</span>
        </Button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionOutlook;
