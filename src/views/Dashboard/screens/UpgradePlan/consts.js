import visaIcon from "../../assets/visaIcon.svg";
import mastercardIcon from "../../assets/mastercardIcon.svg";
import americanIcon from "../../assets/americanIcon.svg";
import paypalIcon from "../../assets/paypalIcon.svg";
import gPayIcon from "../../assets/gPayIcon.svg";
import applePayIcon from "../../assets/applePayIcon.svg";
import stripeIcon from "../../assets/stripeIcon.svg";
import metamaskIcon from "../../assets/metamaskIcon.svg";
import coinbaseIcon from "../../assets/coinbaseIcon.svg";
import klarnaIcon from "../../assets/klarnaIcon.svg";

export const paymentMethods = [
  {
    icons: [visaIcon, mastercardIcon, americanIcon],
    name: "creditCard",
  },
  {
    icons: [paypalIcon],
    name: "paypal",
  },
  {
    icons: [gPayIcon],
    name: "gPay",
  },
  {
    icons: [applePayIcon],
    name: "applePay",
  },
  {
    icons: [stripeIcon],
    name: "stripe",
  },
  {
    icons: [metamaskIcon],
    name: "metamask",
  },
  {
    icons: [coinbaseIcon],
    name: "crypto",
  },
];

export const currentPaymentMethods = [
  {
    icons: [gPayIcon],
    name: "gPay",
    title: "Google Pay",
    description: "***** **** ***** 0880",
    cvc: true,
  },
  {
    icons: [applePayIcon],
    name: "applePay",
    title: "Apple Pay",
    description: "***** **** ***** 0880",
    cvc: true,
  },
  {
    icons: [stripeIcon],
    name: "stripe",
    title: "Stripe",
    description: "johndoe@gmail.com",
    cvc: false,
  },
  {
    icons: [metamaskIcon],
    name: "metamask",
    title: "Metamask",
    description: "0xcac83f10d87c0ac550a86da8eb45786085135447",
    cvc: false,
  },
  {
    icons: [coinbaseIcon],
    name: "coinbase",
    title: "Coinbase",
    description: "0xcac83f10d87c0ac550a86da8eb45786085135447",
    cvc: false,
  },
  {
    icons: [mastercardIcon],
    name: "mastercard",
    title: "Mastercard",
    description: "***** **** ***** 0000",
    cvc: true,
  },
  {
    icons: [visaIcon],
    name: "visa",
    title: "Visa",
    description: "***** **** ***** 0880",
    cvc: true,
  },
  {
    icons: [americanIcon],
    name: "americanExpress",
    title: "American Express",
    description: "***** **** ***** 0880",
    cvc: true,
  },
  {
    icons: [paypalIcon],
    name: "paypal",
    title: "PayPal",
    description: "***** **** ***** 0880",
    cvc: true,
  },
  {
    icons: [klarnaIcon],
    name: "klarna",
    title: "Pago en 3 plazos sin intereses.",
    description: " Se aplica un mínimo de producto de 50,00 €",
    cvc: false,
  },
];

export const plansPricing = {
  Plus: {
    docs: "20-2.000 documentos",
    pricing: "3,99 € - 322,20 €",
  },
  Pro: {
    docs: "2.000-20.000 documentos",
    pricing: "322,20 € - 2.412,20 €",
  },
  Enterprise: {
    docs: "20.000-50.000 documentos",
    pricing: "2.412,20 € - 7.612,20 €",
  },
};
