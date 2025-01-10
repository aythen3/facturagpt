import React from "react";
import LabelInputComponent from "../AddConenctionModal/components/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as AgencyTributIcon } from "../../../../assets/agenciatributariaLogo.svg";

const ModalAddConnectionAgencyTribut = ({ close }) => {
  return (
    <AddConnectionModal
      //   headerColor={["#EE7A01", "#FF9F3B"]}
      close={close}
      type="A3 Software"
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
        />

        <LabelInputComponent
          label="Secret Key"
          placeholder="Secret Key"
          inputType="text"
        />
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
          <AgencyTributIcon width={25} height={25} />
          <span>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionAgencyTribut;
