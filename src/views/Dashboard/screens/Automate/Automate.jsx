import React from "react";
import TitleComponent from "./Components/TitleComponent";
import SearchComponent from "./Components/SearchComponent";
import CardAutomate from "./Components/CardAutomate";

const cards = [
  {
    id: 1,
    automateName: "Sube tus Facturas de Gmail",
    image: "",
    contactType: "example@gmail.com",
  },
  {
    id: 2,
    automateName: "Sube tus Facturas de Outlook",
    image: "",
    contactType: "example@gmail.com",
  },
  {
    id: 3,
    automateName: "Sube tus Facturas de Google Drive",
    image: "",
    contactType: "example@gmail.com",
  },
  {
    id: 4,
    automateName: "Sube tus Facturas de Dropbox",
    image: "",
    contactType: "example@gmail.com",
  },
  {
    id: 5,
    automateName: "Recibe Facturas desde WhatsApp",
    image: "",
    contactType: "+00000000",
  },
];

const Automate = () => {
  return (
    <div style={{ padding: 24 }}>
      <TitleComponent title="Automatiza" />
      <SearchComponent />

      {cards.map((card) => (
        <CardAutomate
          key={card.id}
          name={card.automateName}
          image={card.image}
          contactType={card.contactType}
        />
      ))}
    </div>
  );
};

export default Automate;
