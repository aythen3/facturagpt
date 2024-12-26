import { X } from "lucide-react";
import styles from "./ConfirmationModal.module.css";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Discard Changes",
  cancelText = "Cancel",
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelButton}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
