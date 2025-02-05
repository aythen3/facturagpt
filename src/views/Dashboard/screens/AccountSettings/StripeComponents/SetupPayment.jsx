import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import SetupCheckoutForm from "./SetupCheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { createSetupIntent } from "../../../../../actions/user";
import { useDispatch } from "react-redux";
import styles from "./Payment.module.css";

const publicKey =
  "pk_test_51NvRJUHKWJC5RfvvoOE7wUiZjv964Jo6tn0UqYFz7wbgrJC8rwQWU2zmF58VtbYyxRaAtsE8hfTQNwtjgZz0UXj000vIoR0J70";

function SetupPayment({ setPaymentId, onClose, clientId }) {
  const dispatch = useDispatch();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe(publicKey));
  }, []);

  useEffect(() => {
    const getSetupIntent = async () => {
      const response = await dispatch(createSetupIntent());
      console.log("Setup Intent response", response);
      const { clientSecret } = response.payload;
      setClientSecret(clientSecret);
    };
    getSetupIntent();
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.setPaymentModalBg}>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <SetupCheckoutForm
              setPaymentId={setPaymentId}
              onClose={onClose}
              clientId={clientId}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default SetupPayment;
