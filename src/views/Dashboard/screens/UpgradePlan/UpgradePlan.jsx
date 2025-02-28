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
import PlanUpdatedModal from "../../components/PlanUpdatedModal/PlanUpdatedModal";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "../../components/HeaderCard/HeaderCard";
// import { updateUser } from "../../../../actions/user";
import {
  attachCustomPaymentMethod,
  createCustomPaymentIntent,
} from "../../../../actions/stripe";
import SelectCurrencyPopup from "../../components/SelectCurrencyPopup/SelectCurrencyPopup";
import SeeHistory from "../../components/SeeHistory/SeeHistory";

const UpgradePlan = ({
  onClose,
  setShowSelectCurrencyPopup,
  setSeeHistory,
  seeHistory,
  isAnimating,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [selectedModal, setSelectedModal] = useState("upgradePlan");
  const [selectedPlan, setSelectedPlan] = useState(user?.userPlan || "Plus");
  const [cardNumber, setCardNumber] = useState(
    user?.paymentMethod?.details?.cardNumber || ""
  );
  const [paymentDetailsData, setPaymentDetailsData] = useState(true);
  const [expirationDate, setExpirationDate] = useState(
    user?.paymentMethod?.details?.expirationDate || ""
  );
  const [securityCode, setSecurityCode] = useState(
    user?.paymentMethod?.details?.securityCode || ""
  );
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [email, setEmail] = useState(
    user?.facturationEmail || user?.email || ""
  );
  const [areaCode, setAreaCode] = useState(user?.areaCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [afiliatedCode, setAfiliatedCode] = useState(user?.afiliatedCode || "");
  const [showUpdatedSuccessfully, setShowUpdatedSuccessfully] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(
    user?.paymentMethod?.method || "creditCard"
  );
  const [selectedCurrentPaymentMethond, setSelectedCurrentPaymentMethod] =
    useState(user?.paymentMethod?.details?.method || "gPay");
  const [isClosing, setIsClosing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSaveData = async () => {
    try {
      setIsProcessing(true);

      const data = {
        email,
        areaCode,
        country,
        userPlan: selectedPlan,
        facturationEmail: email,
        afiliatedCode,
        paymentMethod: {
          method: selectedPaymentOption,
          details: {
            cardNumber,
            expirationDate,
            securityCode,
          },
        },
      };

      console.log("Updating user with", data);

      // await dispatch(updateUser({ userId: user?.id, toUpdate: data }));

      const amountInCents = getMinPricingInCents(selectedPlan);

      if (!amountInCents) {
        console.error("Unable to calculate the amount for the selected plan.");
        return;
      }

      const paymentIntentResult = await dispatch(
        createCustomPaymentIntent({
          userId: user?.id,
          amount: amountInCents,
          currency: "eur",
        })
      );

      console.log("Result from PAYMENT INTENT:", paymentIntentResult);

      setShowUpdatedSuccessfully(true);
    } catch (error) {
      console.error("Error during update or payment intent creation:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveCardData = () => {
    const data = {
      userPlan: selectedPlan,
      facturationEmail: email,
      areaCode,
      country,
      paymentMethod: {
        method: selectedPaymentOption,
        details: {
          cardNumber,
          expirationDate,
          securityCode,
        },
      },
    };
    console.log("updating user with", data);
    // dispatch(updateUser({ userId: user?.id, toUpdate: data })).then(() => {
    //   dispatch(attachCustomPaymentMethod({ userId: user?.id }));
    // });
  };

  const getMinPricingInCents = (selectedPlan) => {
    const pricingString = plansPricing[selectedPlan].pricing;

    const [minPriceString] = pricingString.split(" - ");

    const minPriceInEuros = parseFloat(
      minPriceString.replace("€", "").replace(".", "").replace(",", ".").trim()
    );

    const minPriceInCents = Math.round(minPriceInEuros * 100);

    return minPriceInCents;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleExpirationChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");

    if (val.length >= 3) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    }

    if (val.length > 5) {
      val = val.slice(0, 5);
    }

    setExpirationDate(val);
  };

  const showPaymentMethodsModal = () => {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.upgradePlanContainer} ${isClosing ? styles.scaleDown : ""}`}
      >
        {/* <div className={styles.upgradePlanHeader}>
          <div className={styles.headerLeft}>
            <img src={greenStar} alt="greenStar" />
            <h2>Mejorar Plan</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            Editar
          </div>
        </div> */}
        <HeaderCard
          title={
            <div className={styles.titleWithIcon}>
              <h2>Mejorar Plan</h2>
              <img src={greenStar} alt="greenStar" />
            </div>
          }
          setState={handleClose}
        >
          <div className={styles.upgradePlanHeader}>
            <div className={styles.headerLeft}></div>
            <div onClick={handleClose} className={styles.closeIcon}>
              Editar
            </div>
          </div>
        </HeaderCard>
        {/* ================ CONTENT ================ */}
        <div className={styles.content}>
          {/* ================ LEFT ================ */}
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
              {/* <strong
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
              </strong> */}
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
                type="number"
                value={afiliatedCode}
                placeholder="0000"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 4) {
                    setAfiliatedCode(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "+" || e.key === "-") {
                    e.preventDefault();
                  }
                }}
              />

              <span className={styles.validateButton}>Validar</span>
            </div>
            <div className={styles.spacedBetween}>
              <span>Descuento</span>
              <span style={{ color: "#929598" }}>10 %</span>
            </div>
            <div className={styles.separator} />
            <button
              onClick={() => {
                console.log("showing modal..");
                handleSaveData();
              }}
              className={styles.upgradePlanButton}
            >
              {isProcessing ? (
                <span>Procesando...</span>
              ) : (
                <span>
                  Mejorar a plan
                  <strong> {selectedPlan}</strong>
                </span>
              )}
            </button>
            <div className={styles.currencyContainer}>
              Prices in USD/EUR/ETH/BTC/USDC
              <span onClick={() => setShowSelectCurrencyPopup(true)}>
                Change Currency
              </span>
            </div>
            <p className={styles.bottomText}>
              * Obtén <span className={styles.link}>más información</span> sobre
              los impuestos, los aranceles y las tasas adicionales que pueden
              aplicarse.
            </p>
          </div>
          {/* ================ RIGHT ================ */}
          <div
            style={{ borderRight: "1px solid #E3E3E3", paddingBottom: "24px" }}
            className={styles.leftContainer}
          >
            <h2 className={styles.upgradePlanTitle}>Forma de pago</h2>
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
        {/* <div className={styles.upgradePlanHeader}>
          <div className={styles.headerLeft}>
            <img src={greenStar} alt="greenStar" />
            <h2>Mejorar Plan</h2>
          </div>
          <div onClick={handleClose} className={styles.closeIcon}>
            
          </div>
        </div> */}
        <HeaderCard
          title={
            <div className={styles.titleWithIcon}>
              <h2>Mejorar Plan</h2>
              <img src={greenStar} alt="greenStar" />
            </div>
          }
          setState={handleClose}
        >
          <div className={styles.upgradePlanHeader}>
            <div className={styles.headerLeft}></div>
            <div onClick={handleClose} className={styles.closeIcon}>
              Cambiar Plan
            </div>
          </div>
        </HeaderCard>
        {/* ================ CONTENT ================ */}
        <div className={styles.content}>
          {/* ================ LEFT ================ */}
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
              {/* <strong
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
              </strong> */}
            </h2>
            <div
              className={`${styles.paymentMethodsContainer} ${styles.paymentMethodsContainerGrid}`}
            >
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
              {/* <strong
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
              </strong> */}
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
                type="number"
                value={afiliatedCode}
                placeholder="0000"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 4) {
                    setAfiliatedCode(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "+" || e.key === "-") {
                    e.preventDefault();
                  }
                }}
              />
              <span className={styles.validateButton}>Validar</span>
            </div>
            <div className={styles.spacedBetween}>
              <span>Descuento</span>
              <span style={{ color: "#929598" }}>10 %</span>
            </div>
            <div className={styles.separator} />
            <button
              onClick={() => {
                console.log("showing modal..");
                handleSaveData();
              }}
              className={styles.upgradePlanButton}
            >
              {isProcessing ? (
                <span>Procesando...</span>
              ) : (
                <span>
                  Mejorar a plan
                  <strong> {selectedPlan}</strong>
                </span>
              )}
            </button>
            <div className={styles.currencyContainer}>
              Prices in USD/EUR/ETH/BTC/USDC
              <span onClick={() => setShowSelectCurrencyPopup(true)}>
                Change Currency
              </span>
            </div>
            <p className={styles.bottomText}>
              * Obtén <span className={styles.link}>más información</span> sobre
              los impuestos, los aranceles y las tasas adicionales que pueden
              aplicarse.
            </p>
          </div>
          {/* ================ RIGHT ================ */}
          <div className={styles.leftContainer}>
            <h2 className={styles.upgradePlanTitle}>Pago</h2>
            <InputWithTitle
              title="Número de tarjeta"
              value={cardNumber}
              onChange={(e) => {
                let digits = e.target.value.replace(/\D/g, "");
                digits = digits.slice(0, 16);
                const chunks = digits.match(/.{1,4}/g) || [];
                const formatted = chunks.join(" ");
                setCardNumber(formatted);
              }}
              onKeyDown={(e) => {
                if (["e", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="1234 1234 1234 1234"
              type="text"
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
                onChange={handleExpirationChange}
                maxLength="5"
                placeholder="MM/AA"
              />
              <InputWithTitle
                title={"Codigo de seguridad"}
                value={securityCode}
                type="password"
                maxLength="3"
                placeholder="CVC"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 3) {
                    setSecurityCode(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "+" || e.key === "-") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <CheckboxWithText
              state={savePaymentInfo}
              setState={setSavePaymentInfo}
              text={"Guardar información de pago"}
            />
            <h1 className={styles.upgradePlanTitle}>Detalles de Facturación</h1>
            <div className={styles.emailContainer}>
              <span>{user?.facturationEmail || user?.email || ""}</span>
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
            {/* <button
              onClick={() => {
                console.log("Saving card data..");
                handleSaveCardData();
                // setShowUpdatedSuccessfully(true);
              }}
              className={styles.upgradePlanButton}
            >
              <span>Guardar datos de facturación</span>
            </button> */}
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
      {showUpdatedSuccessfully && (
        <PlanUpdatedModal
          setSeeHistory={setSeeHistory}
          onClose={async () => {
            setShowUpdatedSuccessfully(false);
            setTimeout(() => {
              handleClose();
            }, 80);
          }}
        />
      )}
    </div>
  );
};

export default UpgradePlan;
