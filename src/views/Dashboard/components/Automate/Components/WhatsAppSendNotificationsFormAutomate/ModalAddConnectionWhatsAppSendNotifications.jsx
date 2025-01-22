import React from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";

const ModalAddConnectionWhatsAppSendNotifications = ({ close }) => {
  return (
    <AddConnectionModal
      headerColor={["#3AD656", "#5BF876"]}
      close={close}
      type="WhatsApp"
      icon={<WhatsAppIcon />}
    >
      <div
        style={{
          display: "grid",
          gap: "24px",
        }}
      >
        <LabelInputComponent
          label="WhatsApp Account ID"
          placeholder="Account ID"
          inputType="text"
        />

        <LabelInputComponent
          label="Token"
          placeholder="Token"
          inputType="text"
        />
        <button
          style={{
            backgroundColor: "#4BE666",
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
          <WhatsAppIcon width={25} height={25} />
          <span>Add Connection</span>
        </button>
      </div>
    </AddConnectionModal>
  );
};

export default ModalAddConnectionWhatsAppSendNotifications;
