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
import { ReactComponent as AddPlus } from "../../assets/addPlus.svg";
import addGreen from "../../assets/addGreen.svg";
// import chatIcon from "../../assets/chatIcon.svg";
import { ReactComponent as ChatIcon } from "../../assets/chatIcon.svg";
import boxIcon from "../../assets/boxIcon.svg";
import dotsNotification from "../../assets/dotsNotification.svg";
import menuIcon from "../../assets/menuIconBlack.svg"; // Ícono de menú
import FloatingMenu from "../FloatingMenu/FloatingMenu";
import Automate from "../Automate/Automate";
import PanelAutomate from "../Automate/panelAutomate/PanelAutomate";
import PanelIniAutomate from "../Automate/panelAutomate/IniAutomate";
import { useSelector } from "react-redux";
import UpgradePlanWrapper from "../../screens/UpgradePlan/UpgradePlan";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewTag from "../NewTag/NewTag";
import SelectLocation from "../SelectLocation/SelectLocation";
const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);
const NavbarAdmin = () => {
  const { pathname } = window.location;

  const fromPath = pathname.split("/")[2];


console.log('languageFromPath', fromPath)

  const { user } = useSelector((state) => state.user);
  const [isModalAutomate, setIsModalAutomate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("navbarAdmin");
  // console.log(user);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [selectedAutomationData, setSelectedAutomationData] = useState(null);

  const [showPlusModal, setShowPlusModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [numNotification, setNumNotification] = useState(0);
  

  // =======================
  const [typeContentAutomate, setTypeContentAutomate] = useState("");
  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTypeContentAutomate(false);
      setIsAnimating(false);
    }, 300);
  };
  // =======================
  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };
  const openModalAutomate = () => {
    setIsModalAutomate(true);
    setIsOpen(false);
  };
  const closeModalAutomate = () => {
    setTypeContentAutomate("");
    setIsModalAutomate(false);
  };

  const handleShowContentAutomate = (type, automationData) => {
    setIsModalAutomate(false);
    setTypeContentAutomate(type);
    setSelectedAutomationData(automationData);
  };

  const handleCloseContentAutomate = (type) => {
    setIsModalAutomate(false);
    setTypeContentAutomate("");
  };


  // ========================

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Elements stripe={stripePromise}>
        <div className={styles.navbarAdmin}>
          <div className={styles.navbarAdminIcons}>
            <a href={user ? "/admin/chat" : "/"}>
              <img src={facturaGPT} alt="Icon" />
            </a>
          </div>

          <div className={styles.hiddenMobile}>
            <button
              onClick={() => setShowPlusModal(true)}
              className={styles.plus}
            >
              {t("buttonGetPlus")} <img src={star} alt="Icon" />
            </button>
            <div className={styles.profile}>
              {/* <a href="/clients">
              <img src={addBlack} alt="Icon" />
            </a> */}
              {!isOpen ? (
                <a
                onClick={() => setIsOpen((prev) => !prev)}
                >
                  <AddPlus />
                  {/* <img
                    src={addPlus}
                    alt="Icon"
                    onClick={() => setIsOpen((prev) => !prev)}
                    style={{
                      width: '13px',
                      height: '13px'
                    }}
                  /> */}
                </a>
              ) : (
                <a>
                  <img
                    src={addGreen}
                    alt="Icon"
                    onClick={() => setIsOpen((prev) => !prev)}
                  />
                </a>
              )}
              <a
                href="/admin/chat"
                className={fromPath == 'chat' ? styles.active : ''}
              >
                <ChatIcon />
                {/* <img src={chatIcon} alt="Icon" /> */}
              </a>
              <a
                href="/admin/contacts"
                className={fromPath == 'chat' ? styles.active : ''}
              >
                <img src={clientIcon} alt="Icon" />
              </a>
              <a
                href="/admin/products"
                className={fromPath == 'chat' ? styles.active : ''}
              >
                <img src={boxIcon} alt="Icon" />
              </a>
              <a
                href="/admin/notification" 
                // className={styles.number}
                className={`${styles.number} 
                ${fromPath == 'chat' ? styles.active : ''}`}
              >
                <img src={dotsNotification} alt="Icon" />
                {(numNotification !== 0) && (
                  <span>{numNotification}</span>
                )}
              </a>

              <div
                onClick={handleProfileClick}
                className={styles.profileContainer}
              >
                <div className={styles.profileText}>
                  <p>{user?.nombre || 'Not found'}</p>
                  <span>{user?.role || 'Not found'}</span>
                </div>
                {user?.profileImage ? (
                  <img
                    className={styles.profileImage}
                    src={user?.profileImage}
                    alt=""
                  />
                ) : (
                  <div className={styles.initials}>
                    {user?.nombre?.split(" ").map((letter) => letter?.[0] || "U")}
                  </div>
                )}
              </div>
            </div>
            <div
              className={` ${showSidebar ? styles.settingsBg : styles.none}`}
              onClick={() => setShowSidebar(false)}
            ></div>
          </div>
          <div className={styles.showMobile}>
            <button className={styles.hamburger} onClick={toggleMenu}>
              <img src={menuIcon} alt="Menu Icon" />
            </button>
          </div>


          {menuOpen && (
            <div>
              Obtener plus
              Automatizar
              Chat
              Clients
              Products
              Notificacions
              User
            </div>
          )}


          {/* PopUps */}
          <div
            className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}
          >
            <AccountSettings />
          </div>
          {showPlusModal && (
            <UpgradePlanWrapper onClose={() => setShowPlusModal(false)} />
          )}
          {isOpen && (
            <FloatingMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              openModalAutomate={openModalAutomate}
              closeModalAutomate={closeModalAutomate}
              showLocationModal={showLocationModal}
              setShowLocationModal={setShowLocationModal}
              showNewTagModal={showNewTagModal}
              setShowNewTagModal={setShowNewTagModal}
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
          {showNewTagModal && (
            <NewTag setShowNewTagModal={setShowNewTagModal} />
          )}
          {showLocationModal && (
            <SelectLocation onClose={() => setShowLocationModal(false)} />
          )}
          {typeContentAutomate && (
            <PanelAutomate
              automationData={selectedAutomationData}
              typeContent={handleShowContentAutomate}
              setIsModalAutomate={setIsModalAutomate}
              close={handleCloseNewClient}
              type={typeContentAutomate}
              isAnimating={isAnimating}
            />
          )}

          {true && (
            <PanelIniAutomate 
            
            />
          )}
        </div>
      </Elements>
    </>
  );
};

export default NavbarAdmin;
