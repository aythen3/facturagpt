import React, { useRef, useState } from "react";
import styles from "./InfoContact.module.css";
import check from "../../assets/checkProgram.svg";
import PayMethod from "../PayMethod/PayMethod";
import { ReactComponent as ImageEmpty } from "../../assets/ImageEmpty.svg";
import DeleteButton from "../DeleteButton/DeleteButton";
import DetailsBillInputs from "./DetailsBillInputs/DetailsBillInputs";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
const InfoContact = () => {
  const inputRefs = useRef({});
  const [sectionSelected, setSectionSelected] = useState(0);
  const [editingDetailIndex, setEditingDetailIndex] = useState(null);
  const [editingPaymentIndex, setEditingPaymentIndex] = useState(null);
  const [fieldValues, setFieldValues] = useState({
    companyName: "",
    email: "",
    phoneNumber: [],
    web: "",
    details: [],
    paymentMethods: [],
  });

  const [editFields, setEditFields] = useState({
    companyName: false,
    email: false,
    phoneNumber: false,
    web: false,
    details: false,
    paymentMethods: false,
  });

  const toggleEdit = (field) => {
    setEditFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    if (field === "details") {
      setEditingDetailIndex(null);
    }
    if (field === "paymentMethods") {
      setEditingPaymentIndex(null);
    }
  };

  const handleChange = (index, key, value) => {
    setFieldValues((prev) => {
      if (key === "number" || key === "countryCode") {
        const updatedPhoneNumbers = [...prev.phoneNumber];
        updatedPhoneNumbers[index] = {
          ...updatedPhoneNumbers[index],
          [key]: value,
        };
        return { ...prev, phoneNumber: updatedPhoneNumbers };
      } else {
        const updatedDetails = [...prev.details];
        updatedDetails[index] = {
          ...updatedDetails[index],
          [key]: value,
        };
        return { ...prev, details: updatedDetails };
      }
    });
  };
  const handlePaymentMethodChange = (index, key, value) => {
    console.log(value);
    setFieldValues((prev) => {
      return {
        ...prev,
        paymentMethods: prev.paymentMethods.map((method, i) =>
          i === index ? { ...method, [key]: value } : method
        ),
      };
    });
  };

  const handleDetailChange = (index, key, value) => {
    setFieldValues((prev) => {
      const updatedDetails = [...prev.details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [key]: value,
      };
      return { ...prev, details: updatedDetails };
    });
  };

  const addPhoneNumber = () => {
    setFieldValues((prev) => ({
      ...prev,
      phoneNumber: [...prev.phoneNumber, { countryCode: "+1", number: "" }],
    }));
  };

  const removePhoneNumber = (index) => {
    setFieldValues((prev) => ({
      ...prev,
      phoneNumber: prev.phoneNumber.filter((_, i) => i !== index),
    }));
  };

  const addInvoice = () => {
    setFieldValues((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        {
          direccion: "",
          poblacion: "",
          provincia: "",
          codigoPostal: "",
          pais: "",
        },
      ],
    }));
  };

  const addPaymentMethod = () => {
    setFieldValues((prev) => ({
      ...prev,
      paymentMethods: [
        ...prev.paymentMethods,
        {
          banco: "",
          numeroCuenta: "",
          swiftBic: "",
          routingNumber: "",
          moneda: "",
          default: prev.paymentMethods.length === 0 ? true : false, // Si es el primer método, será el default
        },
      ],
    }));
  };

  const removePaymentMethod = (index) => {
    setFieldValues((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((_, i) => i !== index),
    }));
  };

  const removeInvoice = (index) => {
    setFieldValues((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  const categoriesTitles = {
    companyName: "Nombre Completo",
    email: "Email",
    phoneNumber: "Teléfono",
    web: "Web o dominio corporativo",
    details: "Detalles de Facturación",
    paymentMethods: "Métodos de Pago",
  };

  return (
    <div>
      <div className={styles.saveContact}>
        Guardar Contacto para Futuras Transacciones
      </div>
      <div className={styles.seeTransactions}>
        <div>
          Guardado <img src={check} alt="" />
        </div>
        <button>Ver Transacciones</button>
      </div>
      <div className={styles.typeClient}>
        <ImageEmpty />
        <div className={styles.btnSectionsSelector}>
          <button
            className={`${sectionSelected === 0 ? styles.sectionSelect : ""}`}
            onClick={() => setSectionSelected(0)}
          >
            Trabajador
          </button>
          <button
            className={`${sectionSelected === 1 ? styles.sectionSelect : ""}`}
            onClick={() => setSectionSelected(1)}
          >
            Cliente
          </button>
          <button
            className={`${sectionSelected === 2 ? styles.sectionSelect : ""}`}
            onClick={() => setSectionSelected(2)}
          >
            Proveedor
          </button>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        {Object.keys(fieldValues).map((field) => (
          <div key={field} className={styles.detailItem}>
            <div className={styles.rowSpaced}>
              <span className={styles.detailTitle}>
                {categoriesTitles[field]}
              </span>
              <div className={styles.optionsContainer}>
                <span
                  className={styles.detailEdit}
                  onClick={() => toggleEdit(field)}
                >
                  {editFields[field] ? "Guardar" : "Editar"}
                </span>
                {field === "details" && (
                  <span className={styles.detailEdit} onClick={addInvoice}>
                    Añadir Factura
                  </span>
                )}
                {field === "phoneNumber" && (
                  <span className={styles.detailEdit} onClick={addPhoneNumber}>
                    Añadir {categoriesTitles[field]}
                  </span>
                )}
                {field === "paymentMethods" && (
                  <span
                    className={styles.detailEdit}
                    onClick={addPaymentMethod}
                  >
                    Añadir {categoriesTitles[field]}
                  </span>
                )}
              </div>
            </div>
            <div
              className={`${styles.detailContent} ${
                field === "phoneNumber" && styles.detailContentColumn
              }`}
            >
              {field === "paymentMethods" ? (
                <div className={styles.paymentMethodsContainer}>
                  <div className={styles.paymethodContent}>
                    {fieldValues.paymentMethods.map((method, index) => (
                      <div key={index} className={styles.paymentMethodRow}>
                        <div className={styles.deleteRow}>
                          <span className={styles.fieldSpan}>
                            {method.banco || "Banco"},
                            {method.numeroCuenta || "Número de Cuenta"},
                            {method.swiftBic || "SWIFT/BIC"},
                            {method.routingNumber || "Routing Number"},{" "}
                            {method.moneda || "Moneda"}
                          </span>
                          {editFields.paymentMethods && (
                            <DeleteButton
                              action={() => removePaymentMethod(index)}
                            />
                          )}
                        </div>
                        {editFields.paymentMethods && (
                          <>
                            <div
                              className={styles.detailEdit}
                              onClick={() => {
                                if (editingPaymentIndex === index) {
                                  setEditingPaymentIndex(null);
                                } else {
                                  setEditingPaymentIndex(index);
                                }
                              }}
                            >
                              {editingPaymentIndex === index
                                ? "Guardar"
                                : "Editar"}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  {editingPaymentIndex !== null &&
                    fieldValues.paymentMethods.length >= 1 && (
                      <PayMethod
                        method={fieldValues.paymentMethods[editingPaymentIndex]}
                        onChange={(key, value) =>
                          handlePaymentMethodChange(
                            editingPaymentIndex,
                            key,
                            value
                          )
                        }
                      />
                    )}
                </div>
              ) : field === "phoneNumber" ? (
                editFields[field] ? (
                  <div className={styles.phoneContainer}>
                    {fieldValues.phoneNumber.map((phone, index) => (
                      <div key={index} className={styles.phoneRow}>
                        <CustomDropdown
                          editable={true}
                          setSelectedOption={(value) =>
                            handleChange(index, "countryCode", value)
                          }
                          editing={true}
                          hasObject={true}
                          options={[
                            { value: "+34", label: "Spain (+34)" },
                            { value: "+1", label: "United States (+1)" },
                            { value: "+44", label: "United Kingdom (+44)" },
                            { value: "+52", label: "Mexico (+52)" },
                            { value: "+91", label: "India (+91)" },
                          ]}
                          selectedOption={phone.countryCode}
                        />

                        <input
                          type="text"
                          placeholder="Número de teléfono"
                          className={styles.inputEdit}
                          value={phone.number}
                          onChange={(e) =>
                            handleChange(index, "number", e.target.value)
                          }
                        />
                        <DeleteButton action={() => removePhoneNumber(index)} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.phoneDisplayContainer}>
                    {fieldValues.phoneNumber.length > 0 ? (
                      fieldValues.phoneNumber.map((phone, index) => (
                        <span key={index} className={styles.fieldSpan}>
                          {phone.countryCode} {phone.number}
                        </span>
                      ))
                    ) : (
                      <span className={styles.fieldSpan}>Desconocido</span>
                    )}
                  </div>
                )
              ) : field === "details" ? (
                editFields[field] ? (
                  <div className={styles.invoiceContainer}>
                    <div>
                      {fieldValues.details.map((invoice, index) => (
                        <div key={index} className={styles.invoiceRow}>
                          <div className={styles.invoiceDeleteRow}>
                            <span key={index} className={styles.fieldSpan}>
                              {invoice.direccion || "Dirección"},{" "}
                              {invoice.poblacion || "Población"},{" "}
                              {invoice.provincia || "Provincia"},{" "}
                              {invoice.codigoPostal || "Codigo Postal"},{" "}
                              {invoice.pais || "Pais"}
                            </span>

                            <DeleteButton action={() => removeInvoice(index)} />
                          </div>
                          <div
                            className={styles.detailEdit}
                            onClick={() => {
                              if (editingDetailIndex === index) {
                                setEditingDetailIndex(null);
                              } else {
                                setEditingDetailIndex(index);
                              }
                            }}
                          >
                            {editingDetailIndex === index
                              ? "Guardar"
                              : "Editar"}
                          </div>
                          {editingDetailIndex === index && (
                            <DetailsBillInputs
                              direccion={
                                fieldValues.details[editingDetailIndex]
                                  .direccion || ""
                              }
                              poblacion={
                                fieldValues.details[editingDetailIndex]
                                  .poblacion || ""
                              }
                              provincia={
                                fieldValues.details[editingDetailIndex]
                                  .provincia || ""
                              }
                              codigoPostal={
                                fieldValues.details[editingDetailIndex]
                                  .codigoPostal || ""
                              }
                              pais={
                                fieldValues.details[editingDetailIndex].pais ||
                                ""
                              }
                              handleChange={(key, value) =>
                                handleDetailChange(
                                  editingDetailIndex,
                                  key,
                                  value
                                )
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.invoiceDisplayContainer}>
                    {fieldValues.details.length > 0 ? (
                      fieldValues.details.map((invoice, index) => (
                        <div key={index} className={styles.invoiceRow}>
                          <span key={index} className={styles.fieldSpan}>
                            {invoice.direccion || "direccion"},{" "}
                            {invoice.poblacion || "Poblacion"},{" "}
                            {invoice.provincia || "provincia"},{" "}
                            {invoice.codigoPostal || "Codigo Postal"},{" "}
                            {invoice.pais || "Pais"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className={styles.fieldSpan}>Desconocido</span>
                    )}
                  </div>
                )
              ) : editFields[field] ? (
                <input
                  type="text"
                  placeholder="Ingrese un valor"
                  className={styles.inputEdit}
                  value={fieldValues[field]}
                  onChange={(e) =>
                    setFieldValues({ ...fieldValues, [field]: e.target.value })
                  }
                  ref={(el) => (inputRefs.current[field] = el)}
                />
              ) : (
                <span className={styles.fieldSpan}>
                  {fieldValues[field]?.length
                    ? fieldValues[field]
                    : "Desconocido"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoContact;
