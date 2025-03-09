import React, { useRef, useState } from "react";
import styles from "./FiltersDropdownContainer.module.css";
import { FaChevronDown } from "react-icons/fa";
const FiltersDropdownContainer = ({ selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = ["Todos", "Activos", "Emails procesados", "Empresa A-Z"];

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.bg} onClick={handleDropdownToggle}></div>
      )}
      <div className={styles.dropdownContainer}>
        <div
          className={styles.filterSort}
          onClick={handleDropdownToggle}
          ref={dropdownRef}
        >
          Ordenar por: <b>{selectedOption}</b>
          <FaChevronDown className={styles.chevronIcon} />
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
    </>
  );
};

export default FiltersDropdownContainer;
