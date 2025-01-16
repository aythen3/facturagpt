import { X } from "lucide-react";
import styles from "./Filters.module.css";
import graySearch from "../../assets/searchGray.svg";
import { useEffect, useState } from "react";

// Importar los íconos de redes sociales
import gmailIcon from "../../assets/gmail-icon.svg";
import outlook from "../../assets/outlook-icon.svg";
import drive from "../../assets/drive-icon.svg";
import onedrive from "../../assets/onedrive-icon.svg";
import dropbox from "../../assets/dropbox-icon.svg";
import whatsapp from "../../assets/whatsapp-icon-green.svg";

const documentTypes = [
  "Factura",
  "Factura de impuestos",
  "Recibo",
  "Recibo de la venta",
  "Recibo de efectivo",
  "Oferta",
  "Cotización",
  "Abono",
  "Pedido",
  "Nota de Entrega",
];

const SOCIAL_NETWORKS = [
  {
    id: "gmail",
    name: "Gmail",
    icon: gmailIcon,
  },
  {
    id: "outlook",
    name: "Outlook",
    icon: outlook,
  },
  {
    id: "drive",
    name: "Drive",
    icon: drive,
  },
  {
    id: "onedrive",
    name: "One Drive",
    icon: onedrive,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    icon: dropbox,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: whatsapp,
  },
];

export default function Filter({ isOpen, onClose, setIsFilterOpen }) {
  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        handleCloseNewClient();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300);
  };

  const handleNetworkChange = (network) => {
    setSelectedNetworks((prev) => {
      if (prev.includes(network)) {
        return prev.filter((n) => n !== network);
      } else {
        return [...prev, network];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedNetworks(SOCIAL_NETWORKS.map((network) => network.id));
    } else {
      setSelectedNetworks([]);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleCloseNewClient}></div>
      <div
        className={`${styles.modal} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <div className={styles.header}>
          <h2>Filtrar</h2>
          <button onClick={handleCloseNewClient} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.filterSection}>
            <label>Search by document title</label>
            <input type="text" placeholder="Text" className={styles.input} />
          </div>

          <div className={styles.filterSection}>
            <label>Search by email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className={styles.input}
            />
          </div>

          <div className={styles.filterSection}>
            <label>Search by category</label>
            <select className={styles.select}>
              {documentTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterSection}>
            <label>Search by type</label>
            <span className={styles.checktypes}>
              <input type="checkbox" />
              Permitir todos los tipos de archivo
            </span>
            <select className={styles.select}>
              <option>PDF</option>
              <option>PNG</option>
              <option>JPG</option>
              <option>XLM</option>
              <option>JSON</option>
              <option>HTML</option>
            </select>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.searchAmount}>
              <label>Search by amount</label>
              <select className={styles.currencySelect}>
                <option>EUR</option>
              </select>
            </div>
            <div className={styles.amountContainer}>
              <div className={styles.amountInput}>
                <span>$</span>
                <input type="text" placeholder="Min" />
              </div>
              <span>-</span>
              <div className={styles.amountInput}>
                <span>$</span>
                <input type="text" placeholder="Max" />
              </div>
            </div>
          </div>

          <div className={styles.filterSection}>
            <label>Search by Tag</label>
            <div className={styles.searchContainer}>
              <img src={graySearch} alt="search icon" />
              <input
                type="text"
                placeholder="Search tag"
                className={styles.input}
              />
            </div>
            <div className={styles.tags}>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#222222" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#0B06FF" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#FF0000" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#12A27F" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#7329A5" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#7086FD" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#FF8C00" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#16C098" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#C075EE" }}
              >
                Etiqueta
              </span>
              <span
                className={styles.tag}
                style={{ backgroundColor: "#EEFF00", color: "#333333" }}
              >
                Etiqueta
              </span>
            </div>
          </div>
          <div className={styles.filterSection}>
            <p className={styles.rrss}>Busqueda por entrada/salida</p>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.socialNetworks}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="allNetworks"
                  checked={selectedNetworks.length === SOCIAL_NETWORKS.length}
                  onChange={handleSelectAll}
                />
                <label htmlFor="allNetworks">Seleccionar todas las redes</label>
              </div>

              <div className={styles.networksGrid}>
                {SOCIAL_NETWORKS.map((network) => (
                  <div key={network.id} className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id={network.id}
                      checked={selectedNetworks.includes(network.id)}
                      onChange={() => handleNetworkChange(network.id)}
                    />
                    <img
                      src={network.icon}
                      alt={network.name}
                      className={styles.networkIcon}
                    />
                    <label htmlFor={network.id}>{network.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
