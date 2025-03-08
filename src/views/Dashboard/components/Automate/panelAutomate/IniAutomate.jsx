import { ReactComponent as IconStar } from "./assets/star.svg";
import { ReactComponent as IconArrowConnect } from "./assets/arrow_connect.svg";
import { ReactComponent as GrayCheck } from "./assets/grayCheck.svg";
import { ReactComponent as IconArrow } from "./assets/arrow.svg";
import { ReactComponent as IconDrive } from "./assets/icon_drive.svg";
import { ReactComponent as IconDropbox } from "./assets/icon_dropbox.svg";
import { ReactComponent as IconGmail } from "./assets/icon_gmail.svg";
import { ReactComponent as IconLock } from "./assets/icon_lock.svg";
import { ReactComponent as IconOneDrive } from "./assets/icon_onedrive.svg";
import { ReactComponent as IconOutlook } from "./assets/icon_outlook.svg";
import { ReactComponent as IconSharePoint } from "./assets/icon_sharepoint.svg";
import { ReactComponent as IconSuccess } from "./assets/success.svg";

import styles from "./IniAutomate.module.css";

const PanelIniAutomate = ({ typeContent }) => {
  const automates = [
    {
      icon: <IconGmail />,
      name: "Sube tus Documentos de Gmail",
      description:
        "Conéctate y sube documentos adjuntos con filtros avanzados.",
      available: true,
      button: true,
      key: "Gmail",
    },
    {
      icon: <IconOutlook />,
      name: "Sube tus Documentos de Oulook",
      description: "Sincroniza tus correos y extrae archivos automáticamente.",
      available: false,
      button: true,
      key: "Outlook",
    },
    {
      icon: <IconDrive />,
      name: "Sube tus Documentos de Google Drive",
      description: "Accede a tu nube y filtra documentos de forma inteligente.",
      available: false,
      button: true,
      key: "Gmail",
    },
    {
      icon: <IconSharePoint />,
      name: "Sube tus Documentos de Microsoft Sharepoint",
      description: "Importa y organiza archivos con herramientas avanzadas.",
      available: false,
      button: true,
      key: "Gmail",
    },
    {
      icon: <IconOneDrive />,
      name: "Sube tus Documentos de Microsoft One Drive",
      description: "Conéctate y gestiona documentos con mayor precisión.",
      available: false,
      button: true,
      key: "Gmail",
    },
    {
      icon: <IconDropbox />,
      name: "Sube tus Documentos de Dropbox",
      description: "Sincroniza y filtra facturas y otros archivos fácilmente.",
      available: false,
      button: true,
      key: "Gmail",
    },
  ];

  return (
    <div className={styles.container}>
      {/* <div className={styles.description}>
        <b>
          Selecciona dónde tienes tus documentos
        </b>
        <p>
          Asegúrate de que FacturaGPT tenga acceso a los documentos que necesitas procesar.
        </p>
      </div> */}
      <ul className={styles.automates}>
        {automates.map((automate, index) => (
          <li
            className={automate.available ? styles.available : styles.disabled}
            key={index}
          >
            <div className={styles.top}>
              <div className={styles.header}>
                <div className={styles.icon}>
                  {automate.icon}
                  <div className={styles.icon_path}>
                    <IconStar />
                  </div>
                </div>
                <div className={styles.info}>
                  <b>{automate.name}</b>
                  <p>{automate.description}</p>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.buttons}>
                <button
                  className={styles.button_connect}
                  onClick={() => typeContent("Gmail")}
                >
                  Conectar
                  <IconArrowConnect />
                </button>
                <button
                  className={`${styles.button_connect} ${styles.button_added}`}
                >
                  Añadido <GrayCheck />
                </button>
                {/* <button className={styles.button_added}>
                  Añadido
                  <IconSuccess />
                </button> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelIniAutomate;
