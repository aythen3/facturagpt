import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./Payment.module.css";
import { useDispatch } from "react-redux";
import { updateClient } from "@src/actions/clients";

export default function SetupCheckoutForm({ setPaymentId, onClose, clientId }) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    console.log("on handleSubmit");
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else if (error) {
      setMessage("An unexpected error occurred.");
    } else {
      setMessage("Setup intent successful!");
      const paymentMethodId = setupIntent.payment_method;
      console.log("Payment Method ID:", paymentMethodId);
      if (clientId && paymentMethodId) {
        console.log(
          `Setting payment method id for client ${clientId}`,
          paymentMethodId
        );
        dispatch(
          updateClient({
            clientId,
            toUpdate: { paymentMethodId: paymentMethodId },
          })
        );
      } else if (paymentMethodId) {
        setPaymentId(paymentMethodId);
      }
    }
    onClose();
    setIsProcessing(false);
  };

  return (
    <form
      id="setup-form"
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(e);
      }}
    >
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        className={styles.stripeButton}
      >
        <span>{isProcessing ? "Procesando..." : "Guardar metodo de pago"}</span>
      </button>
      {message && <div className={styles.message}>{message}</div>}
    </form>
  );
}
