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
import { useNavigate } from "react-router-dom";
import UpgradePlan from "../../screens/UpgradePlan/UpgradePlan";

const NavbarAdmin = ({ showSidebar, setShowSidebar }) => {
  const [showPlusModal, setShowPlusModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation("navbarAdmin");

  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLanguage = (lng) => {
    localStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.navbarAdmin}>
      <div className={styles.navbarAdminIcons}>
        <a href="/">
          <img src={facturaGPT} alt="" />
        </a>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* <img
            onClick={() => handleLanguage('es')}
            src={spanish_flag}
            alt='img'
            style={{
              width: 30,
              height: 30,
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          /> */}
          {/* <img
            onClick={() => handleLanguage('en')}
            src={english_flag}
            alt='img'
            style={{
              width: 30,
              height: 30,
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          /> */}
        </div>
        {/* <a href="#">
          <img src={headphonesIcon} alt="" />
        </a> */}
      </div>

      <button onClick={() => setShowPlusModal(true)} className={styles.plus}>
        {t("buttonGetPlus")} <img src={star} alt="" />
      </button>
      <div className={styles.profile}>
        <a href='#' className={styles.number}>
          time
          {/* <img src={time} alt='' /> */}
          <span>234</span>
        </a>
        {/* <a href="#">
          <img src={bookIcon} alt="" />
        </a> */}
        <a href="/clients">
          <img src={clientIcon} alt="" />
        </a>
        <div onClick={handleProfileClick} className={styles.profileContainer}>
          <div className={styles.profileText}>
            <p>John Doe</p>
            <span>Admin</span>
          </div>
          <img
            src="https://imgs.search.brave.com/xHfreYBWzJJzoeupLP8pjjo7wcsOpIaOMOxvEtFnX4w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9oNmdvbzln/dzFoaDYvMnNOWnRG/QVdPZFAxbG1RMzNW/d1JOMy8yNGU5NTNi/OTIwYTljZDBmZjJl/MWQ1ODc3NDJhMjQ3/Mi8xLWludHJvLXBo/b3RvLWZpbmFsLmpw/Zz93PTEyMDAmaD05/OTImZmw9cHJvZ3Jl/c3NpdmUmcT03MCZm/bT1qcGc"
            className={styles.imgProfile}
          />
        </div>
      </div>

      <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
        <AccountSettings />
      </div>
      {showPlusModal && <UpgradePlan onClose={() => setShowPlusModal(false)} />}
    </div>
  );
};

export default NavbarAdmin;
