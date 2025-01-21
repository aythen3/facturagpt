import React, { useState, useEffect } from "react";
import styles from "./FilesFilterModal.module.css";
import closeGray from "../../assets/closeGray.svg";
import chevronLeft from "../../assets/chevronLeft.svg";
import InputWithTitle from "../InputWithTitle/InputWithTitle";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";
import minusIcon from "../../assets/minusIcon.svg";
import { FaChevronDown } from "react-icons/fa";
import searchGray from "../../assets/searchGray.svg";

const FilesFilterModal = ({ onClose, handleApplyFilters, isFilterOpen }) => {
  const colors = [
    "#0B06FF",
    "#FF0000",
    "#12A27F",
    "#7329A5",
    "#7086FD",
    "#FF8C00",
    "#16C098",
    "#C075EE",
    "#EEFF00",
  ];
  const [isClosing, setIsClosing] = useState(isFilterOpen);
  const [keyWord, setKeyWord] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allFiles, setAllFiles] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tag, setTag] = useState("");

  const handleClose = () => {
    setIsClosing(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCancel = () => {
    // Reiniciar estados
    setKeyWord("");
    setSelectedCategory("");
    setAllFiles(false);
    setSelectedTypes([]);
    setMinValue("");
    setMaxValue("");
    setSelectedCurrency("EUR");
    setSelectedTags([]);
    setTag("");

    handleClose();
    handleApplyFilters({});
    console.log("vacio");
  };

  const handleApplyFiltering = () => {
    const filters = {
      keyWord,
      selectedCategory,
      allFiles,
      selectedTypes,
      minValue,
      maxValue,
      selectedCurrency,
      selectedTags,
    };
    console.log(filters);
    handleApplyFilters(filters);

    // Reiniciar estados
    setKeyWord("");
    setSelectedCategory("");
    setAllFiles(false);
    setSelectedTypes([]);
    setMinValue("");
    setMaxValue("");
    setSelectedCurrency("EUR");
    setSelectedTags([]);
    setTag("");

    handleClose();
  };

  useEffect(() => {
    setIsClosing(isFilterOpen);
  }, [isFilterOpen]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      className={`${styles.modalOverlay} ${!isClosing ? styles.fadeOut : ""}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${styles.modalContent} ${!isClosing ? styles.scaleDown : ""}`}
      >
        {/* Header */}
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <div onClick={handleClose} className={styles.backButton}>
              <img src={chevronLeft} alt="chevronLeft" />
            </div>
            <h2>Filtrar</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            <div onClick={handleClose}>
              <img src={closeGray} alt="closeGray" onClick={handleClose} />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className={styles.contentContainer}>
          <InputWithTitle
            bgColor="#F4F4F4"
            titleColor="#18181B"
            textStyles={{
              fontWeight: 300,
              color: "#1E0045",
              fontSize: "13px",
              marginLeft: "6px",
              userSelect: "none",
            }}
            inputHeight="31px"
            title="Buscar por palabra clave"
            placeholder="Título contiene, email o dirección"
            value={keyWord}
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
          <div>
            <h2 className={styles.inputTitle}>Buscar por categoría</h2>
            <CustomDropdown
              height="31px"
              textStyles={{
                fontWeight: 300,
                color: "#1E0045",
                fontSize: "13px",
                marginLeft: "6px",
                userSelect: "none",
              }}
              options={["Documentos", "Imagenes", "Videos"]}
              selectedOption={selectedCategory}
              setSelectedOption={setSelectedCategory}
            />
          </div>
          <div>
            <h2 className={styles.inputTitle}>Buscar por tipo</h2>
            <CheckboxWithText
              state={allFiles}
              setState={setAllFiles}
              text="Permitir todo los tipos de archivos"
            />
            <div className={styles.cardTypesContainer}>
              {selectedTypes.map((type) => (
                <div className={styles.singleTypeCard}>
                  <span>{type}</span>
                  <div
                    onClick={() =>
                      setSelectedTypes(
                        selectedTypes.filter((option) => option !== type)
                      )
                    }
                    className={styles.minusIcon}
                  >
                    <img src={minusIcon} alt="minusIcon" />
                  </div>
                </div>
              ))}
            </div>
            <CustomDropdown
              options={["PDF", "PNG", "JPEG", "SVG", "XLS"]}
              selectedOption={selectedTypes}
              height="31px"
              textStyles={{
                fontWeight: 300,
                color: "#1E0045",
                fontSize: "13px",
                marginLeft: "6px",
                userSelect: "none",
              }}
              setSelectedOption={(selected) =>
                setSelectedTypes((prev) => {
                  if (prev.includes(selected)) {
                    return prev.filter((option) => option !== selected);
                  } else {
                    return [...prev, selected];
                  }
                })
              }
            />
          </div>
          <div className={styles.filterSection}>
            <div className={styles.searchAmount}>
              <label className={styles.inputTitle}>Buscar por cantidad</label>
              <div className={styles.currencyContainer}>
                <div
                  className={styles.currencyDropdownButton}
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  <span>{selectedCurrency}</span>
                  <FaChevronDown
                    className={styles.chevronIcon}
                    color="#71717A"
                    size={12}
                    style={{
                      transform: showCurrencyDropdown ? "rotate(180deg)" : "",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                </div>
                {showCurrencyDropdown && (
                  <div className={styles.currencyDropdown}>
                    <span
                      onClick={() => {
                        setSelectedCurrency("USD");
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      USD
                    </span>
                    <span
                      onClick={() => {
                        setSelectedCurrency("EUR");
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      EUR
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.amountContainer}>
              <div className={styles.amountInput}>
                <div className={styles.leftAmount}>
                  <span>Min</span>
                  <span>$</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                />
              </div>
              <span>-</span>
              <div className={styles.amountInput}>
                <div className={styles.leftAmount}>
                  <span>Max</span>
                  <span>$</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className={styles.inputTitle}>Buscar por etiqueta</h2>
            <div
              style={{ backgroundColor: "#f4f4f4", height: "31px" }}
              className={styles.inputContainer}
            >
              <img src={searchGray} alt="searchGray" />
              <input
                type="text"
                placeholder="Buscar etiqueta"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className={styles.inputWithTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tag.length > 0) {
                    setSelectedTags((prev) => [...prev, tag]);
                    setTag("");
                  }
                }}
              />
            </div>
            <div className={styles.tagsContainer}>
              {selectedTags.map((tag, index) => (
                <div
                  className={styles.singleTag}
                  style={{ backgroundColor: colors[index % colors.length] }}
                  key={index}
                >
                  <span>{tag}</span>
                  <div
                    onClick={() =>
                      setSelectedTags(
                        selectedTags.filter((option) => option !== tag)
                      )
                    }
                    className={`${styles.minusBlackIcon} ${styles.minusIcon}`}
                  >
                    <img src={minusIcon} alt="minusIcon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className={styles.footerContainer}>
          <div onClick={handleCancel} className={styles.newFolderButton}>
            Cancelar
          </div>
          <div onClick={handleApplyFiltering} className={styles.selectButton}>
            Buscar
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesFilterModal;
