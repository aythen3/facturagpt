import React, { useEffect, useRef, useState } from "react";
import styles from "./AccountSettings.module.css";
import editProfile from "../../assets/editProfile.svg";
import visa from "../../assets/visaPayment.png";
import mastercard from "../../assets/mastercardPayment.png";
import americanexpress from "../../assets/americanExpressPayment.png";
import paypal from "../../assets/paypalPayment.png";
import gpay from "../../assets/gPayment.png";
import metamask from "../../assets/metamaskPayment.png";
import coinbase from "../../assets/coinbasePayment.png";
import creditCard from "../../assets/creditCardIcon.png";
import spanish_flag from "../../assets/spain_flag.svg";
import english_flag from "../../assets/english_flag.svg";
import { useTranslation } from "react-i18next";
// import { useAuth0 } from "@auth0/auth0-react";
import SeeHistory from "../SeeHistory/SeeHistory";
import { useDispatch, useSelector } from "react-redux";
import EditableInput from "./EditableInput/EditableInput";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { updateUser } from "../../../../actions/user";
import { uploadFiles } from "../../../../actions/scaleway";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("accountSetting");
  const { user, updatingUserLoading } = useSelector((state) => state.user);
  // const { logout } = useAuth0();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const corporativeFileInputRef = useRef(null);
  const signatureFileInputRef = useRef(null);
  const profileFileInputRef = useRef(null);

  const [isReadOnly, setIsReadOnly] = useState(false);

  const logout = () => {
    localStorage.clear();
    // navigate('/login')
    window.href = "/login";
  };

  const handleAddImageClick = (type) => {
    if (type === "corporativeLogos" && corporativeFileInputRef.current) {
      corporativeFileInputRef.current.click();
    }
    if (type === "signatureImages" && signatureFileInputRef.current) {
      signatureFileInputRef.current.click();
    }
    if (type === "profileImage" && profileFileInputRef.current) {
      profileFileInputRef.current.click();
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const currentPath =
      type === "corporativeLogos"
        ? "corporativeLogos/"
        : type === "signatureImages"
          ? "signatureImages/"
          : "profileImages/";

    dispatch(uploadFiles({ files: [file], currentPath }))
      .unwrap()
      .then((uploadResponse) => {
        console.log(`UPLOAD RESPONSE for ${type}`, uploadResponse);
        const uploadedItem = uploadResponse[0];
        const newLocation = uploadedItem?.Location;

        if (type === "profileImage") {
          setUserData({
            ...userData,
            profileImage: newLocation,
          });
          console.log("Uploaded new profile image:", newLocation);
        } else {
          const updatedArray = [...(userData?.[type] || []), newLocation];
          setUserData({
            ...userData,
            [type]: updatedArray,
          });
          console.log(`Uploaded new ${type.slice(0, -1)}:`, newLocation);
        }
      })
      .catch((error) => {
        console.error(`Error uploading new ${type.slice(0, -1)}:`, error);
      });
  };

  useEffect(() => {
    if (user) {
      const newUserData = {
        nombre: user?.nombre || "",
        email: user?.email || "",
        password: user?.password || "",
        phone: user?.phone || "",
        profileImage: user?.profileImage || "",
        countryCode: user?.countryCode || "+34",
        areaCode: user?.areaCode || "+34",
        country: user?.country || "",
        expirationDate: user?.paymentMethod?.details?.expirationDate || "",
        facturationEmail: user?.facturationEmail || user?.email || "",
        zipCode: user?.paymentMethod?.details?.zipCode || "",
        cardNumber: user?.paymentMethod?.details?.cardNumber || "",
        paymentMethod: user?.paymentMethod?.method || "",
        securityCode: user?.paymentMethod?.details?.securityCode || "",
        plan: user?.plan || "Free",
        userDomain: user?.userDomain || "",
        corporativeLogos: user?.corporativeLogos || [],
        signatureImages: user?.signatureImages || [],
        selectedSignatureImage: user?.selectedSignatureImage || "",
        selectedCorporativeLogo: user?.selectedCorporativeLogo || "",
        fiscalNumber: user?.fiscalNumber || "",
        currency: user?.currency || "EUR",
        language: user?.language || "ES",
      };
      console.log("setting user to ", newUserData);
      setUserData(newUserData);
    }
  }, [user]);

  const [seeHistory, setSeeHistory] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [editingCurrency, setEditingCurrency] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingPayMethod, setEditingPayMethod] = useState(false);

  const [facturacionCount, setFacturacionCount] = useState(0);
  const [facturacionInputs, setFacturacionInputs] = useState([
    { value: "", editable: false },
  ]);
  const [addingPhone, setAddingPhone] = useState(false);

  const handleEditToggle = (index) => {
    setFacturacionInputs((prev) =>
      prev.map((input, i) =>
        i === index ? { ...input, editable: !input.editable } : input
      )
    );
  };

  const handleInputChange = (index, value) => {
    setFacturacionInputs((prev) =>
      prev.map((input, i) => (i === index ? { ...input, value } : input))
    );
  };

  const handleLogOut = () => {
    const isConfirm = confirm(t("confirmLogout"));
    if (isConfirm) {
      // localStorage.removeItem("user");
      logout();
    }
  };

  const handleChange = ({ name, newValue }) => {
    console.log(`Setting ${name} to ${newValue}`);
    setUserData({ ...userData, [name]: newValue });
  };

  const handleSave = async () => {
    const userDataToSave = {
      ...userData,
      paymentMethod: {
        method: userData?.paymentMethod,
        details: {
          cardNumber: userData?.cardNumber,
          expirationDate: userData?.expirationDate,
          securityCode: userData?.securityCode,
        },
      },
    };
    console.log("saving user data", userDataToSave);
    dispatch(updateUser({ userId: user.id, toUpdate: userDataToSave }));
  };

  const handleToggleReadOnly = () => {
    setIsReadOnly((prev) => !prev);
  };

  return (
    <div className={styles.settingsProfile}>
      {seeHistory && user && (
        <div className={styles.seeHistoryContainer}>
          <SeeHistory
            setSeeHistory={setSeeHistory}
            seeHistory={seeHistory}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        </div>
      )}
      {userData && (
        <div className={styles.profile}>
          <div className={styles.profileImageContainer}>
            {userData?.profileImage ? (
              <img
                className={styles.profileImage}
                src={userData?.profileImage}
                alt=""
              />
            ) : (
              <div className={styles.initials}>
                {userData?.nombre.split(" ").map((letter) => letter[0])}
              </div>
            )}
            <input
              ref={profileFileInputRef}
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleFileChange(e, "profileImage")}
            />
            <div
              onClick={() => handleAddImageClick("profileImage")}
              className={styles.editProfile}
            >
              <img src={editProfile} alt="" />
            </div>
          </div>
          <div className={styles.profileInfo}>
            <p>{user?.nombre}</p>
            <span>{user?.email}</span>
            {/* <button>{t("changeAccount")}</button> */}
            <button
              style={{ cursor: "pointer", color: "red" }}
              onClick={handleLogOut}
            >
              {t("logout")}
            </button>
          </div>
        </div>
      )}

      {userData && (
        <div>
          <div className={styles.form}>
            <label>
              <div className={styles.row}>
                <p>{t("currentPlan")}</p>
                <span className={styles.taxes}>{t("taxes")}</span>
              </div>
              <div className={`${styles.row} ${styles.plan}`}>
                <p>
                  Plan <strong>{user?.plan || "Free"}</strong>
                </p>
                <span>322,20 € {t("day")} 1 Septiembre 2025</span>
              </div>
            </label>

            <label>
              <div className={styles.row}>
                <p>{t("lastBilling")}</p>
                <button onClick={() => setSeeHistory(true)}>
                  {t("record")}
                </button>
              </div>

              <div className={styles.row}>
                <p>
                  Plan <strong>{user?.plan || "Free"}</strong>
                </p>
                <p>1 Agosto 2025</p>
              </div>
            </label>

            <label>
              <EditableInput
                label={t("fullName")}
                value={userData?.nombre}
                name="nombre"
                onSave={handleChange}
                placeholder="Nombre"
              />
            </label>

            <label>
              <EditableInput
                label={t("email")}
                value={userData?.email}
                type="email"
                name="email"
                onSave={handleChange}
                placeholder="Email"
              />
            </label>

            <label>
              <EditableInput
                label={t("password")}
                value={userData?.password}
                type="password"
                name="password"
                verify={true}
                onSave={handleChange}
                placeholder="Contraseña"
              />
            </label>

            <label className={styles.label}>
              <div className={styles.row}>
                <p>{t("phone")}</p>
                <div
                  className={styles.button}
                  onClick={() => {
                    setAddingPhone(true);
                    setEditingPhone((prev) => !prev);
                  }}
                >
                  {!addingPhone
                    ? "Añadir"
                    : !editingPhone
                      ? t("edit")
                      : "Guardar"}
                </div>
              </div>

              <div className={styles.phoneContainer}>
                {addingPhone ? (
                  <>
                    <CustomDropdown
                      editable={editingPhone}
                      setSelectedOption={(option) =>
                        handleChange({ name: "countryCode", newValue: option })
                      }
                      editing={editingPhone}
                      hasObject={true}
                      options={[
                        { value: "+34", label: "Spain (+34)" },
                        { value: "+1", label: "United States (+1)" },
                        { value: "+44", label: "United Kingdom (+44)" },
                        { value: "+52", label: "Mexico (+52)" },
                        { value: "+91", label: "India (+91)" },
                      ]}
                      selectedOption={userData?.countryCode}
                    />
                    <input
                      type="text"
                      placeholder="000 000 000"
                      className={styles.numberInput}
                      name="phone"
                      value={userData?.phone || ""}
                      disabled={!editingPhone}
                      onChange={(e) =>
                        handleChange({
                          name: "phone",
                          newValue: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <span
                    style={{
                      color: "#71717a",
                      marginTop: "10px",
                    }}
                  >
                    Desconocido
                  </span>
                )}
              </div>
            </label>

            <label>
              <div className={styles.row}>
                <p>{t("payMethods")}</p>
                <div
                  className={styles.button}
                  type="button"
                  onClick={() => setEditingPayMethod((prev) => !prev)}
                >
                  {!editingPayMethod ? t("add") : "Guardar"}
                </div>
              </div>
              <span
                style={{
                  color: "#71717a",
                  marginTop: "10px",
                }}
              >
                {t("unknown")}
              </span>
              {editingPayMethod && (
                <>
                  <div className={styles.payContainer}>
                    <div>
                      <div className={styles.paymentMethod}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          disabled={!editingPayMethod}
                          value="creditCard"
                          checked={userData?.paymentMethod === "creditCard"}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() =>
                            handleChange({
                              name: "paymentMethod",
                              newValue: "creditCard",
                            })
                          }
                        />
                        <div className={styles.paymentContainer}>
                          <div className={styles.paymentImage}>
                            <img src={visa} alt="Visa logo" />
                          </div>
                          <div className={styles.paymentImage}>
                            <img src={mastercard} alt="Mastercard logo" />
                          </div>
                          <div className={styles.paymentImage}>
                            <img
                              src={americanexpress}
                              alt="American Express logo"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={styles.paymentMethod}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          disabled={!editingPayMethod}
                          value="paypal"
                          checked={userData?.paymentMethod === "paypal"}
                          onChange={() =>
                            handleChange({
                              name: "paymentMethod",
                              newValue: "paypal",
                            })
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className={styles.paymentImage}>
                          <img src={paypal} alt="Paypal logo" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={styles.paymentMethod}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          disabled={!editingPayMethod}
                          value="gPay"
                          checked={userData?.paymentMethod === "gPay"}
                          onChange={() =>
                            handleChange({
                              name: "paymentMethod",
                              newValue: "gPay",
                            })
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className={styles.paymentImage}>
                          <img src={gpay} alt="Google pay logo" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={styles.paymentMethod}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          disabled={!editingPayMethod}
                          value="crypto"
                          checked={userData?.paymentMethod === "crypto"}
                          onChange={() =>
                            handleChange({
                              name: "paymentMethod",
                              newValue: "crypto",
                            })
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className={styles.paymentContainer}>
                          <div className={styles.paymentImage}>
                            <img src={metamask} alt="Metamask logo" />
                          </div>
                          <div className={styles.paymentImage}>
                            <img src={coinbase} alt="CoinBase logo" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div className={styles.row}>{t("cardNumber")}</div>
                    <div className={styles.inputContainer}>
                      <input
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        className={styles.input}
                        disabled={!editingPayMethod}
                        name="cardNumber"
                        value={userData?.cardNumber}
                        onChange={(e) =>
                          handleChange({
                            name: "cardNumber",
                            newValue: e.target.value,
                          })
                        }
                      />
                      <img
                        src={creditCard}
                        alt="Credit Card Icon"
                        className={styles.icon}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      Fecha de expiración
                      <div className={styles.phoneInputs}>
                        <input
                          type="text"
                          name="expirationDate"
                          value={userData?.expirationDate}
                          disabled={!editingPayMethod}
                          onChange={(e) =>
                            handleChange({
                              name: "expirationDate",
                              newValue: e.target.value,
                            })
                          }
                          placeholder="MM/YY"
                          className={styles.numberInput}
                        />
                      </div>
                    </div>
                    <div>
                      Código de seguridad
                      <div className={styles.phoneInputs}>
                        <input
                          name="securityCode"
                          type="password"
                          value={userData?.securityCode}
                          disabled={!editingPayMethod}
                          onChange={(e) =>
                            handleChange({
                              name: "securityCode",
                              newValue: e.target.value,
                            })
                          }
                          maxLength={3}
                          placeholder="***"
                          className={styles.numberInput}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </label>

            <label>
              <div className={styles.label} style={{ marginBottom: "10px" }}>
                <div className={styles.row}>
                  <p>Detalles de facturación</p>
                  <div
                    className={styles.button}
                    type="button"
                    id="addFacturacion"
                    onClick={() => {
                      setFacturacionCount(facturacionCount + 1);
                      setFacturacionInputs([
                        ...facturacionInputs,
                        { value: "", editable: false },
                      ]);
                    }}
                  >
                    Añadir
                  </div>
                </div>
                {facturacionCount == 0
                  ? "Desconocido"
                  : [...Array(facturacionCount)].map((_, index) => (
                      <div className={styles.facturacion} key={index}>
                        <input
                          type="radio"
                          name="facturacion"
                          value={`facturacion${index}`}
                          onChange={() =>
                            handleChange({
                              name: "facturacion",
                              newValue: `facturacion${index}`,
                            })
                          }
                        />
                        <input
                          type="text"
                          value={facturacionInputs[index]?.value || ""}
                          disabled={!facturacionInputs[index]?.editable}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          placeholder="Email adress, Zip code / Postcode, Country of residence"
                        />
                        <div
                          className={styles.facturacionButtonEdit}
                          onClick={() => handleEditToggle(index)}
                        >
                          {facturacionInputs[index]?.editable
                            ? "Guardar"
                            : "Editar"}
                        </div>
                      </div>
                    ))}
              </div>
              <div className={styles.label}>
                <div className={styles.headerLabel}>
                  <span>info@gmail.com</span>
                  <div className={styles.button} onClick={handleToggleReadOnly}>
                    {!isReadOnly ? "Editar" : "Guardar"}
                  </div>
                </div>
                <EditableInput
                  label={"info@gmail.com"}
                  value={userData?.facturationEmail}
                  name="facturationEmail"
                  onSave={handleChange}
                  options={true}
                  labelOptions={true}
                  placeholder={"Email address"}
                  readOnly={!isReadOnly}
                />
                <EditableInput
                  value={userData?.zipCode}
                  name="zipCode"
                  onSave={handleChange}
                  options={true}
                  labelOptions={true}
                  placeholder={"Zip code / Postcode"}
                  readOnly={!isReadOnly}
                />
                <EditableInput
                  value={userData?.country}
                  name="country"
                  onSave={handleChange}
                  labelOptions={false}
                  options={true}
                  label={"Country of residence"}
                  placeholder={"Spain"}
                  readOnly={!isReadOnly}
                />
              </div>
            </label>

            <label>
              <EditableInput
                placeholder="Desconocido"
                label={"Número Fiscal"}
                initialValue={user?.fiscalNumber || ""}
                value={userData?.fiscalNumber}
                name="fiscalNumber"
                onSave={handleChange}
              />
            </label>

            <label>
              <EditableInput
                placeholder="Desconocido"
                label={"Web o dominio corporativo"}
                initialValue={user?.userDomain || ""}
                value={userData?.userDomain}
                name="userDomain"
                onSave={handleChange}
              />
            </label>

            <label>
              <div className={styles.row}>
                <p>Logo corporativo</p>
                <div
                  className={styles.editButton}
                  onClick={() => handleAddImageClick("corporativeLogos")}
                >
                  Añadir
                </div>
              </div>
              <div className={styles.logoCorporativo}>
                {userData?.corporativeLogos.length === 0 && (
                  <div className={styles.container}>
                    <span>Aun no has añadido ningun logo corporativo.</span>
                  </div>
                )}
                {userData?.corporativeLogos.map((logo) => (
                  <div className={styles.container} key={logo}>
                    <input
                      checked={userData?.selectedCorporativeLogo === logo}
                      onChange={(e) =>
                        handleChange({
                          name: "selectedCorporativeLogo",
                          newValue: logo,
                        })
                      }
                      type="radio"
                      name="corporativeLogo1"
                    />
                    <img src={logo} alt="" />
                    <div className={styles.delete}>-</div>
                  </div>
                ))}
              </div>
              <input
                ref={corporativeFileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => handleFileChange(e, "corporativeLogos")}
              />
            </label>

            <label>
              <div className={styles.row}>
                <p>Firma</p>
                <div
                  className={styles.editButton}
                  onClick={() => handleAddImageClick("signatureImages")}
                >
                  Añadir
                </div>
              </div>
              <div className={styles.logoCorporativo}>
                {userData?.signatureImages.length === 0 && (
                  <div className={styles.container}>
                    <span>Aun no has añadido ninguna imagen de firma.</span>
                  </div>
                )}
                {userData?.signatureImages?.map((logo) => (
                  <div className={styles.container} key={logo}>
                    <input
                      checked={userData?.selectedSignatureImage === logo}
                      onChange={(e) =>
                        handleChange({
                          name: "selectedSignatureImage",
                          newValue: logo,
                        })
                      }
                      type="radio"
                      name="signatureImage"
                    />
                    <img src={logo} alt="" />
                    <div className={styles.delete}>-</div>
                  </div>
                ))}
              </div>
              <input
                ref={signatureFileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => handleFileChange(e, "signatureImages")}
              />
            </label>

            <label>
              <div className={styles.row}>
                <p>Divisa</p>
                <div
                  className={styles.editButton}
                  onClick={() => {
                    console.log("clicking on edit button...");
                    if (editingCurrency) {
                      setEditingCurrency(false);
                    } else {
                      setEditingCurrency(true);
                    }
                  }}
                  type="button"
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {editingCurrency ? "Guardar" : "Editar"}
                </div>
              </div>
              <CustomDropdown
                editable={editingCurrency}
                editing={editingCurrency}
                options={["EUR", "USD"]}
                selectedOption={userData?.currency}
                setSelectedOption={(option) =>
                  handleChange({ name: "currency", newValue: option })
                }
              />
            </label>
            <label>
              <div className={styles.row}>
                <p>Idioma</p>
                <div
                  className={styles.editButton}
                  onClick={() => {
                    console.log("clicking on edit button...");
                    if (editingCurrency) {
                      setEditingCurrency(false);
                    } else {
                      setEditingCurrency(true);
                    }
                  }}
                  type="button"
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {editingCurrency ? "Guardar" : "Editar"}
                </div>
              </div>
              <CustomDropdown
                editable={editingCurrency}
                editing={editingCurrency}
                hasObject={true}
                options={[
                  {
                    iso: "es",
                    label: "Spanish",
                  },
                  {
                    iso: "en",
                    label: "English",
                  },
                ]}
                selectedOption={userData?.currency}
                setSelectedOption={(option) =>
                  handleChange({ name: "currency", newValue: option })
                }
              />
            </label>
            <label>
              <div className={styles.row}>
                <p>Idioma</p>
                <div
                  className={styles.editButton}
                  onClick={() => {
                    console.log("clicking on edit button...");
                    if (editingLanguage) {
                      setEditingLanguage(false);
                    } else {
                      setEditingLanguage(true);
                    }
                  }}
                  type="button"
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {editingLanguage ? "Guardar" : "Editar"}
                </div>
              </div>
              <div>
                <div className={styles.flagContainers}>
                  <img
                    onClick={() => {
                      editingLanguage &&
                        handleChange({ name: "language", newValue: "ES" });
                    }}
                    className={styles.flagItem}
                    src={spanish_flag}
                  />
                  <img
                    onClick={() => {
                      editingLanguage &&
                        handleChange({ name: "language", newValue: "EN" });
                    }}
                    className={styles.flagItem}
                    src={english_flag}
                  />
                </div>
              </div>
            </label>
            <div className={styles.saveButtonContainer}>
              <button
                onClick={handleSave}
                className={styles.save}
                type="submit"
              >
                {updatingUserLoading ? "Guardando..." : t("saveChange")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
