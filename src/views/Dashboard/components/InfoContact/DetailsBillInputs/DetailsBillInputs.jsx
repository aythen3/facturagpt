import React from "react";
import styles from "./DetailsBillInputs.module.css";

const DetailsBillInputs = ({
  direccion,
  poblacion,
  provincia,
  codigoPostal,
  pais,
  email,
  zipCode,
  country,
  handleChange,
  defaultInput,
  compressed = false,
}) => {
  return (
    <div className={styles.DetailsBillInputs}>
      {!compressed && (
        <>
          {direccion !== undefined && (
            <div className={styles.row}>
              Dirección
              <input
                type="text"
                value={direccion}
                placeholder="Dirección"
                onChange={(e) => handleChange("direccion", e.target.value)}
              />
            </div>
          )}

          <div className={styles.containerColumn}>
            <div>
              {poblacion !== undefined && (
                <div>
                  Población
                  <input
                    type="text"
                    value={poblacion}
                    placeholder="Población"
                    onChange={(e) => handleChange("poblacion", e.target.value)}
                  />
                </div>
              )}

              {provincia !== undefined && (
                <div>
                  Provincia
                  <input
                    type="text"
                    value={provincia}
                    placeholder="Provincia"
                    onChange={(e) => handleChange("provincia", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div>
              {" "}
              {codigoPostal !== undefined && (
                <div>
                  Código Postal
                  <input
                    type="text"
                    value={codigoPostal}
                    placeholder="Código Postal"
                    onChange={(e) =>
                      handleChange("codigoPostal", e.target.value)
                    }
                  />
                </div>
              )}
              {pais !== undefined && (
                <div>
                  País
                  <input
                    type="text"
                    value={pais}
                    placeholder="País"
                    onChange={(e) => handleChange("pais", e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.defaultAddress}>
            <input
              type="checkbox"
              value={defaultInput}
              checked={defaultInput}
              onChange={(e) => handleChange("default", e.target.checked)}
            />
            <span>Dirección Predeterminada</span>
          </div>
        </>
      )}

      {compressed && (
        <>
          {email !== undefined && (
            <div className={styles.row}>
              {/* Email Adress */}
              <input
                type="text"
                value={email}
                placeholder="Email Adress"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          )}

          {zipCode !== undefined && (
            <div className={styles.row}>
              {/* ZipCode / Postcode */}
              <input
                type="text"
                value={zipCode}
                placeholder="ZipCode"
                onChange={(e) => handleChange("zipCode", e.target.value)}
              />
            </div>
          )}

          {country !== undefined && (
            <div className={styles.row}>
              Country of residence
              <input
                type="text"
                value={country}
                placeholder="Country "
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsBillInputs;
