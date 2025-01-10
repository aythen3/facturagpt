import React from "react";
import CheckboxComponent from "./CheckboxComponent";
import InputComponent from "./InputComponent";
import OptionsSwitchComponent from "./OptionsSwitchComponent";
import NotificationsSVG from "../svgs/NotificationsSVG";

const NotificationsConfirmComponent = ({
  title,
  icons,
  type1,
  type2,
  placeholder1,
  placeholder2,
}) => {
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <OptionsSwitchComponent icon={<NotificationsSVG />} text={title} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 46,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckboxComponent />
          {icons[0]}
          {/* <WhatsAppIcon style={{ width: 25 }} /> */}
          <p>{type1}</p>
        </div>
        <InputComponent placeholder={placeholder1} typeInput="text" />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 46,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckboxComponent />
          {icons[1]}

          <p>{type2}</p>
        </div>
        <InputComponent placeholder={placeholder2} typeInput="text" />
      </div>
    </>
  );
};

export default NotificationsConfirmComponent;
