
import styles from './IniAutomate.module.css'

const PanelIniAutomate = () => {

 const automates = [{
    icon: '',
    name: 'Sube tus Documentos de Gmail',
    description: 'lorem ipsum',

 }]

  return (
    <div className={styles.container}>
      <p>IniAutomate</p>
    

    ¿Dónde están tus documentos?

    Paso1


    Selecciona dónde tienes tus documentos

    Asegúrate de que tu FacturaGPT tenga acceso a los documentos
    que necesitas procesar.

    icono gmail
    icon path

    Añadir Conexión

    icon gmail

    example@gmail.com

    Sube tus Documentos de Gmail
    lorem ipsum

    Conectar
    Añadido

    icon lock
    Automaticamente FacturaGPT analizará los datos de forma segura


    ----------------------

    Configura qué datos procesar

  
   </div>
  )
}

export default PanelIniAutomate;