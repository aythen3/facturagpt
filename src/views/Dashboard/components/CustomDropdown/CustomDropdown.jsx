import React, { useRef, useState, useEffect } from "react";
import styles from "./CustomDropdown.module.css";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

const CustomDropdown = ({
  editable = true,
  options = [],
  selectedOption,
  setSelectedOption,
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
        className={styles.filterSort}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle(e);
        }}
      >
        <b>{selectedOption}</b>
        <FaChevronDown
          className={styles.chevronIcon}
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
              className={styles.dropdownOption}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
