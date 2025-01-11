import React from "react";
import LabelInputComponent from "../AddConenctionModal/components/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as GmailIcon } from "../../../../assets/gmail.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";
import { ReactComponent as EmailIcon } from "../../../../assets/email-icon-connection.svg";

const ModalAddConnectionGmailAndOutlook = ({ close }) => {
  return (
    <AddConnectionModal close={close} type="Email" icon={<EmailIcon />}>
      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            backgroundColor: "#F2F2F2",
            width: "100%",
            borderRadius: "6px",
          }}
        >
          <GmailIcon width={28} height={28} />
          <p>Sign in with Gmail</p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            backgroundColor: "#F2F2F2",
            width: "100%",
            borderRadius: "6px",
          }}
        >
          <OutlookIcon width={28} height={28} />
          <p>Sign in with Outlook</p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            backgroundColor: "#F2F2F2",
            width: "100%",
            borderRadius: "6px",
          }}
        >
          <EmailIcon width={28} height={28} />
          <p>Conexióm de Email (MAP/SMTP)</p>
        </div>

        <LabelInputComponent
          label="Usuario"
          placeholder="Tu dirección de email"
          inputType="email"
        />

        <LabelInputComponent
          label="Contraseña"
          placeholder="Contraseña de tu cuenta"
          inputType="password"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            columnGap: "24px",
          }}
        >
          <LabelInputComponent
            label="Servidor IMAP"
            placeholder="imap.dominio.com"
            inputType="text"
          />

          <LabelInputComponent
            label="Servidor SMTP"
            placeholder="smtp.dominio.com"
            inputType="text"
          />

          <LabelInputComponent
            label="PUERTO IMAP"
            placeholder="993"
            inputType="text"
          />

          <LabelInputComponent
            label="PUERTO SMTP"
            placeholder="587"
            inputType="text"
          />

          <LabelInputComponent
            label="Método de Cifrado IMAP"
            options={["993", "443"]}
            isSelect={true}
          />

          <LabelInputComponent
            label="Método de Cifrado SMTP"
            options={["TLS/SSL o Ninguno", "Otro"]}
            isSelect={true}
          />
        </div>
        <button
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "24px",
            alignItems: "center",
            borderRadius: "6px",
            border: "none",
            height: 40,
            padding: "8px",
            cursor: "pointer",
          }}
        >
          <EmailIcon /> <span>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionGmailAndOutlook;
