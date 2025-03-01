import React, { useState } from "react";
import ModalBlackBgTemplate from "../ModalBlackBgTemplate/ModalBlackBgTemplate";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import styles from "./ColorPicker.module.css";
import { SketchPicker } from "react-color";

const ColorPicker = ({
  color,
  setColor,
  presetColors,
  setPresetColors,
  setShowColorPicker,
}) => {
  // Estado temporal para el color seleccionado
  const [tempColor, setTempColor] = useState(color);

  // Función para manejar el cambio de color en tiempo real
  const handleColorChange = (newColor) => {
    const { r, g, b, a } = newColor.rgb; // Extrae los valores RGBA
    setTempColor(`rgba(${r}, ${g}, ${b}, ${a})`); // Guarda el color con opacidad
  };

  // Función para confirmar el color seleccionado
  const confirmColorSelection = () => {
    if (!presetColors.includes(tempColor)) {
      setPresetColors([...presetColors, tempColor]); // Agrega el color a presetColors
    }
    // setShowColorPicker(false);
  };

  return (
    <ModalBlackBgTemplate
      customStyle={{ width: "fit-content" }}
      close={() => setShowColorPicker(false)}
    >
      <div className={styles.NewCategoryContainer}>
        <HeaderCard
          title="Seleccionar Color"
          setState={() => {
            setShowColorPicker(false);
          }}
        >
          <Button action={() => setShowColorPicker(false)} type="white">
            Cancelar
          </Button>
          <Button
            action={() => {
              setShowColorPicker(false);
              setColor(tempColor);
            }}
          >
            Seleccionar
          </Button>
          <Button action={confirmColorSelection}>Aceptar</Button>
        </HeaderCard>

        {/* Cuadro con el color temporal */}
        <div
          className={styles.colorBox}
          style={{ backgroundColor: tempColor }}
        />

        {/* Componente SketchPicker */}
        <div className={styles.colorPickerContainer}>
          <SketchPicker
            color={tempColor} // Usa el estado temporal
            onChange={handleColorChange} // Actualiza tempColor en tiempo real
            presetColors={presetColors} // Colores predeterminados personalizados
            styles={{
              default: {
                picker: {
                  width: "100%", // Hace que el picker ocupe todo el ancho
                  maxHeight: "500px", // Define una altura máxima
                  overflowY: "auto", // Habilita el scroll vertical cuando sea necesario
                  borderRadius: "8px", // Opcional: Bordes redondeados
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Opcional: Sombra
                },
                saturation: {
                  borderRadius: "8px", // Bordes redondeados en el selector de color
                },
                // controls: {
                //   display: "none", // Oculta los controles de opacidad y colores rápidos
                // },
              },
            }}
          />
        </div>
      </div>
    </ModalBlackBgTemplate>
  );
};

export default ColorPicker;
