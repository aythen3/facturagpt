import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as GoogleSheetsIcon } from "../../../../assets/excel.svg";
import { ReactComponent as GoogleIcon } from "../../../../assets/googleLogo.svg";

const ModalAddConnectionGoogleSheets = ({ close, addConnection }) => {
  const [clientId, setClientId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  return (
    <AddConnectionModal
      headerColor={["#59BA62", "#74EF5F"]}
      close={close}
      type="Google Sheets"
      icon={<GoogleSheetsIcon width={30} height={30} />}
    >
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
            backgroundColor: "#59BA62",
            color: "white",
            display: "flex",
            justifyContent: "flex-start",
            gap: "24px",
            alignItems: "center",
            borderRadius: "6px",
            border: "none",
            height: 40,
            padding: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <GoogleSheetsIcon width={25} height={25} />
          <span>Add Connection</span>
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            backgroundColor: "#5D8BE0",
            borderRadius: "6px",
            color: "white",
            width: "100%",
            height: 40,
          }}
        >
          <GoogleIcon
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "3px",
            }}
            width={28}
            height={28}
          />
          <p>Sign in with Google</p>
        </div>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionGoogleSheets;
