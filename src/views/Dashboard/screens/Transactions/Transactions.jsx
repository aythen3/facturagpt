import React, { useState } from 'react';
import styles from './Transactions.module.css';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import searchGray from '../../assets/searchGray.png';
import optionDots from '../../assets/optionDots.svg';
import plusIcon from '../../assets/Plus Icon.png';
import filterSearch from '../../assets/Filters Search.png';
import creditCard from '../../assets/creditCardIcon.png';
import closeIcon from '../../assets/closeMenu.svg';
import pdf from '../../assets/pdfIcon.png';
const Transactions = () => {
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

  const getStateClass = (state) => {
    switch (state.toLowerCase()) {
      case 'pagada':
        return styles.pagada;
      case 'pendiente':
        return styles.pendiente;
      case 'incumplida':
        return styles.incumplida;
      case 'vencida':
        return styles.vencida;
      case 'anulada':
        return styles.anulada;
      default:
        return '';
    }
  };

  const tableHeaders = [
    'ID Transacción',
    'Descripción y Categoria',
    'Etiquetas',
    'Total',
    'Fecha',
    'Vencimiento',
    'Método de Pago',
    'Estado',
    'Artículos',
  ];

  const tableData = [
    {
      id: 'T001',
      desc: ['Gasto', 'Gastos Operativos'],
      total: '00,00EUR',
      date: '25 Dec 2025',
      expire: '25 Dec 2025',
      PayMethod: 'Mastercard ****5678',
      state: 'Pagada',
    },
    {
      id: 'T001',
      desc: ['Gasto', 'Gastos Operativos'],
      total: '00,00EUR',
      date: '25 Dec 2025',
      expire: '25 Dec 2025',
      PayMethod: 'Mastercard ****5678',
      state: 'Pendiente',
    },
    {
      id: 'T001',
      desc: ['Gasto', 'Gastos Operativos'],
      total: '00,00EUR',
      date: '25 Dec 2025',
      expire: '25 Dec 2025',
      PayMethod: 'Mastercard ****5678',
      state: 'Incumplida',
    },
    {
      id: 'T001',
      desc: ['Gasto', 'Gastos Operativos'],
      total: '00,00EUR',
      date: '25 Dec 2025',
      expire: '25 Dec 2025',
      PayMethod: 'Mastercard ****5678',
      state: 'Vencida',
    },
    {
      id: 'T001',
      desc: ['Gasto', 'Gastos Operativos'],
      total: '00,00EUR',
      date: '25 Dec 2025',
      expire: '25 Dec 2025',
      PayMethod: 'Mastercard ****5678',
      state: 'Anulada',
    },
  ];

  //   const formatCardNumber = (value) => {
  //     return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  //   };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(emailValue)) {
    //   setEmailError('El correo electrónico no es válido.');
    // } else {
    //   setEmailError('');
    // }
  };

  return (
    <div>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <div className={styles.infoClient}>
            <div className={styles.contactInfo}>
              <h3>Aythen</h3>
              <span>info@aythen.com</span>
              <span>+34 600 789 012</span>
            </div>
            <div className={styles.info}>
              <p>Número Fiscal</p>
              <span>Desconocido</span>
            </div>
            <div className={styles.info}>
              <p>ID Cliente</p>
              <span>C001</span>
            </div>
          </div>
          <div className={styles.searchContainer}>
            <button
              className={styles.infoBtn}
              onClick={() => setShowNewClient(true)}
            >
              <img src={plusIcon} alt="" />
              Nueva transacción
            </button>

            <div className={styles.inputWrapper}>
              <img src={searchGray} className={styles.inputIconInside} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              <div className={styles.inputIconOutsideContainer}>
                <img src={filterSearch} className={styles.inputIconOutside} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.clientsTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.small}>
                  <input
                    type="checkbox"
                    name="clientSelected"
                    checked={
                      clientSelected.length == tableData.length ? true : false
                    }
                    onClick={selectAllClients}
                  />
                </th>
                {tableHeaders.map((header, index) => (
                  <th key={index} className={index == 8 ? styles.small : ''}>
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
                      type="checkbox"
                      name="clientSelected"
                      onClick={() => selectClient(rowIndex)}
                      checked={clientSelected.includes(rowIndex) ? true : false}
                    />
                  </td>
                  <td className={styles.idContainer}>
                    <img src={pdf} className={styles.pdfIcon} />
                    {row.id}
                  </td>
                  <td>
                    {Array.isArray(row.desc)
                      ? row.desc.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.desc}
                  </td>
                  <td>
                    <div className={styles.tags}>
                      <span className={`${styles.tag} ${styles.tagBlack}`}>
                        Etiqueta
                      </span>
                      <span className={`${styles.tag} ${styles.tagBlue}`}>
                        Etiqueta
                      </span>
                      <span className={`${styles.tag} ${styles.tagRed}`}>
                        Etiqueta
                      </span>
                      <span className={`${styles.tag} ${styles.tagGreen}`}>
                        Etiqueta
                      </span>
                    </div>
                  </td>
                  <td>{row.total}</td>
                  <td>{row.date}</td>
                  <td>{row.expire}</td>
                  <td>{row.PayMethod}</td>
                  <td className={getStateClass(row.state)}>
                    <span>&bull;</span>
                    {row.state}
                  </td>
                  <td className={styles.actions}>
                    <div className={styles.transacciones}>
                      <a href="#">Ver</a>
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
                  <button type="button">Editar</button>
                </div>
                John Doe
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Email</p>
                  <button type="button">Editar</button>
                </div>
                j***e@gmail.com
                <input
                  type="email"
                  placeholder="john.doe@gmail.com"
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
                  <button type="button">Editar</button>
                </div>
                +34 000 000 000
                <div className={styles.phoneInputs}>
                  <select
                    className={styles.countrySelect}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="+34">España (+34)</option>
                    <option value="+1">Estados Unidos (+1)</option>
                    <option value="+44">Reino Unido (+44)</option>
                    <option value="+52">México (+52)</option>
                    <option value="+91">India (+91)</option>
                    {/* Agrega más países según sea necesario */}
                  </select>
                  <input
                    type="text"
                    placeholder="000 000 000"
                    className={styles.numberInput}
                    value={formatPhoneNumber(phone)}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </label>

              <label>
                <div className={styles.row}>
                  <p>Web o dominio corporativo</p>
                  <button type="button">Editar</button>
                </div>
                www.web.com
                <input
                  type="text"
                  placeholder="www.web.com"
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Detalles de Facturación</p>
                  <button type="button">Añadir</button>
                </div>
                <div className={styles.details}>
                  <input
                    type="text"
                    placeholder="Email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Zip code / Postcode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                Country of residence
                <input
                  type="text"
                  placeholder="Spain"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                />
                Email adress, Zip code / Postcode, Country of residence
                <div>
                  <button type="button">Editar</button>
                </div>
                Email adress, Zip code / Postcode, Country of residence
                <div>
                  <button type="button">Editar</button>
                </div>
              </label>

              <label>
                <div className={styles.row}>
                  <p>Número Fiscal</p>
                  <button type="button">Editar</button>
                </div>
                Desconocido
                <input
                  type="text"
                  placeholder="000 000 000"
                  value={fiscalNumber}
                  onChange={(e) => setFiscalNumber(e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Moneda Preferida</p>
                  <button type="button">Editar</button>
                </div>
                EUR
                <input
                  type="text"
                  placeholder="EUR"
                  value={preferredCurrency}
                  onChange={(e) => setPreferredCurrency(e.target.value)}
                />
              </label>

              <label>
                <div className={styles.row}>
                  <p>Métodos de Pago</p>
                  <button type="button">Añadir</button>
                </div>
                <div className={styles.row}>Card number</div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className={styles.input}
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <img
                    src={creditCard}
                    alt="Credit Card Icon"
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

export default Transactions;
