import React from "react";
import CheckboxComponent from "./CheckboxComponent";
import InputComponent from "../../InputComponent/InputComponent";
import OptionsSwitchComponent from "../../OptionsSwichComponent/OptionsSwitchComponent";
import NotificationsSVG from "../svgs/NotificationsSVG";
import styles from "./NotificationsConfirmComponent.module.css";
import TextareaComponent from "../../TextareaComponent/TextareaComponent";

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
  gmailTo,
  setGmailTo,
  gmailSubject,
  setGmailSubject,
  gmailBody,
  setGmailBody,
  whatsAppMessage,
  setWhatsAppMessage,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.marginTop}>
        <OptionsSwitchComponent
          isChecked={mainState}
          setIsChecked={setMainState}
          icon={<NotificationsSVG />}
          text={title}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.checkboxRow}>
          <CheckboxComponent
            color="#11A380"
            state={state1}
            setState={setState1}
          />
          {icons[0]}
          <p>{type1}</p>
        </div>
        {/* <InputComponent
          placeholder={placeholder1}
          typeInput="text"
          value={state1Value}
          setValue={setState1Value}
        /> */}
      </div>
      <div className={styles.gmailConfigurationContainer}>
        <div className={styles.gmailConfigurationItem}>
          <span className={styles.inputLabel}>Para:</span>
          <InputComponent
            value={gmailTo}
            placeholder={"email"}
            typeInput="text"
            setValue={setGmailTo}
          />
        </div>
        <div className={styles.gmailConfigurationItem}>
          <span className={styles.inputLabel}>Asunto:</span>
          <InputComponent
            value={gmailSubject}
            placeholder={"xxxx"}
            typeInput="text"
            setValue={setGmailSubject}
          />
        </div>
        <div className={styles.gmailConfigurationItem}>
          <span className={styles.inputLabel}>Mensaje:</span>
          <InputComponent
            value={gmailBody}
            placeholder={"xxxx"}
            typeInput="text"
            setValue={setGmailBody}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.checkboxRow}>
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
      <TextareaComponent
        value={whatsAppMessage}
        onChange={(e) => setWhatsAppMessage(e.target.value)}
      />
    </div>
  );
};

export default NotificationsConfirmComponent;
