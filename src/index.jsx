import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { createRoot } from "react-dom/client";

// import i18n from "./i18n";

import store from "./utils/store";

import Transactions from './views/Dashboard/screens/Transactions/Transactions.jsx';
import ArticlesTransactions from './views/Dashboard/screens/ArticlesTransactions/ArticlesTransactions.jsx';

import DashboardLogin from "./views/Dashboard/screens/DashboardLogin/DashboardLogin.jsx";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
import UsersPermissions from "./views/Dashboard/screens/UsersPermissions/UsersPermissions.jsx";
import UserSettings from "./views/Dashboard/screens/UserSettings/UserSettings.jsx";
import LandingPage from "./views/Dashboard/screens/Landing/Landing.jsx";
import Pricing from "./views/Dashboard/screens/Pricing/Pricing.jsx";
import Reseller from "./views/Dashboard/screens/Reseller/index.jsx";
import FreeTrial from "./views/Dashboard/screens/FreeTrial/FreeTrial.jsx";
import InvoicePanel from "./views/Dashboard/screens/InvoicePanel/InvoicePanel.jsx";
import TermAndConditions from "./views/Dashboard/screens/TermsAndConditions/TermsAndConditions.jsx";
import ContactForm from "./views/Dashboard/components/ContactForm/ContactForm.jsx";
import Clients from "./views/Dashboard/screens/Clients/Clients.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18.js";


const Layout = () => {
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

  const [isAuth, setIsAuth] = useState(false);

  return (
    <>

      

      <I18nextProvider i18n={i18n}>
        <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<DashboardLogin />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/reseller" element={<Reseller />} />
                <Route path="/freetrial" element={<FreeTrial />} />
                <Route
                  path="/usersPermissions"
                  element={<UsersPermissions />}
                />
                <Route path="/userSettings" element={<UserSettings />} />
                <Route path="/clients" element={<Clients />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route
                path="/articlestransactions"
                element={<ArticlesTransactions />}
              />
              <Route
                path="/termsandconditions"
                element={<TermAndConditions />}
              />
                <Route path="*" element={<LandingPage />} />
                <Route path="/Panel" element={<InvoicePanel />} />
              </Routes>
            </BrowserRouter>
          </Provider>
        </DndProvider>
      </I18nextProvider>

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
