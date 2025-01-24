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
  const { user } = useSelector((state) => state.user);
  const [isModalAutomate, setIsModalAutomate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("navbarAdmin");

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [selectedAutomationData, setSelectedAutomationData] = useState(null);

  const [showPlusModal, setShowPlusModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <>
      <Elements stripe={stripePromise}>
        <div className={styles.navbarAdmin}>
          <div className={styles.navbarAdminIcons}>
            <a href="/">
              <img src={facturaGPT} alt="Icon" />
            </a>
          </div>

          <button
            onClick={() => setShowPlusModal(true)}
            className={styles.plus}
          >
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

            <div
              onClick={handleProfileClick}
              className={styles.profileContainer}
            >
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
                  {user?.nombre?.split(" ").map((letter) => letter?.[0] || "U")}
                </div>
              )}
            </div>
          </div>
          <div
            className={` ${showSidebar ? styles.settingsBg : styles.none}`}
            onClick={() => setShowSidebar(false)}
          ></div>
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
        </div>
      </Elements>
    </>
  );
};

export default NavbarAdmin;
