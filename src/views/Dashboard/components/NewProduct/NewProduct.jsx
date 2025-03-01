import React, { useEffect, useState } from "react";
import styles from "./NewProduct.module.css";
import PayMethod from "../PayMethod/PayMethod";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import EditableInput from "../../screens/Clients/EditableInput/EditableInput";
import ProfileModalTemplate from "../ProfileModalTemplate/ProfileModalTemplate";
import { ParametersLabel } from "../ParametersLabel/ParametersLabel";
import Button from "../Button/Button";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import SelectTag from "./SelectTag/SelectTag";
import NewTag from "../NewTag/NewTag";
import AddTemplate from "./AddTemplate/AddTemplate";
import { getOneClient } from "../../../../actions/clients";

import { useDispatch } from "react-redux";


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
  showNewProduct,
  setShowNewProduct,
  setShowAddTags,
  setShowNewTagModal,
  setSelectedTags,
  selectedTags,
  setTags,
  tags,
  creatingBill,
  newContactProp,
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

  const [inputsEditing, setInputsEditing] = useState({
    name: false,
    description: false,
    unitPrice: false,
    sku: false,
    baseImport: false,
    retailPrice: false,
    parameters: false,
  });

  useEffect(() => {
    const handleEditAll = (value) => {
      setInputsEditing((prevState) => {
        const updatedState = {};
        Object.keys(prevState).forEach((key) => {
          if (Array.isArray(prevState[key])) {
            updatedState[key] = prevState[key];
          } else {
            updatedState[key] = value;
          }
        });
        console.log("Nuevo estado:", updatedState);
        return updatedState;
      });
    };

    handleEditAll(creatingBill);
  }, [creatingBill]);

  const [selectTypeClient, setSelectTypeClient] = useState(0);

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowNewProduct(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showNewProduct) {
        setIsAnimating(true);
        setTimeout(() => {
          setShowNewProduct(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNewProduct]);

  const dispatch = useDispatch();
  const handleGetOneClient = async (clientId) => {
    console.log("CLIENTIDDD", clientId);

    try {
      const response = await dispatch(
        getOneClient({ userId: user?.id, clientId })
      ).unwrap();
      console.log("Cliente obtenido:", response);
      navigate(`/admin/clients/${clientId}`);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={() => handleCloseNewClient()}></div>
      <div className={styles.newProductContainer}>
        <ModalTemplate
          text="Activo"
          onClick={() => handleCloseNewClient()}
          isAnimating={isAnimating}
          newContact={newContactProp}
          handleGetOneClient={handleGetOneClient}
        >
          <div
            className={`${styles.newClientContainer} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
          >
            <form className={styles.formNewProduct}>
              <div className={styles.label}>
                {" "}
                <div>
                  {/* <EditableInput
                    label={"Nombre"}
                    value={userData?.nombre}
                    name="nombre"
                    onSave={handleChange}
                    placeholder="Añade un nombre a tu producto"
                    typeclient={true}
                    readOnly={true}
                  /> */}

                  <EditableInput
                    label={"Nombre "}
                    nameInput={"nombre"}
                    placeholderInput={userData?.nombre || "yeremi"}
                    isEditing={inputsEditing.name}
                    value={userData?.nombre || clientDataInputs.name}
                    onChange={(e) => {
                      setClientDataInputs({
                        ...clientDataInputs,
                        name: e.target.value,
                      });
                      // handleClientData("clientName", e.target.value);
                    }}
                    onClick={() =>
                      setInputsEditing((prev) => ({
                        ...prev,
                        name: !prev.name,
                      }))
                    }
                  >
                    <div
                      className={`
                    ${styles.typeClient}
                    ${
                      inputsEditing.name
                        ? styles.typeClientActivate
                        : styles.typeClientDisabled
                    }
                      `}
                    >
                      <button
                        className={selectTypeClient == 0 && styles.selected}
                        onClick={() => setSelectTypeClient(0)}
                        type="button"
                        disabled={!inputsEditing.name}
                      >
                        Servicio
                      </button>
                      <button
                        className={selectTypeClient == 1 && styles.selected}
                        onClick={() => setSelectTypeClient(1)}
                        type="button"
                        disabled={!inputsEditing.name}
                      >
                        Producto
                      </button>
                      <button
                        className={selectTypeClient == 3 && styles.selected}
                        onClick={() => setSelectTypeClient(3)}
                        type="button"
                        disabled={!inputsEditing.name}
                      >
                        Suscripción
                      </button>
                    </div>
                  </EditableInput>
                  <EditableInput
                    type="categories"
                    options={false}
                    label={"Categoría"}
                    nameInput={"category"}
                    isEditing={inputsEditing.name}
                    value={userData?.category || clientDataInputs.category}
                    onChange={(e) => {
                      setClientDataInputs({
                        ...clientDataInputs,
                        category: e.target.value,
                      });
                      // handleClientData("category", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={styles.label}>
                {/* <EditableInput
                  label={"Descripcion"}
                  value={userData?.description}
                  name="description"
                  onSave={handleChange}
                  placeholder="Especifica las características del artículo"
                  isTextarea={true}
                /> */}

                <EditableInput
                  label={"Descripcion"}
                  nameInput={"descripcion"}
                  placeholderInput={
                    "Especifica las características del artículo"
                  }
                  type="textarea"
                  isEditing={inputsEditing.description}
                  value={userData?.description || clientDataInputs.description}
                  onChange={(e) => {
                    setClientDataInputs({
                      ...clientDataInputs,
                      description: e.target.value,
                    });
                    // handleClientData("description", e.target.value);
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      description: !prev.description,
                    }))
                  }
                />
              </div>
              <div className={styles.label}>
                <div>
                  {" "}
                  {/* <EditableInput
                    label={"Base Importe"}
                    value={userData?.baseImport}
                    name="baseImport"
                    onSave={handleChange}
                    placeholder="Base Importe"
                    options={true}
                    readOnly={false}
                    info="Precio de venta al público sin IVA"
                  /> */}
                  <EditableInput
                    label={"Base Importe"}
                    nameInput={"baseImport"}
                    placeholderInput={"0.0"}
                    isEditing={inputsEditing.baseImport}
                    value={userData?.baseImport || clientDataInputs.baseImport}
                    rigthText="Precio de venta al público sin IVA"
                    onChange={(e) => {
                      setClientDataInputs({
                        ...clientDataInputs,
                        baseImport: e.target.value,
                      });
                      // handleClientData("baseImport", e.target.value);
                    }}
                    onClick={() =>
                      setInputsEditing((prev) => ({
                        ...prev,
                        baseImport: !prev.baseImport,
                      }))
                    }
                  />
                </div>
                <div className={styles.baseImportContainer}>
                  <EditableInput
                    label={"Base Importe"}
                    nameInput={"baseImport"}
                    placeholderInput={"0.0"}
                    isEditing={inputsEditing.baseImport}
                    rigthText="Precio de venta al público sin IVA"
                    value={userData?.baseImport || clientDataInputs.baseImport}
                    onChange={(e) => {
                      setClientDataInputs({
                        ...clientDataInputs,
                        baseImport: e.target.value,
                      });
                      // handleClientData("baseImport", e.target.value);
                    }}
                    onClick={() =>
                      setInputsEditing((prev) => ({
                        ...prev,
                        baseImport: !prev.baseImport,
                      }))
                    }
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
                    {/* <EditableInput
                      label={"# (SKU)"}
                      value={userData?.sku}
                      name="sku"
                      onSave={handleChange}
                      placeholder="#"
                    /> */}

                    <EditableInput
                      label={"# (SKU)"}
                      nameInput={"sku"}
                      placeholderInput={"#"}
                      isEditing={inputsEditing.sku}
                      value={userData?.sku || clientDataInputs.sku}
                      onChange={(e) => {
                        setClientDataInputs({
                          ...clientDataInputs,
                          sku: e.target.value,
                        });
                        // handleClientData("sku", e.target.value);
                      }}
                      onClick={() =>
                        setInputsEditing((prev) => ({
                          ...prev,
                          sku: !prev.sku,
                        }))
                      }
                    />

                    <ButtonLabelCommponentWithButton
                      textHeader={"Tienda o Almacén"}
                      buttonText={"Añadir Ubicación"}
                      placeholder={"Almacén"}
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
                    {/* <div className={styles.column}>
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
                    </div> */}
                    {/* <div className={styles.column}>
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
                    </div> */}
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
