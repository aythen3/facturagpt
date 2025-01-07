import React, { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
  FaCheck,
  FaPlus,
} from "react-icons/fa";
import styles from "./Dashboard.module.css";
import usersIcon from "./assets/2people.svg";
import userTick from "./assets/profile-tick.svg";
import userPlus from "./assets/userPlus.svg";
import monitor from "./assets/monitor.svg";
import calendarDate from "./assets/calendarDate.svg";
import calendar from "./assets/calendar.svg";
import circuit from "./assets/circuit.svg";
import magnify from "./assets/magnify.svg";
import openEmail from "./assets/openEmail.svg";
import profile1 from "./assets/profile1.png";
import profile2 from "./assets/profile2.png";
import profile3 from "./assets/profile3.png";
import { useNavigate } from "react-router-dom";
import {
  getAllClients,
  getAllUsers,
  updateClient,
  updateUser,
} from "../../actions/emailManager";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEmailsByQuery } from "../../actions/bot";
// import { colors } from "./../views/app/v1-1/pages/Calendar/components/colors";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Payment from "./screens/UserSettings/StripeComponents/Payment";
import { getPreviousPaymentDate, hasDatePassed } from "./utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import SetupPayment from "./screens/UserSettings/StripeComponents/SetupPayment";
import { loadStripe } from "@stripe/stripe-js";
import UserSettings from "./screens/UserSettings/UserSettings";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin";
const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserSettings, setShowUserSettings] = useState(false);

  const { allClients, allUsers, user } = useSelector(
    (state) => state.emailManager
  );
  const [filteredClients, setFilteredClients] = useState([]); // Store filtered and sorted clients
  const [searchQuery, setSearchQuery] = useState(""); // Store search query
  const [selectedOption, setSelectedOption] = useState(t("option1")); // Selected filter
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [t("option1"), t("option2"), t("option3"), t("option4")];

  const stats = [
    {
      icon: usersIcon,
      title: t("titleHeader1"),
      value: allClients?.length,
      change: t("lastMonth1"),
      isPositive: true,
      toUserPermission: true,
    },
    {
      icon: userTick,
      title: t("titleHeader2"),
      value: allClients?.length,
      change: t("lastMonth2"),
      isPositive: false,
    },
    {
      icon: monitor,
      title: t("titleHeader3"),
      value: allClients
        ? allClients?.filter((client) => client.active).length
        : 0,
      emails: true,
    },
  ];

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    // Filter and sort clients whenever searchQuery or selectedOption changes
    let updatedClients = [...allClients];

    // Apply search filter
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

    // Apply sorting based on selectedOption
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

  const toggleUserActive = (user) => {
    dispatch(
      updateClient({ clientId: user.id, toUpdate: { active: !user.active } })
    );
    if (!user.active) {
      // console.log("dispatching emails by query", {
      //   userId: user?.id || "randomId",
      //   email: user.tokenEmail,
      //   password: user.tokenPassword,
      //   query: user.emailQueries,
      //   tokenGpt: user.tokenGPT,
      //   logs: [],
      // });
      dispatch(
        getEmailsByQuery({
          userId: user?.id || "randomId",
          email: user.tokenEmail,
          password: user.tokenPassword,
          query: user.emailQueries,
          tokenGpt: user.tokenGPT,
          logs: user.processedEmails,
          ftpData: {
            host: user.host,
            port: user.port,
            user: user.tokenUser,
            password: user.tokenUserPassword,
          },
        })
      );
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
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Elements stripe={stripePromise}>
      <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={styles.container} onClick={() => setShowSidebar(false)}>
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
                className={styles.inconWrapper}
              >
                <img
                  src={stat.icon}
                  alt={stat.title}
                  className={styles.statIcon}
                />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statTitle}>{stat.title}</span>
                <h2 className={styles.statValue}>{stat.value}</h2>
                {stat.change && (
                  <span
                    className={`${styles.statChange} ${stat.isPositive ? styles.positive : styles.negative}`}
                  >
                    {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                    {stat.change}
                  </span>
                )}
                {stat.emails && (
                  <span className={`${styles.statChange} ${styles.positive}`}>
                    <MdOutlineMarkEmailRead size={25} color={"#16c098"} />
                    {`${allClients?.map((client) => client?.processedEmails?.length).reduce((a, b) => a + b, 0)} ${t("lastMonth3")}`}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.tableSection}>
          <div className={styles.tableTopContainer}>
            <div className={styles.tableHeaderContainer}>
              <h1 className={styles.tableTitle}>{t("bodyTitle")}</h1>
              <button
                // onClick={() => navigate("/userSettings")}
                onClick={() => setShowUserSettings(true)}
                className={styles.addClientButton}
              >
                <img src={userPlus} alt="Add client" />
                {t("buttonAddClient")}
              </button>
            </div>
            <div className={styles.filters}>
              <div className={styles.filterSearch}>
                <img src={magnify} alt="search" />
                <input
                  type="text"
                  placeholder={t("placeholder")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
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
              <span className={styles.columnName}>Nombre empresa</span>
              <span className={styles.columnStatus}>Metodo de pago</span>
              <span className={styles.columnContact}>Contacto</span>
              <span className={styles.columnTokens}>Tokens (Email + AI)</span>
              <span className={styles.columnEmail}>Email</span>
              <span className={styles.columnRecognitions}>
                Emails procesados
              </span>
              <span className={styles.columnPort}>Puerto</span>
              <span className={styles.columnActive}>Activo</span>
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
              <div className={styles.noResultsMessage}>
                No hay resultados para su busqueda!.
              </div>
            )}
          </div>
        </div>
        {showUserSettings && (
          <UserSettings
            showUserSettings={showUserSettings}
            setShowUserSettings={setShowUserSettings}
          />
        )}
      </div>
    </Elements>
  );
};

export default Dashboard;
