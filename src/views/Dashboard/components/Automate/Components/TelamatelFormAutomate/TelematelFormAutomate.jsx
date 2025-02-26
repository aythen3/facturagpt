import React, { useState } from "react";
import styles from "./TelematelFormAutomate.module.css";
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
import ModalAddConnectionTelematel from "./ModalAddConnectionTelematel";
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
import { ReactComponent as TelematelIcon } from "../../../../assets/telematel.svg";

import EditableInput from "../FileInput/Input";
import FileInputNotification from "../FileInput/Notification";
import FileInputGPT from "../FileInput/GPT";
import FileInputExport from "../FileInput/Export";
import FileInputImport from "../FileInput/Import";

const TelematelFormAutomate = ({ type, configuration, setConfiguration }) => {
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
        icon={<TelematelIcon />}
      />
      <TitleFormsComponent type={type} title="Sube tus facturas de" />
      <div className={styles.gmailoutlookContainer}>
 
        <EditableInput
          configuration={configuration}
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

        <FileInputNotification
          type="Gmail"
          handleConfigurationChange={handleConfigurationChange}
          configuration={configuration}
        />
        
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
        <ModalAddConnectionTelematel
          close={() => setShowAddConnection(false)}
          addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default TelematelFormAutomate;
