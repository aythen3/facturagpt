import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { createRoot } from "react-dom/client";



import store from "./utils/store";

import Transactions from "./views/Dashboard/screens/Transactions/Transactions.jsx";
import ArticlesTransactions from "./views/Dashboard/screens/ArticlesTransactions/ArticlesTransactions.jsx";
import AllProducts from "./views/Dashboard/screens/AllProducts/AllProducts.jsx";
import DashboardLogin from "./views/Dashboard/screens/DashboardLogin/DashboardLogin.jsx";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
// import UserSettings from "./views/Dashboard/screens/UserSettings/UserSettings.jsx";
import LandingPage from "./views/Dashboard/screens/Landing/Landing.jsx";
import Pricing from "./views/Dashboard/screens/Pricing/Pricing.jsx";
import FreeTrial from "./views/Dashboard/screens/FreeTrial/FreeTrial.jsx";
import InvoicePanel from "./views/Dashboard/screens/InvoicePanel/InvoicePanel.jsx";
import Terms from "./views/Dashboard/screens/Terms/TermsAndConditions.jsx";
import ContactForm from "./views/Dashboard/components/ContactForm/ContactForm.jsx";
import Clients from "./views/Dashboard/screens/Clients/Clients.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18.js";
// import { Auth0Provider } from "@auth0/auth0-react";
import UsersDashboard from "./views/Dashboard/UsersDashboard.jsx";
import { AppProvider } from "./context/AppContext.js";
import ChatView from "./views/Dashboard/screens/ChatView/ChatView.jsx";
import NotificationsView from "./views/Dashboard/screens/NotificationsView/NotificationsView.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import UsersClientsDashboard from "./views/Dashboard/UsersClientsDashboard.jsx";
import AccountsDashboard from "./views/Dashboard/AccountsDashboard.jsx";

const stripePromise = loadStripe(
  "pk_live_51QUTjnJrDWENnRIxIm6EQ1yy5vckKRurXT3yYO9DcnzXI3hBB38LNtvILX2UgG1pvWcWcO00OCNs1laMyATAl320000RoIx74j"
);

import NavbarAdmin from "./views/Dashboard/components/NavbarAdmin/NavbarAdmin";


import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";


const Layout = () => {
  // const { user } = useSelector((state) => state.user);

  const { pathname } = window.location;

  const languageFromPath = pathname.split("/")[1];

  const supportedLanguages = [
    "en",
    "es",
    "fr",
    "de",
    "it",
    "ru",
    "pt",
    "nl",
    "sv",
  ];

  const defaultLanguage = "es";
  const currentLanguage =
    languageFromPath && supportedLanguages.includes(languageFromPath)
      ? languageFromPath
      : defaultLanguage;

  // useEffect(() => {
  //     i18n.changeLanguage(currentLanguage);
  // }, [currentLanguage]);



  const ComponentPrivate = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate()
    

    const [init, setInit] = useState(false)
    useEffect(()=>{
      setInit(true)

      if(user && user.success == false) { 
        navigate(`/login`)
      } 
  
    },[user])




    return (
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/accounts" element={<AccountsDashboard />} />
          <Route path="/users" element={<UsersDashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<Transactions />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/chat" element={<ChatView />} />
          <Route path="/chat/:id" element={<ChatView />} />
          <Route path="/articlestransactions" element={<ArticlesTransactions />} />
          <Route path="/notification" element={<NotificationsView />} />
          <Route path="/panel" element={<InvoicePanel />} />
          <Route path="/panel/:id" element={<InvoicePanel />} />
          <Route path="*" element={<ChatView />} />
        </Routes>
    );
  }

  return (
    <>

        <Elements stripe={stripePromise}>
          <I18nextProvider i18n={i18n}>
            <DndProvider backend={HTML5Backend}>
              <Provider store={store}>
                <AppProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/landing" element={<LandingPage />} />
                      <Route path="/contact" element={<ContactForm />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/terms" element={<Terms />} />

                      <Route path="/freetrial" element={<FreeTrial />} />
                      <Route path="/login" element={<DashboardLogin />} />
                      <Route path="/register" element={<DashboardLogin />} />
                      <Route path="/recover" element={<DashboardLogin />} />
                      <Route path="/otp" element={<DashboardLogin />} />

                      <Route path="/admin/*" element={<ComponentPrivate />} />
   
                      <Route path="*" element={<LandingPage />} />
                    </Routes>
                  </BrowserRouter>
                </AppProvider>
              </Provider>
            </DndProvider>
          </I18nextProvider>
        </Elements>
    </>
  );
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<Layout />);
} else {
  console.log("Error No se encontró el contenedor con id 'root'.");
}
