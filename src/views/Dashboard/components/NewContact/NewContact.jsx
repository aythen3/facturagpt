import React, { useEffect, useRef, useState } from "react";
import styles from "./NewContact.module.css";
import ProfileModalTemplate from "../ProfileModalTemplate/ProfileModalTemplate";
import ModalTemplate from "../ModalTemplate/ModalTemplate";

import { ParametersLabel } from "../ParametersLabel/ParametersLabel";
import Tags from "../Tags/Tags";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFocusShortcut from "../../../../utils/useFocusShortcut";
import DeleteButton from "../DeleteButton/DeleteButton";
import PayMethod from "../PayMethod/PayMethod";
import { clearClient } from "../../../../slices/clientsSlices";
import EditableInput from "../../screens/Clients/EditableInput/EditableInput";
import { createClient, getOneClient } from "../../../../actions/clients";

const NewContact = ({
  setShowNewContact,
  showNewContact,
  typeTextHeader = "Nuevo",
  newContactProp,
  selectedContact,
}) => {
  const [showNewClient, setShowNewClient] = useState(false);
  const [selectTypeClient, setSelectTypeClient] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showImportContacts, setShowImportContacts] = useState(false);
  // const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [newProductModal, setNewProductModal] = useState(false);
  const closeNewProductModal = () => {
    setNewProductModal(false);
  };

  const tableData = [
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
    {
      url: "https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30553.jpg?semt=ais_hybrid",
      name: "Articulo 1",
      price: "00,00 EUR",
      quantity: "1.0 Qty",
      maxPrice: "00,00 EUR",
      minPrice: "00,00 EUR",
      priceEn: "00,00 EUR",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showNewContact) {
        setIsAnimating(true);
        setTimeout(() => {
          dispatch(clearClient());
          setShowNewContact(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNewContact]);

  const { clients, loading, client } = useSelector((state) => state.clients);

  const [clientData, setClientData] = useState({
    clientName: "",
    companyEmail: "",
    companyPhoneNumber: [],
    codeCountry: "",
    webSite: "",
    billingEmail: "",
    clientZip: "",
    country: "",
    clientCif: "",
    preferredCurrency: "",
    cardNumber: "",
    companyAddress: "",
    companyCity: "",
    companyProvince: "",
    companyCountry: "",
    infoBill: [],
    paymethod: [],
  });

  useEffect(() => {
    if (client?.clientData) {
      setClientData({
        clientName: client.clientData.clientName || "",
        companyEmail: client.clientData.companyEmail || "",
        companyPhoneNumber: client.clientData.companyPhoneNumber || "",
        codeCountry: client.clientData.codeCountry || "",
        webSite: client.clientData.webSite || "",
        billingEmail: client.email || "",
        clientZip: client.clientData.clientZip || "",
        country: client.clientData.country || "",
        clientCif: client.clientData.clientCif || "",
        preferredCurrency: client.clientData.preferredCurrency || "",
        cardNumber: client.clientData.cardNumber || "",
        companyAddress: client.clientData.companyAddress || "",
        companyCity: client.clientData.companyCity || "",
        companyProvince: client.clientData.companyProvince || "",
        companyCountry: client.clientData.companyCountry || "",
        infoBill: client.clientData.infoBill || [],
        paymethod: client.clientData.paymethod || [],
      });
    } else {
      setClientData({
        clientName: "",
        companyEmail: "",
        companyPhoneNumber: [],
        codeCountry: "",
        webSite: "",
        billingEmail: "",
        clientZip: "",
        country: "",
        clientCif: "",
        preferredCurrency: "",
        cardNumber: "",
        companyAddress: "",
        companyCity: "",
        companyProvince: "",
        companyCountry: "",
        infoBill: [],
        paymethod: [],
      });
    }
  }, [client]);

  const handleClientData = (field, value) => {
    const formattedValue =
      field === "cardNumber" ? formatCardNumber(value) : value;

    setClientData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    const userId = user?.id;
    const email = user?.email;

    console.log("CLIENTESSSSSSSSSS", clientData);
    if (client && client.clientData) {
      dispatch(
        updateClient({
          userId: userId,
          id: client?.id,
          clientData: clientData,
          // toUpdate: clientData,
        })
      )
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            setShowNewClient(false);
          } else {
            console.error("Error creating client:", result.error);
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
        });
    } else {
      dispatch(
        createClient({
          userId,
          email,
          clientData,
        })
      )
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            setShowNewClient(false);
          } else {
            console.error("Error creating client:", result.error);
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
        });
    }
  };

  const handleGetOneClient = async (clientId) => {
    console.log("CLIENTIDDD", clientId);

    try {
      const response = await dispatch(
        getOneClient({ userId: user?.id, clientId })
      ).unwrap();
      console.log("Cliente obtenido:", response);
      navigate(`/admin/clients/${clientId}`);
      // navigate(`/admin/panel`);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
    }
  };

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      dispatch(clearClient());
      setShowNewClient(false);
      setShowNewContact(false);
      setShowImportContacts(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsAnimating(true);
        setTimeout(() => {
          dispatch(clearClient());
          setShowNewClient(false);
          setShowNewContact(false);
          setShowImportContacts(false);

          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNewClient]);

  console.log("CLIENTSSSS", clients);

  const [clientDataInputs, setClientDataInputs] = useState({
    name: "",
    email: "",
    phone: "",
    web: "",
    info: [],
    parameters: [],
  });
  const [inputsEditing, setInputsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    web: false,
    info: false,
    billingDetails: [],
  });

  const [editingIndices, setEditingIndices] = useState([]);
  const handleAddBillingDetail = () => {
    setClientData((prevData) => ({
      ...prevData,
      infoBill: [
        ...prevData.infoBill,
        {
          direccion: "",
          Población: "",
          Provincia: "",
          codigoPostal: "",
          pais: "",
        },
      ],
    }));
  };
  const [selectedBillIndex, setSelectedBillIndex] = useState(null); // Índice del detalle que se está editando
  const [currentBill, setCurrentBill] = useState({
    direccion: "",
    Población: "",
    Provincia: "",
    codigoPostal: "",
    pais: "",
  });

  const handleDeleteBillingDetail = (index) => {
    setClientData((prev) => {
      const updatedInfoBill = prev.infoBill.filter((_, i) => i !== index); // Elimina el índice seleccionado
      return { ...prev, infoBill: updatedInfoBill };
    });

    // Si se está editando el mismo detalle que se eliminó, restablece la edición
    if (selectedBillIndex === index) {
      setSelectedBillIndex(null);
      setInputsEditing((prev) => ({ ...prev, info: false }));
    }
  };

  const handleEditBillingDetail = (index) => {
    setSelectedBillIndex(index); // Establece el índice del detalle seleccionado
    setCurrentBill({ ...clientData.infoBill[index] }); // Carga los datos en los inputs
    setInputsEditing((prev) => ({ ...prev, info: true })); // Habilita la edición
  };

  const handleBillingDetailChange = (field, value) => {
    setCurrentBill((prev) => ({ ...prev, [field]: value })); // Actualiza el detalle seleccionado
  };

  const handleSaveBillingDetail = () => {
    if (selectedBillIndex !== null) {
      setClientData((prev) => {
        const updatedInfoBill = [...prev.infoBill];
        updatedInfoBill[selectedBillIndex] = { ...currentBill }; // Guarda cambios en el detalle seleccionado

        return { ...prev, infoBill: updatedInfoBill };
      });

      setInputsEditing((prev) => ({ ...prev, info: false })); // Deshabilita edición
      setSelectedBillIndex(null); // Reinicia selección
    }
  };

  const handleEditAll = (value) => {
    setNewContact(value);
    setInputsEditing((prevState) => {
      const updatedState = {};
      Object.keys(prevState).forEach((key) => {
        if (Array.isArray(prevState[key])) {
          updatedState[key] = prevState[key]; // Mantiene los arrays intactos
        } else {
          updatedState[key] = value;
        }
      });
      console.log("Nuevo estado:", updatedState); // Verifica el nuevo estado aquí
      return updatedState;
    });
  };

  const handleChangePhoneNumbers = (index, field, value) => {
    const updatedNumbers = [...clientData.companyPhoneNumber];
    updatedNumbers[index][field] = value;
    handleClientData("companyPhoneNumber", updatedNumbers);
  };

  const addPhoneNumber = () => {
    handleClientData("companyPhoneNumber", [
      ...clientData.companyPhoneNumber,
      { countryCode: "+34", number: "" }, // Por defecto con España, ajusta según tus necesidades
    ]);
  };

  const removePhoneNumber = (index) => {
    const updatedNumbers = clientData.companyPhoneNumber.filter(
      (_, i) => i !== index
    );
    handleClientData("companyPhoneNumber", updatedNumbers);
  };
  const [currentPayMethod, setCurrentPayMethod] = useState({
    bank: "",
    accountNumber: "",
    swift: "",
    routingNumber: "",
    currency: "",
    default: false,
  });
  const [editingIndexPayMethod, setEditingIndexPayMethod] = useState(null);

  // Añadir un nuevo método de pago vacío
  const addPayMethod = () => {
    setClientData((prevData) => ({
      ...prevData,
      paymethod: [...prevData.paymethod, { ...currentPayMethod }],
    }));
    setCurrentPayMethod({
      bank: "",
      accountNumber: "",
      swift: "",
      routingNumber: "",
      currency: "",
      default: false,
    });
    {
      console.log(editingIndexPayMethod);
    }
  };
  // Manejar cambios en el método de pago que se está editando
  const handlePayMethodChange = (field, value) => {
    setCurrentPayMethod((prev) => {
      const updatedPayMethod = { ...prev, [field]: value };

      // Si estamos marcando un banco como predeterminado, desmarcamos los demás
      if (field === "default" && value) {
        // Desmarcar todos los métodos de pago, excepto el actual
        setClientData((prevData) => ({
          ...prevData,
          paymethod: prevData.paymethod.map((method) =>
            method === updatedPayMethod
              ? { ...method, default: true }
              : { ...method, default: false }
          ),
        }));
      }

      return updatedPayMethod;
    });
  };

  const searchInputRef = useRef(null);

  // Llama a la función y pasa la referencia
  useFocusShortcut(searchInputRef, "k");


  console.log(selectedContact, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  return (
    <div>
      <div className={styles.bg} onClick={() => handleCloseNewClient()}></div>
      <div className={styles.newContactContainer}>
        <ModalTemplate
          actionSave={handleCreateClient}
          onClick={handleCloseNewClient}
          text="contacto"
          isAnimating={isAnimating}
          className={`${styles.newClientContainer} `}
          newContact={newContactProp}
          selectedContact={selectedContact}
          handleGetOneClient={handleGetOneClient}
        >
          <div className={styles.containerNewClientForm}>
            {/* <div className={styles.containerHeader}>
                <h3>John Doe</h3>
                <span onClick={handleCloseNewClient}>
                  <img src={closeIcon} />
                </span>
              </div> */}

            <form
              className={styles.newClientForm}
              onSubmit={handleCreateClient}
            >
              <EditableInput
                label={"Nombre completo"}
                nameInput={"nombre"}
                placeholderInput={clientData.clientName || "yeremi"}
                isEditing={inputsEditing.name}
                value={clientData.clientName || clientDataInputs.name}
                onChange={(e) => {
                  setClientDataInputs({
                    ...clientDataInputs,
                    name: e.target.value,
                  });
                  handleClientData("clientName", e.target.value);
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
                    Contacto
                  </button>

                  <button
                    className={selectTypeClient == 1 && styles.selected}
                    onClick={() => setSelectTypeClient(1)}
                    type="button"
                    disabled={!inputsEditing.name}
                  >
                    Empresa
                  </button>
                </div>
              </EditableInput>
              <EditableInput
                label={"Email"}
                nameInput={"email"}
                placeholderInput={"johndoe@gmail.com"}
                isEditing={inputsEditing.email}
                value={clientData.companyEmail || clientDataInputs.email}
                onChange={(e) => {
                  setClientDataInputs({
                    ...clientDataInputs,
                    email: e.target.value,
                  });
                  handleClientData("companyEmail", e.target.value);
                }}
                onClick={() =>
                  setInputsEditing((prev) => ({
                    ...prev,
                    email: !prev.email,
                  }))
                }
              />
              {/* <EditableInput
                  label={"Teléfono"}
                  nameInput={"phone"}
                  placeholderInput={"phone"}
                  isEditing={inputsEditing.phone}
                  value={
                    clientData.companyPhoneNumber || clientDataInputs.phone
                  }
                  phone={true}
                  onChange={(e) => {
                    setClientDataInputs({
                      ...clientDataInputs,
                      phone: e.target.value,
                    });
                    handleClientData("companyPhoneNumber", e.target.value);
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      phone: !prev.phone,
                    }))
                  }
                /> */}

              <label className={styles.phoneNumber}>
                <div className={styles.headerPhoneNumer}>
                  {" "}
                  <p>Teléfono</p>
                  <div className={styles.buttonPhoneContainer}>
                    <div
                      className={styles.button}
                      onClick={() =>
                        setInputsEditing((prev) => ({
                          ...prev,
                          phone: !prev.phone,
                        }))
                      }
                    >
                      {inputsEditing.phone ? "Guardar" : "Editar"}
                    </div>
                    <div className={styles.button} onClick={addPhoneNumber}>
                      Añadir número
                    </div>
                  </div>
                </div>
                <div
                  className={
                    clientData.companyPhoneNumber.length >= 1
                      ? styles.phoneContainer
                      : styles.phoneContainerUnknown
                  }
                >
                  {clientData.companyPhoneNumber.length >= 1 ? (
                    clientData.companyPhoneNumber.map((phone, index) => (
                      <div key={index} className={styles.phoneRow}>
                        <select
                          value={phone.countryCode}
                          onChange={(e) =>
                            handleChangePhoneNumbers(
                              index,
                              "countryCode",
                              e.target.value
                            )
                          }
                          className={styles.select}
                          disabled={!inputsEditing.phone}
                        >
                          <option value="+1">+1 (EE.UU.)</option>
                          <option value="+44">+44 (Reino Unido)</option>
                          <option value="+34">+34 (España)</option>
                          <option value="+52">+52 (México)</option>
                          <option value="+57">+57 (Colombia)</option>
                        </select>
                        <input
                          type="text"
                          disabled={!inputsEditing.phone}
                          placeholder="Número de teléfono"
                          className={styles.inputEdit}
                          value={phone.number}
                          onChange={(e) =>
                            handleChangePhoneNumbers(
                              index,
                              "number",
                              e.target.value
                            )
                          }
                        />
                        <DeleteButton action={() => removePhoneNumber(index)} />
                      </div>
                    ))
                  ) : (
                    <div className={styles.unknown}>Desconocido</div>
                  )}
                </div>
              </label>

              <EditableInput
                label={"Web o dominio corporativo"}
                nameInput={"web"}
                placeholderInput={"www.web.com"}
                isEditing={inputsEditing.web}
                value={clientData.webSite || clientDataInputs.web}
                onChange={(e) => {
                  handleClientData("webSite", e.target.value);
                  setClientDataInputs({
                    ...clientDataInputs,
                    web: e.target.value,
                  });
                }}
                onClick={() =>
                  setInputsEditing((prev) => ({ ...prev, web: !prev.web }))
                }
              />
              <label>
                <div>
                  <div className={styles.detailsBill}>
                    <p>Detalles de Facturación</p>
                    <div className={styles.optionsDetailsBill}>
                      <div
                        className={styles.button}
                        onClick={handleAddBillingDetail}
                      >
                        Añadir Detalles de Facturación
                      </div>

                      <div
                        className={styles.button}
                        onClick={handleSaveBillingDetail}
                      >
                        Guardar Detalles de Facturación
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoBill}>
                    {clientData.infoBill?.length > 0 ? (
                      clientData.infoBill.map((bill, index) => (
                        <div style={{ width: "100%" }}>
                          {" "}
                          <div
                            key={index}
                            className={styles.infoBillContainer}
                            style={{ flexDirection: "row" }}
                          >
                            <div className={styles.info}>
                              <p>
                                {" "}
                                <span> {bill.direccion || "Dirección"},</span>
                                <span> {bill.Población || "Población"},</span>
                                <span> {bill.Provincia || "Provincia"},</span>
                                <span>
                                  {bill.codigoPostal || "Código Postal"},
                                </span>
                                <span> {bill.pais || "País"}</span>
                              </p>

                              <button
                                type="button"
                                onClick={() => {
                                  selectedBillIndex === index
                                    ? handleSaveBillingDetail()
                                    : handleEditBillingDetail(index);
                                }}
                                className={styles.button}
                              >
                                {selectedBillIndex === index
                                  ? "Guardar"
                                  : "Editar"}
                              </button>
                            </div>
                            <DeleteButton
                              action={() => handleDeleteBillingDetail(index)}
                            />
                          </div>
                          {selectedBillIndex === index && (
                            <div className={styles.billInfoInputs}>
                              <div className={styles.info}>
                                <span>Dirección</span>
                                <input
                                  type="text"
                                  disabled={!inputsEditing.info}
                                  placeholder="Dirección"
                                  value={currentBill.direccion}
                                  onChange={(e) =>
                                    handleBillingDetailChange(
                                      "direccion",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div>
                                {" "}
                                <div className={styles.info}>
                                  <span>Población</span>
                                  <input
                                    type="text"
                                    disabled={!inputsEditing.info}
                                    placeholder="Población"
                                    value={currentBill.Población}
                                    onChange={(e) =>
                                      handleBillingDetailChange(
                                        "Población",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className={styles.info}>
                                  <span>Provincia</span>
                                  <input
                                    type="text"
                                    disabled={!inputsEditing.info}
                                    placeholder="Provincia"
                                    value={currentBill.Provincia}
                                    onChange={(e) =>
                                      handleBillingDetailChange(
                                        "Provincia",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div>
                                <div className={styles.info}>
                                  <span>Código Postal</span>
                                  <input
                                    type="text"
                                    disabled={!inputsEditing.info}
                                    placeholder="Código Postal"
                                    value={currentBill.codigoPostal}
                                    onChange={(e) =>
                                      handleBillingDetailChange(
                                        "codigoPostal",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className={styles.info}>
                                  <span>País</span>
                                  <input
                                    type="text"
                                    disabled={!inputsEditing.info}
                                    placeholder="País"
                                    value={currentBill.pais}
                                    onChange={(e) =>
                                      handleBillingDetailChange(
                                        "pais",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <span>No hay detalles de facturación disponibles.</span>
                    )}
                  </div>
                </div>
              </label>
              <label>
                <div style={{ marginBottom: "30px" }}>
                  <div className={styles.detailsBill}>
                    <p>Métodos de Pago</p>
                    <div className={styles.optionsDetailsBill}>
                      <div className={styles.button} onClick={addPayMethod}>
                        Añadir Método de Pago
                      </div>
                      <div
                        onClick={() => {
                          setClientData((prev) => {
                            const updatedPayMethods = [...prev.paymethod];
                            if (editingIndexPayMethod !== null) {
                              // Actualiza el método de pago en el índice correspondiente
                              updatedPayMethods[editingIndexPayMethod] =
                                currentPayMethod;
                            }
                            return {
                              ...prev,
                              paymethod: updatedPayMethods,
                            };
                          });
                          setEditingIndexPayMethod(null); // Reset al índice después de guardar
                          setCurrentPayMethod({
                            bank: "",
                            accountNumber: "",
                            swift: "",
                            routingNumber: "",
                            currency: "",
                            default: false,
                          });
                        }}
                        className={styles.button}
                      >
                        Guardar Método de Pago
                      </div>
                    </div>
                  </div>

                  {Array.isArray(clientData.paymethod) &&
                    clientData.paymethod.map((method, index) => (
                      <div key={index} className={styles.infoBillContainer}>
                        <div className={styles.info}>
                          <p>
                            <span>{method.bank || "Banco"}, </span>
                            <span>
                              {method.accountNumber || "Número de Cuenta"},{" "}
                            </span>
                            <span> {method.swift || "SWIFT/BIC"}, </span>
                            <span>
                              {method.routingNumber || "Routing Number"},{" "}
                            </span>
                            <span> {method.currency || "Moneda"}</span>
                          </p>
                          <DeleteButton />
                        </div>
                        <div
                          className={styles.button}
                          onClick={() => {
                            if (editingIndexPayMethod === index) {
                              // Si ya estamos editando este índice, guarda los cambios
                              setClientData((prev) => {
                                const updatedPayMethods = [...prev.paymethod];
                                updatedPayMethods[editingIndexPayMethod] =
                                  currentPayMethod;
                                return {
                                  ...prev,
                                  paymethod: updatedPayMethods,
                                };
                              });

                              setEditingIndexPayMethod(null); // Reset al índice después de guardar
                              setCurrentPayMethod({
                                bank: "",
                                accountNumber: "",
                                swift: "",
                                routingNumber: "",
                                currency: "",
                                default: false,
                              });
                            } else {
                              // Si no estamos editando este índice, entonces pasamos a modo edición
                              setCurrentPayMethod(method);
                              setEditingIndexPayMethod(index);
                            }
                          }}
                        >
                          {editingIndexPayMethod == index
                            ? "Guardar"
                            : "Editar"}
                        </div>
                        {editingIndexPayMethod == index && (
                          <PayMethod
                            method={currentPayMethod}
                            onChange={handlePayMethodChange}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </label>

              <ParametersLabel
                parameters={clientDataInputs.parameters}
                setClientDataInputs={setClientDataInputs}
                editingIndices={editingIndices}
                setEditingIndices={setEditingIndices}
              />
            </form>
          </div>
          <ProfileModalTemplate />
        </ModalTemplate>
      </div>
    </div>
  );
};

export default NewContact;
