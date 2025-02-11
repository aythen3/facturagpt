import React, { useState } from "react";
import styles from "./NewProduct.module.css";
import PayMethod from "../PayMethod/PayMethod";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import EditableInput from "../../components/AccountSettings/EditableInput/EditableInput";
import ProfileModalTemplate from "../ProfileModalTemplate/ProfileModalTemplate";
import { ParametersLabel } from "../ParametersLabel/ParametersLabel";
import Button from "../Button/Button";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import SelectTag from "./SelectTag/SelectTag";
import NewTag from "../NewTag/NewTag";
import AddTemplate from "./AddTemplate/AddTemplate";

const ButtonLabelCommponentWithButton = ({
  textHeader,
  buttonText,
  placeholder,
}) => {
  return (
    <LabelCommponent textHeader={textHeader} buttonText={buttonText}>
      <Button
        type="white"
        headerStyle={{ textAlign: "start", fontsize: "13px", padding: "6px" }}
      >
        {buttonText}
      </Button>
      <div className={styles.edit}>
        <span>{placeholder}</span>
        <div className={styles.button}>Editar</div>
      </div>
    </LabelCommponent>
  );
};
const ButtonLabelCommponentWithoutButton = ({
  textHeader,
  buttonText,
  placeholder,
  children,
}) => {
  return (
    <LabelCommponent textHeader={textHeader} buttonText={buttonText}>
      {children}
    </LabelCommponent>
  );
};
const LabelCommponent = ({ textHeader, buttonText, placeholder, children }) => {
  return (
    <div className={styles.ButtonLabelCommponent}>
      <p>{textHeader}</p>

      {children}
    </div>
  );
};

const CheckedInput = ({ text, title }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.CheckedInput}>
      {title && <p>{title}</p>}
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <span>{text}</span>
      </div>

      {/* Solo se muestra el input si el checkbox está marcado */}
      {isChecked && <input type="text" placeholder="Ingrese un valor" />}
    </div>
  );
};

const NewProduct = ({
  setShowNewProduct,
  setShowAddTags,
  setShowNewTagModal,
  setSelectedTags,
  selectedTags,
  setTags,
  tags,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [userData, setUserData] = useState();
  const [editingAcr, setEditingAcr] = useState(true);
  const [editingProductsCategory, setEditingProductsCategory] = useState(true);
  const [suppliesData, setSuppliesData] = useState([]);
  const [alternateData, setAlternateData] = useState([]);
  // Etiquetas seleccionadas
  const handleChange = ({ name, newValue }) => {
    console.log(`Setting ${name} to ${newValue}`);
    const updatedData = { ...userData, [name]: newValue };
    setUserData(updatedData);
  };

  const [editingIndices, setEditingIndices] = useState([]);
  const [clientDataInputs, setClientDataInputs] = useState({
    name: "",
    desc: "",
    unitPrice: "",
    retailPrice: "",
    parameters: [],
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={() => setShowNewProduct(false)}></div>
      <div className={styles.newProductContainer}>
        <ModalTemplate text="Activo" onClick={() => setShowNewProduct(false)}>
          <div
            className={`${styles.newClientContainer} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
          >
            <form className={styles.formNewProduct}>
              <div className={styles.label}>
                {" "}
                <div className={styles.typeClient}>
                  <EditableInput
                    label={"Nombre"}
                    value={userData?.nombre}
                    name="nombre"
                    onSave={handleChange}
                    placeholder="Añade un nombre a tu producto"
                    typeclient={true}
                  />
                </div>
              </div>
              <div className={styles.label}>
                <EditableInput
                  label={"Descripcion"}
                  value={userData?.description}
                  name="description"
                  onSave={handleChange}
                  placeholder="Especifica las características del artículo"
                  isTextarea={true}
                />
              </div>
              <div className={styles.label}>
                <div>
                  {" "}
                  <EditableInput
                    label={"Base Importe"}
                    value={userData?.baseImport}
                    name="baseImport"
                    onSave={handleChange}
                    placeholder="Base Importe"
                    options={true}
                    readOnly={false}
                    info="Precio de venta al público sin IVA"
                  />
                </div>
                <div className={styles.baseImportContainer}>
                  <EditableInput
                    label={"Base Importe"}
                    value={userData?.baseImport}
                    name="baseImport"
                    onSave={handleChange}
                    placeholder="Base Importe"
                    options={true}
                    readOnly={false}
                    info="Precio de venta al público sin IVA"
                  />
                  <ButtonLabelCommponentWithButton
                    textHeader={"Impuesto"}
                    buttonText={"Añadir Impuesto"}
                    placeholder={"21.00%"}
                  />
                </div>
              </div>
              <div className={styles.infoContact}>
                <div className={styles.label}>
                  <div className={styles.row}>
                    <CheckedInput
                      title={"Proveedor por defecto"}
                      text={
                        "Marca la casilla si tu eres el dueño de este activo"
                      }
                    />
                    <CheckedInput
                      title={"Coste de Producción/Adquisición"}
                      text={
                        "Marca la casilla si quieres añadir el coste de aquisición del activo "
                      }
                    />
                  </div>
                </div>
                <div className={styles.label}>
                  {" "}
                  <div className={styles.row}>
                    <CheckedInput
                      title={"Recommended Retail Price (RRP)"}
                      text={
                        "Marca la casilla si quieres añadir un precio de venta al público recomendado diferente al PVP"
                      }
                    />
                    <CheckedInput
                      title={"Suplemento"}
                      text={
                        "Marca la casilla si deseas agregar un suplemento al importe base, ya sea por embalaje, servicios adicionales u otros cargos."
                      }
                    />
                  </div>
                </div>
                <div className={styles.label}>
                  {" "}
                  <div className={styles.row}>
                    <EditableInput
                      label={"# (SKU)"}
                      value={userData?.sku}
                      name="sku"
                      onSave={handleChange}
                      placeholder="#"
                    />
                    <LabelCommponent
                      textHeader={"Tienda o Almacén"}
                      buttonText={"Añadir Ubicación"}
                      placeholder={"Almacen"}
                    />
                  </div>
                </div>
                <div className={styles.label}>
                  {" "}
                  <ParametersLabel
                    parameters={clientDataInputs.parameters}
                    setClientDataInputs={setClientDataInputs}
                    editingIndices={editingIndices}
                    setEditingIndices={setEditingIndices}
                    addUnit={true}
                    isCategory={true}
                  />
                </div>
                <div className={styles.label}>
                  {" "}
                  <div className={styles.productsCategory}>
                    <div className={styles.column}>
                      <ButtonLabelCommponentWithoutButton
                        textHeader={"Categoria"}
                      >
                        <CustomDropdown
                          editable={editingProductsCategory}
                          setSelectedOption={(option) =>
                            handleChange({
                              name: "productsCategory",
                              newValue: option,
                            })
                          }
                          editing={editingProductsCategory}
                          hasObject={true}
                          options={[
                            { value: "Compra", label: "Compra" },
                            { value: "Venta", label: "Venta" },
                            { value: "Inventario", label: "Inventario" },
                            { value: "Producción", label: "Producción" },
                            { value: "Consumo", label: "Consumo" },
                          ]}
                          selectedOption={userData?.productsCategory}
                        />
                      </ButtonLabelCommponentWithoutButton>
                    </div>
                    <div className={styles.column}>
                      <ButtonLabelCommponentWithoutButton
                        textHeader={"Asiento Contable Relacionado"}
                      >
                        <CustomDropdown
                          editable={editingAcr}
                          setSelectedOption={(option) =>
                            handleChange({ name: "acr", newValue: option })
                          }
                          editing={editingAcr}
                          hasObject={true}
                          options={[
                            {
                              value: "600 - Compras de mercancías",
                              label: "600 - Compras de mercancías",
                            },
                            {
                              value: "700 - Compras de mercancías",
                              label: "700 - Compras de mercancías",
                            },
                            {
                              value: "800 - Compras de mercancías",
                              label: "800 - Compras de mercancías",
                            },
                            {
                              value: "900 - Compras de mercancías",
                              label: "900 - Compras de mercancías",
                            },
                          ]}
                          selectedOption={userData?.acr}
                        />

                        <input
                          type="text"
                          placeholder="0.0"
                          className={styles.acr}
                        />
                      </ButtonLabelCommponentWithoutButton>
                    </div>
                    <div className={styles.column}>
                      <ButtonLabelCommponentWithButton
                        textHeader={"Retención"}
                        buttonText={"Añadir Retención"}
                        placeholder={"15.00%"}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.label}>
                  <SelectTag
                    setShowNewTagModal={setShowAddTags}
                    setSelectedTags={setSelectedTags}
                    selectedTags={selectedTags}
                    setTags={setTags}
                    tags={tags}
                    setShowAddTags={setShowAddTags}
                  />
                </div>
                <div className={styles.label}>
                  <AddTemplate
                    state={suppliesData}
                    setState={setSuppliesData}
                    textButton="Insumo"
                  />
                </div>
                <div className={styles.label}>
                  {" "}
                  <AddTemplate
                    state={alternateData}
                    setState={setAlternateData}
                    textButton="Suplente"
                  />
                </div>
              </div>
            </form>
          </div>
          <ProfileModalTemplate />
        </ModalTemplate>
      </div>
    </div>
  );
};

export default NewProduct;
