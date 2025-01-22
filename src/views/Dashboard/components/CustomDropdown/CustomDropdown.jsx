import React, { useRef, useState, useEffect } from "react";
import styles from "./CustomDropdown.module.css";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

const CustomDropdown = ({
  editing,
  editable = true,
  options = [],
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

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={styles.dropdownContainer}
      ref={dropdownRef}
    >
      <div
        style={{ height, borderRadius }}
        className={emailsDropdown ? styles.emailsFilterSort : styles.filterSort}
        onClick={(e) => {
          e.stopPropagation();
          if (options.length === 0) return;
          handleToggle(e);
        }}
      >
        <div style={textStyles}>
          {Array.isArray(selectedOption) && selectedOption.length > 0
            ? selectedOption.join(", ")
            : Array.isArray(selectedOption) && selectedOption.length === 0
              ? placeholder
              : selectedOption || placeholder}
        </div>
        <FaChevronDown
          className={styles.chevronIcon}
          color="#71717A"
          style={{
            transform: isOpen ? "rotate(180deg)" : "",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </div>

      {isOpen && (
        <div className={styles.dropdownOptions}>
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                color: textStyles.color,
                fontWeight: textStyles.fontWeight,
              }}
              className={styles.dropdownOption}
              onClick={() =>
                handleOptionClick(hasObject ? option.value : option)
              }
            >
              {hasObject ? option.label : option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
