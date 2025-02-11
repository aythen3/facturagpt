import React, { useState } from "react";
import styles from "./NewTag.module.css";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";

const colorOptions = [
  "#222222", // Negro
  "#7329a5", // Violeta
  "#c075ee", // Lila
  "#0b06ff", // Azul
  "#7086fd", // Azul claro
  "#ff0000", // Rojo
  "#ff8c00", // Naranja
  "#12a27f", // Verde
  "#16c098", // Verde claro
  "#FFFF00", // Amarillo
  "conic-gradient(#ff9e3d 13%,#eeff00 34%,#7bff79 50%,#1400cc 68%,#b30095 85%,#990003 100%)",
];

const NewTag = ({
  setShowNewTagModal,
  setSelectedTags,
  selectedTags,
  setTags,
  tags,
  setShowAddTags,
}) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [tagName, setTagName] = useState("");
  // Lista de etiquetas

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddTag = () => {
    if (!tagName.trim() || !selectedColor) {
      alert("Selecciona un color y escribe un nombre para la etiqueta.");
      return;
    }

    const newTag = { id: Date.now(), name: tagName, color: selectedColor };
    setTags([...tags, newTag]); // Agregar nueva etiqueta a la lista
    setTagName(""); // Limpiar input
    setSelectedColor(""); // Reiniciar color seleccionado
  };

  const handleSelectTag = (id) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };

  const handleDeleteTag = (id) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id)); // Eliminar de la lista principal
    setSelectedTags((prevSelected) =>
      prevSelected.filter((tagId) => tagId !== id)
    ); // Eliminar de las seleccionadas
  };

  return (
    <div className={styles.hola}>
      <div
        className={styles.bg}
        onClick={() => setShowNewTagModal(false)}
      ></div>
      <div className={styles.newTagContainer}>
        <HeaderCard
          title={"Nueva etiqueta"}
          setShowNewTagModal={setShowNewTagModal}
          setState={setShowNewTagModal}
        >
          <Button type="white">Cancelar</Button>
          <Button>Seleccionar</Button>
          <Button>Guardar</Button>
        </HeaderCard>

        <div className={styles.newTagBody}>
          <span>Nombre de la etiqueta</span>
          <input
            type="text"
            placeholder="Marketing, Operaciones, Suministros"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />

          <div className={styles.circleContainer}>
            {colorOptions.map((color) => (
              <div
                key={color}
                className={styles.circle}
                style={{
                  background: color.includes("gradient") ? color : undefined,
                  backgroundColor: color.includes("gradient")
                    ? undefined
                    : color,
                  border:
                    selectedColor === color
                      ? "4px solid #C3C3C3"
                      : "4px solid white",
                }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>

          <div className={styles.button} onClick={handleAddTag}>
            Nueva Etiqueta
          </div>

          {/* Lista de etiquetas con checkbox y botón de eliminar */}
          <div className={styles.tagsContainer}>
            {tags.map((tag) => (
              <div key={tag.id} className={styles.tagWrapper}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleSelectTag(tag.id)}
                />
                <div
                  className={styles.tag}
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

          {/* Etiquetas seleccionadas */}
          {/* {selectedTags.length > 0 && (
            <div className={styles.selectedTagsContainer}>
              <h3>Etiquetas seleccionadas:</h3>
              {tags
                .filter((tag) => selectedTags.includes(tag.id))
                .map((tag) => (
                  <div
                    key={tag.id}
                    className={styles.selectedTag}
                    style={{
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
                ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default NewTag;
