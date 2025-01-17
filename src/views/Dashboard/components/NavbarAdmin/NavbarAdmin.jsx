import React, { useState } from "react";
import styles from "./NavbarAdmin.module.css";
import star from "../../assets/starPlus.svg";
import facturaGPT from "../../assets/FacturaGPTBlack.svg";
import clientIcon from "../../assets/clientsIcon.svg";
import spanish_flag from "../../assets/spain_flag.svg";
import english_flag from "../../assets/english_flag.svg";
import AccountSettings from "../AccountSettings/AccountSettings";
import i18n from "../../../../i18";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UpgradePlan from "../../screens/UpgradePlan/UpgradePlan";
import time from "../../assets/time.svg";
import profileIcon from "../../assets/profileIcon.svg";
import addBlack from "../../assets/addBlack.svg";
import addGreen from "../../assets/addGreen.svg";
import chatIcon from "../../assets/chatIcon.svg";
import boxIcon from "../../assets/boxIcon.svg";
import dotsNotification from "../../assets/dotsNotification.svg";

import FloatingMenu from "../FloatingMenu/FloatingMenu";
import Automate from "../Automate/Automate";
import PanelAutomate from "../Automate/panelAutomate/PanelAutomate";

const NavbarAdmin = () => {
  const [isModalAutomate, setIsModalAutomate] = useState(false);
  const [typeContentAutomate, setTypeContentAutomate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("navbarAdmin");

  const [showPlusModal, setShowPlusModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };
  const openModalAutomate = () => {
    setIsModalAutomate(true);
  };
  const closeModalAutomate = () => {
    setTypeContentAutomate("");
    setIsModalAutomate(false);
  };

  const handleShowContentAutomate = (type) => {
    setIsModalAutomate(false);
    setTypeContentAutomate(type);
  };

  const handleCloseContentAutomate = (type) => {
    setIsModalAutomate(false);
    setTypeContentAutomate("");
  };
  return (
    <>
      <div className={styles.navbarAdmin}>
        <div className={styles.navbarAdminIcons}>
          <a href="/">
            <img src={facturaGPT} alt="Icon" />
          </a>
        </div>

        <button onClick={() => setShowPlusModal(true)} className={styles.plus}>
          {t("buttonGetPlus")} <img src={star} alt="Icon" />
        </button>
        <div className={styles.profile}>
          <a href="/clients">
            <img src={addBlack} alt="Icon" />
          </a>
          <div>
            <img
              src={addGreen}
              alt="Icon"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
          <a href="/chat">
            <img src={chatIcon} alt="Icon" />
          </a>
          <a href="/clients">
            <img src={clientIcon} alt="Icon" />
          </a>
          <a href="/allproducts">
            <img src={boxIcon} alt="Icon" />
          </a>
          <a href="notification" className={styles.number}>
            <img src={dotsNotification} alt="Icon" />
            <span>234</span>
          </a>

          <div onClick={handleProfileClick} className={styles.profileContainer}>
            <div className={styles.profileText}>
              <p>{user?.nombre}</p>
              <span>{user?.role}</span>
            </div>
            {user?.profileImage ? (
              <img
                className={styles.profileImage}
                src={user?.profileImage}
                alt=""
              />
            ) : (
              <div className={styles.initials}>
                {user?.nombre.split(" ").map((letter) => letter[0])}
              </div>
            )}
          </div>
        </div>
        <div
          className={` ${showSidebar ? styles.settingsBg : styles.none}`}
          onClick={() => setShowSidebar(false)}
        ></div>
        <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
          <AccountSettings />
        </div>
        {showPlusModal && (
          <UpgradePlan onClose={() => setShowPlusModal(false)} />
        )}
        {isOpen && (
          <FloatingMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            openModalAutomate={openModalAutomate}
            closeModalAutomate={closeModalAutomate}
          />
        )}
        {isModalAutomate && (
          <Automate
            typeContent={handleShowContentAutomate}
            close={closeModalAutomate}
            isModalAutomate={isModalAutomate}
            setIsModalAutomate={setIsModalAutomate}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        )}

        {typeContentAutomate && (
          <PanelAutomate
            typeContent={handleShowContentAutomate}
            close={handleCloseContentAutomate}
            type={typeContentAutomate}
          />
        )}
      </div>
    </>
  );
};

export default NavbarAdmin;
