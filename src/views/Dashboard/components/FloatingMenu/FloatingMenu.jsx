import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import styles from "./FloatingMenu.module.css";
import FolderModal from "../FolderModal/FolderModal";
import TagModal from "../TagModal/TagModal";
import Automate from "../Automate/Automate";
import { ReactComponent as FolderIcon } from "../../assets/folderIconBW.svg";
import { ReactComponent as TagIcon } from "../../assets/tagIconBW.svg";
import { ReactComponent as WhatsAppIcon } from "../../assets/wsIconBW.svg";
import { ReactComponent as CloudIcon } from "../../assets/uploadIconBW.svg";
import { ReactComponent as CameraIcon } from "../../assets/camIconBW.svg";
import { ReactComponent as NewBill } from "../../assets/newBill.svg";
import { ReactComponent as PlusIcon } from "../../assets/automatizaIconNew.svg";
import { ReactComponent as ChatGPTIcon } from "../../assets/chatGPTIcon.svg";
import { ReactComponent as NewContact } from "../../assets/newContact.svg";
import { ReactComponent as NewAsset } from "../../assets/newAsset.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectLocation from "../SelectLocation/SelectLocation";
import NewTag from "../NewTag/NewTag";

export default function FloatingMenu({
  openModalAutomate,
  isOpen,
  setIsOpen,
  showLocationModal,
  setShowLocationModal,
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
  const videoRef = useRef(null); // Referencia al video para mostrar la vista previa
  const canvasRef = useRef(null); // Referencia al canvas para capturar la imagen
  const [isCameraActive, setIsCameraActive] = useState(false); // Estado para saber si la cámara está activa

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("✅ Acceso a la cámara concedido", stream);
      videoRef.current.srcObject = stream; // Enlazar el stream al elemento video
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
      console.log("Imagen capturada:", imageData); // Aquí puedes hacer algo con la imagen (como subirla, mostrarla, etc.)
    }
  };

  const menuItems = [
    {
      icon: <PlusIcon />,
      text: "Automatiza",
      action: openModalAutomate,
    },
    {
      icon: <CloudIcon />,
      text: "Subir Archivo",
      action: () => {
        setShowUplaodFile(true);
        setIsOpen(false);
      },
    },
    {
      icon: <NewBill />,
      text: "Nueva Factura",
      action: () => {
        navigate("/admin/panel");
        setShowNewBill(true);
        setIsOpen(false);
      },
    },
    {
      icon: <FolderIcon />,
      text: "Nueva Carpeta",
      action: () => {
        setShowLocationModal(true);
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

    // {
    //   icon: <NewAsset />,
    //   text: "Nuevo Activo",
    //   action: () => {
    //     setShowNewProduct(true);
    //     setIsOpen(false);
    //   },
    // },
    // {
    //   icon: <TagIcon />,
    //   text: "Nuevo Tag",
    //   action: () => {
    //     setShowNewTagModal(true);
    //     setIsOpen(false);
    //   },
    // },
    // {
    //   icon: <WhatsAppIcon />,
    //   text: "Abrir Whatsapp",
    //   action: () => window.open("https://wa.me/584243356112", "_blank"), // Reemplaza 1234567890 con el número de WhatsApp deseado
    // },
    // {
    //   icon: <ChatGPTIcon />,
    //   text: "ChatGPT",
    //   action: () => navigate("/admin/chat"), // Cambia a la ruta deseada
    // },

    // {
    //   icon: <CameraIcon />,
    //   text: "Hacer una Foto",
    //   action: () => console.log("Hacer una Foto clicked"),
    // },
  ];
  if (isMobile) {
    menuItems.push({
      icon: <CameraIcon />,
      text: "Hacer una Foto",
      action: handleCameraAccess,
    });
  }
  return (
    <>
      <div className={styles.fabContainer}>
        {/* <div className="fab-wrapper">
          <button
            className={styles.fab}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <Plus className={styles.fabIcon} />
          </button>
        </div> */}

        {isOpen && (
          <div className={styles.overlay} onClick={handleClickOutside}>
            <div className={`${styles.menuContainer} ${styles.menuOpen}`}>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={styles.menuItem}
                  onClick={() => {
                    item.action();
                    // setIsOpen(false);
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
