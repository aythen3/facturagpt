import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as HoldedIcon } from "../../../../assets/holded.svg";
const ModalAddConnectionHolded = ({ close, addConnection }) => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  return (
    <AddConnectionModal
      headerColor={["#FC454C", "#b9262b"]}
      close={close}
      type="Holded"
      icon={<HoldedIcon />}
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
          label="Client Secret"
          placeholder="Client Secret"
          inputType="text"
          value={clientSecret}
          setValue={setClientSecret}
        />
        <button
          onClick={() => {
            if (!clientId || !clientSecret) {
              alert("Porfavor completa los campos");
              return;
            }
            addConnection({ clientId, clientSecret });
            setClientId("");
            setClientSecret("");
            close();
          }}
          style={{
            backgroundColor: "#FC454C",
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
          <HoldedIcon width={25} height={25} />
          <span>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionHolded;
