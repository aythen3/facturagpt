import React, { useEffect, useRef, useState } from "react";
import styles from "./UserSettings.module.css";
import userAdd from "../../assets/userPlus.svg";
import openEmail from "../../assets/openEmail.svg";
import circuit from "../../assets/circuit.svg";
import connection from "../../assets/connection.svg";
import passwordIcon from "../../assets/password.svg";
import paperSearch from "../../assets/paperSearch.svg";
import shield from "../../assets/shield.svg";
import eye from "../../assets/eye.svg";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addNewClient } from "../../../../actions/emailManager";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactComponent as ArrowGray } from "../../assets/arrowDownGray.svg";
import { ReactComponent as ArrowLeft } from "../../assets/ArrowLeftWhite.svg";
import lock from "../../assets/greenLock.svg";
import StripeModal from "./StripeModal";
import StripePaymentForm from "./StripePaymentForm";
import Payment from "./StripeComponents/Payment";
import SetupPayment from "./StripeComponents/SetupPayment";
import { getNextPaymentDate } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);

const UserSettings = ({ showUserSettings, setShowUserSettings }) => {
  const { t } = useTranslation("userSetting");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("0,20€ / 20.000");
  const dropdownRef = useRef(null);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

  const options = [
    "0,20€ / 20.000",
    "0,15€ / 30.000",
    "0,12€ / 50.000",
    "0,10€ / 80.000",
    "0,008€ / 100.000",
  ];

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [editFields, setEditFields] = useState({
    companyName: false,
    email: false,
    phoneNumber: false,
    cif: false,
    address: false,
    emergencyContact: false,
  });

  const [fieldValues, setFieldValues] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    VatId: "",
    address: "",
    emergencyContact: "",
    tokenGPT: "",
  });
  const categoriesTitles = {
    companyName: t("name"),
    email: t("email"),
    phoneNumber: t("phone"),
    VatId: "Vat ID",
    address: t("address"),
    emergencyContact: t("emergencyContact"),
    tokenGPT: "Token GPT",
  };

  const placeholdersValues = {
    companyName: t("placeholderName"),
    email: t("placeholderEmail"),
    phoneNumber: t("placeholderPhone"),
    VatId: "No provisto",
    address: t("placeholderAddress"),
    emergencyContact: t("placeholderEmergencyNumer"),
    tokenGPT: "Token GPT",
  };
  const { user } = useSelector((state) => state.user);
  const [tokenEmail, setTokenEmail] = useState(""); // Email (Bandejas)
  const [tokenPassword, setTokenPassword] = useState(""); // Contraseña a la derecha de bandejas
  const [tokenGPT, setTokenGPT] = useState(""); // TOKEN GPT
  const [host, setHost] = useState(""); // HOST
  const [port, setPort] = useState(""); // PORT
  const [tokenUser, setTokenUser] = useState(""); // Usuario (derecha de puerto)
  const [tokenUserPassword, setTokenUserPassword] = useState(""); // Contraseña (derecha de puerto)
  const [firstTag, setFirstTag] = useState(""); // 1er tag
  const [secondTag, setSecondTag] = useState(""); // 2do tag
  const [thirdTag, setThirdTag] = useState(""); // 3er tag
  const [fourthTag, setFourthTag] = useState(""); // 4to tag
  const [isPaymentConfigured, setIsPaymentConfigured] = useState(false); // Metodo de pago configurado

  const formattIdAccount = user?.id.split("_")[2];

  const inputRefs = useRef({});

  const toggleEdit = (field) => {
    setEditFields((prev) => {
      const newState = { ...prev, [field]: !prev[field] };

      if (!prev[field]) {
        setTimeout(() => {
          inputRefs.current[field]?.focus();
        }, 0);
      }

      return newState;
    });
  };

  const handleChange = (field, value) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddClient = () => {
    const isEmpty = (value) => !value || value.trim() === "";

    const requiredFields = {
      ...fieldValues,
      tokenEmail,
      tokenPassword,
      tokenGPT,
      host,
      port,
      tokenUser,
      tokenUserPassword,
      firstTag,
      selectedOption,
      accountId: formattIdAccount,
    };

    const missingFields = Object.entries(requiredFields).filter(
      ([key, value]) => isEmpty(value)
    );

    console.log("requiredFields", requiredFields);

    const emailQueries = [firstTag, secondTag, thirdTag, fourthTag].filter(
      (item) => item && item.length > 0
    );

    // if (missingFields.length > 0) {
    //   console.log(
    //     "Missing Fields:",
    //     missingFields.map(([key]) => key)
    //   );
    //   alert("Completa todos los campos requeridos.");
    //   return;
    // }

    // if (emailQueries.length === 0) {
    //   alert("Debes agregar por lo menos una etiqueta.");
    //   return;
    // }

    let finalData = {
      ...requiredFields,
      isPaymentConfigured,
      emailQueries,
    };

    if (paymentId && isPaymentConfigured) {
      finalData.paymentMethodId = paymentId;
    }
    const nextPaymentDate = getNextPaymentDate();
    finalData.nextPaymentDate = nextPaymentDate;

    console.log("Adding new client with:", finalData);

    dispatch(addNewClient({ clientData: finalData }));

    // =================================================
    // const defaultClient = {
    //   companyName: 'Aythen test',
    //   email: 'aythen@info.com',
    //   phoneNumber: '131313',
    //   cif: 'cif test',
    //   address: 'address test',
    //   emergencyContact: 'emergency contact test',
    //   tokenEmail: 'kragoat13@gmail.com',
    //   tokenPassword: 'aumg efdo zpxb pzgv',
    //   tokenGPT:
    //     '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',
    //   host: '46.183.119.66',
    //   port: '21',
    //   tokenUser: 'Aythen',
    //   tokenUserPassword: 'Cloud@24',
    //   emailQueries: ['factura/albaran'],
    //   selectedOption: '0,20€ / 20.000',
    //   isPaymentConfigured: false,
    // };

    // console.log('Adding new client with default values:', defaultClient);
    // dispatch(addNewClient({ clientData: defaultClient }));
    navigate("/home");
    alert("Cliente agregado satisfactoriamente!");
  };

  const handleTogglePayment = (e) => {
    setIsPaymentConfigured(e.target.checked);
    if (e.target.checked) {
      setShowStripeModal(true);
    }
  };

  useEffect(() => {
    console.log("Payment id changed to", paymentId);
  }, [paymentId]);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <div className={styles.container}>
          {showStripeModal && (
            <SetupPayment
              onClose={() => setShowStripeModal(false)}
              setPaymentId={setPaymentId}
            />
          )}
          <div className={styles.HeaderUserSetting}>
            <div className={styles.headerLeft}>
              <div
                className={styles.arrowGreen}
                onClick={() => setShowUserSettings(false)}
              >
                <ArrowLeft className={styles.arrowGreenIcon} />
              </div>
              Admin <ArrowGray className={styles.arrowHeaderGray} /> alta nuevo
              cliente
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Button type={"white"}>Cancel</Button>
              <Button>Dar de alta</Button>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {/* Left Side */}
            <div className={styles.leftSection}>
              <div className={styles.faqContainer}>
                <div className={styles.faqItem}>
                  <div className={styles.switchContainer}>
                    <img src={shield} alt="Shield" />
                    <input
                      checked={isPaymentConfigured}
                      onChange={handleTogglePayment}
                      type="checkbox"
                      id="paymentSwitch"
                      className={styles.switch}
                    />
                    <label
                      htmlFor="paymentSwitch"
                      className={styles.switchLabel}
                    ></label>
                    <div className={styles.switchTextContainer}>
                      <span className={styles.switchText}>
                        {t("payConfig")}
                      </span>
                      <div className={styles.button}>Añadir tarjeta</div>
                    </div>
                  </div>
                  {paymentId && <span>{paymentId}</span>}
                  <p>{t("titleRight1")}</p>
                  <span>{t("subTitle1")}</span>
                </div>
                <div className={styles.faqItem}>
                  <img src={lock} alt="Lock" />
                  <p>{t("titleRight2")}</p>
                  <span>{t("subTitle2")}</span>
                </div>
                {/* <div className={styles.faqItem}>
                  <img src={eye} alt="Eye" />
                  <p>{t("titleRight3")}</p>
                  <span>{t("subTitle3")}</span>
                  <div
                    className={styles.filterSort}
                    onClick={handleDropdownToggle}
                    ref={dropdownRef}
                  >
                    <b>{selectedOption}</b> {t("documents")}
                    <FaChevronDown className={styles.chevronIcon} />
                    {isOpen && (
                      <div className={styles.dropdownOptions}>
                        {options.map((option, index) => (
                          <div
                            key={index}
                            className={styles.dropdownOption}
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    onClick={handleAddClient}
                    className={styles.signInButton}
                  >
                    {t("buttonActive")}
                  </div>
                </div> */}
              </div>
            </div>
            {/* Right Side */}
            <div className={styles.rightSection}>
              {/* <div className={styles.breadcrumb}>
                <span onClick={() => navigate("/home")}>Admin</span>{" "}
                <FaChevronRight /> <span>{t("newRegistration")}</span>
              </div> */}
              {/* <div className={styles.userIconContainer}>
                <img src={userAdd} alt="User Add" className={styles.userIcon} />
              </div> */}
              <div className={styles.detailsContainer}>
                {Object.keys(fieldValues).map((field) => (
                  <div key={field} className={styles.detailItem}>
                    <div className={styles.rowSpaced}>
                      <span className={styles.detailTitle}>
                        {categoriesTitles[field]}
                      </span>
                      <span
                        className={styles.detailEdit}
                        onClick={() => toggleEdit(field)}
                      >
                        {editFields[field] ? t("save") : t("edit")}
                      </span>
                    </div>
                    <div className={styles.detailContent}>
                      {editFields[field] ? (
                        <input
                          type="text"
                          placeholder={placeholdersValues[field]}
                          className={styles.inputEdit}
                          value={fieldValues[field]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          ref={(el) => (inputRefs.current[field] = el)}
                        />
                      ) : (
                        <span className={styles.fieldSpan}>
                          {fieldValues[field].length
                            ? fieldValues[field]
                            : placeholdersValues[field]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Tokens Section */}
              <div className={styles.tokensContainer}>
                <div className={styles.leftTokensContent}>
                  {" "}
                  <h2 className={styles.title}>Tokens</h2>
                  <div className={styles.tokensWrapper}>
                    <div className={styles.inputGroup}>
                      <img
                        src={openEmail}
                        alt="Bandejas"
                        className={styles.icon}
                      />
                      <div className={styles.inputWrapper}>
                        <input
                          value={tokenEmail}
                          onChange={(e) => setTokenEmail(e.target.value)}
                          type="text"
                          placeholder={t("placeholderInboxes")}
                          className={styles.input}
                        />
                      </div>
                      <img
                        src={passwordIcon}
                        alt="Contraseña"
                        className={styles.icon}
                      />
                      <div className={styles.inputWrapper}>
                        <input
                          value={tokenPassword}
                          onChange={(e) => setTokenPassword(e.target.value)}
                          type="password"
                          placeholder={t("placeholderPassword")}
                          className={styles.input}
                        />
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <img
                        src={circuit}
                        alt="Token GPT"
                        className={styles.icon}
                      />
                      <div className={styles.inputWrapper}>
                        <input
                          value={tokenGPT}
                          onChange={(e) => setTokenGPT(e.target.value)}
                          type="text"
                          placeholder={t("placeholderTokenGPT")}
                          className={styles.input}
                        />
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <img
                        src={connection}
                        alt="Host"
                        className={styles.icon}
                      />
                      <div className={styles.inputWrapper}>
                        <input
                          value={host}
                          onChange={(e) => setHost(e.target.value)}
                          type="text"
                          placeholder={t("placeholderHost")}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.portGroup}>
                      <div className={styles.portInputWrapper}>
                        <input
                          value={port}
                          onChange={(e) => setPort(e.target.value)}
                          type="text"
                          placeholder={t("placeholderPort")}
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.portInputWrapper}>
                        <input
                          value={tokenUser}
                          onChange={(e) => setTokenUser(e.target.value)}
                          type="text"
                          placeholder={t("placeholderUser")}
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.portInputWrapper}>
                        <input
                          value={tokenUserPassword}
                          onChange={(e) => setTokenUserPassword(e.target.value)}
                          type="password"
                          placeholder={t("placeholderPasswordHost")}
                          className={styles.input}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.tagsWrapper}>
                  <img
                    src={paperSearch}
                    alt="Etiquetas"
                    className={styles.icon}
                  />
                  <div className={styles.tagsContent}>
                    <label>#{t("labels")}</label>
                    <input
                      value={firstTag}
                      onChange={(e) => setFirstTag(e.target.value)}
                      type="text"
                      className={styles.tagInput}
                    />
                    <input
                      value={secondTag}
                      onChange={(e) => setSecondTag(e.target.value)}
                      type="text"
                      className={styles.tagInput}
                    />
                    <input
                      value={thirdTag}
                      onChange={(e) => setThirdTag(e.target.value)}
                      type="text"
                      className={styles.tagInput}
                    />
                    <input
                      value={fourthTag}
                      onChange={(e) => setFourthTag(e.target.value)}
                      type="text"
                      className={styles.tagInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Elements>
      <div
        className={styles.bgModal}
        onClick={() => setShowUserSettings(false)}
      ></div>
    </div>
  );
};

export default UserSettings;
