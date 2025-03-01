import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ReactComponent as GrabIcon } from "../../assets/grabIcon.svg";
import { ReactComponent as ArrowDown } from "../../assets/arrowDownGray.svg";
import { ReactComponent as Minus } from "../../assets/minus.svg";
import styles from "./ParametersLabel.module.css";

// Componente principal
export const ParametersLabel = ({
  parameters,
  setClientDataInputs,
  editingIndices,
  setEditingIndices,
  addUnit,
  isCategory = false,
}) => {
  const [isParametersVisible, setIsParametersVisible] = useState(true);
  const [isUnitChecked, setIsUnitChecked] = useState(false);

  const addParameter = () => {
    setClientDataInputs((prev) => ({
      ...prev,
      parameters: [
        ...prev.parameters,
        { name: "1", value: "2", title: "3", id: Date.now() }, // Asegúrate de tener un id único
      ],
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
  const initialItems = [
    {
      quantity: 1.0,
      baseImport: "0.0€",
      amount: "0.0 €",
      id: 1,
      name: "Articulo 777",
      description: "Descripción del Articulo 777",
    },
    {
      quantity: 1.0,
      baseImport: "0.0€",
      amount: "0.0 €",
      id: 2,
      name: "Articulo 666",
      description: "Descripción del Articulo 666",
    },
  ];
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Verificamos si los elementos son diferentes
    if (active.id !== over.id) {
      setClientDataInputs((prev) => {
        // Encuentra los índices de los elementos antes y después del movimiento
        const oldIndex = prev.parameters.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = prev.parameters.findIndex(
          (item) => item.id === over.id
        );

        // Actualizamos el array 'parameters' con el nuevo orden
        const updatedParameters = arrayMove(
          prev.parameters,
          oldIndex,
          newIndex
        );

        // Retornamos el estado actualizado
        return {
          ...prev,
          parameters: updatedParameters, // Actualizamos solo el array 'parameters'
        };
      });

      // Log de debug para verificar el ID del elemento movido
      console.log("Moved item with ID:", active.id);
    }
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
        />
        Parámetros ({parameters.length})
      </div>
      <div
        className={styles.parametersContainer}
        style={{
          height: isParametersVisible ? "auto" : "0px",
          overflow: "hidden",
        }}
      >
        {/* <DndContext collisionDetection={closestCenter}>
          <SortableContext
            items={parameters.map((param) => param.id)}
            strategy={verticalListSortingStrategy}
          >
            <div>
              {parameters.map((param, index) => {
                return (
                  <Parameter
                    editingIndices={editingIndices}
                    index={index}
                    key={param.id}
                    param={param}
                    addUnit={addUnit}
                    isCategory={isCategory}
                    deleteParameter={deleteParameter}
                    setClientDataInputs={setClientDataInputs}
                    setEditingIndices={setEditingIndices}
                    parameters={parameters}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext> */}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={parameters.map((item) => item.id)}>
            <div className="space-y-2">
              {parameters.map((item, index) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  editingIndices={editingIndices}
                  index={index}
                  addUnit={addUnit}
                  isCategory={isCategory}
                  deleteParameter={deleteParameter}
                  setClientDataInputs={setClientDataInputs}
                  setEditingIndices={setEditingIndices}
                  parameters={parameters}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </label>
  );
};
function SortableItem({
  item,
  editingIndices,
  index,
  setClientDataInputs,
  parameters,
  deleteParameter,
  isCategory,
  addUnit,
  setEditingIndices,
}) {
  const isEditing = editingIndices.includes(index);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.parameterContent}>
      <div className={styles.parametersHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            className={styles.button}
            onClick={() => {
              if (isEditing) {
                setEditingIndices((prev) => prev.filter((i) => i !== index));
                setClientDataInputs((prev) => ({
                  ...prev,
                  parameters: prev.parameters.map((p, i) =>
                    i === index ? { ...p, title: item.name } : p
                  ),
                }));
              } else {
                setEditingIndices((prev) => [...prev, index]);
              }
            }}
          >
            {isEditing ? "Guardar" : "Editar"}
          </div>
          <div className={styles.delete} onClick={() => deleteParameter(index)}>
            <Minus className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.parameter}>
        <GrabIcon className={styles.grabIcon} {...listeners} {...attributes} />
        {isCategory && (
          <div>
            <span>Categoria</span>
            <select
              value={item.category || ""}
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
            </select>
          </div>
        )}
        <div>
          <span>Nombre del Parametro</span>
          <input
            type="text"
            placeholder={`Parámetro ${index + 1}`}
            value={item.name}
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
            value={item.value}
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
              checked={false}
              disabled={!isEditing}
              onChange={() => {}}
            />
            <p>Añadir Unidad de medida</p>
          </div>
        </div>
      )}
    </div>
  );
}
