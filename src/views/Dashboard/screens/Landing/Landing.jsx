import React from "react";
import styles from "./Landing.module.css";
import Navbar from "../../components/Navbar/Navbar";
import NavHeader from "../../components/NavHeader/NavHeader";
import CookiePopup from "../../components/CookiePopup/CookiePopup";
import Packs from "../Packs/Packs";

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <Navbar />
      <NavHeader />
      <Packs />
      <CookiePopup />
    </div>
  );
};

export default Landing;
