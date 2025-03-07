import React from "react";
import styles from "./ModalTemplate.module.css";
import Button from "../Button/Button";
import { ReactComponent as ArrowDown } from "../../assets/ArrowLeftWhite.svg";
import { ReactComponent as RedTrash } from "../../assets/redTrash.svg";
import { useNavigate } from "react-router-dom";
const ModalTemplate = ({
  children,
  onClick,
  actionSave,
  text,
  isAnimating,
  newContact,
  selectedContact,
  typeTextHeader = "Nuevo",
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.bg} onClick={() => onClick()}></div>
      <div
        className={`${styles.modalTemplate}  ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <div className={styles.modalTemplateHeader}>
          <div className={styles.modalTemplateInfo}>
            <div className={styles.iconContainer} onClick={() => onClick()}>
              <ArrowDown className={styles.icon} />
            </div>
            <h3>
              {typeTextHeader} {text}
            </h3>
          </div>
          <div className={styles.buttonContainer}>
            {/* {!newContact && ( */}
            {!(newContact || text === "Activo") && (
              <>
                <Button
                  type={"white"}
                  action={() => navigate(`/admin/clients/${selectedContact}`)}
                >
                  Ver Transacciones
                </Button>
                <Button>Nueva Factura</Button>
              </>
            )}

            <Button action={actionSave}>
              {newContact ? "Guardar" : "Actualizar"}
            </Button>
          </div>
        </div>
        <div className={styles.contentContainer}>{children}</div>
        <div>
          {!newContact && (
            <div className={styles.deleteContact}>
              <RedTrash className={styles.icon} /> Eliminar {text}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalTemplate;
