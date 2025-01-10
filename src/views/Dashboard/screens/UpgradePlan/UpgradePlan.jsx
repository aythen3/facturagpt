import React, { useEffect, useState } from "react";
import styles from "./UpgradePlan.module.css";
import greenStar from "../../assets/greenStar.svg";
import closeGray from "../../assets/closeGray.svg";
import grayCard from "../../assets/grayCard.svg";
import InputWithTitle from "../../components/InputWithTitle/InputWithTitle";
import CheckboxWithText from "../../components/CheckboxWithText/CheckboxWithText";
import greenTagIcon from "../../assets/greenTagIcon.svg";
import { currentPaymentMethods, paymentMethods, plansPricing } from "./consts";
import PaymentSingleOption from "../../components/PaymentSingleOption/PaymentSingleOption";
import SelectPlanModal from "./SelectPlanModal/SelectPlanModal";
import uncheckedCircle from "../../assets/uncheckedCircle.svg";
import checkedCircle from "../../assets/checkedCircle.svg";

const UpgradePlan = ({ onClose }) => {
  const [selectedModal, setSelectedModal] = useState("upgradePlan");
  const [selectedPlan, setSelectedPlan] = useState("Plus");
  const [cardNumber, setCardNumber] = useState("");
  const [paymentDetailsData, setPaymentDetailsData] = useState(true);
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [email, setEmail] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [country, setCountry] = useState("");
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [afiliatedCode, setAfiliatedCode] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("visaMasterAmerican");
  const [selectedCurrentPaymentMethond, setSelectedCurrentPaymentMethod] =
    useState("gPay");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const showPaymentMethodsModal = () => {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.upgradePlanContainer} ${isClosing ? styles.scaleDown : ""}`}
      >
        <div className={styles.upgradePlanHeader}>
          <div className={styles.headerLeft}>
            <img src={greenStar} alt="greenStar" />
            <h2>Mejorar Plan</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            <img src={closeGray} alt="closeGray" />
          </div>
        </div>
        {/* ================ CONTENT ================ */}
        <div className={styles.content}>
          {/* ================ LEFT ================ */}
          <div
            style={{ borderRight: "1px solid #E3E3E3", paddingBottom: "24px" }}
            className={styles.leftContainer}
          >
            <h2 className={styles.upgradePlanTitle}>Froma de pago</h2>
            <div
              style={{ marginTop: "-24px", marginBottom: "12px" }}
              className={styles.spacedBetween}
            >
              <span>Google Pay, Visa terminada en 2069</span>
            </div>
            <div className={styles.paymentMethodsContainer}>
              {currentPaymentMethods?.map((method, index) => (
                <PaymentSingleOption
                  key={index}
                  {...method}
                  paymentMethod={selectedCurrentPaymentMethond}
                  setPaymentMethod={setSelectedCurrentPaymentMethod}
                />
              ))}
            </div>
            <strong
              onClick={() => setSelectedModal("upgradePlan")}
              className={styles.addPaymentMethod}
            >
              Añadir metodo de pago
            </strong>
            <h2 className={styles.upgradePlanTitle}>Detalles de facturación</h2>
            <div className={styles.paymentDetailsItem}>
              {paymentDetailsData ? (
                <img
                  style={{ cursor: "pointer" }}
                  src={checkedCircle}
                  alt="checkedCircle"
                />
              ) : (
                <img
                  style={{ cursor: "pointer" }}
                  src={uncheckedCircle}
                  alt="uncheckedCircle"
                />
              )}
              <div className={styles.paymentDetailsContainer}>
                <div>
                  Email adress, Zip code / Postcode, Country of residence
                </div>
                <strong
                  style={{ marginTop: "-4px" }}
                  className={styles.addPaymentMethod}
                >
                  Editar
                </strong>
              </div>
            </div>
            <strong className={styles.addPaymentMethod}>
              Añadir detalles de facturación
            </strong>
          </div>
          {/* ================ RIGHT ================ */}
          <div style={{ borderLeft: "none" }} className={styles.rightContainer}>
            <span className={styles.lightText}>
              La facturación se realiza el primer día de cada mes, según los
              documentos reconocidos durante el mes anterior
            </span>
            <span className={styles.lightText}>
              Si superas tu plan actual, te pediremos autorización para
              actualizarlo antes de aplicar cualquier cargo adicional.
            </span>
            <h2 className={styles.upgradePlanTitle}>Forma de pago </h2>
            <div
              style={{ marginTop: "-14px", marginBottom: "5px" }}
              className={styles.spacedBetween}
            >
              <span>Google Pay, Visa terminada en 2069</span>
            </div>
            <span className={styles.planPlusTitle}>
              Plan {selectedPlan}{" "}
              <strong
                onClick={() => setShowPlansModal(true)}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 400,
                  marginLeft: "5px",
                }}
              >
                Cambiar plan
              </strong>
            </span>
            <div className={styles.spacedBetween}>
              <span>{plansPricing[selectedPlan].docs}</span>
              <span>{plansPricing[selectedPlan].pricing}</span>
            </div>
            <div className={styles.separator} />
            <span className={styles.lightTextRight}>
              Impuestos locales no incluidos
            </span>
            <div className={styles.greenTag}>
              <img src={greenTagIcon} alt="greenTagIcon" />
              <span className={styles.greenText}>
                Añadir código de afiliado
              </span>
            </div>
            <div className={styles.validateContainer}>
              <input
                className={styles.validateInput}
                value={afiliatedCode}
                placeholder="0000"
                onChange={(e) => setAfiliatedCode(e.target.value)}
              />
              <span className={styles.validateButton}>Validar</span>
            </div>
            <div className={styles.spacedBetween}>
              <span>Descuento</span>
              <span style={{ color: "#929598" }}>10 %</span>
            </div>
            <div className={styles.separator} />
            <button className={styles.upgradePlanButton}>
              <span>
                Mejorar a plan
                <strong> {selectedPlan}</strong>
              </span>
            </button>
            <div className={styles.currencyContainer}>
              Prices in USD/EUR/ETH/BTC/USDC<span>Change Currency</span>
            </div>
            <p className={styles.bottomText}>
              * Obtén <span className={styles.link}>más información</span> sobre
              los impuestos, los aranceles y las tasas adicionales que pueden
              aplicarse.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const upgradePlanModal = () => {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.upgradePlanContainer} ${isClosing ? styles.scaleDown : ""}`}
      >
        <div className={styles.upgradePlanHeader}>
          <div className={styles.headerLeft}>
            <img src={greenStar} alt="greenStar" />
            <h2>Mejorar Plan</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            <img src={closeGray} alt="closeGray" />
          </div>
        </div>
        {/* ================ CONTENT ================ */}
        <div className={styles.content}>
          {/* ================ LEFT ================ */}
          <div className={styles.leftContainer}>
            <h2 className={styles.upgradePlanTitle}>Pago</h2>
            <InputWithTitle
              title={"Número de tarjeta"}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 1234 1234 1234"
              type="number"
              rightElement={
                <img
                  style={{ width: "21px", height: "14px" }}
                  src={grayCard}
                  alt="grayCard"
                />
              }
            />
            <div className={styles.fullWidth}>
              <InputWithTitle
                title={"Fecha de expiración"}
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                placeholder="MM/AA"
              />
              <InputWithTitle
                title={"Codigo de seguridad"}
                value={securityCode}
                type="number"
                onChange={(e) => setSecurityCode(e.target.value)}
                placeholder="CVC"
              />
            </div>
            <CheckboxWithText
              state={savePaymentInfo}
              setState={setSavePaymentInfo}
              text={"Guardar información de pago"}
            />
            <h1 className={styles.upgradePlanTitle}>Detalles de Facturación</h1>
            <div className={styles.emailContainer}>
              <span>info@email.com</span>
              <div className={styles.changeEmail}>Cambiar</div>
            </div>
            <InputWithTitle
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Dirección de correo"
            />
            <InputWithTitle
              value={areaCode}
              type="number"
              onChange={(e) => setAreaCode(e.target.value)}
              placeholder="ZIP / Código postal"
            />
            <InputWithTitle
              title={"Pais de residencia"}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="España"
            />
          </div>
          {/* ================ RIGHT ================ */}
          <div className={styles.rightContainer}>
            <span className={styles.lightText}>
              La facturación se realiza el primer día de cada mes, según los
              documentos reconocidos durante el mes anterior
            </span>
            <span className={styles.lightText}>
              Si superas tu plan actual, te pediremos autorización para
              actualizarlo antes de aplicar cualquier cargo adicional.
            </span>
            <h2 className={styles.upgradePlanTitle}>
              Forma de pago{" "}
              <strong
                onClick={() => setSelectedModal("paymentMethods")}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 400,
                  marginLeft: "5px",
                }}
              >
                Ver metodos de pago configurados
              </strong>
            </h2>
            <div className={styles.paymentMethodsContainer}>
              {paymentMethods?.map((method, index) => (
                <PaymentSingleOption
                  key={index}
                  {...method}
                  paymentMethod={selectedPaymentOption}
                  setPaymentMethod={setSelectedPaymentOption}
                />
              ))}
            </div>
            <span className={styles.planPlusTitle}>
              Plan {selectedPlan}{" "}
              <strong
                onClick={() => setShowPlansModal(true)}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 400,
                  marginLeft: "5px",
                }}
              >
                Cambiar plan
              </strong>
            </span>
            <div className={styles.spacedBetween}>
              <span>{plansPricing[selectedPlan].docs}</span>
              <span>{plansPricing[selectedPlan].pricing}</span>
            </div>
            <div className={styles.separator} />
            <span className={styles.lightTextRight}>
              Impuestos locales no incluidos
            </span>
            <div className={styles.greenTag}>
              <img src={greenTagIcon} alt="greenTagIcon" />
              <span className={styles.greenText}>
                Añadir código de afiliado
              </span>
            </div>
            <div className={styles.validateContainer}>
              <input
                className={styles.validateInput}
                value={afiliatedCode}
                placeholder="0000"
                onChange={(e) => setAfiliatedCode(e.target.value)}
              />
              <span className={styles.validateButton}>Validar</span>
            </div>
            <div className={styles.spacedBetween}>
              <span>Descuento</span>
              <span style={{ color: "#929598" }}>10 %</span>
            </div>
            <div className={styles.separator} />
            <button className={styles.upgradePlanButton}>
              <span>
                Mejorar a plan
                <strong> {selectedPlan}</strong>
              </span>
            </button>
            <div className={styles.currencyContainer}>
              Prices in USD/EUR/ETH/BTC/USDC<span>Change Currency</span>
            </div>
            <p className={styles.bottomText}>
              * Obtén <span className={styles.link}>más información</span> sobre
              los impuestos, los aranceles y las tasas adicionales que pueden
              aplicarse.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={handleClose}
      className={`${styles.modalContainer} ${isClosing ? styles.fadeOut : ""}`}
    >
      {selectedModal === "upgradePlan"
        ? upgradePlanModal()
        : showPaymentMethodsModal()}
      {showPlansModal && (
        <SelectPlanModal
          setSelectedPlan={setSelectedPlan}
          onClose={() => setShowPlansModal(false)}
        />
      )}
    </div>
  );
};

export default UpgradePlan;
