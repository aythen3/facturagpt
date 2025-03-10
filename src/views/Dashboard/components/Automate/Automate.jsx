import React, { useEffect, useRef, useState } from "react";
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
import { ReactComponent as IconLock } from "./panelAutomate/assets/icon_lock.svg";
import searchMagnify from "../../assets/searchMagnify.svg";

import automation from "../../assets/automation.svg";
import IniAutomate from "./panelAutomate/IniAutomate";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import useFocusShortcut from "../../../../utils/useFocusShortcut";
import { getUserAutomatiosByInputSearch } from "../../../../actions/automate";

const Automate = ({
  close,
  newData,
  typeContent,
  isModalAutomate,
  setIsModalAutomate,
  isAnimating,
  setIsAnimating,
}) => {
  const { userAutomations } = useSelector((state) => state.automate);
  const { user } = useSelector((state) => state.user);
  const [selectedType, setSelectedType] = useState(0);
  const [dataFilter, setDataFilter] = useState(data || newData);
  const dispach = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  console.log("user user", user);

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
  const searchInputRef = useRef(null);

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "k");
  const filteredData = userAutomations.filter((item) => {
    if (selectedType === "all") return true;
    if (selectedType === "input") return item.inputType;
    if (selectedType === "output") return !item.inputType;
    return true;
  });

  const inputFilterAutomate = (e) => {
    const inputSearchTerm = e.target.value;
    setSearchTerm(inputSearchTerm);
    dispach(
      getUserAutomatiosByInputSearch({
        userId: user.id,
        inputValue: inputSearchTerm,
      })
    );
  };

  return (
    <>
      <div className={styles.container} onClick={handleCloseNewClient}></div>
      <div
        className={`
          ${styles.content} ${isAnimating ? styles.scaleDown : styles.scaleUp}
          ${true ? styles.expand : ""}
          `}
      >
        {/* <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <div onClick={handleCloseNewClient} className={styles.backButton}>
              <img src={chevronLeft} alt="chevronLeft" />
            </div>
            <h2>
              {userAutomations.length <= 0
                ? "Selecciona dónde tienes tus documentos"
                : "Automatiza"}
            </h2>
          </div>
        </div> */}
        <HeaderCard
          title={
            userAutomations?.length <= 0
              ? "Selecciona dónde tienes tus documentos"
              : "Automatiza"
          }
          setState={handleCloseNewClient}
          titleStyle={{
            color: "#000",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "19px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "130%",
          }}
        >
          {!userAutomations.length <= 0 && (
            <>
              {/* <Button type="white" action={handleCloseNewClient}>
                Atrás
              </Button> */}
              <Button action={() => typeContent("Gmail")}>
                {" "}
                <img src={automation} alt="automation" />
                Nueva Automatización
              </Button>
            </>
          )}
        </HeaderCard>
        {userAutomations?.length <= 0 && searchTerm.length === 0 ? (
          <div className={styles.iniContainer}>
            <IniAutomate typeContent={typeContent} />
          </div>
        ) : (
          <div className={styles.automate_content}>
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <div className={styles.searchIcon}>
                  <img src={searchMagnify} alt="searchMagnify" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Busca tus automatizaciones o crea una nueva"
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => inputFilterAutomate(e)}
                />
                {/* <div
                onClick={() => setShowLocationModal(true)}
                className={styles.searchIconsWrappers}
              >
                <img src={cmd} alt="cmdIcon" />
              </div> */}
                <div
                  style={{ marginLeft: "7px" }}
                  className={styles.searchIconsWrappers}
                >
                  <img src={k} alt="kIcon" />
                </div>
              </div>
            </div>
            <div className={styles.buttonsTypeContainer}>
              <button
                onClick={() => setSelectedType("all")}
                className={selectedType == "all" && styles.selectedType}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedType("input")}
                className={selectedType == "input" && styles.selectedType}
              >
                Entrada
              </button>
              <button
                onClick={() => setSelectedType("output")}
                className={selectedType == "output" && styles.selectedType}
              >
                Salida
              </button>
            </div>
            <div className={styles.contentContainerScroll}>
              <div className={styles.contentContainer}>
                {userAutomations?.length > 0 &&
                  filteredData?.map((card, i) => {
                    console.log("automationData", card);
                    const filteredAutomation = data.find(
                      (automation) => automation?.type === card?.type
                    );

                    return (
                      <CardAutomate
                        fullContent={true}
                        type={filteredAutomation?.type}
                        typeContent={typeContent}
                        key={card.id}
                        name={filteredAutomation?.automateName}
                        nameTitle={card.inputValue}
                        image={filteredAutomation?.image}
                        contactType={
                          card?.type === "Gmail"
                            ? card?.selectedEmailConnection
                            : card?.type === "WhatsApp"
                              ? card?.selectedWhatsAppConnection
                              : card?.email
                        }
                        // contactType={
                        //   card?.automationData?.type === "Gmail"
                        //     ? card?.automationData?.selectedEmailConnection
                        //     : card?.automationData?.type === "WhatsApp"
                        //       ? card?.automationData?.selectedWhatsAppConnection
                        //       : card?.email
                        // }
                        automationData={card}
                        isBorders={true}
                        last={i === dataFilter.length - 1}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {userAutomations?.length <= 0 && (
          <div className={styles.footer}>
            <IconLock />
            <span>
              Automaticamente FacturaGPT analizará los datos de forma segura
            </span>
          </div>
        )}
        {/* <div className={styles.container_buttons_footer}>
          <button
            onClick={handleCloseNewClient}
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
        </div> */}
      </div>
    </>
  );
};

export default Automate;
