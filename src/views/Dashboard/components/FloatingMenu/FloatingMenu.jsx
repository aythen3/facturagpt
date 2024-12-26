"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./FloatingMenu.module.css";
import { ReactComponent as FolderIcon } from "../../assets/folder-2.svg";
import { ReactComponent as TagIcon } from "../../assets/etiqueta.svg";
import { ReactComponent as CloudIcon } from "../../assets/cloud-icon.svg";
import { ReactComponent as CameraIcon } from "../../assets/camera.svg";
import { ReactComponent as FacturaIcon } from "../../assets/factura.svg";

const menuItems = [
  {
    icon: <FolderIcon />,
    text: "Nueva Carpeta",
    onClick: () => console.log("Nueva Carpeta clicked"),
  },
  {
    icon: <TagIcon />,
    text: "Nueva Etiqueta",
    onClick: () => console.log("Nueva Etiqueta clicked"),
  },
  {
    icon: <CloudIcon />,
    text: "Subir Archivo",
    onClick: () => console.log("Subir Archivo clicked"),
  },
  {
    icon: <CameraIcon />,
    text: "Hacer una Foto",
    onClick: () => console.log("Hacer una Foto clicked"),
  },
  {
    icon: <FacturaIcon />,
    text: "Nueva Factura",
    onClick: () => console.log("Nueva Factura clicked"),
  },
];

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
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
                  item.onClick();
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
  );
}
