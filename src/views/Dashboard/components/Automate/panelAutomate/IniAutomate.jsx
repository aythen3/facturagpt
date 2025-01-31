
import styles from './IniAutomate.module.css'

const PanelIniAutomate = () => {

  const automates = [{
    icon: '',
    name: 'Sube tus Documentos de Gmail',
    description: 'lorem ipsum',
    button: true
  }, {
    icon: '',
    name: 'Sube tus Documentos de Gmail',
    description: 'lorem ipsum',
    button: true
  }, {
    icon: '',
    name: 'Sube tus Documentos de Gmail',
    description: 'lorem ipsum',
    button: true
  }, {
    icon: '',
    name: 'Sube tus Documentos de Gmail',
    description: 'lorem ipsum',
    button: true
  }, {
    icon: '',
    name: 'Sube tus Documentos de Gmail',
    description: 'lorem ipsum',
    button: true
  }]

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>
          ¿Dónde están tus documentos?
        </h2>
        <b>
          Paso1
        </b>
      </div>
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
            <div>
              icono gmail
              icon path
              <button>
                Añadir Conexión
              </button>
            </div>
            <div>
              icon gmail
              <span>
                example@gmail.com
              </span>
              <div>
                icon arrow
              </div>
            </div>
            <div>
              <b>
                Sube tus Documentos de Gmail
              </b>
              <p>
                lorem ipsum
              </p>
            </div>
            <div>
              <button>
                Conectar
              </button>
              <button>
                Añadido
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        icon lock
        <span>
          Automaticamente FacturaGPT analizará los datos de forma segura
        </span>
      </div>


      ----------------------

      Configura qué datos procesar


    </div>
  )
}

export default PanelIniAutomate;