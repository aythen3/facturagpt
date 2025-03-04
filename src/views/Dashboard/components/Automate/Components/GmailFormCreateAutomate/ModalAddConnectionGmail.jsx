import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";
import { ReactComponent as EmailIcon } from "../../../../assets/email-icon-connection.svg";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import styles from "./ModalAddConnectionGmail.module.css";
import { ReactComponent as Gmail } from "../../../../assets/gmail-icon.svg";
import Button from "../../../Button/Button";
import { useDispatch } from "react-redux";

import { addAuth } from "@src/actions/automate";


const ModalAddConnectionGmail = ({ close }) => {

  const dispatch = useDispatch();

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


  const handleAddConnection = async () => {
    const connection = {
      type: "gmail",
      email,
      appPassword,
      // imapServer,
      // smtpServer,
      // imapPort,
      // smtpPort,
      // selectedImapEncryption,
      // selectedSmtpEncryption,
    };

    console.log("connection", connection);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = (email) => emailRegex.test(email);


    const isEmailValid = testEmail(email);
    const isAppPasswordProvided = appPassword.trim() !== "";
    // const isImapServerValid = imapServer.trim() !== "";
    // const isSmtpServerValid = smtpServer.trim() !== "";
    // const isImapPortValid = imapPort.trim() !== "" && !isNaN(imapPort);
    // const isSmtpPortValid = smtpPort.trim() !== "" && !isNaN(smtpPort);

    if (!isEmailValid) {
      console.error("Invalid email address.");
      return;
    }

    if (!isAppPasswordProvided) {
      console.error("App password is required.");
      return;
    }

    // if (!isImapServerValid && !isSmtpServerValid) {
    //   console.error("At least one of IMAP or SMTP servers must be provided.");
    //   return;
    // }

    // if (!isImapPortValid && !isSmtpPortValid) {
    //   console.error(
    //     "At least one of IMAP or SMTP ports must be provided and valid."
    //   );
    //   return;
    // }

    console.log("Adding connection with values:", connection);
    const resp = await dispatch(addAuth(connection))
    console.log("resp add connection", resp);
    close();
  };

  return (
    <AddConnectionModal
      close={close}
      type="Gmail"
      icon={<EmailIcon />}
      iconHeader={Gmail}
    >
      <div className={styles.gridContainer}>
        <div className={styles.signInOption}>
          <Gmail width={28} height={28} />
          <p>Sign in with Gmail</p>
        </div>


        <LabelInputComponent
          value={email}
          setValue={setEmail}
          label="Usuario"
          placeholder="Tu dirección de email"
          inputType="email"
        />

        <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">
          Link
        </a>
        <LabelInputComponent
          value={appPassword}
          setValue={setAppPassword}
          label="Contraseña"
          placeholder="Contraseña de tu cuenta"
          inputType="password"
        />


        <Button action={handleAddConnection}>
          <span>Add Connection</span>
        </Button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionGmail;
