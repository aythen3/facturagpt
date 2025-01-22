import React, { useEffect, useState } from "react";
import SearchComponent from "./Components/SearchComponent/SearchComponent";
import CardAutomate from "./Components/CardAutomate/CardAutomate";
import { data } from "./utils/automatesJson";
import styles from "./automate.module.css";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import closeGray from "../../assets/closeGray.svg";
import chevronLeft from "../../assets/chevronLeft.svg";
import { Search } from "lucide-react";
import k from "../../assets/k.svg";
import cmd from "../../assets/cmd.svg";
import searchMagnify from "../../assets/searchMagnify.svg";
import automation from "../../assets/automation.svg";

const Automate = ({
  close,
  newData,
  typeContent,
  isModalAutomate,
  setIsModalAutomate,
  isAnimating,
  setIsAnimating,
}) => {
  const { userAutomations } = useSelector((state) => state.automations);
  const [dataFilter, setDataFilter] = useState(data || newData);
  const dispach = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setDataFilter(data || newData);
    } else {
      handleDataFilter(searchTerm);
    }
  }, [searchTerm]);
  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsModalAutomate(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isModalAutomate) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsModalAutomate(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalAutomate]);

  return (
    <>
      <div className={styles.container} onClick={handleCloseNewClient}></div>
      <div
        className={`${styles.content} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <div onClick={handleCloseNewClient} className={styles.backButton}>
              <img src={chevronLeft} alt="chevronLeft" />
            </div>
            <h2>Automatiza</h2>
          </div>
          {/* <div onClick={handleCloseNewClient} className={styles.closeIcon}>
            <img src={closeGray} alt="closeGray" />
          </div> */}
        </div>
        <div className={styles.automate_content}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <div className={styles.searchIcon}>
                <img src={searchMagnify} alt="searchMagnify" />
              </div>
              <input
                type="text"
                placeholder="Buscar"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div
                onClick={() => setShowLocationModal(true)}
                className={styles.searchIconsWrappers}
              >
                <img src={cmd} alt="cmdIcon" />
              </div>
              <div
                style={{ marginLeft: "7px" }}
                className={styles.searchIconsWrappers}
              >
                <img src={k} alt="kIcon" />
              </div>
            </div>
          </div>
          <div className={styles.contentContainer}>
            {userAutomations.length > 0 &&
              userAutomations?.map((card, i) => {
                console.log("automationData", card.automationData);
                const filteredAutomation = data.find(
                  (automation) =>
                    automation?.type === card?.automationData?.type
                );
                console.log("filteredAutomation", filteredAutomation);
                return (
                  <CardAutomate
                    fullContent={true}
                    type={filteredAutomation.type}
                    typeContent={typeContent}
                    key={card.id}
                    name={filteredAutomation.automateName}
                    image={filteredAutomation.image}
                    contactType={
                      card?.automationData?.type === "Gmail"
                        ? card?.automationData?.selectedEmailConnection
                        : card?.automationData?.type === "WhatsApp"
                          ? card?.automationData?.selectedWhatsAppConnection
                          : card?.email
                    }
                    automationData={card}
                    isBorders={true}
                    last={i === dataFilter.length - 1}
                  />
                );
              })}
          </div>
        </div>
        <div className={styles.container_buttons_footer}>
          <button
            onClick={close}
            className={`${styles.buttons_footer} ${styles.button_back}`}
          >
            Atrás
          </button>
          <button
            onClick={() => typeContent("Gmail")}
            className={`${styles.buttons_footer} ${styles.button_add}`}
          >
            <img src={automation} alt="automation" /> Nueva Automatización
          </button>
        </div>
      </div>
    </>
  );
};

export default Automate;
