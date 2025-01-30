import React from 'react';
import styles from './Button.module.css';
const Button = ({ children, type = 'green', action, headerStyle = {} }) => {
  return (
    <button
      onClick={action}
      type="button"
      className={`${styles.buttonTemplate} ${type == 'green' && styles.buttonTemplateGreen} ${type == 'white' && styles.buttonTemplateWhite} ${type == 'discard' && styles.buttonTemplateDiscard} `}
      style={headerStyle}
    >
      {children}
    </button>
  );
};

export default Button;
