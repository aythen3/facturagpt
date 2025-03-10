import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as EsPublicoIcon } from "../../../../assets/espublico-icon.svg";
const ModalAddConnectionEsPublico = ({ close, addConnection }) => {
  const [clientId, setClientId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  return (
    <AddConnectionModal
      headerColor={["#EE7A01", "#FF9F3B"]}
      close={close}
      type="esPúblico"
      icon={<EsPublicoIcon />}
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
            backgroundColor: "#EE7A01",
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
          <EsPublicoIcon width={25} height={25} />
          <span>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionEsPublico;
