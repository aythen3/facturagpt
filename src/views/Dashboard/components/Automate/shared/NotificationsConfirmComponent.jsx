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
  mainState,
  setMainState,
  placeholder1,
  placeholder2,
  state1,
  state1Value,
  setState1Value,
  setState1,
  state2,
  state2Value,
  setState2Value,
  setState2,
}) => {
  return (
    <div style={{ display: "grid", gap: "24px" }}>
      <div style={{ marginTop: "10px" }}>
        <OptionsSwitchComponent
          isChecked={mainState}
          setIsChecked={setMainState}
          icon={<NotificationsSVG />}
          text={title}
        />
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
          <CheckboxComponent
            color="#11A380"
            state={state1}
            setState={setState1}
          />
          {icons[0]}
          {/* <WhatsAppIcon style={{ width: 25 }} /> */}
          <p>{type1}</p>
        </div>
        <InputComponent
          placeholder={placeholder1}
          typeInput="text"
          value={state1Value}
          setValue={setState1Value}
        />
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
          <CheckboxComponent
            color="#11A380"
            state={state2}
            setState={setState2}
          />
          {icons[1]}

          <p>{type2}</p>
        </div>
        <InputComponent
          value={state2Value}
          placeholder={placeholder2}
          typeInput="text"
          setValue={setState2Value}
        />
      </div>
    </div>
  );
};

export default NotificationsConfirmComponent;
