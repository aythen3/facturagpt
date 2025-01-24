import React, { useState } from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as OdooIcon } from "../../../../assets/odoo.svg";
const ModalAddConnectionOdoo = ({ close, addConnection }) => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  return (
    <AddConnectionModal
      headerColor={["#A14589", "#6E509B"]}
      close={close}
      type="Odoo"
      icon={<OdooIcon />}
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
            backgroundColor: "#A24689",
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
          <OdooIcon width={25} height={25} />
          <span>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionOdoo;
