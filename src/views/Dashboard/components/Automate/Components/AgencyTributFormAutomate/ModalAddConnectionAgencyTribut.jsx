import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as AgencyTributIcon } from "../../../../assets/agenciatributariaLogo.svg";

const ModalAddConnectionAgencyTribut = ({ close, addConnection }) => {
  const [clientId, setClientId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  return (
    <AddConnectionModal
      headerColor={["#c9c7c7eb", "#e6e6e6"]}
      close={close}
      type="Agencia Tributaria"
      icon={<AgencyTributIcon style={{ width: 30, height: 30 }} />}
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
          <AgencyTributIcon width={25} height={25} />
          <span>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionAgencyTribut;
