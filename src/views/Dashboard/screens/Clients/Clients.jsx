import React, { useEffect, useState } from 'react';
import styles from './Clients.module.css';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import searchGray from '../../assets/searchGray.png';
import { ReactComponent as ArrowUp } from '../../assets/arrowDownGray.svg';
import plusIcon from '../../assets/Plus Icon.png';
import optionDots from '../../assets/optionDots.svg';
import closeIcon from '../../assets/closeMenu.svg';
import filterSearch from '../../assets/Filters Search.png';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Minus } from '../../assets/minus.svg';

import l from '../../assets/lIcon.svg';

import { useDispatch, useSelector } from 'react-redux';
import {
  createClient,
  deleteClients,
  getAllUserClients,
  getOneClient,
  updateClient,
} from '../../../../actions/clients';
import { clearClient, setClient } from '../../../../slices/clientsSlices';
import { useNavigate } from 'react-router-dom';
import EditableInput from './EditableInput/EditableInput';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import ProfileModalTemplate from '../../components/ProfileModalTemplate/ProfileModalTemplate';
import { ParametersLabel } from '../../components/ParametersLabel/ParametersLabel';
import { clearTransaction } from '../../../../slices/transactionsSlices';
import FileExplorer from '../../components/FileExplorer/FileExplorer';
// import { getEmailsByQuery } from '../../../../actions/user';
import PanelTemplate from '../../components/PanelTemplate/PanelTemplate';
import PayMethod from '../../components/PayMethod/PayMethod';

const Clients = () => {
  const { t } = useTranslation('clients');
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const [clientSelected, setClientSelected] = useState([]);
  const [showNewClient, setShowNewClient] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectTypeClient, setSelectTypeClient] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { allClients, allUsers } = useSelector((state) => state.user);

  const { clients, loading, client } = useSelector((state) => state.clients);

  const [clientData, setClientData] = useState({
    clientName: '',
    companyEmail: '',
    companyPhoneNumber: '',
    codeCountry: '',
    webSite: '',
    billingEmail: '',
    clientZip: '',
    country: '',
    clientCif: '',
    preferredCurrency: '',
    cardNumber: '',
    companyAddress: '',
    companyCity: '',
    companyProvince: '',
    companyCountry: '',
  });

  useEffect(() => {
    dispatch(getAllUserClients({ userId: user?.id }));
  }, [loading, user]);

  useEffect(() => {
    if (client?.clientData) {
      setClientData({
        clientName: client.clientData.clientName || '',
        companyEmail: client.clientData.companyEmail || '',
        companyPhoneNumber: client.clientData.companyPhoneNumber || '',
        codeCountry: client.clientData.codeCountry || '',
        webSite: client.clientData.webSite || '',
        billingEmail: client.email || '',
        clientZip: client.clientData.clientZip || '',
        country: client.clientData.country || '',
        clientCif: client.clientData.clientCif || '',
        preferredCurrency: client.clientData.preferredCurrency || '',
        cardNumber: client.clientData.cardNumber || '',
        companyAddress: client.clientData.companyAddress || '',
        companyCity: client.clientData.companyCity || '',
        companyProvince: client.clientData.companyProvince || '',
        companyCountry: client.clientData.companyCountry || '',
      });
    } else {
      setClientData({
        clientName: '',
        companyEmail: '',
        companyPhoneNumber: '',
        codeCountry: '',
        webSite: '',
        billingEmail: '',
        clientZip: '',
        country: '',
        clientCif: '',
        preferredCurrency: '',
        cardNumber: '',
        companyAddress: '',
        companyCity: '',
        companyProvince: '',
        companyCountry: '',
      });
    }
  }, [client]);

  const handleClientData = (field, value) => {
    const formattedValue =
      field === 'cardNumber' ? formatCardNumber(value) : value;

    setClientData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const [clientId, setClientId] = useState();

  const selectClient = (rowIndex, client) => {
    setClientId(client?.id);
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
    return phoneNumber?.replace(
      /(\+\d{2})(\d{3})(\d{3})(\d{3})/,
      '$1 $2 $3 $4'
    );
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    const userId = user?.id;
    const email = user?.email;

    console.log('CLIENTESSSSSSSSSS', clientData);
    if (client && client.clientData) {
      dispatch(
        updateClient({
          clientId: client?.id,
          toUpdate: clientData,
          userId: userId,
        })
      )
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            setShowNewClient(false);
          } else {
            console.error('Error creating client:', result.error);
          }
        })
        .catch((error) => {
          console.error('Unexpected error:', error);
        });
    } else {
      dispatch(createClient({ userId, email, clientData }))
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            setShowNewClient(false);
          } else {
            console.error('Error creating client:', result.error);
          }
        })
        .catch((error) => {
          console.error('Unexpected error:', error);
        });
    }
  };

  const toggleClientSelection = async (clientId) => {
    setSelectedClientIds((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
    console.log('users', allUsers);
    console.log('toggling clientId', clientId);
    console.log('allClients', allClients);
    let singleUser = allClients[0];
    // const response = await dispatch(
    //   getEmailsByQuery({
    //     userId: singleUser?.id || 'randomId',
    //     email: singleUser.tokenEmail,
    //     password: singleUser.tokenPassword,
    //     query: singleUser.emailQueries,
    //     tokenGpt: singleUser.tokenGPT,
    //     logs: [],
    //     ftpData: {
    //       host: singleUser.host,
    //       port: singleUser.port,
    //       user: singleUser.tokenUser,
    //       password: singleUser.tokenUserPassword,
    //     },
    //   })
    // );
    // console.log('RESPONSE==', response);
  };

  const handleDeleteClient = (e, clientID) => {
    e.preventDefault();

    dispatch(
      deleteClients({
        clientIds: clientID ? [clientID] : selectedClientIds,
        userId: user?.id,
      })
    )
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          console.log('Clients deleted successfully');
          setSelectedClientIds([]);
        } else {
          console.error('Error deleting clients:', result.error);
        }
      })
      .catch((error) => {
        console.error('Unexpected error:', error);
      });
  };

  const handleActions = (rowIndex, client) => {
    dispatch(setClient(client));
    setSelectedRowIndex(selectedRowIndex === rowIndex ? null : rowIndex);
  };

  const handleEditClient = () => {
    setShowNewClient(true);
  };

  const handleGetOneClient = async (clientId) => {
    console.log('CLIENTIDDD', clientId);

    try {
      const response = await dispatch(
        getOneClient({ userId: user?.id, clientId })
      ).unwrap();
      console.log('Cliente obtenido:', response);
      navigate('/admin/transactions');
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
    }
  };

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      dispatch(clearClient());
      setShowNewClient(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showNewClient) {
        setIsAnimating(true);
        setTimeout(() => {
          dispatch(clearClient());
          setShowNewClient(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showNewClient]);

  console.log('CLIENTSSSS', clients);
  const handleChange = ({ name, newValue }) => {
    console.log(`Setting ${name} to ${newValue}`);
  };

  const [clientDataInputs, setClientDataInputs] = useState({
    name: '',
    email: '',
    phone: '',
    web: '',
    info: [],
    parameters: [],
  });
  const [inputsEditing, setInputsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    web: false,
    info: false,
  });

  const addParameter = () => {
    setClientDataInputs((prev) => ({
      ...prev,
      parameters: [...prev.parameters, { name: '', value: '' }],
    }));
  };

  const deleteParameter = (index) => {
    setClientDataInputs((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index),
    }));
  };

  const [isParametersVisible, setIsParametersVisible] = useState(true);

  const toggleParametersVisibility = () => {
    setIsParametersVisible((prev) => !prev);
  };

  const [editingIndices, setEditingIndices] = useState([]);
  console.log('DATAAAAA--------', clientData);

  return (
    <PanelTemplate>
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
        <div className={styles.clientsHeader}>
          <h2>{t('title')}</h2>
          <div className={styles.searchContainer}>
            <button
              className={`${styles.addButton} ${styles.btnNewClient}`}
              onClick={() => setShowNewClient(true)}
            >
              <img src={plusIcon} alt="Nuevo cliente" />
              {t('buttonNewClient')}
            </button>
            {/* <button className={styles.infoBtn}>Analíticas</button> */}
            <div className={styles.inputWrapper}>
              <img src={searchGray} className={styles.inputIconInside} />
              <input
                type="text"
                placeholder={t('placeholderSearch')}
                value={search}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              {/* <div className={styles.inputIconOutsideContainer}>
                  <img src={filterSearch} className={styles.inputIconOutside} />
                </div> */}
              <div
                style={{ marginLeft: '5px' }}
                className={styles.searchIconsWrappers}
              >
                <img src={l} alt="kIcon" />
              </div>
            </div>
            {/* <button className={styles.addButton}>
                <img src={plusIcon} />
              </button> */}
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
                      selectedClientIds.length == tableData.length
                        ? true
                        : false
                    }
                    onClick={selectAllClients}
                  />
                </th>
                {tableHeaders.map((header, index) => (
                  <th key={index} className={styles.small}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients &&
                clients.map((client, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <input
                        type="checkbox"
                        name="clientSelected"
                        // onClick={() => selectClient(rowIndex, row)}
                        onChange={() => toggleClientSelection(client?.id)}
                      // checked={
                      //   clientSelected.includes(rowIndex) ? true : false
                      // }
                      />
                    </td>
                    <td className={styles.name}>
                      {client.clientData.clientName}
                    </td>
                    <td>{client?.clientData.companyEmail || client.email}</td>

                    {/* <td>
                    {Array.isArray(row.email)
                      ? row.email.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.email}
                  </td> */}
                    <td>{client.clientData.companyPhoneNumber}</td>
                    <td>
                      {client.clientData.companyAddress}{' '}
                      {client.clientData.clientProvice}
                    </td>
                    <td>{client.clientData.taxNumber}</td>
                    <td>{client.clientData.cardNumber}</td>
                    {/* <td>
                    {Array.isArray(row.metodosPago)
                      ? row.metodosPago.map((item, itemIndex) => (
                          <p key={itemIndex}>{item}</p>
                        ))
                      : row.metodosPago}
                  </td> */}
                    <td>{client.clientData.preferredCurrency}</td>
                    <td className={styles.actions}>
                      <div className={styles.transacciones}>
                        <a
                          onClick={() => {
                            dispatch(clearTransaction());
                            handleGetOneClient(client.id);
                          }}
                          href="#"
                        >
                          Ver
                        </a>
                        <span>(2.345)</span>
                      </div>
                      <div onClick={() => handleActions(rowIndex, client)}>
                        <img src={optionDots} />
                      </div>
                      {selectedRowIndex === rowIndex && (
                        <ul className={styles.content_menu_actions}>
                          <li
                            onClick={() => {
                              handleEditClient();
                              setSelectedRowIndex(null);
                            }}
                            className={styles.item_menu_actions}
                          >
                            Editar
                          </li>
                          <li
                            onClick={(e) => {
                              handleDeleteClient(e, client?.id);
                              setSelectedRowIndex(null);
                            }}
                            className={styles.item_menu_actions}
                          >
                            Eliminar
                          </li>
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showNewClient && (
        <>
          <ModalTemplate
            actionSave={handleCreateClient}
            onClick={handleCloseNewClient}
          >
            <div
              className={`${styles.newClientContainer} ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
            >
              {/* <div className={styles.containerHeader}>
                <h3>John Doe</h3>
                <span onClick={handleCloseNewClient}>
                  <img src={closeIcon} />
                </span>
              </div> */}

              <form
                className={styles.newClientForm}
                onSubmit={handleCreateClient}
              >
                <EditableInput
                  label={'Nombre completo'}
                  nameInput={'nombre'}
                  placeholderInput={clientData.clientName || 'yeremi'}
                  isEditing={inputsEditing.name}
                  value={clientData.clientName || clientDataInputs.name}
                  onChange={(e) => {
                    setClientDataInputs({
                      ...clientDataInputs,
                      name: e.target.value,
                    });
                    handleClientData('clientName', e.target.value);
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      name: !prev.name,
                    }))
                  }
                >
                  <div
                    className={`
                    ${styles.typeClient}
                    ${inputsEditing.name
                        ? styles.typeClientActivate
                        : styles.typeClientDisabled
                      }
                      `}
                  >
                    <button
                      className={selectTypeClient == 0 && styles.selected}
                      onClick={() => setSelectTypeClient(0)}
                      type="button"
                      disabled={!inputsEditing.name}
                    >
                      Proveedor
                    </button>
                    <button
                      className={selectTypeClient == 1 && styles.selected}
                      onClick={() => setSelectTypeClient(1)}
                      type="button"
                      disabled={!inputsEditing.name}
                    >
                      Cliente
                    </button>
                  </div>
                </EditableInput>

                <EditableInput
                  label={'Email'}
                  nameInput={'email'}
                  placeholderInput={'johndoe@gmail.com'}
                  isEditing={inputsEditing.email}
                  value={clientData.companyEmail || clientDataInputs.email}
                  onChange={(e) => {
                    setClientDataInputs({
                      ...clientDataInputs,
                      email: e.target.value,
                    });
                    handleClientData('companyEmail', e.target.value);
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      email: !prev.email,
                    }))
                  }
                />

                {/* <EditableInput
                  label={"Teléfono"}
                  nameInput={"phone"}
                  placeholderInput={"phone"}
                  isEditing={inputsEditing.phone}
                  value={
                    clientData.companyPhoneNumber || clientDataInputs.phone
                  }
                  phone={true}
                  onChange={(e) => {
                    setClientDataInputs({
                      ...clientDataInputs,
                      phone: e.target.value,
                    });
                    handleClientData("companyPhoneNumber", e.target.value);
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({
                      ...prev,
                      phone: !prev.phone,
                    }))
                  }
                /> */}
                <div className={styles.phoneContainer}>
                  <select /*disabled={!isEditing}*/>
                    <option value="34">España, (+34)</option>
                    <option value="1">Estados Unidos, (+1)</option>
                    <option value="52">México, (+52)</option>
                    <option value="54">Argentina, (+54)</option>
                    <option value="55">Brasil, (+55)</option>
                    <option value="44">Reino Unido, (+44)</option>
                    <option value="33">Francia, (+33)</option>
                    <option value="49">Alemania, (+49)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="000 000 000"
                    value={clientData.companyPhoneNumber || ''}
                    onChange={(e) =>
                      handleClientData('companyPhoneNumber', e.target.value)
                    }
                  /*disabled={!isEditing}*/
                  />
                  <div
                    className={styles.delete}
                  // onClick={onDelete}
                  /*style={{ background: !isEditing && "#dd7a84" }}*/
                  >
                    <Minus className={styles.icon} />
                  </div>
                </div>
                <EditableInput
                  label={'Web o dominio corporativo'}
                  nameInput={'web'}
                  placeholderInput={'www.web.com'}
                  isEditing={inputsEditing.web}
                  value={clientData.webSite || clientDataInputs.web}
                  onChange={(e) => {
                    handleClientData('webSite', e.target.value);
                    setClientDataInputs({
                      ...clientDataInputs,
                      web: e.target.value,
                    });
                  }}
                  onClick={() =>
                    setInputsEditing((prev) => ({ ...prev, web: !prev.web }))
                  }
                />

                <label>
                  <div>
                    <div className={styles.detailsBill}>
                      <p>Detalles de Facturación</p>
                      <div>
                        <button type="button">
                          Añadir Detalles de Facturación
                        </button>
                        <button type="button">
                          Guardar Detalles de Facturación
                        </button>
                      </div>
                    </div>
                    <div className={styles.infoBill}>
                      <span>
                        Dirección, Población, Provincia, Código Postal, País
                      </span>
                      <div
                        className={styles.button}
                        onClick={() =>
                          setInputsEditing((prev) => ({
                            ...prev,
                            info: !prev.info,
                          }))
                        }
                      >
                        Editar
                      </div>
                    </div>
                  </div>
                  <div className={styles.info1}>
                    <div className={styles.info}>
                      <span>Dirección</span>
                      <input
                        type="text"
                        disabled={!inputsEditing.info}
                        placeholder="000 000"
                        value={clientData.companyAddress || ''}
                        onChange={(e) =>
                          handleClientData('companyAddress', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.info}>
                      <span>Población</span>
                      <input
                        type="text"
                        disabled={!inputsEditing.info}
                        placeholder="000 000"
                      />
                    </div>
                    <div className={styles.info}>
                      <span>Código Postal</span>
                      <input
                        type="text"
                        disabled={!inputsEditing.info}
                        value={clientData.clientZip || ''}
                        placeholder="000 000"
                        onChange={(e) =>
                          handleClientData('clientZip', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.info}>
                      <span>Provincia</span>
                      <input
                        type="text"
                        disabled={!inputsEditing.info}
                        placeholder="000 000"
                        value={clientData.companyProvince || ''}
                        onChange={(e) =>
                          handleClientData('companyProvince', e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.info}>
                      <span>País</span>
                      <input
                        type="text"
                        disabled={!inputsEditing.info}
                        placeholder="000 000"
                        value={clientData.companyCountry || ''}
                        onChange={(e) =>
                          handleClientData('companyCountry', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </label>

                <label>
                  <div>
                    <div className={styles.detailsBill}>
                      <p>Métodos de Pago</p>
                      <div>
                        <button type="button">Añadir Método de Pago</button>
                        <button type="button">Guardar Método de Pago</button>
                      </div>
                    </div>
                  </div>
                  <PayMethod />
                </label>

                <ParametersLabel
                  parameters={clientDataInputs.parameters}
                  setClientDataInputs={setClientDataInputs}
                  editingIndices={editingIndices}
                  setEditingIndices={setEditingIndices}
                />
              </form>
            </div>
            <ProfileModalTemplate />
          </ModalTemplate>
        </>
      )}
    </PanelTemplate>
  );
};

export default Clients;
