import React, { useState } from "react";
import styles from "./NavbarAdmin.module.css";
import star from "../../assets/starPlus.svg";
import facturaGPT from "../../assets/FacturaGPTIcon.svg";
import bookIcon from "../../assets/bookIcon.svg";
import clientIcon from "../../assets/client.png";
import headphonesIcon from "../../assets/headphonesIcon.svg";
import AccountSettings from "../AccountSettings/AccountSettings";
import i18n from "../../../../i18";
import { useTranslation } from "react-i18next";

const NavbarAdmin = ({ showSidebar, setShowSidebar }) => {
  const { t } = useTranslation("navbarAdmin");

  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.navbarAdmin}>
      <div style={{ display: "flex" }}>
        <img
          onClick={() => i18n.changeLanguage("es")}
          src="./spain_flags.png"
          alt="img"
          style={{ width: 30, height: 30, cursor: "pointer" }}
        />
        <img
          onClick={() => i18n.changeLanguage("en")}
          src="./english_flag.png"
          alt="img"
          style={{ width: 30, height: 30, cursor: "pointer" }}
        />
      </div>
      <div className={styles.navbarAdminIcons}>
        <a href="/">
          <img src={facturaGPT} alt="" />
        </a>
        <a href="#">
          <span>234</span>
        </a>
        {/* <a href="#">
          <img src={bookIcon} alt="" />
        </a> */}
        <a href="/clients">
          <img src={clientIcon} alt="" />
        </a>
        {/* <a href="#">
          <img src={headphonesIcon} alt="" />
        </a> */}
      </div>

      <button className={styles.plus}>
        {t("buttonGetPlus")} <img src={star} alt="" />
      </button>
      <div className={styles.profile} onClick={handleProfileClick}>
        <div className={styles.profileText}>
          <p>John Doe</p>
          <span>Admin</span>
        </div>
        <img
          src="https://imgs.search.brave.com/xHfreYBWzJJzoeupLP8pjjo7wcsOpIaOMOxvEtFnX4w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9oNmdvbzln/dzFoaDYvMnNOWnRG/QVdPZFAxbG1RMzNW/d1JOMy8yNGU5NTNi/OTIwYTljZDBmZjJl/MWQ1ODc3NDJhMjQ3/Mi8xLWludHJvLXBo/b3RvLWZpbmFsLmpw/Zz93PTEyMDAmaD05/OTImZmw9cHJvZ3Jl/c3NpdmUmcT03MCZm/bT1qcGc"
          alt=""
        />
      </div>

      <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
        <AccountSettings />
      </div>
    </div>
  );
};

export default NavbarAdmin;
