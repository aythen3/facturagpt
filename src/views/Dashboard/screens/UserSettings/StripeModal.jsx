import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import styles from "./StripeModal.module.css"; // Create and adjust this CSS file as needed
import { FaTimes } from "react-icons/fa";

const StripeModal = ({ onClose, onPaymentSuccess, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Confirm the setup using the clientSecret for the SetupIntent
    const cardElement = elements.getElement(CardElement);

    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // If successful:
    onPaymentSuccess(setupIntent);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Método de pago</h2>
        <p>
          Introduce los datos de la tarjeta para configurar el método de pago.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Card</label>
          <div className={styles.cardElementWrapper}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    fontFamily: "Arial, sans-serif",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#fa755a" },
                },
              }}
            />
          </div>

          {/* If you want country and postal code fields separately, 
              you can either integrate them into the PaymentElement 
              or handle them as Billing Details. For simplicity, 
              CardElement can also capture postal code if enabled in its options.
              
              Example for separate fields (not strictly needed if CardElement 
              has postal code collection enabled):
          */}

          {/* 
          <div className={styles.inputGroup}>
            <label className={styles.label}>Country</label>
            <select className={styles.select} defaultValue="US">
              <option value="US">United States</option>
              <option value="ES">Spain</option>
              <option value="GB">United Kingdom</option>
              // ... add other countries as needed
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Postal code</label>
            <input type="text" className={styles.input} placeholder="90210" />
          </div> 
          */}

          {errorMsg && <div className={styles.error}>{errorMsg}</div>}

          <button
            className={styles.submitButton}
            type="submit"
            disabled={!stripe || loading}
          >
            {loading ? "Procesando..." : "Configurar método de pago"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StripeModal;
