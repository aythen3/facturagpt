import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
  FaCheck,
  FaPlus,
} from "react-icons/fa";
import styles from "./Dashboard.module.css";
import style from "./UsersDashboard.module.css";
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

import PanelTemplate from "./components/PanelTemplate/PanelTemplate";

import { useNavigate } from "react-router-dom";
import {
  // getAllClients,
  getAllAccounts,
  updateAccount,
  goAutomate,
  // updateAccount,
} from "../../actions/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { MdOutlineMarkEmailRead } from "react-icons/md";
import Payment from "./screens/AccountSettings/StripeComponents/Payment";
import { getPreviousPaymentDate, hasDatePassed } from "./utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import SetupPayment from "./screens/AccountSettings/StripeComponents/SetupPayment";
import { loadStripe } from "@stripe/stripe-js";
import AccountSettings from "./screens/AccountSettings/AccountSettings";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin";
const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);
import { useTranslation } from "react-i18next";
import i18n from "../../i18";
// import { setUser } from "../../slices/emailManagerSlices";
import AddAdminModal from "./components/AddAdminModal/AddAdminModal";
import {
  createAutomation,
  getAllUserAutomations,
} from "../../actions/automate";

const UsersDashboard = () => {
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const { user: userData, allAccounts } = useSelector((state) => state.user);
  // const { user: userData } = useSelector((state) => state.user);
  const { userAutomations } = useSelector((state) => state.automate);
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Store filtered and sorted clients
  const [searchQuery, setSearchQuery] = useState(""); // Store search query

  const [selectedOption, setSelectedOption] = useState("Todos"); // Selected filter
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const options = ["Todos", "Email A-Z", "Rol", "Pin"];

  //

  const stats = [
    {
      key: "users",
      icon: profiles,
      title: "# Usuarios",
      value: allAccounts?.length,
      change: "16%",

      isPositive: true,
      toUserPermission: true,
    },
    {
      key: "usersStatistics",
      icon: profilePlus,
      multiple: [
        {
          title: "# Usuarios Plus",
          value: 0,
          change: "1%",
          isPositive: false,
        },
        {
          title: "# Usuarios Pro",
          value: 0,
          change: "1%",
          isPositive: false,
        },
        {
          title: "# Usuarios Enterprise",
          value: 0,
          change: "1%",
          isPositive: false,
        },
      ],
    },
    {
      key: "recognitions",
      icon: monitorIcon,
      title: "# Reconocimientos",
      value: 0,
      change: "16%",
      isPositive: false,
    },
    {
      key: "income",
      icon: analyticsIcon,
      title: "EUR Generado",
      change: "16%",
      isPositive: true,
      value: 0,
      currency: "EUR",
    },
    {
      key: "storage",
      icon: dbIcon,
      title: "# GB",
      change: "16%",
      isPositive: true,
      value: 0,
      currency: "TB",
    },
  ];

  useEffect(() => {
    if (userData) {
      console.log("userrrss", userData);
      if (userData?.role === "user") {
        navigate("/admin/chat");
      }
    }
  }, [userData]);

  // useEffect(() => {
  //   if (userData) {
  //     dispatch(getAllUserAutomations({ userId: userData.id }));
  //   }
  // }, [userData]);

  // useEffect(() => {
  //   if (userData) {
  //     dispatch(
  //       createAutomation({
  //         userId: userData.id,
  //         email: userData.email,
  //         automationData: {
  //           name: "New Automation",
  //           description: "This is a new automation",
  //           type: "gmail",
  //         },
  //       })
  //     );
  //   }
  // }, [userData]);

  useEffect(() => {
    console.log("userAutomations", userAutomations);
  }, [userAutomations]);

  useEffect(() => {
    dispatch(getAllAccounts());
    // dispatch(getAllUsers());
  }, [dispatch]);

  // const [filteredAccounts, setFilteredAccounts] = useState([]);

  useEffect(() => {
    let updatedAccounts = [...allAccounts];

    if (searchQuery) {
      updatedAccounts = updatedAccounts.filter((account) =>
        account.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (selectedOption) {
      case "Empresa A-Z":
        updatedAccounts = updatedAccounts.sort((a, b) =>
          (a.email || "").localeCompare(b.email || "")
        );
        break;
      case "Rol":
        updatedAccounts = updatedAccounts.sort((a, b) =>
          (a.role || "").localeCompare(b.role || "")
        );
        break;
      case "Pin":
        updatedAccounts = updatedAccounts.sort((a, b) =>
          (a.pin || "").localeCompare(b.pin || "")
        );
        break;
      default:
        break;
    }

    setFilteredAccounts(updatedAccounts);
  }, [allAccounts, searchQuery, selectedOption]);


  useEffect(() => {
    // Función para obtener los datos filtrados y ordenados del backend
    const fetchFilteredAccounts = async () => {
      try {
        const queryParams = new URLSearchParams({
          search: searchQuery || '',
          sortBy: selectedOption || '',
        });

        const response = await fetch(`/api/accounts/filter?${queryParams}`);
        const data = await response.json();
        
        setAllAccounts(data);
      } catch (error) {
        console.error('Error fetching filtered accounts:', error);
      }
    };

    // fetchFilteredAccounts();
  }, [searchQuery, selectedOption]);


  

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
      updateAccount({
        accountId: account.id,
        toUpdate: { active: !account.active },
      })
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
        goAutomate({
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
      updateAccount({
        accountId: user.id,
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

  const [userOptions, setUserOptions] = useState({});
  const [openRoleDropdown, setOpenRoleDropdown] = useState(null); // Track open dropdown by user ID
  const dropdownRoleRef = useRef(null);

  const roleOptions = ["user", "admin", "superadmin"];

  // Fetch all users on mount
  useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);

  // Initialize userOptions with user roles
  useEffect(() => {
    const initialOptions = {};
    allAccounts.forEach((account) => {
      initialOptions[account.id] = account.role || "user"; // Default to 'user' if role is not defined
    });
    setUserOptions(initialOptions);
  }, [allAccounts]);

  //   useEffect(() => {
  //     if (allUsers.length > 0) {
  //       allUsers.forEach((user) => {
  //         if (!user?.pin) {
  //           dispatch(updateUser({ userId: user?.id, toUpdate: { pin: "1234" } }));
  //         }
  //       });
  //     }
  //   }, [allUsers]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRoleRef.current &&
        !dropdownRoleRef.current.contains(event.target)
      ) {
        setOpenRoleDropdown(null); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Handle dropdown toggle for a specific user
  const handleRoleDropdownToggle = (userId) => {
    setOpenRoleDropdown((prev) => (prev === userId ? null : userId));
  };

  // Handle role change for a specific user
  const handleRoleOptionClick = (userId, option) => {
    setUserOptions((prevOptions) => ({
      ...prevOptions,
      [userId]: option,
    }));
    setOpenRoleDropdown(false); // Close the dropdown
    // Here you can dispatch an update action to save the new role
    console.log(`Updated role for user ${userId}: ${option}`);
    dispatch(updateUser({ userId, toUpdate: { role: option } }));
  };

  if (!userData) return null;

    // <Elements stripe={stripePromise}>
    //   <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    //   </Elements>  
  return (
    <PanelTemplate>
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
          {stats.map((stat) => (
            <div key={stat.key} className={styles.statCard}>
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
        <div className={style.contentContainer}>
          <div className={styles.tableTopContainer}>
            <div className={styles.tableHeaderContainer}>
              <h1 className={styles.tableTitle}>
                Usuarios y permisos{" "}
                <span
                  onClick={() => navigate("/admin/accounts")}
                  className={styles.changeTabButton}
                >
                  Ir a clientes
                </span>
              </h1>
              <span className={styles.tableSpan}>Todos los usuarios</span>
            </div>
            <div className={styles.filters}>
              {userData?.role === "superadmin" && (
                <button
                  onClick={() => setShowAddAdminModal(true)}
                  className={styles.addClientButton}
                >
                  <img src={plus} alt="Add admin" />
                  {/* Nuevo Admin */}
                </button>
              )}

              <div className={styles.filterSearch}>
                <img src={magnify} alt="search" />
                <input
                  type="text"
                  placeholder="Buscar"
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
          <div className={style.tableContainer}>
            <div className={styles.tableHeader}>
              <span style={{ flex: 0.242 }} className={style.columnName}>
                Nombre empresa
              </span>
              <span className={style.columnPin}>PIN</span>
              <span className={style.columnContact}>Contacto</span>
              <span className={style.columnPassword}>Contraseña</span>
              <span className={style.columnEmail}>Email</span>
              <span className={style.columnRole}>Rol</span>
            </div>
            {filteredAccounts.filter((account) => account.role !== "user")
              .length > 0 ? (
              filteredAccounts
                .filter((account) => account.role !== "user")
                .map((account) => (
                  <div key={account.id} className={style.tableRow}>
                    <span className={style.columnName}>
                      {account.email || "-"}
                    </span>
                    <span className={style.columnPin}>
                      {account.pin || "-"}
                    </span>
                    <span className={style.columnContact}>
                      {account.email || "-"}
                    </span>
                    <span className={style.columnPassword}>-</span>
                    <span className={style.columnEmail}>{account.email}</span>
                    {account.email === userData.email ? (
                      <span
                        style={{ cursor: "default" }}
                        className={style.filterSort}
                      >
                        <b>{account.role}</b>
                      </span>
                    ) : userData.role !== "user" ? (
                      <div
                        className={style.filterSort}
                        onClick={() => handleRoleDropdownToggle(account.id)}
                      >
                        <b>{userOptions[account.id]}</b>
                        <FaChevronDown className={style.chevronIcon} />
                        {openRoleDropdown === account.id && (
                          <div
                            ref={dropdownRoleRef}
                            className={style.dropdownOptions}
                          >
                            {roleOptions.map((option, index) => (
                              <div
                                key={option}
                                className={style.dropdownOption}
                                onClick={() =>
                                  handleRoleOptionClick(account.id, option)
                                }
                                style={{
                                  borderBottom:
                                    index === roleOptions.length - 1 && "none",
                                }}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className={style.filterSort}>{account.role}</span>
                    )}
                  </div>
                ))
            ) : (
              <div className={styles.noResultsMessage}>{t("notResults")}</div>
            )}
          </div>
        </div>
        {showAccountSettings && (
          <AccountSettings
            showUserSettings={showAccountSettings}
            setShowUserSettings={setShowAccountSettings}
          />
        )}
      </div>
      {showAddAdminModal && (
        <AddAdminModal onClose={() => setShowAddAdminModal(false)} />
      )}
    </PanelTemplate>
  );
};

export default UsersDashboard;
