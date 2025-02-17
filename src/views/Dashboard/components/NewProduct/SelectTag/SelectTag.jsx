import React, { useState } from "react";
import styles from "./SelectTag.module.css";
import { ReactComponent as SelectTagOutlineBlack } from "../../../assets/selectTagOutlineBlack.svg";
import Button from "../../Button/Button";
import NewTag from "../../NewTag/NewTag";
import DeleteButton from "../../DeleteButton/DeleteButton";
const SelectTag = ({
  selectedTags,
  tags,
  setShowAddTags,
  setTags,
  setSelectedTags,
}) => {
  const handleDeleteTag = (id) => {
    // setTags((prevTags) => prevTags.filter((tag) => tag.id !== id)); // Eliminar de la lista principal
    setSelectedTags((prevSelected) =>
      prevSelected.filter((tagId) => tagId !== id)
    ); // Eliminar de las seleccionadas
  };
  return (
    <div>
      <header className={styles.headerContainerSelectTag}>
        <p>Etiquetas</p>
        <Button type="white" action={() => setShowAddTags(true)}>
          <SelectTagOutlineBlack />
          Añadir Etiqueta
        </Button>
      </header>
      {selectedTags.length > 0 && (
        <div className={styles.selectedTagsContainer}>
          {tags
            .filter((tag) => selectedTags.includes(tag.id))
            .map((tag) => (
              <div className={styles.tagContainer}>
                <div
                  key={tag.id}
                  className={styles.selectedTag}
                  style={{
                    color: tag.color.includes("FFFF00") ? "black" : "white",
                    background: tag.color.includes("gradient")
                      ? tag.color
                      : undefined,
                    backgroundColor: tag.color.includes("gradient")
                      ? undefined
                      : tag.color,
                  }}
                >
                  {tag.name}
                </div>
                <DeleteButton action={() => handleDeleteTag(tag.id)} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SelectTag;
