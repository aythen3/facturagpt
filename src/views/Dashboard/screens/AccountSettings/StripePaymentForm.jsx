import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./StripePaymentForm.module.css";

const StripePaymentForm = ({ onClose, onSubmit, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Confirm card setup
    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: "Test User", // Replace with actual user data
          address: {
            postal_code: "90210", // Replace with actual data
          },
        },
      },
    });

    if (error) {
      console.error("Error:", error.message);
      alert("Error al configurar el método de pago.");
    } else {
      console.log("SetupIntent:", setupIntent);
      onSubmit(setupIntent);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Configurar método de pago</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="card-number" className={styles.label}>
              Card number
            </label>
            <CardNumberElement id="card-number" className={styles.cardInput} />
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="card-expiry" className={styles.label}>
                Expiry
              </label>
              <CardExpiryElement
                id="card-expiry"
                className={styles.cardInput}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="card-cvc" className={styles.label}>
                CVC
              </label>
              <CardCvcElement id="card-cvc" className={styles.cardInput} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="country" className={styles.label}>
                Country
              </label>
              <select
                id="country"
                defaultValue="United States"
                className={styles.selectInput}
              >
                <option>United States</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="postal-code" className={styles.label}>
                Postal code
              </label>
              <input
                id="postal-code"
                type="text"
                placeholder="90210"
                className={styles.input}
              />
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!stripe}
          >
            ¡Configurar método de pago!
          </button>
        </form>
      </div>
    </div>
  );
};

export default StripePaymentForm;
