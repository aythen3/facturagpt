import React, { useState } from "react";
import styles from "./SelectCurrencyPopup.module.css";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import { ReactComponent as Check } from "../../assets/grayCheck.svg";

const SelectCurrencyPopup = ({
  setShowSelectCurrencyPopup,
  setSelectedCurrency,
  selectedCurrency,
  symbolSelected,
  setSymbolSelected,
}) => {
  const [selectedCode, setSelectedCode] = useState(selectedCurrency); // Solo para marcar la moneda clickeada temporalmente
  const [tempSelectedSymbol, setTempSelectedSymbol] = useState(symbolSelected);
  const currencies = [
    { name: "United States Dollar", code: "USD", symbol: "US$" },
    { name: "Euro", code: "EUR", symbol: "€" },
    { name: "British Pound", code: "GBP", symbol: "£" },
    { name: "Australian Dollar", code: "AUD", symbol: "A$" },
    { name: "Canadian Dollar", code: "CAD", symbol: "CA$" },
    { name: "Israeli Shekel", code: "ILS", symbol: "₪" },
    { name: "Brazilian Real", code: "BRL", symbol: "R$" },
    { name: "Hong Kong Dollar", code: "HKD", symbol: "HK$" },
    { name: "Swedish Krona", code: "SEK", symbol: "SEK" },
    { name: "New Zealand Dollar", code: "NZD", symbol: "NZ$" },
    { name: "Singapore Dollar", code: "SGD", symbol: "SGD" },
    { name: "Swiss Franc", code: "CHF", symbol: "CHF" },
    { name: "South African Rand", code: "ZAR", symbol: "ZAR" },
    { name: "Chinese Renminbi Yuan", code: "CNY", symbol: "CN¥" },
    { name: "Indian Rupee", code: "INR", symbol: "₹" },
    { name: "Malaysian Ringgit", code: "MYR", symbol: "MYR" },
    { name: "Mexican Peso", code: "MXN", symbol: "MX$" },
    { name: "Pakistani Rupee", code: "PKR", symbol: "PKR" },
    { name: "Philippine Peso", code: "PHP", symbol: "₱" },
    { name: "New Taiwan Dollar", code: "TWD", symbol: "NT$" },
    { name: "Thai Baht", code: "THB", symbol: "THB" },
    { name: "Turkish New Lira", code: "TRY", symbol: "TRY" },
    { name: "United Arab Emirates Dirham", code: "AED", symbol: "AED" },
  ];

  const handleSelectCurrency = (currency) => {
    setSelectedCode(currency.code); // Solo cambia visualmente cuál está clickeada
    setTempSelectedSymbol(currency.symbol);
  };

  const handleConfirmSelection = () => {
    if (selectedCode) {
      setSelectedCurrency(selectedCode); // Solo cambia el estado global cuando se confirma
      setShowSelectCurrencyPopup(false); // Cierra el popup después de seleccionar
      setSymbolSelected(tempSelectedSymbol);
    }
  };

  return (
    <div>
      <div
        className={styles.bg}
        onClick={() => setShowSelectCurrencyPopup(false)}
      ></div>
      <div className={styles.ShowSelectCurrencyPopup}>
        <HeaderCard
          title={"Seleccionar Divisa"}
          setState={setShowSelectCurrencyPopup}
        >
          <Button type="white" action={() => setShowSelectCurrencyPopup(false)}>
            Cancelar
          </Button>
          <Button action={handleConfirmSelection} disabled={!selectedCode}>
            Seleccionar
          </Button>
        </HeaderCard>
        <div className={styles.currencyContent}>
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className={`${styles.currencyItem} ${
                selectedCode === currency.code ? styles.selected : ""
              }`}
              onClick={() => handleSelectCurrency(currency)}
            >
              <div>
                <p
                  className={`${styles.currencyName} ${
                    selectedCode === currency.code ? styles.selectedName : ""
                  }`}
                >
                  {currency.name}
                </p>
                <p className={styles.currencyDesc}>
                  ({currency.symbol}) {currency.code}
                </p>
              </div>
              {selectedCode === currency.code && <Check />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCurrencyPopup;
