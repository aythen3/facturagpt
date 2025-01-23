import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as DriveIcon } from "../../../../assets/drive.svg";
import { ReactComponent as DropboxIcon } from "../../../../assets/dropbox-icon.svg";
import { ReactComponent as DropboxIconWhite } from "../../../../assets/dropboxWhite.svg";

const ModalAddConnectionDropbox = ({ close, addConnection }) => {
  const [clientId, setClientId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  return (
    <AddConnectionModal close={close} type="Dropbox" icon={<DropboxIcon />}>
      <div
        style={{
          display: "grid",
          gap: "24px",
        }}
      >
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
            if (!clientId || !secretKey) {
              alert("Porfavor completa los campos");
              return;
            }
            addConnection({ clientId, secretKey });
            setClientId("");
            setSecretKey("");
            close();
          }}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
            alignItems: "center",
            borderRadius: "6px",
            border: "none",
            height: 40,
            color: "white",
            padding: "8px",
            backgroundColor: "#0062FF",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <DropboxIconWhite width={25} height={25} />
          <span
            style={{
              borderLeft: "1px solid white",
              height: 40,
              paddingLeft: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Add Connection
          </span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionDropbox;
