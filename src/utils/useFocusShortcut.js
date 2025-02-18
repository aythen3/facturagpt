// src/hooks/useFocusShortcut.js
import { useEffect } from "react";

const useFocusShortcut = (ref, key) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Verifica si se presionan Shift + /
      if (event.shiftKey && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault(); // Evita que la letra se escriba
        console.log("Shift + " + key.toUpperCase() + " presionado");
        ref.current?.focus();
      }
    };

    // Añade el event listener al montar el componente
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      // Remueve el event listener al desmontar el componente
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [ref]);
};

export default useFocusShortcut;
