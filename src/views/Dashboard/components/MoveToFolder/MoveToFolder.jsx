import React, { useState } from "react";
import styles from "./MoveToFolder.module.css";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import InputComponent from "../InputComponent/InputComponent";
import SearchSVG from "../Automate/svgs/SearchSVG";
import SelectLocation from "../SelectLocation/SelectLocation";
const MoveToFolder = ({
  setShowMovetoFolder,
  configuration,
  setConfiguration,
}) => {
  const [showSelectInputLocation, setShowSelectInputLocation] = useState(false);
  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className={styles.overlay}>
      <div
        className={styles.bg}
        onClick={() => setShowMovetoFolder(false)}
      ></div>
      <div className={styles.moveToFolder}>
        <div className={`${styles.statusMessage} ${styles.success}`}>
          <HeaderCard title={"Enviar a Carpeta"}>
            <Button type="white">Cancelar</Button>
            <Button>Aceptar</Button>
          </HeaderCard>
          <div className={styles.contentInput}>
            <p className={styles.titleContentInput}>Ubicación</p>

            <InputComponent
              readOnly={true}
              value={configuration.folderLocation}
              setValue={(value) =>
                handleConfigurationChange("folderLocation", value)
              }
              textButton="Seleccionar Ubicación"
              placeholder="/Inicio"
              icon={<SearchSVG />}
              action={() => setShowSelectInputLocation(true)}
            />
          </div>
        </div>
        {showSelectInputLocation && (
          <SelectLocation
            onClose={() => setShowSelectInputLocation(false)}
            pickLocation={(location) => {
              console.log("location", location);
              handleConfigurationChange("filesSource", location);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MoveToFolder;
