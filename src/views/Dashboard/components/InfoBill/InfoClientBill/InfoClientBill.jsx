import React, { useState, useRef } from "react";
import styles from "./InfoClientBill.module.css";
import emptyImage from "../../../assets/ImageEmpty.svg";
import profile1 from "../../../assets/profile1.png";
import profile2 from "../../../assets/profile2.png";
import profile3 from "../../../assets/profile3.png";
import { ReactComponent as Lupa } from "../../../assets/searchGray.svg";
import { ReactComponent as PlusIconGray } from "../../../assets/plusIconGray.svg";

const InfoClientBill = ({
  name,
  address,
  setShowNewContact,
  textareaPlaceHolder,
  textHeader = "De",
}) => {
  const [editing, setEditing] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [toggleInputs, setToggleInput] = useState(true);
  const [contacts, setContacts] = useState([
    {
      name: "Nombre de la Cuenta 1",
      email: "email1@example.com",
      address:
        "Email adress, Dirección, Población, Provincia, Código Postal, País 1",
      imgUrl: profile1,
    },
    {
      name: "Nombre de la Cuenta 2",
      email: "email2@example.com",
      address:
        "Email adress, Dirección, Población, Provincia, Código Postal, País 2",
      imgUrl: profile2,
    },
    {
      name: "Nombre de la Cuenta 3",
      email: "email3@example.com",
      address:
        "Email adress, Dirección, Población, Provincia, Código Postal, País 3",
      imgUrl: profile3,
    },
  ]);
  const [selectedContact, setSelectedContact] = useState(null);

  const contactsRef = useRef(null);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setInputValue(contact.name);
    setIsFocused(false); // Cierra el dropdown después de seleccionar
  };

  // Manejar clics fuera del contenedor de contactos
  const handleBlur = (event) => {
    setTimeout(() => {
      if (
        contactsRef.current &&
        !contactsRef.current.contains(event.relatedTarget)
      ) {
        setIsFocused(false);
      }
    }, 100);
  };

  return (
    <div className={styles.columnInfoBill}>
      <div className={styles.headerInfoBill}>
        <p>{textHeader}</p>
        <div className={styles.search}>
          {!selectedContact ? (
            <div className={styles.searchContactContainer}>
              <Lupa
                className={styles.icon}
                onClick={() => setToggleInput((prev) => !prev)}
              />
            </div>
          ) : (
            <div
              className={styles.button}
              onClick={() => setEditing((prev) => !prev)}
            >
              {editing ? "Guardar" : "Editar"}
            </div>
          )}
        </div>
      </div>
      {selectedContact ? (
        <div className={styles.info}>
          <img
            src={selectedContact.imgUrl || emptyImage}
            alt="Profile picture"
          />
          <div className={styles.profile}>
            <input
              disabled={!editing}
              value={selectedContact?.name}
              onChange={(e) =>
                setSelectedContact({ ...selectedContact, name: e.target.value })
              }
            />
            <textarea
              disabled={!editing}
              value={selectedContact?.address}
              onChange={(e) =>
                setSelectedContact({
                  ...selectedContact,
                  address: e.target.value,
                })
              }
            />
          </div>
        </div>
      ) : toggleInputs ? (
        <div
          className={styles.inputContainer}
          style={{ background: !editing && "transparent" }}
        >
          <Lupa />
          <input
            type="text"
            placeholder="Buscar contacto..."
            disabled={!editing}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          {isFocused && inputValue.length > 0 && (
            <div className={styles.contacts} ref={contactsRef}>
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className={styles.contact}
                  onMouseDown={() => handleContactClick(contact)}
                >
                  <img
                    src={contact.imgUrl || emptyImage}
                    width={30}
                    height={30}
                    alt=""
                  />
                  <div>
                    <p>{contact.name}</p>
                    <span>
                      {contact.email}, {contact.address}
                    </span>
                  </div>
                </div>
              ))}
              <div
                className={styles.newContactInfoClient}
                onClick={() => {
                  setShowNewContact(true);
                  console.log("hola");
                }}
              >
                <PlusIconGray /> Nuevo contacto
              </div>
            </div>
          )}
        </div>
      ) : (
        <textarea
          placeholder={textareaPlaceHolder}
          disabled={!editing}
        ></textarea>
      )}
    </div>
  );
};

export default InfoClientBill;
