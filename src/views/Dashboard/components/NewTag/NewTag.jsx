import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "./NewTag.module.css";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";
import ColorPicker from "../ColorPicker/ColorPicker";

const colorOptions = [
  "#222222",
  "#7329a5",
  "#c075ee",
  "#0b06ff",
  "#7086fd",
  "#ff0000",
  "#ff8c00",
  "#12a27f",
  "#16c098",
  "#FFFF00",
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
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPk, setColor] = useState("");
  const [presetColors, setPresetColors] = useState([]);

  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleAddTag = useCallback(() => {
    if (!tagName.trim() || !selectedColor) {
      alert("Selecciona un color y escribe un nombre para la etiqueta.");
      return;
    }
    const newTag = { id: Date.now(), name: tagName, color: selectedColor };
    setTags((prevTags) => [...prevTags, newTag]);
    setTagName("");
    setSelectedColor("");
  }, [tagName, selectedColor, setTags]);

  const handleSelectTag = useCallback(
    (id) => {
      setSelectedTags((prev) =>
        prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
      );
    },
    [setSelectedTags]
  );

  const handleDeleteTag = useCallback(
    (id) => {
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
      setSelectedTags((prevSelected) =>
        prevSelected.filter((tagId) => tagId !== id)
      );
    },
    [setTags, setSelectedTags]
  );
  useEffect(() => {
    handleColorSelect(colorPk);
    console.log(selectedColor);
  }, [colorPk]);

  console.log(colorPk);
  return (
    <div className={styles.tagsContent}>
      <div
        className={styles.bg}
        onClick={() => setShowNewTagModal(false)}
      ></div>

      <div className={styles.newTagContainer}>
        <HeaderCard title="Nueva etiqueta" setState={setShowNewTagModal}>
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

          {/* Selector de colores */}
          <div className={styles.circleContainer}>
            {colorOptions.map((color) => {
              const isGradient = color.includes("gradient");
              const isSelected =
                selectedColor === color ||
                (selectedColor === colorPk && isGradient);

              return (
                <div
                  key={color}
                  className={styles.circle}
                  style={{
                    background: isGradient ? colorPk || color : undefined,
                    backgroundColor: isGradient ? undefined : color,
                    border: isSelected
                      ? "4px solid #C3C3C3"
                      : "4px solid white",
                  }}
                  onClick={() => {
                    if (isGradient) {
                      setShowColorPicker(true);
                      handleColorSelect(colorPk);
                    } else {
                      handleColorSelect(color);
                    }
                  }}
                />
              );
            })}
          </div>

          <div className={styles.button} onClick={handleAddTag}>
            Nueva Etiqueta
          </div>

          {/* Lista de etiquetas */}
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
                      ? colorPk || tag.color
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
        </div>
      </div>

      {showColorPicker && (
        <ColorPicker
          setShowColorPicker={setShowColorPicker}
          color={colorPk}
          setColor={setColor}
          presetColors={presetColors}
          setPresetColors={setPresetColors}
        />
      )}
    </div>
  );
};

export default NewTag;
