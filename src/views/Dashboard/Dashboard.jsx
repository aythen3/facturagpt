import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.css";
import PanelTemplate from "./components/PanelTemplate/PanelTemplate";
import { ReactComponent as Dots } from "./assets/optionDots.svg";
import { ReactComponent as ChatGPTWhiteOutline } from "./assets/ChatGPTWhiteOutline.svg";
import { ReactComponent as GrayClock } from "./assets/GrayClock.svg";
import { ReactComponent as ChatIcon } from "./assets/chatIconGray.svg";
import { useNavigate } from "react-router-dom";
import { createPaymentRecurrent } from "@src/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);
import { useTranslation } from "react-i18next";
import i18n from "../../i18";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import CustomDropdown from "./components/CustomDropdown/CustomDropdown";

import {
  getAllClients,
  getAllNotifications,
  // getAllUsers,
  // updateClient,
  // getEmailsByQuery,
  getResumeAccount,
  addNotification,
} from "@src/actions/user";
import TeamSheet from "./components/DashboardComponents/TeamSheet/TeamSheet";
import DatePicker from "./components/DashboardComponents/DatePicker/DatePicker";
import TeamListSimple from "./components/DashboardComponents/TeamListSimple/TeamListSimple";

const Dashboard = () => {
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allClients, allUsers } = useSelector((state) => state.user);

  const statistics = [
    {
      title: "Ventas",
      // year: "año actual",
      total: "0,00",
    },
    {
      title: "Gastos",
      // year: "año actual",
      total: "0,00",
    },
    {
      title: "Beneficios",
      // year: "año actual",
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
      options: [],
    },
  ];
  const spentData = [
    {
      title: "Gastos excepcionales",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Otras pérdidas en gestión corriente",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Seguridad Social a cargo de la empresa",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Indemnizaciones",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Sueldos y salarios",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Otros servicios",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Suministros",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Publicidad, propaganda y relaciones públicas",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Servicios bancarios y similares",
      amount: "0,00€",
      percentage: "0%",
      type: "gasto",
    },
    {
      title: "Ventas de productos",
      amount: "0,00€",
      percentage: "0%",
      type: "ingreso",
    },
    {
      title: "Ingresos por servicios",
      amount: "0,00€",
      percentage: "0%",
      type: "ingreso",
    },
    {
      title: "Intereses bancarios",
      amount: "0,00€",
      percentage: "0%",
      type: "ingreso",
    },
  ];
  const [selectedType, setSelectedType] = useState("gasto");

  const filteredData = spentData.filter((item) => item.type === selectedType);

  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const response = await dispatch(getResumeAccount());

      console.log("response account resume", response);
      if (response.payload && response.payload.success) {
        console.log("RESUME ACCOUNT", response.payload.resume);
      }
    };

    fn();
  }, []);

  const handleAddNotification = async () => {
    const response = await dispatch(
      addNotification({
        notification: {},
      })
    );

    console.log("!", response);
  };

  const handlePayStripe = async () => {
    const response = await dispatch(createPaymentRecurrent());
    console.log("!", response);
  };
  const [firtsTimer, setFirtsTimer] = useState("25 Dec 2024");
  const [secondTimer, setSecondTimer] = useState("25 Dec 2024");

  const [selectedTab, setSelectedTab] = useState("Ingresos y Gastos");

  const clientsData = [
    { name: "Cliente A", totalSpent: "500,00€" },
    { name: "Cliente B", totalSpent: "1.200,00€" },
    { name: "Cliente C", totalSpent: "300,00€" },
  ];

  const assetsData = [
    { asset: "Oficina", value: "50.000,00€" },
    { asset: "Vehículo", value: "20.000,00€" },
    { asset: "Equipos", value: "10.000,00€" },
  ];

  const teamData = [
    { member: "Juan Pérez", role: "CEO" },
    { member: "María Gómez", role: "Finanzas" },
    { member: "Carlos Ruiz", role: "Desarrollador" },
  ];

  const [activos, setActivos] = useState([
    {
      id: 1,
      name: "Nombre Activo",
      time: 3600,
      transactions: 5,
      recognitions: 3,
      hourWorkeds: 8,
      pvp: "0,99",
      status: "stop",
    },
    {
      id: 2,
      name: "Nombre Activo",
      time: 1800,
      transactions: 8,
      recognitions: 2,
      hourWorkeds: 7,
      pvp: "0,00",
      status: "pause",
    },
    // Puedes agregar más equipos aquí si lo deseas
  ]);

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Nombre Contacto",
      time: 3600,
      transactions: 5,
      recognitions: 3,
      hourWorkeds: 8,
      status: "stop",
      firtsPrice: "0,00",
      secondPrice: "0,00",
      percent: 0,
    },
    {
      id: 2,
      name: "Nombre Contact",
      time: 1800,
      transactions: 8,
      recognitions: 2,
      hourWorkeds: 7,
      status: "pause",
      firtsPrice: "0,70",
      secondPrice: "0,10",
      percent: 20,
    },
    // Puedes agregar más equipos aquí si lo deseas
  ]);
  const renderContent = () => {
    switch (selectedTab) {
      case "Ingresos y Gastos":
        return (
          <>
            <div className={styles.expenseAccountsOptions}>
              <span
                className={
                  selectedType == "gasto" && styles.selectedTypeExpense
                }
                onClick={() => setSelectedType("gasto")}
              >
                Gastos
              </span>
              <span
                className={
                  selectedType == "ingreso" && styles.selectedTypeExpense
                }
                onClick={() => setSelectedType("ingreso")}
              >
                Ingresos
              </span>
            </div>

            {filteredData.map((item, index) => (
              <div key={index} className={styles.spent}>
                <div className={styles.row}>
                  <p>{item.title}</p>
                  <span>
                    {item.amount} - {item.amount} ({item.percentage})
                  </span>
                </div>
                <div className={styles.divider}></div>
              </div>
            ))}
          </>
        );
      case "Contactos":
        return <TeamListSimple teams={contacts} type="contact" />;

      case "Activos":
        return <TeamListSimple teams={activos} type="bill" />;
      case "Equipo":
        return <TeamSheet />;
      default:
        return null;
    }
  };

  return (
    <PanelTemplate setSwiped={setSwiped} swiped={swiped}>
      {/* </Elements>  */}
      <div className={styles.homeContainer}>
        <div>
          <button onClick={() => handleAddNotification()}>Añadir venta</button>
          <button onClick={() => handleAddNotification()}>Añadir compra</button>
          <button onClick={() => handleAddNotification()}>
            Añadir Beneficio
          </button>
          <button onClick={() => handlePayStripe()}>Pagar</button>
        </div>
        <div className={styles.analitycsHeader}>
          <span className={styles.data}>
            <ChatIcon />
            Más Datos y Analíticas en el Chat
          </span>
          <div className={styles.analitycsHeaderRight}>
            <div
              className={styles.talkWithFacturaGPT}
              onClick={() => navigate("/admin/chat")}
            >
              <ChatGPTWhiteOutline /> Habla con FacturaGPT
            </div>
            <div className={styles.timerContainer}>
              <GrayClock />
              <DatePicker />-
              <DatePicker />
              {/* <CustomDropdown
                options={["25 Dec 2024", "25 Dec 2025", "25 Dec 2026"]}
                selectedOption={firtsTimer}
                height="31px"
                textStyles={{
                  minWidth: "140px",
                }}
                setSelectedOption={(selected) => setFirtsTimer(selected)}
              />{" "}
              -
              <CustomDropdown
                options={["25 Dec 2024", "25 Dec 2025", "25 Dec 2026"]}
                selectedOption={secondTimer}
                height="31px"
                textStyles={{
                  minWidth: "140px",
                }}
                setSelectedOption={(selected) => setSecondTimer(selected)}
              /> */}
            </div>
          </div>
        </div>
        <div className={styles.statisticsHeader}>
          <div>
            <div className={styles.staticsContainer}>
              {statistics.map((statistic) => (
                <div className={styles.statisticCard}>
                  <div className={styles.title}>
                    <p>{statistic.title}</p>
                    {/* <Dots className={styles.icon} /> */}
                  </div>
                  <span>{statistic.year}</span>
                  <p className={styles.statisticTotal}>{statistic.total}€</p>
                </div>
              ))}
            </div>
            {/* <div className={styles.divider}></div> */}
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
                  {/* <span>últimos 12 meses</span> */}
                </div>
                <div className={styles.salesSummaryTotal}>
                  <p>{summary.total}</p>
                  {/* <span>{summary.month}</span> */}
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
              {["Ingresos y Gastos", "Contactos", "Activos", "Equipo"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={selectedTab == tab && styles.selectedTabBtn}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
            <div className={styles.expenseAccountsContent}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </PanelTemplate>
  );
};

export default Dashboard;
