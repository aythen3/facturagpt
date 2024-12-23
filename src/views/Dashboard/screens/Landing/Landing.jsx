import React from "react";
import styles from "./Landing.module.css";
import Navbar from "../../components/Navbar/Navbar";
import NavHeader from "../../components/NavHeader/NavHeader";
import Packs from "../Packs/Packs";

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <Navbar />
      <NavHeader />
      <Packs />
    </div>
  );
};

export default Landing;
