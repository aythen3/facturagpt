import React, { useState } from "react";
import styles from "./gmail.module.css";
import SearchSVG from "../../svgs/SearchSVG";
import WarningSVG from "../../svgs/WarningSVG";
import SelectComponent from "../../../SelectComponent/SelectComponent";
import CheckboxComponent from "../../shared/CheckboxComponent";
import OptionsSwitchComponent from "../../../OptionsSwichComponent/OptionsSwitchComponent";
import TextSVG from "../../svgs/TextSVG";
import LabelSVG from "../../svgs/LabelSVG";
import NotificationsSVG from "../../svgs/NotificationsSVG";
import InputComponent from "../../../InputComponent/InputComponent";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import AddConnectionModal from "../AddConenctionModal/AddConnectionModal";
import LabelInputComponent from "../../../LabelInputComponent/LabelInputComponent";
import ModalAddConnectionGmail from "./ModalAddConnectionGmail";
import NotificationsConfirmComponent from "../../shared/NotificationsConfirmComponent";
import SelectLocation from "../../../SelectLocation/SelectLocation";
import CheckboxWithText from "../../../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import minusIcon from "../../../../assets/minusIcon.svg";
import AddEmailsInput from "../AddEmailsInput/AddEmailsInput";

import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import { ReactComponent as ArrowSquare } from "../../../../assets/whiteArrowSquareIn.svg";
import { ReactComponent as GrayChevron } from "../../../../assets/grayChevron.svg";
import { ReactComponent as WhiteFolder } from "../../../../assets/whiteFolder.svg";
import { ReactComponent as WhiteBolt } from "../../../../assets/whiteBolt.svg";
import { ReactComponent as WhiteClock } from "../../../../assets/whiteClock.svg";
import { ReactComponent as WhiteText } from "../../../../assets/whiteText.svg";
import { ReactComponent as WhiteCheck } from "../../../../assets/whiteCheck.svg";
import { ReactComponent as WhiteBell } from "../../../../assets/whiteBell.svg";
import { ReactComponent as GmailIcon } from "../../../../assets/gmailwithoutbg.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";
import { ReactComponent as WhatsAppIcon } from "../../../../assets/whatsappIcon.svg";
import Advertency from "../Advertency/Advertency";
// import EditableInput from "../../../AccountSettings/EditableInput/EditableInput";

import EditableInput from "../FileInput/Input";
import FileInputNotification from "../FileInput/Notification";
import FileInputGPT from "../FileInput/GPT";
import FileInputExport from "../FileInput/Export";
import FileInputImport from "../FileInput/Import";
import SelectInfoToProcess from "../FileInput/selectInfoToProcces/SelectInfoToProcess";

const Gmail = ({
  type,
  configuration,
  setConfiguration,
  setShowSelectCurrencyPopup,
  setSelectedCurrency,
  selectedCurrency,
}) => {
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  const [showAddConnection, setShowAddConnection] = useState(false);
  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);
  const [showContent, setShowContent] = useState({
    info1: false,
    info2: false,
    info3: false,
    info4: false,
    info5: false,
    info6: false,
    info7: false,
  });

  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addConnection = (connection) => {
    const updatedConnections = [
      ...(configuration?.emailConnectionData || []),
      connection,
    ];
    handleConfigurationChange("emailConnectionData", updatedConnections);
    if (!configuration?.selectedEmailConnection) {
      handleConfigurationChange("selectedEmailConnection", connection.email);
    }
  };

  return (
    <div>
      <HeaderFormsComponent
        selectedEmailConnection={configuration?.selectedEmailConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedEmailConnection", value)
        }
        emailConnections={(configuration?.emailConnectionData || []).map(
          (connection) => connection.email
        )}
        action={() => setShowAddConnection(true)}
        icon={type === "Outlook" ? <OutlookIcon /> : <GmailIcon />}
      />
      <TitleFormsComponent type={type} title="Sube tus facturas de" />
      <div className={styles.gmailoutlookContainer}>
        {/* <EditableInput
          label={"Nombre de la Automatización"}
          // value={userData?.nombre}
          name="automatization"
          // onSave={handleChange}
          placeholder="Automatización 1"
          options={true}
          readOnly={false}
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        /> */}

        <EditableInput
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        />
        <SelectInfoToProcess
          setShowSelectCurrencyPopup={setShowSelectCurrencyPopup}
          setSelectedCurrency={setSelectedCurrency}
          selectedCurrency={selectedCurrency}
          configuration={configuration}
          setConfiguration={setConfiguration}
          handleConfigurationChange={handleConfigurationChange}
        />

        <FileInputGPT
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        />

        <FileInputImport
          handleConfigurationChange={handleConfigurationChange}
          configuration={configuration}
        />

        <FileInputExport
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        />

        {/* <CustomAutomationsWrapper Icon={<WhiteFolder />}>
        <div style={{ display: "grid", gap: "10px" }}>
          <OptionsSwitchComponent
            isChecked={configuration?.changeFileName || false}
            setIsChecked={(value) =>
              handleConfigurationChange("changeFileName", value)
            }
            // icon={<TextSVG />}
            text="Cambiar nombre del archivo"
          />
          <InputComponent
            placeholder="[fecha]-[empresa]-[importe]-[etiqueta]"
            typeInput="text"
            value={configuration?.fileName || ""}
            setValue={(value) => handleConfigurationChange("fileName", value)}
          />
        </div>
      </CustomAutomationsWrapper> */}

        <FileInputNotification
          type="Gmail"
          handleConfigurationChange={handleConfigurationChange}
          configuration={configuration}
        />
        {/* <CustomAutomationsWrapper Icon={<WhiteFolder />}>
        <div>
          <div style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
            <OptionsSwitchComponent
              isChecked={configuration?.addTags || false}
              setIsChecked={(value) =>
                handleConfigurationChange("addTags", value)
              }
              icon={<LabelSVG />}
              text="Configura tus notificaciones personalizadas"
            />
            <InputComponent
              placeholder="Buscar etiqueta"
              typeInput="text"
              textButton="Crear"
              value={configuration?.tags || ""}
              setValue={(value) => handleConfigurationChange("tags", value)}
            />
          </div>
          <NotificationsConfirmComponent
            mainState={configuration?.notificateAfterExport || false}
            setMainState={(value) =>
              handleConfigurationChange("notificateAfterExport", value)
            }
            placeholder1="[email],..."
            placeholder2="[00000000],..."
            type1="Gmail"
            type2="WhatsApp"
            gmailTo={configuration?.gmailTo || ""}
            setGmailTo={(value) => handleConfigurationChange("gmailTo", value)}
            gmailSubject={configuration?.gmailSubject || ""}
            setGmailSubject={(value) =>
              handleConfigurationChange("gmailSubject", value)
            }
            gmailBody={configuration?.gmailBody || ""}
            setGmailBody={(value) =>
              handleConfigurationChange("gmailBody", value)
            }
            state1={configuration?.notificateGmail || false}
            state1Value={configuration?.gmailToNotificate || ""}
            setState1={(value) =>
              handleConfigurationChange("notificateGmail", value)
            }
            setState1Value={(value) =>
              handleConfigurationChange("gmailToNotificate", value)
            }
            state2={configuration?.notificateWhatsApp || false}
            state2Value={configuration?.whatsAppToNotificate || ""}
            setState2={(value) =>
              handleConfigurationChange("notificateWhatsApp", value)
            }
            setState2Value={(value) =>
              handleConfigurationChange("whatsAppToNotificate", value)
            }
            title="Notificar tras la exportación"
            icons={[
              <GmailIcon style={{ width: 25 }} />,
              <WhatsAppIcon style={{ width: 25 }} />,
            ]}
          />
        </div>
      </CustomAutomationsWrapper> */}
      </div>

      {showSelectOutputLocation && (
        <SelectLocation
          onClose={() => setShowSelectOutputLocation(false)}
          pickLocation={(location) => {
            console.log("location", location);
            handleConfigurationChange("folderLocation", location);
          }}
        />
      )}
      {showAddConnection && (
        <ModalAddConnectionGmail
          close={() => setShowAddConnection(false)}
          addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default Gmail;
