import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
  FaCheck,
  FaPlus,
} from "react-icons/fa";
import styles from "./Dashboard.module.css";

import userTick from "./assets/profile-tick.svg";
import userPlus from "./assets/userPlus.svg";
import monitor from "./assets/monitor.svg";
import profilePlus from "./assets/profilePlus.svg";
import circuit from "./assets/circuit.svg";
import magnify from "./assets/magnify.svg";
import openEmail from "./assets/openEmail.svg";
import plus from "./assets/plus.svg";
import listIcon from "./assets/listIcon.svg";
import profiles from "./assets/profiles.svg";
import dbIcon from "./assets/dbIcon.svg";
import analyticsIcon from "./assets/analyticsIcon.svg";
import monitorIcon from "./assets/monitorIcon.svg";
import greenArrow from "./assets/greenArrow.svg";
import redArrow from "./assets/redArrow.svg";
import { ReactComponent as Dots } from "./assets/optionDots.svg";
import { ReactComponent as ChatGPTIconGreen } from "./assets/chatGPTIconGreen.svg";
import { ReactComponent as FacturaGPTIcon } from "./assets/FacturaGPTW.svg";

import { useNavigate } from "react-router-dom";
import {
  getAllClients,
  getAllUsers,
  updateClient,
  getEmailsByQuery,
} from "../../actions/emailManager";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { MdOutlineMarkEmailRead } from "react-icons/md";
import Payment from "./screens/UserSettings/StripeComponents/Payment";
import { getPreviousPaymentDate, hasDatePassed } from "./utils/constants";
import SetupPayment from "./screens/UserSettings/StripeComponents/SetupPayment";
import { loadStripe } from "@stripe/stripe-js";
import UserSettings from "./screens/UserSettings/UserSettings";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);
import { useTranslation } from "react-i18next";
import i18n from "../../i18";
import { createClients } from "../../actions/clients";
import FileExplorer from "./components/FileExplorer/FileExplorer";

const Dashboard = () => {
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserSettings, setShowUserSettings] = useState(false);

  const { allClients, allUsers } = useSelector((state) => state.emailManager);
  const { user: userRedux } = useSelector((state) => state.user);
  const [filteredClients, setFilteredClients] = useState([]); // Store filtered and sorted clients
  const [searchQuery, setSearchQuery] = useState(""); // Store search query

  const [selectedOption, setSelectedOption] = useState("Todos"); // Selected filter
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ["Todos", "Activos", "Emails procesados", "Empresa A-Z"];

  useEffect(() => {
    console.log("ALL CLIENTS", allClients);
  }, [allClients]);

  const stats = [
    {
      icon: profiles,
      title: "# Clientes",
      value: allClients?.length,
      change: "16%",

      isPositive: true,
      toUserPermission: true,
    },
    {
      icon: profilePlus,
      multiple: [
        {
          title: "# Clientes Plus",
          value: 0,
          change: "1%",
          isPositive: false,
        },
        {
          title: "# Clientes Pro",
          value: 0,
          change: "1%",
          isPositive: false,
        },
        {
          title: "# Clientes Enterprise",
          value: 0,
          change: "1%",
          isPositive: false,
        },
      ],
    },
    {
      icon: monitorIcon,
      title: "# Reconocimientos",
      value: 0,
      change: "16%",
      isPositive: false,
    },
    {
      icon: analyticsIcon,
      title: "EUR Generado",
      change: "16%",
      isPositive: true,
      value: 0,
      currency: "EUR",
    },
    {
      icon: dbIcon,
      title: "# GB",
      change: "16%",
      isPositive: true,
      value: 0,
      currency: "TB",
    },
  ];

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    let updatedClients = [...allClients];

    if (searchQuery) {
      updatedClients = updatedClients.filter(
        (client) =>
          client.companyName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          client.tokenEmail
            .split("@")[0]
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    switch (selectedOption) {
      case "Activos":
        updatedClients = updatedClients.sort((a, b) => b.active - a.active);
        break;
      case "Emails procesados":
        updatedClients = updatedClients.sort(
          (a, b) =>
            (b.processedEmails?.length || 0) - (a.processedEmails?.length || 0)
        );
        break;
      case "Empresa A-Z":
        updatedClients = updatedClients.sort((a, b) =>
          (a.companyName || "").localeCompare(b.companyName || "")
        );
        break;
      default:
        break;
    }

    setFilteredClients(updatedClients);
  }, [allClients, searchQuery, selectedOption]);

  useEffect(() => {
    const checkUserPayments = async () => {
      for (const client of allClients) {
        const hasToPay = hasDatePassed(client.nextPaymentDate);
        // console.log(
        //   `Checking payment for ${client.tokenEmail}, has to pay?`,
        //   hasToPay
        // );

        if (hasToPay) {
          const startDate = getPreviousPaymentDate(client.nextPaymentDate);
          const endDate = client.nextPaymentDate;
          const paymentData = await checkUserMonthlyPayment(
            client,
            startDate,
            endDate
          );
          console.log(
            `This client has to pay ${paymentData?.finalPrice} euros`
          );

          if (paymentData?.finalPrice >= 0.5) {
            console.log(
              `This client has to pay ${paymentData.finalPrice} euros`
            );
            setShowPaymentModal(client.id);
            setAmountToPay(paymentData.finalPrice * 100);
            break;
          }
        }
      }
    };

    if (allClients?.length) {
      checkUserPayments();
    }
  }, [allClients]);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleUserActive = async (singleUser) => {
    console.log("USERIDDDDDD DASH--------", singleUser);
    // console.log("CLIENT", singleUser);
    dispatch(
      updateClient({
        clientId: singleUser.id,
        toUpdate: { active: !singleUser.active },
      })
    );
    if (!singleUser.active) {
      const response = await dispatch(
        getEmailsByQuery({
          userId: singleUser?.id || "randomId",
          email: singleUser.tokenEmail,
          password: singleUser.tokenPassword,
          query: singleUser.emailQueries,
          tokenGpt: singleUser.tokenGPT,
          logs: singleUser.processedEmails,
          ftpData: {
            host: singleUser.host,
            port: singleUser.port,
            user: singleUser.tokenUser,
            password: singleUser.tokenUserPassword,
          },
        })
      );
      // console.log("REPONSEEEE 1", response);

      if (response.meta.requestStatus === "fulfilled") {
        // console.log("ENTRE A LA CREACION DE CLIENTES");

        const clientsData = response.payload.processedAttachments.map(
          (attachment) => {
            const { xmlContent, ...attachmentWithoutXml } = attachment;

            const emailFromAttachment =
              attachmentWithoutXml.email.fromEmail[0].address;

            const emailIds = response.payload.filteredEmails
              .filter(
                (email) => email.fromEmail[0].address === emailFromAttachment
              )
              .map((email) => email.emailId);

            return {
              attachment: attachmentWithoutXml,
              email: emailFromAttachment,
              processedData: attachment.processedData,
              processedemails: emailIds,
            };
          }
        );

        const createdClientsResponse = await dispatch(
          createClients({
            userId: userRedux?.id,
            clientsData: clientsData,
          })
        );

        console.log("Clientes creados:", createdClientsResponse);
      }
    }
  };

  // useEffect(() => {
  //   dispatch(
  //     updateUser({ userId: user?.id, toUpdate: { role: "superadmin" } })
  //   );
  // }, []);

  const resetProcessedEmails = (user) => {
    dispatch(
      updateClient({
        clientId: user.id,
        toUpdate: { processedEmails: ["reset"] },
      })
    );
  };

  const checkUserMonthlyPayment = async (user, start, end) => {
    const getMonthlyCosts = ({
      startDate,
      endDate,
      detailedTokenConsumption,
    }) => {
      const pricing = {
        20000: 0.2,
        30000: 0.15,
        50000: 0.12,
        80000: 0.1,
        100000: 0.08,
      };

      const start = new Date(startDate).toISOString();
      const end = new Date(endDate).toISOString();

      const results = [];
      let totalTokensConsumed = 0;
      let totalTokensPrice = 0;

      for (const emailId in detailedTokenConsumption) {
        const record = detailedTokenConsumption[emailId];
        const processedAt = new Date(record.processedAt).toISOString();

        if (processedAt >= start && processedAt <= end) {
          results.push({
            emailId,
            processedAt: record.processedAt,
            totalTokens: record.totalTokens,
            totalTokensPrice: record.totalTokensPrice,
            attachments: record.attachments,
          });

          totalTokensConsumed += record.totalTokens;
          totalTokensPrice += record.totalTokensPrice;
        }
      }

      const emailsProcessedCount = results.length;
      let pricePerRequest = 0;

      for (const [threshold, price] of Object.entries(pricing)) {
        if (emailsProcessedCount <= threshold) {
          pricePerRequest = price;
          break;
        }
      }

      const finalPrice = (emailsProcessedCount * pricePerRequest).toFixed(2);

      return {
        finalPrice,
        totalTokensConsumed,
        totalTokensPrice,
        emailsProcessed: results,
      };
    };

    const startDate = start || "2024-11-12T00:00:00.000Z";
    const endDate = end || "2025-01-12T23:59:59.999Z";

    const detailedTokenConsumption = user.detailedTokenConsumption || {};

    const result = getMonthlyCosts({
      startDate,
      endDate,
      detailedTokenConsumption,
    });
    console.log(`DETAILED MONTHLY COSTS FOR USER ${user.id}`, result);
    return result;
  };

  const [showPaymentModal, setShowPaymentModal] = useState();
  const [showSetPaymentModal, setShowSetPaymentModal] = useState();
  const [clientIdForPaymentSetup, setClientIdForPaymentSetup] = useState();
  const [amountToPay, setAmountToPay] = useState();

  useEffect(() => {
    console.log("showPaymentModal changed to", showPaymentModal);
  }, [showPaymentModal]);

  // useEffect(() => {
  //   if (userRedux) {
  //     if (userRedux?.role === "user") {
  //       navigate("/panel");
  //     }
  //   }
  // }, [userRedux]);

  const statistics = [
    {
      title: "ventas",
      year: "año actual",
      total: "0,00",
    },
    {
      title: "Gastos",
      year: "año actual",
      total: "0,00",
    },
    {
      title: "Beneficios",
      year: "año actual",
      total: "0,00",
    },
  ];

  const salesSummaries = [
    {
      title: "Resumen ventas",
      total: "0,00€",
      month: "abril 2024",
      options: [], // Sin opciones
    },
    {
      title: "Resumen gastos",
      total: "0,00€",
      month: "abril 2024",
      options: ["Facturas y Pedidos", "Nóminas"], // Opciones disponibles
    },
  ];

  const spentData = [
    { title: "Gastios excepcionales", amount: "0,00€", percentage: "0%" },
    {
      title: "Otras pérdidas en gestión corriente",
      amount: "0,00€",
      percentage: "0%",
    },
    {
      title: "Seguridad Social a cargo de la empresa",
      amount: "0,00€",
      percentage: "0%",
    },
    {
      title: "Indemnizaciones",
      amount: "0,00€",
      percentage: "0%",
    },
    {
      title: "Sueldos y salarios",
      amount: "0,00€",
      percentage: "0%",
    },
    {
      title: "Otros servicios",
      amount: "0,00€",
      percentage: "0%",
    },
    {
      title: "Suministros",
      amount: "0,00€",
      percentage: "0%",
    },
    {
      title: "Publicidad, propaganda y relaciones públicas",
      amount: "0,00€",
      percentage: "0%",
    },
    {
      title: "Servicios bancarios y similares",
      amount: "0,00€",
      percentage: "0%",
    },
  ];

  return (
    <Elements stripe={stripePromise}>
      <NavbarAdmin />
      <div style={{ display: "flex" }}>
        <FileExplorer />
        <div className={styles.homeContainer}>
          <div className={styles.statisticsHeader}>
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                {statistics.map((statistic) => (
                  <div className={styles.statisticCard}>
                    <div className={styles.title}>
                      <p>{statistic.title}</p>
                      <Dots className={styles.icon} />
                    </div>
                    <span>{statistic.year}</span>
                    <p className={styles.statisticTotal}>{statistic.total}€</p>
                  </div>
                ))}
              </div>
              <div className={styles.divider}></div>
            </div>
            <div className={styles.talkWithFacturaGPT}>
              <FacturaGPTIcon className={styles.icon} />
              <p>Datos y Analíticas en el Chat</p>
              <button onClick={() => navigate('/chat')}>
                <ChatGPTIconGreen /> Habla con FacturaGPT
              </button>
            </div>
          </div>
          <div className={styles.homeContent}>
            <div className={styles.salesSummaryContainer}>
              {salesSummaries.map((summary, index) => (
                <div key={index} className={styles.salesSummary}>
                  <div className={styles.salesSummaryHeader}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <p>{summary.title}</p>
                      {summary.options.length > 0 && (
                        <div className={styles.salesSummaryOptions}>
                          {summary.options.map((option, optionIndex) => (
                            <span key={optionIndex}>{option}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span>últimos 12 meses</span>
                  </div>
                  <div className={styles.salesSummaryTotal}>
                    <p>{summary.total}</p>
                    <span>{summary.month}</span>
                  </div>
                  <div className={styles.monthsContainer}>
                    <p>May</p>
                    <p>Jun</p>
                    <p>Jul</p>
                    <p>Ago</p>
                    <p>Sep</p>
                    <p>Oct</p>
                    <p>Nov</p>
                    <p>Dic</p>
                    <p>Ene</p>
                    <p>Feb</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.expenseAccounts}>
              <div className={styles.expenseAccountsHeader}>
                <div className={styles.expenseAccountsOptions}>
                  <p>Cuentas de gastos</p>
                  <span>Cuentas de ingresos</span>
                </div>
                <span className={styles.month}>Mes actual</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {spentData.map((item, index) => (
                  <div className={styles.spent}>
                    <div key={index} className={styles.row}>
                      <p>{item.title}</p>
                      <span>
                        {item.amount} - {item.amount} ({item.percentage})
                      </span>
                    </div>
                    <div className={styles.divider}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>








      
      {/* <div className={styles.container}>
        {showPaymentModal && amountToPay && (
          <Payment
            onClose={() => setShowPaymentModal(false)}
            amountToPay={amountToPay}
            clientId={showPaymentModal}
          />
        )}
        {showSetPaymentModal && clientIdForPaymentSetup && (
          <SetupPayment
            onClose={() => setShowSetPaymentModal(false)}
            clientId={clientIdForPaymentSetup}
          />
        )}
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div
                onClick={() =>
                  stat.toUserPermission && navigate("/usersPermissions")
                }
                className={styles.iconWrapper}
              >
                <img src={stat.icon} alt={stat.title} />
              </div>
              {stat.multiple ? (
                stat.multiple.map((item, index) => (
                  <div
                    style={{ paddingRight: "10px" }}
                    className={styles.statContent}
                  >
                    <span className={styles.statTitle}>{item.title}</span>

                    {item.change && (
                      <span
                        className={`${styles.statChange} ${item.isPositive ? styles.positive : styles.negative}`}
                      >
                        {item.isPositive ? (
                          <img src={greenArrow} alt={item.title} />
                        ) : (
                          <img src={redArrow} alt={item.title} />
                        )}
                        {`${item.change}`}
                        <span style={{ color: "#292D32" }}>este mes</span>
                      </span>
                    )}
                    <h2 className={styles.statValue}>
                      {item.value} {item.currency}
                    </h2>
                    {stat.emails && (
                      <span
                        className={`${styles.statChange} ${styles.positive}`}
                      >
                        <MdOutlineMarkEmailRead size={25} color={"#16c098"} />
                        {`${allClients?.map((client) => client?.processedEmails?.length).reduce((a, b) => a + b, 0)} Emails procesados`}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.statContent}>
                  <span className={styles.statTitle}>{stat.title}</span>

                  {stat.change && (
                    <span
                      className={`${styles.statChange} ${stat.isPositive ? styles.positive : styles.negative}`}
                    >
                      {stat.isPositive ? (
                        <img src={greenArrow} alt={stat.title} />
                      ) : (
                        <img src={redArrow} alt={stat.title} />
                      )}
                      {`${stat.change}`}
                      <span style={{ color: "#292D32" }}>este mes</span>
                    </span>
                  )}
                  <h2 className={styles.statValue}>
                    {stat.value} {stat.currency}
                  </h2>
                  {stat.emails && (
                    <span className={`${styles.statChange} ${styles.positive}`}>
                      <MdOutlineMarkEmailRead size={25} color={"#16c098"} />
                      {`${allClients?.map((client) => client?.processedEmails?.length).reduce((a, b) => a + b, 0)} Emails procesados`}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.tableSection}>
          <div className={styles.tableTopContainer}>
            <div className={styles.tableHeaderContainer}>
              <h1 className={styles.tableTitle}>
                Seguimiento y estados{" "}
                <span
                  onClick={() => navigate("/users")}
                  className={styles.changeTabButton}
                >
                  Ir a usuarios
                </span>
              </h1>
              <span className={styles.tableSpan}>Asocidos y sus cuentas</span>
            </div>
            <div className={styles.filters}>
              {userRedux?.role === "superadmin" && (
                <button className={styles.addClientButton}>
                  <img src={plus} alt="Add admin" />
                  Nuevo Admin
                </button>
              )}
              <button
                // onClick={() => navigate("/userSettings")}
                onClick={() => setShowUserSettings(true)}
                className={styles.addClientButton}
              >
                <img src={plus} alt="Add client" />
                Alta nuevo cliente
              </button>
              <div className={styles.filterSearch}>
                <img src={magnify} alt="search" />
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className={styles.listRight}>
                  <img src={listIcon} alt="listIcon" />
                </div>
              </div>
              <div className={styles.dropdownContainer}>
                <div
                  className={styles.filterSort}
                  onClick={handleDropdownToggle}
                  ref={dropdownRef}
                >
                  {t("sortBy")} <b>{selectedOption}</b>
                  <FaChevronDown className={styles.chevronIcon} />
                </div>
                {isOpen && (
                  <div className={styles.dropdownOptions}>
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className={styles.dropdownOption}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <span className={styles.columnName}>{t("tableCol1")}</span>
              <span className={styles.columnStatus}>{t("tableCol2")}</span>
              <span className={styles.columnContact}>{t("tableCol3")}</span>
              <span className={styles.columnTokens}>{t("tableCol4")}</span>
              <span className={styles.columnEmail}>{t("tableCol5")}</span>
              <span className={styles.columnRecognitions}>
                {t("tableCol6")}
              </span>
              <span className={styles.columnPort}>{t("tableCol7")}</span>
              <span className={styles.columnActive}>{t("tableCol8")}</span>
            </div>
            {filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                <div key={index} className={styles.tableRow}>
                  <span
                    onClick={() => checkUserMonthlyPayment(client)}
                    className={styles.columnName}
                  >
                    {client.companyName}
                  </span>
                  <span className={styles.columnStatus}>
                    {client.paymentMethodId ? (
                      <div
                        // onClick={() => setShowPaymentModal(client.id)}
                        className={styles.greenButton}
                      >
                        Configurado <FaCheck size={12} color="#fff" />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setClientIdForPaymentSetup(client.id);
                          setShowSetPaymentModal(true);
                        }}
                        className={styles.redButton}
                      >
                        Agregar <FaPlus size={12} color="#fff" />
                      </div>
                    )}
                  </span>
                  <span className={styles.columnContact}>
                    {client.phoneNumber}
                  </span>
                  <span className={styles.columnTokens}>
                    <div className={styles.gapDiv}>
                      <img
                        src={openEmail}
                        alt="Email"
                        className={styles.icon}
                      />
                      {client.tokenEmail}
                    </div>
                    <div className={styles.gapDiv}>
                      <img
                        src={circuit}
                        alt="circuit"
                        className={styles.icon}
                      />
                      {client.tokenGPT}
                    </div>
                  </span>
                  <span className={styles.columnEmail}>
                    {client.tokenEmail}
                  </span>
                  <span
                    onClick={() => resetProcessedEmails(client)}
                    className={styles.columnRecognitions}
                  >
                    {client.processedEmails?.length}
                  </span>
                  <span className={styles.columnPort}>{client.port}</span>
                  <span className={styles.columnActive}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={client.active || false}
                        onChange={() => toggleUserActive(client)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </span>
                </div>
              ))
            ) : (
              <div className={styles.noResultsMessage}>{t("notResults")}</div>
            )}
          </div>
        </div>
        {showUserSettings && (
          <UserSettings
            showUserSettings={showUserSettings}
            setShowUserSettings={setShowUserSettings}
          />
        )}
      </div> */}
    </Elements>
  );
};

export default Dashboard;
