import React, { useState } from 'react';
import styles from './Clients.module.css';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import searchGray from '../../assets/searchGray.png';
import searchWhite from '../../assets/searchWhite.png';
import newClientIcon from '../../assets/newClientIcon.svg';
import ClientTable from '../../components/ClientTable/ClientTable';

const Clients = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const tableHeaders = [
    'Cliente',
    'Dirección física',
    'Métodos de pago',
    'Moneda Preferida',
    'Número Fiscal',
    'Historial de transacciones',
  ];

  const tableData = [
    {
      cliente: ['Aythen', 'info@gmail.com', '+34 123 456 789'],
      direccion: 'Calle A, Barcelona',
      metodosPago: ['Visa ****1234', 'Paypal: juan@gmail.com'],
      moneda: 'EUR',
      numeroFiscal: 'ES123456789',
      historial: 'icon',
    },
    {
      cliente: ['Carlos', 'carlos@gmail.com', '+34 987 654 321'],
      direccion: 'Calle B, Madrid',
      metodosPago: ['Mastercard ****5678', 'Transferencia bancaria'],
      moneda: 'USD',
      numeroFiscal: 'US987654321',
      historial: 'icon',
    },
    {
      cliente: ['Maria', 'maria@gmail.com', '+34 456 789 123'],
      direccion: 'Calle C, Valencia',
      metodosPago: ['Amex ****4321', 'Stripe: maria@stripe.com'],
      moneda: 'GBP',
      numeroFiscal: 'UK123456789',
      historial: 'icon',
    },
  ];

  return (
    <div>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <h2>Clientes</h2>
          <div className={styles.searchContainer}>
            <button className={styles.addButton}>
              <img src={newClientIcon} alt="Nuevo cliente" />
              Alta nuevo cliente
            </button>

            <div className={styles.inputWrapper}>
              <img
                src={searchGray}
                className={styles.inputIconInside}
                alt="Buscar"
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              <div className={styles.inputIconOutsideContainer}>
                <img
                  src={searchWhite}
                  className={styles.inputIconOutside}
                  alt="Buscar blanco"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.clientsTable}>
          <ClientTable tableHeaders={tableHeaders} tableData={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Clients;
