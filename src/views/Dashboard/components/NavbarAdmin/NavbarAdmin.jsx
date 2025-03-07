import React, { useState } from "react";
import styles from "./NavbarAdmin.module.css";
import star from "../../assets/starPlus.svg";
import facturaGPT from "../../assets/FacturaGPTBlack.svg";
import AccountSettings from "../AccountSettings/AccountSettings";
import { useTranslation } from "react-i18next";
import { ReactComponent as AddPlus } from "../../assets/addPlus.svg";
import { ReactComponent as AddPlusWhite } from "../../assets/addPlusWhite.svg";
import { ReactComponent as ChatIcon } from "../../assets/chatIcon.svg";
import { ReactComponent as BoxIcon } from "../../assets/boxIcon.svg";
import { ReactComponent as DotsNotification } from "../../assets/dotsNotification.svg";
import { ReactComponent as ClientIcon } from "../../assets/clientsIcon.svg";
import { ReactComponent as MenuMobileIcon } from "../../assets/menuIconBlack.svg";
import FloatingMenu from "../FloatingMenu/FloatingMenu";
import Automate from "../Automate/Automate";
import PanelAutomate from "../Automate/panelAutomate/PanelAutomate";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpgradePlanWrapper from "../../screens/UpgradePlan/UpgradePlan";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewTag from "../NewTag/NewTag";
import SelectLocation from "../SelectLocation/SelectLocation";

import { sendEmail } from "@src/actions/user";
import NewContact from "../NewContact/NewContact";
import NewProduct from "../NewProduct/NewProduct";
import NewBIll from "../NewBIll/NewBIll";
import UploadFIle from "../UploadFIle/UploadFIle";
import CreateFolderModal from "../CreateFolderModal/CreateFolderModal";
import MobileAsidebarNavigation from "./MobileAsidebarNavigation/MobileAsidebarNavigation";
import SelectCurrencyPopup from "../SelectCurrencyPopup/SelectCurrencyPopup";
import SeeHistory from "../SeeHistory/SeeHistory";

const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);
const NavbarAdmin = ({ fromPath, setFromPath = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seeHistory, setSeeHistory] = useState(false);

  const { user } = useSelector((state) => state.user);
  const [isModalAutomate, setIsModalAutomate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("navbarAdmin");

  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [showNewContact, setShowNewContact] = useState(false);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [showNewBill, setShowNewBill] = useState(false);
  const [showUploadFile, setShowUplaodFile] = useState(false);
  const [selectedAutomationData, setSelectedAutomationData] = useState(null);

  const [showPlusModal, setShowPlusModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [numNotification, setNumNotification] = useState(0);
  const [showChangeCurrencyPopup, setShowChangeCurrencyPopup] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
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
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  const handleProfileClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const timer = setTimeout(() => {
      if (clickCount === 0) {
        // Single click
        setShowSidebar(!showSidebar);
      } else {
        // Double click
        // window.location.href = "/admin/home";
        navigate("/admin/home");
      }
      setClickCount(0);
    }, 300); // 300ms window for double click

    setClickTimer(timer);
  };

  // const handleProfileClick = () => {
  //   setShowSidebar(!showSidebar);
  // };
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

  const [selectedLocationNew, setSelectedLocationNew] = useState("/Inicio/");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Elements stripe={stripePromise}>
        <div className={styles.navbarAdmin}>
          <div className={styles.navbarAdminIcons}>
            <a href={user ? "/admin/chat" : "/"}>
              <img src={facturaGPT} alt="Icon" />
            </a>
            <div
              onClick={() => setMenuOpen(true)}
              className={styles.MenuMobileIcon}
            >
              <MenuMobileIcon />
            </div>
          </div>

          <div className={styles.hiddenMobile}>
            {" "}
            <button
              onClick={() => setShowPlusModal(true)}
              className={styles.plus}
            >
              {t("buttonGetPlus")} <img src={star} alt="Icon" />
            </button>
          </div>

          <div className={styles.hiddenMobile}>
            <div className={styles.profile}>
              {!isOpen ? (
                <a
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={styles.addIcon}
                >
                  <AddPlus />
                </a>
              ) : (
                <a className={`${styles.addIconGreen} ${styles.addIcon}`}>
                  <AddPlusWhite />
                </a>
              )}
              <a
                // href="/admin/chat"
                onClick={() => setFromPath("chat")}
                className={fromPath == "chat" ? styles.active : ""}
              >
                <ChatIcon />
              </a>
              <a
                onClick={() => setFromPath("clients")}
                className={fromPath?.startsWith("clients") ? styles.active : ""}
              >
                <ClientIcon />
              </a>
              <a
                onClick={() => setFromPath("products")}
                className={fromPath == "products" ? styles.active : ""}
              >
                <BoxIcon />
              </a>
              <a
                className={`${styles.number} 
                ${fromPath == "notification" ? styles.active : ""}`}
                onClick={() => setFromPath("notification")}
              >
                <DotsNotification />
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
        </div>
        <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
          <AccountSettings />
        </div>

        <MobileAsidebarNavigation
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          fromPath={fromPath}
          setFromPath={setFromPath}
          setShowPlusModal={setShowPlusModal}
          setIsOpen={setIsOpen}
        />
        {showPlusModal && (
          <UpgradePlanWrapper
            onClose={() => setShowPlusModal(false)}
            setShowSelectCurrencyPopup={setShowChangeCurrencyPopup}
            setSelectedCurrency={setSelectedCurrency}
            selectedCurrency={selectedCurrency}
            setSeeHistory={setSeeHistory}
            seeHistory={seeHistory}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        )}
        {seeHistory && (
          <div className={styles.seeHistoryContainer}>
            <SeeHistory
              setSeeHistory={setSeeHistory}
              seeHistory={seeHistory}
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
            />
          </div>
        )}

        {showChangeCurrencyPopup && (
          <SelectCurrencyPopup
            setShowSelectCurrencyPopup={setShowChangeCurrencyPopup}
            setSelectedCurrency={setSelectedCurrency}
            selectedCurrency={selectedCurrency}
          />
        )}

        {isOpen && (
          <FloatingMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            openModalAutomate={openModalAutomate}
            closeModalAutomate={closeModalAutomate}
            showCreateFolder={showCreateFolder}
            setShowCreateFolder={setShowCreateFolder}
            showNewTagModal={showNewTagModal}
            setShowNewTagModal={setShowNewTagModal}
            showNewContact={showNewContact}
            setShowNewContact={setShowNewContact}
            showNewProduct={showNewProduct}
            setShowNewProduct={setShowNewProduct}
            setShowNewBill={setShowNewBill}
            setShowUplaodFile={setShowUplaodFile}
            setShowLocationModal={setShowLocationModal}
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
        {showNewTagModal && <NewTag setShowNewTagModal={setShowNewTagModal} />}
        {showCreateFolder && (
          <CreateFolderModal
            onClose={() => setShowCreateFolder(false)}
            location={selectedLocationNew}
            setShowLocationModal={setShowLocationModal}
          />
        )}
        {showLocationModal && (
          <SelectLocation
            onClose={() => setShowLocationModal(false)}
            setSelectedLocationNew={setSelectedLocationNew}
            showNewFolder={false}
          />
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
        {showNewContact && (
          <NewContact
            setShowNewContact={setShowNewContact}
            showNewContact={showNewContact}
          />
        )}
        {showNewProduct && (
          <NewProduct
            setShowNewProduct={setShowNewProduct}
            showNewProduct={showNewProduct}
          />
        )}
        {showNewBill && <NewBIll setShowNewBill={setShowNewBill} />}
        {showUploadFile && <UploadFIle setShowUplaodFile={setShowUplaodFile} />}
      </Elements>
    </>
  );
};

export default NavbarAdmin;
