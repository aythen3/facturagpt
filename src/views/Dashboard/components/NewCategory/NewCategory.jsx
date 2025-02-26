import React from "react";
import ModalBlackBgTemplate from "../ModalBlackBgTemplate/ModalBlackBgTemplate";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import styles from "./NewCategory.module.css";

const NewCategory = ({ setShowNewCategory }) => {
  const close = () => {
    setShowNewCategory(false);
  };
  return (
    <div>
      <ModalBlackBgTemplate close={close}>
        <HeaderCard
          title={"Seleccionar Categoría"}
          setState={setShowNewCategory}
        >
          <Button type="white">Cancel</Button>
          <Button>Seleccionar</Button>
          <Button>Guardar</Button>
        </HeaderCard>
        <div className={styles.NewCategoryContainer}>
          <div>
            <p>Concepto del documento</p>
            <input
              type="text"
              placeholder="Acuerdos, Contratos, Imágenes de .."
            />
          </div>
        </div>
      </ModalBlackBgTemplate>
    </div>
  );
};

export default NewCategory;
