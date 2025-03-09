import React, { useState } from "react";
import styles from "./AssetLine.module.css";
import minus from "../../assets/minus.svg";
import Tags from "../Tags/Tags";
import tagIcon from "../../assets/tagIcon.svg";
import { ReactComponent as GrabIcon } from "../../assets/grabIcon.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "../Button/Button";
import { resizeImage } from "../../../../utils/resizeImage";
import ChangeImage from "../ChangeImage/ChangeImage";
const AssetLine = ({
  article,
  articlesEditing,
  editBaseImport,
  toggleArticleEditing,
  handleDeleteActivo,
  setShowTaxModal,
  setShowDiscountModal,
  handleEditBaseImport,
  handleInputChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: article.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const resizedImage = await resizeImage(file);
      const imageUrl = URL.createObjectURL(resizedImage); // Convertimos la imagen redimensionada en una URL

      setImageAsset(imageUrl);
      console.log("Imagen redimensionada:", resizedImage);

      // Puedes subirla al servidor o mostrarla en la app
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.AssetLine}>
      <div className={styles.articleTitle}>
        <span></span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button type="button" action={() => toggleArticleEditing(article.id)}>
            {articlesEditing[article.id] ? "Editar" : "Guardar"}
          </Button>
          <img
            src={minus}
            alt="Icon"
            className={styles.delete}
            onClick={() => handleDeleteActivo(article.id)}
          />
        </div>
      </div>
      <div className={styles.articleBody}>
        <div className={styles.grab}>
          <button {...attributes} {...listeners}>
            <GrabIcon className={styles.icon} {...attributes} {...listeners} />
          </button>
          <ChangeImage />
        </div>
        <div className={styles.info}>
          <div className={styles.test}>
            <div className={styles.leftInfo}>
              <input
                value={article.name}
                disabled={articlesEditing[article.id]}
                onChange={(e) =>
                  handleInputChange(article.id, "name", e.target.value)
                }
                placeholder="Artículo"
              ></input>
              <textarea
                className={styles.light}
                value={article.description}
                disabled={articlesEditing[article.id]}
                onChange={(e) =>
                  handleInputChange(article.id, "description", e.target.value)
                }
                placeholder="Descripción"
              ></textarea>
              {/* <Tags onTagClick={(tag) => handleAddTag(article.id, tag)} />
              <button className={styles.addTag}>
                <img src={tagIcon} alt="Icon" />
                Añadir Etiqueta
              </button> */}
            </div>
            <div className={styles.rightInfo}>
              <div>
                <p>Recommended retail price (RRP)</p>
                <p>90283912,38912 EUR</p>
              </div>
              <div>
                <p>Floor Price</p>
                <p>90283912,38912 EUR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.articleTaxs}>
        <div className={styles.column}>
          <p>Cant.</p>
          <input
            type="text"
            placeholder={article.quantity}
            disabled={articlesEditing[article.id]}
          />
        </div>
        <div className={styles.column}>
          <p>Base importe</p>
          <div className={styles.unitPrice}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <input
                type="text"
                placeholder={article.baseImport}
                disabled={!editBaseImport[article.id]}
              />
              {!articlesEditing[article.id] && (
                <Button
                  type="button"
                  action={() => handleEditBaseImport(article.id)}
                >
                  {editBaseImport[article.id] ? "Guardar" : "Editar"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.column}>
          <p>Retención</p>
          <button
            className={styles.addTax}
            disabled={articlesEditing[article.id]}
          >
            Añadir Retención
          </button>
        </div>
        <div className={styles.column}>
          <p>Impuesto</p>
          <button
            className={styles.addTax}
            disabled={articlesEditing[article.id]}
            onClick={() => setShowTaxModal(true)}
          >
            Añadir Impuesto
          </button>
        </div>
        <div className={styles.column}>
          <p>Descuento</p>
          <button
            className={styles.addTax}
            disabled={articlesEditing[article.id]}
            onClick={() => setShowDiscountModal(true)}
          >
            Añadir Descuento
          </button>
        </div>

        <div className={styles.column}>
          <p>Total (PVP)</p>
          <div className={styles.unitPrice}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <input
                type="text"
                placeholder={article.baseImport}
                disabled={!editBaseImport[article.id]}
              />
              {!articlesEditing[article.id] && (
                <Button
                  type="button"
                  action={() => handleEditBaseImport(article.id)}
                >
                  {editBaseImport[article.id] ? "Guardar" : "Editar"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetLine;
