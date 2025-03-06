import React, { useRef, useState } from "react";
import styles from "./InfoContact.module.css";
import check from "../../assets/checkProgram.svg";
import PayMethod from "../PayMethod/PayMethod";
import DeleteButton from "../DeleteButton/DeleteButton";
import DetailsBillInputs from "./DetailsBillInputs/DetailsBillInputs";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import { ReactComponent as Flag_of_Venezuela } from "../../assets/Flag_of_Venezuela.svg";
import { ReactComponent as Flag_of_Argentina } from "../../assets/Flag_of_Argentina.svg";
import { ReactComponent as Flag_of_UnitedStates } from "../../assets/Flag_of_UnitedStates.svg";
import { ReactComponent as Flag_of_Spain } from "../../assets/Flag_of_Spain.svg";
import { ReactComponent as Flag_of_Bolivia } from "../../assets/Flag_of_Bolivia.svg";
import { ReactComponent as Flag_of_Brasil } from "../../assets/Flag_of_Brasil.svg";
import { ReactComponent as Flag_of_Chile } from "../../assets/Flag_of_Chile.svg";
import { ReactComponent as Flag_of_Ecuador } from "../../assets/Flag_of_Ecuador.svg";
import { ReactComponent as Flag_of_Guyana } from "../../assets/Flag_of_Guyana.svg";
import { ReactComponent as Flag_of_Peru } from "../../assets/Flag_of_Peru.svg";
import { ReactComponent as Flag_of_Suriname } from "../../assets/Flag_of_Suriname.svg";
import { ReactComponent as Flag_of_Uruguay } from "../../assets/Flag_of_Uruguay.svg";
const InfoContact = ({ idFile }) => {
  const navigate = useNavigate();
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
    setFieldValues((prev) => {
      const updatedPaymentMethods = prev.paymentMethods.map((method, i) => {
        if (i === index) {
          return {
            ...method,
            [key]: value,
            default: key === "default" ? true : method.default,
          };
        }
        return key === "default" && value
          ? { ...method, default: false }
          : method;
      });
      return { ...prev, paymentMethods: updatedPaymentMethods };
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
      phoneNumber: [
        ...prev.phoneNumber,
        {
          countryCode: (
            <>
              <Flag_of_Spain /> Spain (+34)
            </>
          ),
          number: "",
        },
      ],
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
          id: Date.now(),
          banco: "",
          numeroCuenta: "",
          swiftBic: "",
          routingNumber: "",
          moneda: "",
          default: prev.paymentMethods.length === 0 ? true : false,
        },
      ],
    }));
  };

  const removePaymentMethod = (id) => {
    setFieldValues((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((method) => method.id !== id),
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
  const countryData = [
    { code: "+34", name: "Spain", flag: Flag_of_Spain },
    { code: "+58", name: "Venezuela", flag: Flag_of_Venezuela },
    { code: "+54", name: "Argentina", flag: Flag_of_Argentina },
    { code: "+1", name: "United States", flag: Flag_of_UnitedStates },
    { code: "+591", name: "Bolivia", flag: Flag_of_Bolivia },
    { code: "+55", name: "Brasil", flag: Flag_of_Brasil },
    { code: "+56", name: "Chile", flag: Flag_of_Chile },
    { code: "+593", name: "Ecuador", flag: Flag_of_Ecuador },
    { code: "+592", name: "Guyana", flag: Flag_of_Guyana },
    { code: "+51", name: "Peru", flag: Flag_of_Peru },
    { code: "+597", name: "Suriname", flag: Flag_of_Suriname },
    { code: "+598", name: "Uruguay", flag: Flag_of_Uruguay },
  ];

  const countryFlags = countryData.map(({ code, name, flag: Flag }) => ({
    value: (
      <>
        <Flag /> {name} ({code})
      </>
    ),
    label: (
      <>
        <Flag /> {name} ({code})
      </>
    ),
  }));
  return (
    <div>
      <div className={styles.saveContact}>
        Guardar Contacto para Futuras Transacciones
      </div>
      <div className={styles.seeTransactions}>
        <div>
          Guardado <img src={check} alt="" />
        </div>
        <button
          onClick={() => {
            navigate(`/admin/clients/${idFile}`);
          }}
        >
          Ver Transacciones
        </button>
      </div>
      <div className={styles.typeClient}>
        <ProfileImage />
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
                    {fieldValues.paymentMethods
                      .sort((a, b) =>
                        a.default === b.default ? 0 : a.default ? -1 : 1
                      )
                      .map((method, index) => (
                        <div key={index} className={styles.paymentMethodRow}>
                          <div className={styles.deleteRow}>
                            <span className={styles.fieldSpan}>
                              {method.bank || "Banco"},
                              {method.accountNumber || "Número de Cuenta"},
                              {method.swift || "SWIFT/BIC"},
                              {method.routingNumber || "Routing Number"},{" "}
                              {method.currency || "Moneda"}
                            </span>
                            {editFields.paymentMethods && (
                              <DeleteButton
                                action={() => removePaymentMethod(method.id)}
                              />
                            )}
                          </div>
                          {editFields.paymentMethods && (
                            <>
                              <div
                                className={styles.detailEdit}
                                onClick={() => {
                                  if (editingPaymentIndex === method.id) {
                                    setEditingPaymentIndex(null);
                                  } else {
                                    setEditingPaymentIndex(method.id);
                                  }
                                }}
                              >
                                {editingPaymentIndex === method.id
                                  ? "Guardar"
                                  : "Editar"}
                              </div>
                            </>
                          )}
                          {editingPaymentIndex === method.id && (
                            <PayMethod
                              method={method}
                              onChange={(key, value) => {
                                handlePaymentMethodChange(index, key, value);
                              }}
                            />
                          )}
                        </div>
                      ))}
                  </div>
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
                          options={countryFlags}
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
