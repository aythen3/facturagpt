import React, { useState } from "react";
import styles from "./NewContact.module.css";
import ProfileModalTemplate from "../ProfileModalTemplate/ProfileModalTemplate";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import EditableInput from "../AccountSettings/EditableInput/EditableInput";
import { ParametersLabel } from "../ParametersLabel/ParametersLabel";
import Tags from "../Tags/Tags";
const NewContact = ({ setShowNewContact }) => {
  const [inputsEditing, setInputsEditing] = useState({
    name: false,
    desc: false,
    unitPrice: false,
    retailPrice: false,
  });

  const [newProductModal, setNewProductModal] = useState(false);
  const [selectTypeClient, setSelectTypeClient] = useState(0);
  const closeNewProductModal = () => {
    setNewProductModal(false);
  };

  const tableData = [
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
  ];

  const [editingIndices, setEditingIndices] = useState([]);
  const [clientDataInputs, setClientDataInputs] = useState({
    name: "",
    desc: "",
    unitPrice: "",
    retailPrice: "",
    parameters: [],
  });

  return (
    <div>
      <div className={styles.bg} onClick={() => setShowNewContact(false)}></div>
      <div className={styles.newContactContainer}>
        <ModalTemplate onClick={() => setShowNewContact(false)}>
          <div className={styles.allProductC}>
            <form className={styles.formAllProduct}>
              <EditableInput
                label={"Nombre"}
                nameInput={"nombre"}
                placeholderInput={"Añade un nombre a tu producto"}
                isEditing={inputsEditing.name}
                value={clientDataInputs.name}
                onChange={(e) =>
                  setClientDataInputs({
                    ...clientDataInputs,
                    name: e.target.value,
                  })
                }
                onClick={() =>
                  setInputsEditing((prev) => ({
                    ...prev,
                    name: !prev.name,
                  }))
                }
              >
                <div
                  className={`
                    ${styles.typeClient}
                    ${
                      inputsEditing.name
                        ? styles.typeClientActivate
                        : styles.typeClientDisabled
                    }
                      `}
                >
                  <button
                    className={selectTypeClient == 0 && styles.selected}
                    onClick={() => setSelectTypeClient(0)}
                    type="button"
                    disabled={!inputsEditing.name}
                  >
                    Servicio
                  </button>
                  <button
                    className={selectTypeClient == 1 && styles.selected}
                    onClick={() => setSelectTypeClient(1)}
                    type="button"
                    disabled={!inputsEditing.name}
                  >
                    Producto
                  </button>
                </div>
              </EditableInput>
              <EditableInput
                label={"Descripción"}
                nameInput={"description"}
                placeholderInput={"Especifica las características del artículo"}
                isEditing={inputsEditing.desc}
                value={clientDataInputs.desc}
                type={"textarea"}
                onChange={(e) =>
                  setClientDataInputs({
                    ...clientDataInputs,
                    desc: e.target.value,
                  })
                }
                onClick={() =>
                  setInputsEditing((prev) => ({
                    ...prev,
                    desc: !prev.desc,
                  }))
                }
              />

              <label>
                <p>Proveedor por defecto</p>
                <div>
                  <input type="checkbox" />
                  <span>
                    Marca la casilla si tu eres el dueño de este activo
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Busca y selecciona proveedores"
                />
              </label>

              <EditableInput
                label={"Retail Price (PVP)"}
                nameInput={"retailPrice"}
                placeholderInput={"0.0"}
                // isEditing={inputsEditing.floorPrice}
                isEditing={true}
                value={clientDataInputs.retailPrice}
                options={false}
                onChange={(e) =>
                  setClientDataInputs({
                    ...clientDataInputs,
                    retailPrice: e.target.value,
                  })
                }
                onClick={() =>
                  setInputsEditing((prev) => ({
                    ...prev,
                    retailPrice: !prev.retailPrice,
                  }))
                }
              />

              <label className={styles.impuestos}>
                <div>
                  <p>Impuesto</p>
                </div>
                <button type="button">Añadir impuesto</button>
                <div className={styles.percent}>
                  <span>21.00%</span>
                  <div>Editar</div>
                </div>
              </label>

              <label className={styles.sku}>
                <div>
                  <p># (SKU)</p>
                </div>
                <div className={styles.autogenerated}>
                  <span>Autogenerado</span>
                  <div>Editar</div>
                </div>
                <input type="text" placeholder="#" />
              </label>

              <ParametersLabel
                parameters={clientDataInputs.parameters}
                setClientDataInputs={setClientDataInputs}
                editingIndices={editingIndices}
                setEditingIndices={setEditingIndices}
                addUnit={true}
              />

              <Tags direction={"column"} />
            </form>
          </div>
          <ProfileModalTemplate />
        </ModalTemplate>
      </div>
    </div>
  );
};

export default NewContact;
