import React from "react";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import { ReactComponent as DriveIcon } from "../../../../assets/drive.svg";
import { ReactComponent as GoogleIcon } from "../../../../assets/googleLogo.svg";

const ModalAddConnectionGoogleDrive = ({ close }) => {
  return (
    <AddConnectionModal close={close} type="Drive" icon={<DriveIcon />}>
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
            width: "100%",
          }}
        >
          <DriveIcon width={25} height={25} />
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

export default ModalAddConnectionGoogleDrive;
