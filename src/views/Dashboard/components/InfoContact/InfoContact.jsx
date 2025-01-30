import React, { useRef, useState } from 'react';
import styles from './InfoContact.module.css';
import check from '../../assets/checkProgram.svg';
import PayMethod from '../PayMethod/PayMethod';
import { ReactComponent as ImageEmpty } from '../../assets/ImageEmpty.svg';
const InfoContact = () => {
  const inputRefs = useRef({});
  const [sectionSelected, setSectionSelected] = useState(0);
  const toggleEdit = (field) => {
    setEditFields((prev) => {
      const newState = { ...prev, [field]: !prev[field] };

      if (!prev[field]) {
        setTimeout(() => {
          inputRefs.current[field]?.focus();
        }, 0);
      }

      return newState;
    });
  };

  const handleChange = (field, value) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  const [fieldValues, setFieldValues] = useState({
    companyName: '',
    email: '',
    phoneNumber: '',
    web: '',
    details: [],
    taxNumber: '',
    preferredCurrency: '',
    paymentMethods: '',
  });
  const [editFields, setEditFields] = useState({
    companyName: false,
    email: false,
    phoneNumber: false,
    web: false,
    details: false,
    taxNumber: false,
    preferredCurrency: false,
    paymentMethods: false,
  });

  const categoriesTitles = {
    companyName: 'Nombre de la empresa',
    email: 'Email',
    phoneNumber: 'Teléfono',
    web: 'Web o dominio corporativo',
    details: 'Detalles de Facturación',
    taxNumber: 'Número Fiscal',
    preferredCurrency: 'Moneda Preferida',
    paymentMethods: 'Métodos de Pago',
  };
  const placeholdersValues = {
    companyName: 'John Doe',
    email: 'john.doe@gmail.com',
    phoneNumber: 'Desconocido',
    web: 'www.web.com',
    details: 'Email adress, Zip code / Postcode, Country of residence',
    taxNumber: 'Desconocido',
    preferredCurrency: 'EUR',
    paymentMethods: 'Desconocido',
  };

  return (
    <div>
      <div className={styles.saveContact}>
        Guardar Contacto para Futuras Transacciones
      </div>
      <div className={styles.seeTransactions}>
        <div>
          Guardado <img src={check} alt="" />
        </div>
        <button>Ver Transacciones</button>
      </div>
      <div className={styles.typeClient}>
        <ImageEmpty />
        <div className={styles.btnSectionsSelector}>
          <button
            className={`${sectionSelected == 0 ? styles.sectionSelect : ''}`}
            onClick={() => setSectionSelected(0)}
          >
            Trabajador
          </button>
          <button
            className={`${sectionSelected == 1 ? styles.sectionSelect : ''}`}
            onClick={() => setSectionSelected(1)}
          >
            Cliente
          </button>
          <button
            className={`${sectionSelected == 2 ? styles.sectionSelect : ''}`}
            onClick={() => setSectionSelected(2)}
          >
            Proveedor
          </button>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        {Object.keys(fieldValues).map((field) => (
          <div key={field} className={styles.detailItem}>
            <div className={styles.rowSpaced}>
              <span className={styles.detailTitle}>
                {categoriesTitles[field]}
              </span>
              <span
                className={styles.detailEdit}
                onClick={() => toggleEdit(field)}
              >
                {editFields[field] ? 'Añadir' : 'Editar'}
              </span>
            </div>
            <div className={styles.detailContent}>
              {editFields[field] ? (
                <input
                  type="text"
                  placeholder={placeholdersValues[field]}
                  className={styles.inputEdit}
                  value={fieldValues[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  ref={(el) => (inputRefs.current[field] = el)}
                />
              ) : (
                <span className={styles.fieldSpan}>
                  {fieldValues[field].length
                    ? fieldValues[field]
                    : placeholdersValues[field]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <PayMethod />
    </div>
  );
};

export default InfoContact;
