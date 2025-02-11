import { useState } from "react";
import styles from "./ParametersLabel.module.css";
import { ReactComponent as GrabIcon } from "../../assets/grabIcon.svg";
import { ReactComponent as ArrowDown } from "../../assets/arrowDownGray.svg";
import { ReactComponent as Minus } from "../../assets/minus.svg";
export const ParametersLabel = ({
  parameters,
  setClientDataInputs,
  editingIndices,
  setEditingIndices,
  addUnit,
  isCategory = false,
}) => {
  const [isParametersVisible, setIsParametersVisible] = useState(true);
  const [isUnitChecked, setIsUnitChecked] = useState(false); // Estado para el checkbox

  const addParameter = () => {
    setClientDataInputs((prev) => ({
      ...prev,
      parameters: [...prev.parameters, { name: "", value: "" }],
    }));
  };

  const deleteParameter = (index) => {
    setClientDataInputs((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index),
    }));
  };

  const toggleParametersVisibility = () => {
    setIsParametersVisible((prev) => !prev);
  };

  return (
    <label className={styles.parametersLabel}>
      <div className={styles.addParameter} onClick={addParameter}>
        Añadir Parámetro
      </div>
      <div
        className={styles.parametersCounter}
        onClick={toggleParametersVisibility}
      >
        <ArrowDown
          className={`${styles.icon} ${isParametersVisible ? styles.rotated : ""}`}
        />{" "}
        Parámetros ({parameters.length})
      </div>
      <div
        className={styles.parametersContainer}
        style={{
          height: isParametersVisible ? "auto" : "0px",
          overflow: "hidden",
        }}
      >
        {parameters.map((param, index) => {
          const isEditing = editingIndices.includes(index);
          return (
            <div key={index} className={styles.parameterContent}>
              <div className={styles.parametersHeader}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <GrabIcon /> <p>Parametro {index + 1}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    className={styles.button}
                    onClick={() => {
                      if (isEditing) {
                        setEditingIndices((prev) =>
                          prev.filter((i) => i !== index)
                        );
                      } else {
                        setEditingIndices((prev) => [...prev, index]);
                      }
                    }}
                  >
                    {isEditing ? "Guardar" : "Editar"}
                  </div>
                  <div
                    className={styles.delete}
                    onClick={() => {
                      if (isEditing) {
                        deleteParameter(index);
                      }
                    }}
                    style={{ background: !isEditing && "#dd7a84" }}
                  >
                    <Minus className={styles.icon} />
                  </div>
                </div>
              </div>
              <div className={styles.parameter}>
                {isCategory && (
                  <div>
                    <span>Categoria</span>
                    {/* <input type="text" placeholder={`Parámetro ${index + 1}`} /> */}
                    <select
                      value={param.category || ""} // Asegurar que no sea undefined
                      onChange={(e) => {
                        const newParameters = [...parameters];
                        newParameters[index].category = e.target.value;
                        setClientDataInputs((prev) => ({
                          ...prev,
                          parameters: newParameters,
                        }));
                      }}
                      disabled={!isEditing}
                    >
                      <option value="">Seleccione una categoría</option>
                      <option value="Identificación del Activo">
                        Identificación del Activo
                      </option>
                      <option value="Clasificación del Activo">
                        Clasificación del Activo
                      </option>
                      <option value="Información Financiera">
                        Información Financiera
                      </option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Operaciones">Operaciones</option>
                      <option value="Gestión de Inventarios">
                        Gestión de Inventarios
                      </option>
                      <option value="Riesgos y Cumplimiento">
                        Riesgos y Cumplimiento
                      </option>
                      <option value="Datos IoT y Monitorización">
                        Datos IoT y Monitorización
                      </option>
                      <option value="Retiro o Sustitución">
                        Retiro o Sustitución
                      </option>
                      <option value="Indicadores Clave (KPIs)">
                        Indicadores Clave (KPIs)
                      </option>
                    </select>
                  </div>
                )}
                <div>
                  <span>Nombre del Parametro</span>
                  <input
                    type="text"
                    placeholder={`Parámetro ${index + 1}`}
                    value={param.name}
                    onChange={(e) => {
                      const newParameters = [...parameters];
                      newParameters[index].name = e.target.value;
                      setClientDataInputs((prev) => ({
                        ...prev,
                        parameters: newParameters,
                      }));
                    }}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <span>Valor del Parametro</span>
                  <input
                    type="text"
                    placeholder="Valor parámetro"
                    value={param.value}
                    onChange={(e) => {
                      const newParameters = [...parameters];
                      newParameters[index].value = e.target.value;
                      setClientDataInputs((prev) => ({
                        ...prev,
                        parameters: newParameters,
                      }));
                    }}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              {addUnit && (
                <div className={styles.AddUnit}>
                  <div>
                    <input
                      type="checkbox"
                      checked={isUnitChecked}
                      disabled={!isEditing}
                      onChange={() => setIsUnitChecked(!isUnitChecked)}
                    />
                    <p>Añadir Unidad de medida</p>
                  </div>
                  {isUnitChecked && ( // Renderiza el input solo si el checkbox está marcado
                    <input
                      type="text"
                      disabled={!isEditing}
                      placeholder="Unidad de medida"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </label>
  );
};
