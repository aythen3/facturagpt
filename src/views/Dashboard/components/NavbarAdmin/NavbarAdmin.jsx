import React, { useState } from "react";
import styles from "./NavbarAdmin.module.css";
import star from "../../assets/starPlus.svg";
import facturaGPT from "../../assets/FacturaGPTBlack.svg";
import AccountSettings from "../AccountSettings/AccountSettings";
import { useTranslation } from "react-i18next";
import { ReactComponent as AddPlus } from "../../assets/addPlus.svg";
import addGreen from "../../assets/addGreen.svg";
import { ReactComponent as ChatIcon } from "../../assets/chatIcon.svg";
import { ReactComponent as BoxIcon } from "../../assets/boxIcon.svg";
import { ReactComponent as DotsNotification } from "../../assets/dotsNotification.svg";
import { ReactComponent as ClientIcon } from "../../assets/clientsIcon.svg";
import menuIcon from "../../assets/menuIconBlack.svg"; // Ícono de menú
import FloatingMenu from "../FloatingMenu/FloatingMenu";
import Automate from "../Automate/Automate";
import PanelAutomate from "../Automate/panelAutomate/PanelAutomate";
import PanelIniAutomate from "../Automate/panelAutomate/IniAutomate";
import { useSelector, useDispatch } from "react-redux";
import UpgradePlanWrapper from "../../screens/UpgradePlan/UpgradePlan";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewTag from "../NewTag/NewTag";
import SelectLocation from "../SelectLocation/SelectLocation";

import { sendEmail } from "@src/actions/user";


const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);
const NavbarAdmin = ({ 
  fromPath, 
  setFromPath = () => {} 
}) => {
  // const { pathname } = window.location;
  const dispatch = useDispatch()
  // const fromPath = pathname.split("/")[2];

  // console.log('languageFromPath', fromPath)

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


  const handleSendEmail = async () => {
    const resp = await dispatch(sendEmail({
      // id: user.id,
      email: 'info@aythen.com'
    }))
    console.log('resp emails', resp)
  }


  return (
    <>
      <Elements stripe={stripePromise}>
        <div className={styles.navbarAdmin}>
          <div className={styles.navbarAdminIcons}>
            <a href={user ? "/admin/chat" : "/"}>
              <img src={facturaGPT} alt="Icon" />
            </a>
          </div>
          <button
            onClick={() => handleSendEmail()}
          >
            Enviar email
          </button>

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
                <a onClick={() => setIsOpen((prev) => !prev)}>
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
                // href="/admin/chat"
                onClick={() => setFromPath("chat")}
                className={fromPath == "chat" ? styles.active : ""}
              >
                <ChatIcon />
                {/* <img src={chatIcon} alt="Icon" /> */}
              </a>
              <a
                // href="/admin/contacts"
                onClick={() => setFromPath("contacts")}
                className={fromPath == "contacts" ? styles.active : ""}
              >
                <ClientIcon />
                {/* <img src={clientIcon} alt="Icon" /> */}
              </a>
              <a
                // href="/admin/products"
                onClick={() => setFromPath("products")}
                className={fromPath == "products" ? styles.active : ""}
              >
                {/* <img src={boxIcon} alt="Icon" /> */}
                <BoxIcon />
              </a>
              <a
                //href="/admin/notification"
                className={`${styles.number} 
                ${fromPath == "notification" ? styles.active : ""}`}
                onClick={() => setFromPath("notification")}
              >
                <DotsNotification />
                {/* <img src={dotsNotification} alt="Icon" /> */}
                {numNotification !== 0 && <span>{numNotification}</span>}
              </a>

              <div
                onClick={handleProfileClick}
                className={styles.profileContainer}
              >
                <div className={styles.profileText}>
                  <p>{user?.nombre || "Not found"}</p>
                  <span>{user?.role || "Not found"}</span>
                </div>
                {user?.profileImage ? (
                  <img
                    className={styles.profileImage}
                    src={user?.profileImage}
                    alt=""
                  />
                ) : (
                  <div className={styles.initials}>
                    {user?.nombre
                      ?.split(" ")
                      .map((letter) => letter?.[0] || "U")}
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
            <>
              <div
                className={styles.mobileMenuOverlay}
                onClick={() => setMenuOpen(false)}
              ></div>
              <div className={styles.mobileMenu}>
                <button>
                  {t("buttonGetPlus")} <img src={star} alt="Icon" />
                </button>
                <ul>
                  <li onClick={() => setIsOpen((prev) => !prev)}>
                    <AddPlus />
                    Automatizar
                  </li>
                  <li>
                    <a
                      href="/admin/chat"
                      className={fromPath == "chat" ? styles.active : ""}
                    >
                      <ChatIcon />
                      Chat
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/contacts"
                      className={fromPath == "contacts" ? styles.active : ""}
                    >
                      <ClientIcon />
                      Clients
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/products"
                      className={fromPath == "products" ? styles.active : ""}
                    >
                      <BoxIcon />
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/notification"
                      className={`${styles.number} 
                ${fromPath == "notification" ? styles.active : ""}`}
                    >
                      <DotsNotification />
                      Notificacions
                      {numNotification !== 0 && <span>{numNotification}</span>}
                    </a>
                  </li>
                </ul>
                <div
                  onClick={handleProfileClick}
                  className={styles.profileContainer}
                >
                  <div className={styles.profileText}>
                    <p>{user?.nombre || "Not found"}</p>
                    <span>{user?.role || "Not found"}</span>
                  </div>
                  {user?.profileImage ? (
                    <img
                      className={styles.profileImage}
                      src={user?.profileImage}
                      alt=""
                    />
                  ) : (
                    <div className={styles.initials}>
                      {user?.nombre
                        ?.split(" ")
                        .map((letter) => letter?.[0] || "U")}
                    </div>
                  )}
                </div>
              </div>
            </>
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

          {true && <PanelIniAutomate />}
        </div>
      </Elements>
    </>
  );
};

export default NavbarAdmin;
