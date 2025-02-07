import React, { useState } from "react";
import styles from "./NewProduct.module.css";
import PayMethod from "../PayMethod/PayMethod";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import EditableInput from "../../components/AccountSettings/EditableInput/EditableInput";
import ProfileModalTemplate from "../ProfileModalTemplate/ProfileModalTemplate";

const CheckedInput = ({ text, title }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.CheckedInput}>
      {title && <p>{title}</p>}
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <span>{text}</span>
      </div>

      {/* Solo se muestra el input si el checkbox está marcado */}
      {isChecked && <input type="text" placeholder="Ingrese un valor" />}
    </div>
  );
};

const NewProduct = ({ setShowNewProduct }) => {
  const [sectionSelected, setSectionSelected] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userData, setUserData] = useState();
  const handleChange = ({ name, newValue }) => {
    console.log(`Setting ${name} to ${newValue}`);
    const updatedData = { ...userData, [name]: newValue };
    setUserData(updatedData);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={() => setShowNewProduct(false)}></div>
      <div className={styles.newProductContainer}>
        <ModalTemplate text="contacto" onClick={() => setShowNewProduct(false)}>
          <div
            className={`${styles.newClientContainer} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
          >
            <form>
              <div className={styles.typeClient}>
                <div className={styles.row}>
                  <p>Nombre</p>
                  <div className={styles.button}>Editar</div>
                </div>
                <div className={styles.row}>
                  {" "}
                  <input
                    type="text"
                    className={styles.inputName}
                    placeholder="Añade un nombre a tu producto"
                  />
                  <div className={styles.btnSectionsSelector}>
                    <button
                      type="button"
                      className={`${sectionSelected === 0 ? styles.sectionSelect : ""}`}
                      onClick={() => setSectionSelected(0)}
                    >
                      Servicio
                    </button>
                    <button
                      type="button"
                      className={`${sectionSelected === 1 ? styles.sectionSelect : ""}`}
                      onClick={() => setSectionSelected(1)}
                    >
                      Producto
                    </button>
                  </div>
                </div>
              </div>

              <EditableInput
                label={"Nombre"}
                value={userData?.nombre}
                name="nombre"
                onSave={handleChange}
                placeholder="Nombre"
                isTextarea={true}
              />
              <div className={styles.infoContact}>
                <div className={styles.row}>
                  <CheckedInput
                    text={"Marca la casilla si tu eres el dueño de este activo"}
                    title={"Proveedor por defecto"}
                  />
                  <CheckedInput
                    text={
                      "Marca la casilla si quieres añadir el coste de aquisición del activo "
                    }
                    title={"Coste de Producción/Adquisición"}
                  />
                </div>
              </div>
            </form>
          </div>
          <ProfileModalTemplate />
        </ModalTemplate>
      </div>
    </div>
  );
};

export default NewProduct;
