
import { ReactComponent as IconStar } from './assets/star.svg'
import { ReactComponent as IconArrowConnect } from './assets/arrow_connect.svg'
import { ReactComponent as IconArrow } from './assets/arrow.svg'
import { ReactComponent as IconDrive } from './assets/icon_drive.svg'
import { ReactComponent as IconDropbox } from './assets/icon_dropbox.svg'
import { ReactComponent as IconGmail } from './assets/icon_gmail.svg'
import { ReactComponent as IconLock } from './assets/icon_lock.svg'
import { ReactComponent as IconOneDrive } from './assets/icon_onedrive.svg'
import { ReactComponent as IconOutlook } from './assets/icon_outlook.svg'
import { ReactComponent as IconSharePoint } from './assets/icon_sharepoint.svg'
import { ReactComponent as IconSuccess } from './assets/success.svg'



import styles from './IniAutomate.module.css'

const PanelIniAutomate = () => {

  const automates = [{
    icon: <IconGmail />,
    name: 'Sube tus Documentos de Gmail',
    description: 'lorem ipsum',
    button: true
  },{
    icon: <IconOutlook />,
    name: 'Sube tus Documentos de Oulook',
    description: 'lorem ipsum',
    button: true
  }, {
    icon: <IconDrive />,
    name: 'Sube tus Documentos de Google Drive',
    description: 'lorem ipsum',
    button: true
  }, {
    icon: <IconSharePoint />,
    name: 'Sube tus Documentos de Microsoft Sharepoint',
    description: 'lorem ipsum',
    button: true
  }, {
    icon: <IconOneDrive />,
    name: 'Sube tus Documentos de Microsoft One Drive',
    description: 'lorem ipsum',
    button: true
  }, {
    icon: <IconDropbox />,
    name: 'Sube tus Documentos de Dropbox',
    description: 'lorem ipsum',
    button: true
  }]

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <b>
          Selecciona dónde tienes tus documentos
        </b>
        <p>
          Asegúrate de que FacturaGPT tenga acceso a los documentos que necesitas procesar.
        </p>
      </div>
      <ul className={styles.automates}>
        {automates.map((automate, index) => (
          <li>
            <div className={styles.top}>
              <div className={styles.header}>
                <div className={styles.icon}>
                  {automate.icon}
                  <div className={styles.icon_path}>
                    <IconStar />
                  </div>
                </div>
                <button>
                  Añadir Conexión
                </button>
              </div>
              <div className={styles.subheader}>
                {automate.icon}
                <span>
                  example@gmail.com
                </span>
                <div className={styles.arrow}>
                  <IconArrow />
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.info}>
                <b>
                  Sube tus Documentos de Gmail
                </b>
                <p>
                  lorem ipsum
                </p>
              </div>
              <div className={styles.buttons}>
                <button className={styles.button_connect}>
                  Conectar
                  <IconArrowConnect />
                </button>
                <button className={styles.button_added}>
                  Añadido
                  <IconSuccess />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <IconLock />
        <span>
          Automaticamente FacturaGPT analizará los datos de forma segura
        </span>
      </div>
    </div>
  )
}

export default PanelIniAutomate;