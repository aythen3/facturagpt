import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./FloatingMenu.module.css";
import FolderModal from "../FolderModal/FolderModal";
import TagModal from "../TagModal/TagModal";
import Automate from "../Automate/Automate";
import { ReactComponent as FolderIcon } from "../../assets/folder-2.svg";
import { ReactComponent as TagIcon } from "../../assets/etiqueta.svg";
import { ReactComponent as CloudIcon } from "../../assets/cloud-icon.svg";
import { ReactComponent as CameraIcon } from "../../assets/camera.svg";
import { ReactComponent as FacturaIcon } from "../../assets/factura.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { useDispatch } from "react-redux";

export default function FloatingMenu({ openModalAutomate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const dispach = useDispatch();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const closeModal = () => setActiveModal(null);

  const handleSave = (color) => {
    console.log("Selected color:", color);
    closeModal();
  };

  const menuItems = [
    {
      icon: <FolderIcon />,
      text: "Nueva Carpeta",
      action: () => setActiveModal("folder"),
    },
    {
      icon: <TagIcon />,
      text: "Nueva Etiqueta",
      action: () => setActiveModal("tag"),
    },
    {
      icon: <CloudIcon />,
      text: "Subir Archivo",
      action: () => console.log("Subir Archivo clicked"),
    },
    {
      icon: <CameraIcon />,
      text: "Hacer una Foto",
      action: () => console.log("Hacer una Foto clicked"),
    },
    {
      icon: <FacturaIcon />,
      text: "Nueva Factura",
      action: () => console.log("Nueva Factura clicked"),
    },
    {
      icon: <PlusIcon />,
      text: "Automatiza",
      action: openModalAutomate,
    },
  ];

  return (
    <>
      <div className={styles.fabContainer}>
        <div className="fab-wrapper">
          <button
            className={styles.fab}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <Plus className={styles.fabIcon} />
          </button>
        </div>

        {isOpen && (
          <div className={styles.overlay} onClick={handleClickOutside}>
            <div className={`${styles.menuContainer} ${styles.menuOpen}`}>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={styles.menuItem}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuText}>{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <FolderModal isOpen={activeModal === "folder"} onClose={closeModal} />

      <TagModal
        isOpen={activeModal === "tag"}
        onClose={closeModal}
        onSave={handleSave}
      />
    </>
  );
}
