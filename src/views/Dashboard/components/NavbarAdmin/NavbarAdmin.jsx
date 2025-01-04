import React, { useState } from 'react';
import styles from './NavbarAdmin.module.css';
import star from '../../assets/starPlus.svg';
import facturaGPT from '../../assets/FacturaGPTIcon.svg';
import bookIcon from '../../assets/bookIcon.svg';
import clientIcon from '../../assets/peopleIcon.svg';
import headphonesIcon from '../../assets/headphonesIcon.svg';
import AccountSettings from '../AccountSettings/AccountSettings';

const NavbarAdmin = ({ showSidebar, setShowSidebar }) => {
  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.navbarAdmin}>
      <div className={styles.navbarAdminIcons}>
        <a href="/">
          <img src={facturaGPT} alt="" />
        </a>
        <a href="#">
          <span>234</span>
        </a>
        {/* <a href="#">
          <img src={bookIcon} alt="" />
        </a> */}
        <a href="/clients">
          <img src={clientIcon} alt="" />
        </a>
        {/* <a href="#">
          <img src={headphonesIcon} alt="" />
        </a> */}
      </div>

      <button className={styles.plus}>
        Obtener Plus <img src={star} alt="" />
      </button>
      <div className={styles.profile} onClick={handleProfileClick}>
        <div className={styles.profileText}>
          <p>John Doe</p>
          <span>Admin</span>
        </div>
        <img
          src="https://imgs.search.brave.com/PgZ2yAs6Q25FGu-KrTvZP7dBH3rQoJ268D7_MxlotEw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy9jb21tb25z/LzYvNjIvUnlhbl9B/Z29uY2lsbG9fKDIw/MDgpLmpwZw"
          alt=""
        />
      </div>

      <div className={`${styles.sidebar} ${showSidebar ? styles.show : ''}`}>
        <AccountSettings />
      </div>
    </div>
  );
};

export default NavbarAdmin;
