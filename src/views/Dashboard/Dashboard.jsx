import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import React, { useEffect, useRef, useState } from "react";

import styles from "./Dashboard.module.css";

import PanelTemplate from "./components/PanelTemplate/PanelTemplate";

import { ReactComponent as Dots } from "./assets/optionDots.svg";
import { ReactComponent as ChatGPTIconGreen } from "./assets/chatGPTIconGreen.svg";
import { ReactComponent as FacturaGPTIcon } from "./assets/FacturaGPTW.svg";

import { useNavigate } from "react-router-dom";
import {
  getAllClients,
  getAllNotifications,
  // getAllUsers,
  // updateClient,
  // getEmailsByQuery,
  getResumeAccount,
  addNotification,
} from "@src/actions/user";

import {
  createPaymentRecurrent
} from "@src/actions/stripe"


// import PanelTemplate from "./components/PanelTemplate/PanelTemplate";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);
import { useTranslation } from "react-i18next";
import i18n from "../../i18";
import FileExplorer from "./components/FileExplorer/FileExplorer";

const Dashboard = () => {
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allClients, allUsers } = useSelector((state) => state.user);

  const statistics = [
    {
      title: "Ventas",
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
    { 
      title: "Gastios excepcionales", 
      amount: "0,00€", 
      percentage: "0%" 
    },
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


const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const response = await dispatch(getResumeAccount())


      console.log('response account resume', response)
      if(response.payload && response.payload.success) {
        console.log('RESUME ACCOUNT', response.payload.resume)
      }
    }

    fn()
  }, [])


  const handleAddNotification = async () => {
    const response = await dispatch(addNotification({
      notification: {

      }
    }))

    console.log('!', response)
  }


  const handlePayStripe = async () => {
    const response = await dispatch(createPaymentRecurrent())
    console.log('!', response)
  }


  return (
    <PanelTemplate setSwiped={setSwiped} swiped={swiped}>


      {/* </Elements>  */}
      <div className={styles.homeContainer}>
        <div>
          <button onClick={() => handleAddNotification()}>
            Añadir venta
          </button>
          <button onClick={() => handleAddNotification()}>
            Añadir compra
          </button>
          <button onClick={() => handleAddNotification()}>
            Añadir Beneficio
          </button>
          <button onClick={() => handlePayStripe()}>
            Pagar
          </button>
        </div>
        <div className={styles.statisticsHeader}>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div
              style={{ display: "flex", width: "100%", overflowX: "scroll" }}
            >
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
            <button onClick={() => navigate("/admin/chat")}>
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
    </PanelTemplate>
  );
};

export default Dashboard;
