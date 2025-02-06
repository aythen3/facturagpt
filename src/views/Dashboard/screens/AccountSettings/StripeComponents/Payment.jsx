import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../../../../../actions/user";
import { useDispatch } from "react-redux";
import styles from "./Payment.module.css";
import { dispatch } from "d3";
import PaymentSuccess from "./PaymentSuccess";
const publicKey =
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j";
function Payment({ onClose, clientId, amountToPay }) {
  const dispatch = useDispatch();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe(publicKey));
  }, []);

  useEffect(() => {
    const getPaymentIntent = async () => {
      const response = await dispatch(
        createPaymentIntent({ clientId, amount: amountToPay, currency: "eur" })
      );
      console.log("response", response);
      const { clientSecret } = response.payload;
      if (clientSecret) {
        // dispatch(
        //   setNotification({
        //     status: 300,
        //     text: "Pago realizado exitosamente!",
        //   })
        // );
      }
      setClientSecret(clientSecret);
    };
    getPaymentIntent();
  }, []);

  if (clientId && clientSecret && stripePromise)
    return (
      <div onClick={onClose} className={styles.overlay}>
        <PaymentSuccess onClose={onClose} />
      </div>
    );

  // return (
  //   <div className={styles.overlay}>
  //     <div className={styles.modalBg}>
  //       {clientId && clientSecret && stripePromise && <div>Pago exitoso!</div>}
  //       {!clientId && clientSecret && stripePromise && (
  //         <Elements stripe={stripePromise} options={{ clientSecret }}>
  //           <CheckoutForm onClose={onClose} clientId={clientId} />
  //         </Elements>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default Payment;
