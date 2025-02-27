import PropTypes from "prop-types";
import styles from "./ClientsHeader.module.css";
import SearchIconWithIcon from "../SearchIconWithIcon/SearchIconWithIcon";
import Button from "../Button/Button";

const ClientsHeader = ({
  title,
  additionalInfo,
  buttons = [],
  searchProps,
  searchChildren,
  ref,
}) => {
  return (
    <div className={styles.clientsHeader}>
      {/* Sección del título e información adicional */}
      <div className={styles.headerInfo}>
        <h2>{title}</h2>
        {additionalInfo && (
          <div className={styles.additionalInfo}>{additionalInfo}</div>
        )}
      </div>
      {/* Sección de botones y barra de búsqueda */}
      <div className={styles.searchContainer}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            className={styles.button}
            action={button.onClick}
            type={button.type}
            headerStyle={button.headerStyle}
          >
            {button.label}
          </Button>
        ))}

        {/* Barra de búsqueda con funcionalidad dinámica */}
        <SearchIconWithIcon {...searchProps} ref={ref}>
          {searchChildren}
        </SearchIconWithIcon>
      </div>
    </div>
  );
};

ClientsHeader.propTypes = {
  title: PropTypes.string.isRequired, // El título siempre es obligatorio
  additionalInfo: PropTypes.node, // Información extra opcional (puede ser un nodo JSX)
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      onClick: PropTypes.func.isRequired,
    })
  ),
  searchProps: PropTypes.object, // Props dinámicas para el componente SearchIconWithIcon
  searchChildren: PropTypes.node, // Elementos hijos para SearchIconWithIcon
};

export default ClientsHeader;
