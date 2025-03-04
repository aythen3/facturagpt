import React, { useState, useEffect } from "react";
import styles from "./gmail.module.css";
import TitleFormsComponent from "../../shared/TitleFormsComponent";
import HeaderFormsComponent from "../../../HeadersFormsComponent/HeaderFormsComponent";
import ModalAddConnectionGmail from "./ModalAddConnectionGmail";
import SelectLocation from "../../../SelectLocation/SelectLocation";
// import CustomAutomationsWrapper from "../../../CustomAutomationsWrapper/CustomAutomationsWrapper";

import { useDispatch } from "react-redux";

import { ReactComponent as GmailIcon } from "../../../../assets/gmailwithoutbg.svg";
import { ReactComponent as OutlookIcon } from "../../../../assets/outlook.svg";

import EditableInput from "../FileInput/Input";
import FileInputNotification from "../FileInput/Notification";
// import FileInputGPT from "../FileInput/GPT";
import FileInputExport from "../FileInput/Export";
import FileInputImport from "../FileInput/Import";
import SelectInfoToProcess from "../FileInput/selectInfoToProcces/SelectInfoToProcess";

import { getAuth } from "@src/actions/automate";

const Gmail = ({
  type,
  configuration,
  setConfiguration,
  setShowSelectCurrencyPopup,
  setSelectedCurrency,
  selectedCurrency,
}) => {
  const dispatch = useDispatch();

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

  // const addConnection = (connection) => {
  //   const updatedConnections = [
  //     ...(configuration?.emailConnectionData || []),
  //     connection,
  //   ];
  //   handleConfigurationChange("emailConnectionData", updatedConnections);
  //   if (!configuration?.selectedEmailConnection) {
  //     handleConfigurationChange("selectedEmailConnection", connection.email);
  //   }
  // };

  const [authData, setAuthData] = useState([]);
  useEffect(() => {
    const getAuthData = async () => {
      const resp = await dispatch(getAuth("gmail"));
      console.log("resp data form auth", resp);

      if (resp.payload.length > 0) {
        setAuthData(resp.payload);
      }
    };

    getAuthData();
  }, []);

  return (
    <div>
      <HeaderFormsComponent
        selectedEmailConnection={configuration?.selectedEmailConnection}
        setSelectedEmailConnection={(value) =>
          handleConfigurationChange("selectedEmailConnection", value)
        }
        emailConnections={(authData || []).map(
          (connection) => connection.email
        )}
        // emailConnections={(configuration?.emailConnectionData || []).map(
        //   (connection) => connection.email
        // )}
        action={() => setShowAddConnection(true)}
        icon={type === "Outlook" ? <OutlookIcon /> : <GmailIcon />}
      />
      <TitleFormsComponent type={type} title="Sube tus facturas de" />
      <div className={styles.gmailoutlookContainer}>
        <EditableInput
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        />

        <SelectInfoToProcess
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        />

        {/* <FileInputGPT
          configuration={configuration}
          handleConfigurationChange={handleConfigurationChange}
        /> */}

        <FileInputImport
          handleConfigurationChange={handleConfigurationChange}
          configuration={configuration}
          setShowSelectOutputLocation={setShowSelectOutputLocation}
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
        <ModalAddConnectionGmail
          close={() => setShowAddConnection(false)}
          // addConnection={addConnection}
        />
      )}
    </div>
  );
};

export default Gmail;
