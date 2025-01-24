import React, { useState } from "react";
import styles from "./AddAdminModal.module.css";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { createAccount } from "../../../../actions/emailManager";
import { useDispatch } from "react-redux";

const AddAdminModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("dahsboardLogin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Add validation logic here if needed
  };

  const handleAddAdmin = async () => {
    setIsLoading(true);
    if (email.length === 0 || password.length === 0 || nombre.length === 0) {
      setError("Todos los campos son obligatorios");
      setIsLoading(false);
      return;
    }
    try {
      await dispatch(createAccount({ nombre, email, password, role: "admin" }));
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      onClick={handleClose}
      className={`${styles.modalContainer} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.upgradePlanContainer} ${isClosing ? styles.scaleDown : ""}`}
      >
        <div className={styles.header}>
          <h2>Agregar Administrador</h2>
          <div className={styles.closeButton} onClick={handleClose}>
            <MdClose size={20} />
          </div>
        </div>
        <label className={styles.label}>
          Nombre Completo*
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Name"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          {t("label1")}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={t("placeholder1")}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          {t("label2")}
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder={t("placeholder2")}
            className={styles.input}
          />
          <span className={styles.passwordRequirements}>
            {t("conditionPassword")}
          </span>
        </label>
        <div
          onClick={handleAddAdmin}
          className={`${styles.signInButton} ${isLoading ? styles.loading : ""}`}
        >
          {isLoading ? "Creando Admin..." : "Crear Admin"}
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
