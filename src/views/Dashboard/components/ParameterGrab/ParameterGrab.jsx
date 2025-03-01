import React from "react";
import styles from "./ParameterGrab.module.css";
import minus from "../../assets/minus.svg";
import Tags from "../Tags/Tags";
import tagIcon from "../../assets/tagIcon.svg";
import { ReactComponent as GrabIcon } from "../../assets/grabIcon.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ParameterGrab = ({
  article,
  parametersEditing,
  toggleEditing,
  handleDeleteParameter,
}) => {
  console.log(article.id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: article.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      key={article.id}
      className={styles.params}
    >
      <div className={styles.articleTitle}>
        <span>
          <button {...attributes} {...listeners}>
            <GrabIcon className={styles.icon} {...attributes} {...listeners} />
          </button>
          {article.name}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p onClick={() => toggleEditing(article.id)}>
            {!parametersEditing[article.id] ? "Guardar" : "Editar"}
          </p>
          {!parametersEditing[article.id] && (
            <img
              src={minus}
              alt="Icon"
              className={styles.delete}
              onClick={() => handleDeleteParameter(article.id)}
            />
          )}
        </div>
      </div>
      <div className={styles.parametersInfoContainer}>
        <div className={styles.column}>
          {!parametersEditing[article.id] && <p>Nombre del Parámetro</p>}
          <input
            type="text"
            placeholder={article.name}
            disabled={parametersEditing[article.id]}
          />
        </div>
        <div className={styles.column}>
          {!parametersEditing[article.id] && <p>Valor del Parámetro</p>}
          <input
            type="text"
            placeholder={article.value}
            disabled={parametersEditing[article.id]}
          />
        </div>
      </div>
    </div>
  );
};

export default ParameterGrab;
