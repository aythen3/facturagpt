import React, { useState } from "react";
import styles from "./cardAutomate.module.css";
import CircleDeleteSVG from "../../svgs/CircleDeleteSVG";
import ConfirmationPopup from "../../../ConfirmationPopup/ConfirmationPopup";
import { deleteAutomation } from "../../../../../../actions/automations";
import { useDispatch } from "react-redux";

const CardAutomate = ({
  name,
  image,
  available = true,
  contactType,
  typeContent,
  type,
  fullContent,
  isActive,
  onCardClick,
  last,
  fromPanel,
  automationData,
}) => {
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handleDelete = async () => {
    console.log("Deleting automation...", automationData);
    const res = await dispatch(
      deleteAutomation({
        automationId: automationData.id,
        userId: automationData.userId,
      })
    );
    return res;
  };
  return (
    <>
      <div
        onClick={() => available && typeContent(type, automationData)}
        className={`${styles.content} 
        ${fromPanel && styles.content_panel} 
        ${isActive ? styles.content_active : ""}
        ${!available ? styles.content_disabled : ""}
        `}
        style={{ borderBottom: !last && !fromPanel && "1px solid #e2f4f0" }}
      >
        <div className={styles.data_contain}>
          <div>
            <img className={styles.image} src={image} alt="logo" />
          </div>
          <div>
            <p
              style={{ marginBottom: !fromPanel && "4px" }}
              className={styles.automate_name}
            >
              {name}
            </p>
            {!fromPanel && fullContent && (
              <p className={styles.contact}>{contactType}</p>
            )}
          </div>
        </div>
        {fullContent && (
          <div className={styles.buttons_contains}>
            <button
              onClick={() => typeContent(type, automationData)}
              className={styles.button_edit}
            >
              Editar
            </button>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowDeletePopup(true);
              }}
            >
              <CircleDeleteSVG />
            </div>
          </div>
        )}
      </div>
      {showDeletePopup && (
        <ConfirmationPopup
          onClose={() => setShowDeletePopup(false)}
          title="Eliminar Automatización"
          message="¿Estás seguro de que deseas eliminar esta automatización?"
          handleAccept={handleDelete}
        />
      )}
    </>
  );
};

export default CardAutomate;
