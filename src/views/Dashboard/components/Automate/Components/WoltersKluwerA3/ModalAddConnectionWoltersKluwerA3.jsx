import React from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as WoltersIcon } from "../../../../assets/wolters-icon.svg";
const ModalAddConnectionWoltersKluwerA3 = ({ close }) => {
  return (
    <AddConnectionModal
      //   headerColor={["#EE7A01", "#FF9F3B"]}
      close={close}
      type="A3 Software"
      icon={<WoltersIcon />}
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
          label="Client Secret"
          placeholder="Client Secret"
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
          <WoltersIcon width={25} height={25} />
          <span>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionWoltersKluwerA3;
