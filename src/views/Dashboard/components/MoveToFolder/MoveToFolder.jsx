import React, { useEffect, useState } from "react";
import styles from "./MoveToFolder.module.css";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import InputComponent from "../InputComponent/InputComponent";
import SearchSVG from "../Automate/svgs/SearchSVG";
import SelectLocation from "../SelectLocation/SelectLocation";
const MoveToFolder = ({
  showMovetoFolder,
  setShowMovetoFolder,
  configuration,
  setConfiguration,
  isAnimating,
  setIsAnimating,
}) => {
  const [showSelectInputLocation, setShowSelectInputLocation] = useState(false);
  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowMovetoFolder(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showMovetoFolder) {
        setIsAnimating(true);
        setTimeout(() => {
          setShowMovetoFolder(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMovetoFolder]);

  return (
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={() => handleCloseNewClient()}></div>
      <div
        className={`${styles.moveToFolder}  ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <div className={`${styles.statusMessage} ${styles.success}`}>
          <HeaderCard
            title={"Enviar a Carpeta"}
            setState={handleCloseNewClient}
          >
            <Button type="white">Cancelar</Button>
            <Button>Aceptar</Button>
          </HeaderCard>
          <div className={styles.contentInput}>
            <div>
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
