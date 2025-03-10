import { useEffect, useRef, useState } from "react";
import styles from "./FloatingMenu.module.css";
import FolderModal from "../FolderModal/FolderModal";
import TagModal from "../TagModal/TagModal";
import { ReactComponent as FolderIcon } from "../../assets/folderOutline.svg";
import { ReactComponent as CameraIcon } from "../../assets/camIconBW.svg";
import { ReactComponent as NewBill } from "../../assets/penIconOutline.svg";
import { ReactComponent as PlusIcon } from "../../assets/automatizaIconNew.svg";
import { ReactComponent as PaperClipWhite } from "../../assets/paperClipWhite.svg";
import { ReactComponent as NewContact } from "../../assets/bookOutline.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderCard from "../HeaderCard/HeaderCard";

export default function FloatingMenu({
  openModalAutomate,
  isOpen,
  setIsOpen,
  setShowLocationModal,
  setShowCreateFolder,
  showNewTagModal,
  setShowNewTagModal,
  showNewContact,
  setShowNewContact,
  showNewProduct,
  setShowNewProduct,
  setShowNewBill,
  setShowUplaodFile,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const dispach = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (error) {
      console.error("❌ Acceso a la cámara denegado o error:", error);
      alert("No se pudo acceder a la cámara. Por favor, revisa los permisos.");
    }
  };

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageData = canvasRef.current.toDataURL("image/png");
      console.log("Imagen capturada:", imageData);
    }
  };

  const menuItems = [
    {
      icon: <PlusIcon />,
      text: "Automatiza",
      action: openModalAutomate,
    },
    {
      icon: <PaperClipWhite />,
      text: "Subir Documento",
      action: () => {
        setShowLocationModal(true);
        setIsOpen(false);
      },
    },
    {
      icon: <NewBill />,
      text: "Nueva Factura",
      action: () => {
        // navigate("/admin/panel");
        setShowNewBill(true);
        setIsOpen(false);
      },
    },
    {
      icon: <FolderIcon />,
      text: "Nueva Carpeta",
      action: () => {
        setShowCreateFolder(true);
        setIsOpen(false);
      },
    },
    {
      icon: <NewContact />,
      text: "Nuevo Contacto",
      action: () => {
        setShowNewContact(true);
        setIsOpen(false);
      },
    },
  ];
  if (isMobile) {
    menuItems.splice(2, 0, {
      icon: <CameraIcon />,
      text: "Hacer una Foto",
      action: handleCameraAccess,
    });
  }
  return (
    <>
      <div className={styles.fabContainer}>
        {isOpen && (
          <div className={styles.overlay} onClick={handleClickOutside}>
            <div className={`${styles.menuContainer} ${styles.menuOpen}`}>
              {isMobile && (
                <HeaderCard
                  setState={handleClickOutside}
                  headerStyle={{ padding: "0 6px", background: "transparent" }}
                />
              )}
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={styles.menuItem}
                  onClick={() => {
                    item.action();
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
      {isCameraActive && (
        <>
          <video
            ref={videoRef}
            autoPlay
            width="100%"
            height="auto"
            style={{ border: "1px solid #ccc", marginTop: "10px" }}
          ></video>
          <button onClick={handleCapture} style={{ marginTop: "10px" }}>
            Capturar Foto
          </button>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          ></canvas>
        </>
      )}
      <FolderModal isOpen={activeModal === "folder"} onClose={closeModal} />

      <TagModal
        isOpen={activeModal === "tag"}
        onClose={closeModal}
        onSave={handleSave}
      />
    </>
  );
}
