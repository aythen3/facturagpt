import React, { useRef, useState, useEffect } from "react";
import styles from "./CustomDropdown.module.css";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

import spanish_flag from "../../assets/spain_flag.svg";
import english_flag from "../../assets/english_flag.svg";

const CustomDropdown = ({
  editing,
  editable = true,
  options = [],
  optionsLabel = {},
  selectedOption,
  setSelectedOption,
  hasObject,
  emailsDropdown,
  height = "35px",
  borderRadius = "4px",
  placeholder = "Selecciona una opcion",
  textStyles = {
    fontWeight: 500,
    color: "#3d3c42",
    marginLeft: "6px",
    userSelect: "none",
  },
  multioption,
  customStyles,
  stateStripe,
  biggerWidth,
}) => {
  const { t } = useTranslation("dashboard");
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    if (editable) {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const colorMap = {
    Pagado: "#009F7A",
    Pendiente: "#FF9D00",
    Incumplido: "#FF5500",
    Vencido: "#C5221F",
    Anulado: "#8A0300",
  };

  const [selectedColor, setSelectedColor] = useState("#009F7A");
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={styles.dropdownContainer}
      ref={dropdownRef}
    >
      <div
        style={{
          height,
          borderRadius,
          background: stateStripe && "transparent",
        }}
        className={`${emailsDropdown ? styles.emailsFilterSort : styles.filterSort} ${!editable && styles.disabledBtn} ${customStyles}`}
        onClick={(e) => {
          e.stopPropagation();
          if (options.length === 0) return;
          handleToggle(e);
        }}
      >
        <div
          style={{ textStyles, color: stateStripe && selectedColor }}
          className={styles.dropdownHeader}
        >
          {Array.isArray(selectedOption) && selectedOption.length > 0 ? (
            selectedOption.join(", ")
          ) : Array.isArray(selectedOption) && selectedOption.length === 0 ? (
            placeholder
          ) : selectedOption == "es" ? (
            <>
              <img src={spanish_flag} />
              Es
            </>
          ) : selectedOption == "en" ? (
            <>
              <img src={english_flag} />
              En
            </>
          ) : (
            selectedOption || placeholder
          )}
        </div>
        {editable && (
          <FaChevronDown
            className={styles.chevronIcon}
            color={stateStripe ? selectedColor : "#71717A"}
            style={{
              transform: isOpen ? "rotate(180deg)" : "",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        )}
      </div>
      {isOpen && (
        <div
          className={styles.dropdownOptions}
          style={{ width: biggerWidth && "150%" }}
        >
          {multioption
            ? options.map((category, index) => (
                <div key={index}>
                  {/* Título de la subcategoría */}
                  <div className={styles.subcategoryTitle}>
                    {category.title}
                  </div>
                  {/* Opciones de la subcategoría */}
                  {category.items.map((item, subIndex) => (
                    <div
                      key={subIndex}
                      style={{
                        color: textStyles.color,
                        fontWeight: textStyles.fontWeight,
                      }}
                      className={styles.dropdownOption}
                      onClick={() => handleOptionClick(item.value)}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              ))
            : options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    fontWeight: textStyles.fontWeight,
                    color: stateStripe ? colorMap[option] : textStyles.color,
                  }}
                  className={styles.dropdownOption}
                  onClick={() => {
                    handleOptionClick(hasObject ? option.value : option);
                    setSelectedColor(colorMap[option]);
                  }}
                >
                  {/* <img src={spanish_flag} />
          ) : selectedOption == "en" ? (
            <img src={english_flag} />
          ) : (
            selectedOption || placeholder
          )} */}
                  {hasObject ? (
                    option.label
                  ) : option == "es" ? (
                    <>
                      <img src={spanish_flag} />
                      Es
                    </>
                  ) : option == "en" ? (
                    <>
                      <img src={english_flag} />
                      En
                    </>
                  ) : (
                    option
                  )}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
