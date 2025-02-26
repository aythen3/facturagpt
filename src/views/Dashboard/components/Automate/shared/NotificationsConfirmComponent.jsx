import React, { useState } from "react";
import CheckboxComponent from "./CheckboxComponent";
import InputComponent from "../../InputComponent/InputComponent";
import OptionsSwitchComponent from "../../OptionsSwichComponent/OptionsSwitchComponent";
import NotificationsSVG from "../svgs/NotificationsSVG";
import styles from "./NotificationsConfirmComponent.module.css";
import TextareaComponent from "../../TextareaComponent/TextareaComponent";
import HeaderFormsComponent from "../../HeadersFormsComponent/HeaderFormsComponent";
import DeleteButton from "../../DeleteButton/DeleteButton";
import { ReactComponent as Search } from "../../../assets/searchGray.svg";
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
  disableSwitch,
  configuration,
  icon,
}) => {
  const [phoneNumbers, setPhoneNumbers] = useState([]); // Estado para números de teléfono
  const [inputValue, setInputValue] = useState(""); // Estado para el input

  const handleAddPhoneNumber = () => {
    if (inputValue.trim() && !phoneNumbers.includes(inputValue)) {
      setPhoneNumbers((prev) => [...prev, inputValue]);
      setInputValue(""); // Limpiar el input
    }
  };
  // Función para eliminar un número de teléfono
  const handleDeletePhoneNumber = (index) => {
    setPhoneNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      {/* {!disableSwitch && (
        <div className={styles.marginTop}>
          <OptionsSwitchComponent
            isChecked={mainState}
            setIsChecked={setMainState}
            icon={<NotificationsSVG />}
            text={title}
          />
        </div>
      )} */}
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
      </div>{" "}
      {state1 && (
        <>
          <HeaderFormsComponent
            selectedEmailConnection={configuration?.selectedEmailConnection}
            setSelectedEmailConnection={(value) =>
              handleConfigurationChange("selectedEmailConnection", value)
            }
            emailConnections={(configuration?.emailConnectionData || []).map(
              (connection) => connection.email
            )}
            action={() => setShowAddConnection(true)}
            icon={icons[0]}
          />
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
        </>
      )}
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
      </div>
      {state2 && (
        <>
          <HeaderFormsComponent
            selectedEmailConnection={configuration?.selectedEmailConnection}
            setSelectedEmailConnection={(value) =>
              handleConfigurationChange("selectedWhatsappConnection", value)
            }
            emailConnections={(configuration?.emailConnectionData || []).map(
              (connection) => connection.email
            )}
            action={() => setShowAddConnection(true)}
            icon={icons[1]}
          />
          <InputComponent
            value={inputValue}
            setValue={setInputValue}
            placeholder={placeholder2}
            typeInput="phone"
            textButton="Añadir"
            icon={<Search />}
            action={handleAddPhoneNumber} // Pasamos la función de añadir
          />
          <div className={styles.phoneNumbersList}>
            {phoneNumbers.map((number, index) => (
              <div key={index} className={styles.phoneNumberItem}>
                <span>{number}</span>
                <DeleteButton action={() => handleDeletePhoneNumber(index)}>
                  Delete
                </DeleteButton>
              </div>
            ))}
          </div>
          <TextareaComponent
            value={whatsAppMessage}
            onChange={(e) => setWhatsAppMessage(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default NotificationsConfirmComponent;
