import React from "react";
import styles from "./DetailsBillInputs.module.css";
const DetailsBillInputs = ({
  direccion,
  poblacion,
  provincia,
  codigoPostal,
  pais,
  handleChange,
  editingIndex, // Para manejar el índice del detalle que estamos editando
}) => {
  return (
    <div className={styles.DetailsBillInputs}>
      <div className={styles.row}>
        Dirección
        <input
          type="text"
          value={direccion}
          placeholder="Dirección"
          onChange={(e) => handleChange("direccion", e.target.value)} // Actualiza el campo 'direccion'
        />
      </div>
      <div className={styles.containerColumn}>
        <div>
          <div>
            Población{" "}
            <input
              type="text"
              value={poblacion}
              placeholder="Población"
              onChange={(e) => handleChange("poblacion", e.target.value)} // Actualiza el campo 'poblacion'
            />
          </div>
          <div>
            {" "}
            Provincia
            <input
              type="text"
              value={provincia}
              placeholder="Provincia"
              onChange={(e) => handleChange("provincia", e.target.value)} // Actualiza el campo 'provincia'
            />
          </div>
        </div>
        <div>
          {" "}
          <div>
            Código Postal{" "}
            <input
              type="text"
              value={codigoPostal}
              placeholder="Código Postal"
              onChange={(e) => handleChange("codigoPostal", e.target.value)} // Actualiza el campo 'codigoPostal'
            />
          </div>
          <div>
            Pais
            <input
              type="text"
              value={pais}
              placeholder="País"
              onChange={(e) => handleChange("pais", e.target.value)} // Actualiza el campo 'Pais'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBillInputs;
