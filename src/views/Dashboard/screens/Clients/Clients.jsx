import React, { useState } from 'react';
import styles from './Clients.module.css';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import searchGray from '../../assets/searchGray.png';
import searchWhite from '../../assets/searchWhite.png';
import newClientIcon from '../../assets/newClientIcon.svg';
import clock from '../../assets/clock.png';
import edit from '../../assets/edit.png';
import plusIcon from '../../assets/Plus Icon.png';
import optionDots from '../../assets/optionDots.svg';
import filterSearch from '../../assets/Filters Search.png';
import { useTranslation } from 'react-i18next';
const Clients = () => {
  const { t } = useTranslation('clients');
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const [clientSelected, setClientSelected] = useState([]);
  const [showNewClient, setShowNewClient] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [web, setWeb] = useState('');
  const [countryCode, setCountryCode] = useState('+34');
  const [emailAddress, setEmailAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [residence, setResidence] = useState('');
  const [fiscalNumber, setFiscalNumber] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const selectClient = (rowIndex) => {
    setClientSelected((prevItem) => {
      if (prevItem.includes(rowIndex)) {
        return prevItem.filter((i) => i !== rowIndex);
      } else {
        return [...prevItem, rowIndex];
      }
    });
  };

  const selectAllClients = () => {
    if (clientSelected.length > 0) {
      // Si ya hay clientes seleccionados, limpiar la selección
      setClientSelected([]);
    } else {
      // Si no hay clientes seleccionados, agregar todos los índices
      const allClientIndexes = tableData.map((_, index) => index); // Crear un arreglo con los índices
      setClientSelected(allClientIndexes);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const tableHeaders = [
    t('tableCol1'),
    t('tableCol2'),
    t('tableCol3'),
    t('tableCol4'),
    t('tableCol5'),
    t('tableCol6'),
    t('tableCol7'),
    t('tableCol8'),
  ];

  const tableData = [
    {
      nombre: 'Aythen',
      email: ['info@aythen.com', 'support@aythen.com'],
      telefono: '+34600789012',
      direccion: 'Calle A, Barcelona',
      numeroFiscal: 'ES123456789',
      metodosPago: ['Visa ****1234', 'Paypal: juan@gmail.com'],
      moneda: 'EUR',
    },
    {
      nombre: 'Aythen',
      email: 'info@aythen.com',
      telefono: '+584243356112',
      direccion: 'Calle A, Barcelona',
      numeroFiscal: 'ES123456789',
      metodosPago: ['Visa ****1234', 'Paypal: juan@gmail.com'],
      moneda: 'EUR',
    },
  ];

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  };

  return (
    <div>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <h2>{t('title')}</h2>
          <div className={styles.searchContainer}>
            <button className={styles.addButton}>
              <img src={plusIcon} alt='Nuevo cliente' />
              {t('buttonNewClient')}
            </button>
            <button className={styles.infoBtn}>Analíticas</button>

            <div className={styles.inputWrapper}>
              <img src={searchGray} className={styles.inputIconInside} />
              <input
                type='text'
                placeholder={t('placeholderSearch')}
                value={search}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              <div className={styles.inputIconOutsideContainer}>
                <img src={filterSearch} className={styles.inputIconOutside} />
              </div>
            </div>
            <button className={styles.addButton}>
              <img src={plusIcon} />
            </button>
          </div>
        </div>

        <div className={styles.clientsTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.small}>
                  <input
                    type='checkbox'
                    name='clientSelected'
                    checked={
                      clientSelected.length == tableData.length ? true : false
                    }
                    onClick={selectAllClients}
                  />
                </th>
                {tableHeaders.map((header, index) => (
                  <th key={index} className={index == 7 ? styles.hola : ''}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type='checkbox'
                      name='clientSelected'
                      onClick={() => selectClient(rowIndex)}
                      checked={clientSelected.includes(rowIndex) ? true : false}
                    />
                  </td>
                  <td className={styles.name}>{row.nombre}</td>
                  <td>
                    {Array.isArray(row.email)
                      ? row.email.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.email}
                  </td>
                  <td>{formatPhoneNumber(row.telefono)}</td>
                  <td>{row.direccion}</td>
                  <td>{row.numeroFiscal}</td>
                  <td>
                    {Array.isArray(row.metodosPago)
                      ? row.metodosPago.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.metodosPago}
                  </td>
                  <td>{row.moneda}</td>
                  <td className={styles.actions}>
                    <div className={styles.transacciones}>
                      <a href='#'>Ver</a>
                      <span>(2.345)</span>
                    </div>
                    <div>
                      <img src={optionDots} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showNewClient && (
        <>
          <div
            className={styles.bg}
            onClick={() => setShowNewClient(false)}
          ></div>
          <div className={styles.newClientContainer}>
            <div className={styles.containerHeader}>
              <h3>John Doe</h3>
              <span onClick={() => setShowNewClient(false)}>
                <img src={closeIcon} />
              </span>
            </div>

            <form className={styles.newClientForm}>
              <label>
                <div className={styles.row}>
                  <p>Nombre completo</p>
                  <button type='button'>Editar</button>
                </div>
                John Doe
                <input
                  type='text'
                  placeholder='John Doe'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Email</p>
                  <button type='button'>Editar</button>
                </div>
                j***e@gmail.com
                <input
                  type='email'
                  placeholder='john.doe@gmail.com'
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <span className={styles.error}>{emailError}</span>
                )}
              </label>

              <label className={styles.label}>
                <div className={styles.row}>
                  <p>Teléfono</p>
                  <button type='button'>Editar</button>
                </div>
                +34 000 000 000
                <div className={styles.phoneInputs}>
                  <select
                    className={styles.countrySelect}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value='+34'>España (+34)</option>
                    <option value='+1'>Estados Unidos (+1)</option>
                    <option value='+44'>Reino Unido (+44)</option>
                    <option value='+52'>México (+52)</option>
                    <option value='+91'>India (+91)</option>
                    {/* Agrega más países según sea necesario */}
                  </select>
                  <input
                    type='text'
                    placeholder='000 000 000'
                    className={styles.numberInput}
                    value={formatPhoneNumber(phone)}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </label>

              <label>
                <div className={styles.row}>
                  <p>Web o dominio corporativo</p>
                  <button type='button'>Editar</button>
                </div>
                www.web.com
                <input
                  type='text'
                  placeholder='www.web.com'
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Detalles de Facturación</p>
                  <button type='button'>Añadir</button>
                </div>
                <div className={styles.details}>
                  <input
                    type='text'
                    placeholder='Email address'
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <input
                    type='text'
                    placeholder='Zip code / Postcode'
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                Country of residence
                <input
                  type='text'
                  placeholder='Spain'
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                />
                Email adress, Zip code / Postcode, Country of residence
                <div>
                  <button type='button'>Editar</button>
                </div>
                Email adress, Zip code / Postcode, Country of residence
                <div>
                  <button type='button'>Editar</button>
                </div>
              </label>

              <label>
                <div className={styles.row}>
                  <p>Número Fiscal</p>
                  <button type='button'>Editar</button>
                </div>
                Desconocido
                <input
                  type='text'
                  placeholder='000 000 000'
                  value={fiscalNumber}
                  onChange={(e) => setFiscalNumber(e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Moneda Preferida</p>
                  <button type='button'>Editar</button>
                </div>
                EUR
                <input
                  type='text'
                  placeholder='EUR'
                  value={preferredCurrency}
                  onChange={(e) => setPreferredCurrency(e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Métodos de Pago</p>
                  <button type='button'>Añadir</button>
                </div>
                <div className={styles.row}>Card number</div>
                <div className={styles.inputContainer}>
                  <input
                    type='text'
                    placeholder='1234 1234 1234 1234'
                    className={styles.input}
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <img
                    src={creditCard}
                    alt='Credit Card Icon'
                    className={styles.icon}
                  />
                </div>
              </label>
              <div className={styles.btnOptionsContainer}>
                <button className={styles.view}>Ver Transacciones</button>
                <button className={styles.new}>Nueva Factura</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Clients;
