import React, { useState } from "react";
import Button from "../../Button/Button";
import DeleteButton from "../../DeleteButton/DeleteButton";
import styles from "./AddTemplate.module.css";
import logo from "../../../assets/FacturaLogoIconGreen.svg";
const AddTemplate = ({ textButton, setState, state = [] }) => {
  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      price: "",
      sku: "",
      tax: "",
      isEditing: false,
    };
    setState([...state, newItem]);
  };

  const handleDelete = (id) => {
    setState(state.filter((item) => item.id !== id));
  };

  const handleEditToggle = (id) => {
    setState(
      state.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleChange = (id, field, value) => {
    setState(
      state.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className={styles.AddTemplateContainer}>
      <Button type="white" action={handleAdd} headerStyle={{ width: "100%" }}>
        Añadir {textButton}
      </Button>
      <div className={styles.tableAddTemplate}>
        <table>
          <thead>
            <tr>
              <th>Nombre o Descripción</th>
              <th>Previo Unitario (PVP)</th>
              <th>SKU</th>
              <th>Impuesto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className={styles.bodyAddTemplate}>
            {state.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.nameArticle}>
                    <img src={logo} alt="" />
                    <div>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleChange(item.id, "name", e.target.value)
                        }
                        disabled={!item.isEditing}
                        placeholder="Artículo 1"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleChange(item.id, "description", e.target.value)
                        }
                        disabled={!item.isEditing}
                        placeholder="descripcion"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(item.id, "price", e.target.value)
                    }
                    disabled={!item.isEditing}
                    placeholder="0,00 EUR"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.sku}
                    onChange={(e) =>
                      handleChange(item.id, "sku", e.target.value)
                    }
                    disabled={!item.isEditing}
                    placeholder="00000001"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.tax}
                    onChange={(e) =>
                      handleChange(item.id, "tax", e.target.value)
                    }
                    disabled={!item.isEditing}
                    placeholder="21.00%"
                  />
                </td>
                <td>
                  <div className={styles.optionsContainer}>
                    <div
                      onClick={() => handleEditToggle(item.id)}
                      className={styles.button}
                    >
                      {item.isEditing ? "Guardar" : "Editar"}
                    </div>
                    <DeleteButton action={() => handleDelete(item.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddTemplate;
