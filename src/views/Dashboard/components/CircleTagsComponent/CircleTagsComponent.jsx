import React, { useState } from "react";
import styles from "./CircleTagsComponent.module.css";

const CircleTagsComponent = ({
  color,
  renderAllTags = false,
  selectedTag,
  setSelectedTag,
  noteColor,
}) => {
  // Estado para almacenar la etiqueta seleccionada

  // Lista de tags predefinidos
  const tags = [
    "tagWhite",
    "tagRed",
    "tagOrange",
    "tagYellow",
    "tagGreen",
    "tagBlue",
    "tagViolet",
    "tagPink",
  ];

  // Función para manejar la selección/deselección de etiquetas
  const handleTagClick = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  return (
    <div className={styles.tags}>
      {renderAllTags ? (
        tags.map((tag) => (
          <span
            key={tag}
            className={`${styles.tag} ${styles[tag]}  ${selectedTag === tag ? styles.selected : ""}`}
            onClick={() => handleTagClick(tag)}
            style={{ marginLeft: "0" }}
          ></span>
        ))
      ) : (
        <span className={`${styles.tag} ${styles[color]}`}></span>
      )}
    </div>
  );
};

export default CircleTagsComponent;
