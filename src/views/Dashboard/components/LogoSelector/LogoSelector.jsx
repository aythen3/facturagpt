import React from "react";
import styles from "./LogoSelector.module.css";
import Button from "../Button/Button";

const LogoSelector = ({
  logos = [],
  selectedLogo,
  onAddLogo,
  onDeleteLogo,
  onSelectLogo,
  fileInputRef,
  onFileChange,
  text,
  buttonDown = false,
}) => {
  return (
    <label className={styles.labelLogoSelector}>
      <div className={styles.row}>
        <p>{text}</p>
        {!buttonDown && <div className={styles.editButton}>Añadir</div>}
      </div>
      <div className={styles.logoCorporativo}>
        {logos.length === 0 && (
          <div className={styles.container}>
            <span>Aún no has añadido ningún logo corporativo.</span>
          </div>
        )}
        {logos.map((logo) => (
          <div className={styles.container} key={logo}>
            <input
              checked={selectedLogo === logo}
              onChange={() => onSelectLogo(logo)}
              type="radio"
              name="corporativeLogo"
            />
            <img src={logo} alt="Logo corporativo" />
            <div className={styles.delete} onClick={() => onDeleteLogo(logo)}>
              -
            </div>
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={onFileChange}
      />
      {buttonDown && (
        <Button type="white" headerStyle={{ width: "100%" }} action={onAddLogo}>
          Añadir tu {text}
        </Button>
      )}
    </label>
  );
};

export default LogoSelector;
