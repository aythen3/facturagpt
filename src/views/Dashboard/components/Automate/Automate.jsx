import React, { useEffect, useState } from "react";
import TitleComponent from "./Components/TitleComponent";
import SearchComponent from "./Components/SearchComponent/SearchComponent";
import CardAutomate from "./Components/CardAutomate/CardAutomate";
import { data } from "./utils/automatesJson";
import styles from "./automate.module.css";
import CloseSVG from "./svgs/CloseSVG";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { useDispatch } from "react-redux";

const Automate = ({
  close,
  newData,
  typeContent,
  isModalAutomate,
  setIsModalAutomate,
  isAnimating,
  setIsAnimating,
}) => {
  const [dataFilter, setDataFilter] = useState(data || newData);
  const dispach = useDispatch();
  const handleDataFilter = (searchTerm) => {
    const filteredData = data.filter((card) =>
      card.automateName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
  };

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
        <div className={styles.automate_header}>
          <TitleComponent title="Automatiza" />
          <div onClick={handleCloseNewClient}>
            <CloseSVG />
          </div>
        </div>
        <div className={styles.automate_content}>
          <SearchComponent onSearch={handleDataFilter} />
          {dataFilter.map((card) => (
            <CardAutomate
              fullContent={true}
              type={card.type}
              typeContent={typeContent}
              key={card.id}
              name={card.automateName}
              image={card.image}
              contactType={card.contactType}
              isBorders={true}
            />
          ))}
        </div>
        <div className={styles.container_buttons_footer}>
          <button
            onClick={close}
            className={`${styles.buttons_footer} ${styles.button_back}`}
          >
            {" "}
            Atrás
          </button>
          <button className={`${styles.buttons_footer} ${styles.button_add}`}>
            <PlusIcon /> Nueva Automatización
          </button>
        </div>
      </div>
    </>
  );
};

export default Automate;
