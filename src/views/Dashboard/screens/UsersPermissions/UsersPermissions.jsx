import React, { useEffect, useRef, useState } from 'react';
import styles from './UsersPermissions.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUser } from '../../../../actions/emailManager';
import { FaChevronDown } from 'react-icons/fa';
import { setUser } from '../../../../slices/emailManagerSlices';

const UsersPermissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUsers, user: userData } = useSelector(
    (state) => state.emailManager
  );

  // State to track selected options for each user
  const [userOptions, setUserOptions] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown by user ID
  const dropdownRef = useRef(null);

  const options = ['user', 'admin', 'superadmin'];

  // Fetch all users on mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Initialize userOptions with user roles
  useEffect(() => {
    const initialOptions = {};
    allUsers.forEach((user) => {
      initialOptions[user.id] = user.role || 'user'; // Default to 'user' if role is not defined
    });
    setUserOptions(initialOptions);
  }, [allUsers]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Handle dropdown toggle for a specific user
  const handleDropdownToggle = (userId) => {
    setOpenDropdown((prev) => (prev === userId ? null : userId));
  };

  // Handle role change for a specific user
  const handleOptionClick = (userId, option) => {
    setUserOptions((prevOptions) => ({
      ...prevOptions,
      [userId]: option,
    }));
    setOpenDropdown(false); // Close the dropdown
    // Here you can dispatch an update action to save the new role
    console.log(`Updated role for user ${userId}: ${option}`);
    dispatch(updateUser({ userId, toUpdate: { role: option } }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('emailManagerAccount');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email && parsedUser?.id && parsedUser?.role) {
          dispatch(setUser(parsedUser));
          console.log(
            'Logged-in account restored from localStorage:',
            parsedUser
          );
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    } else {
      navigate('/login');
    }
  }, []);

  if (!userData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.headerTitle}>Usuarios y permisos</h1>
        <p className={styles.headerSubtitle}>Asociados y sus cuentas</p>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <span className={styles.columnName}>Nombre empresa</span>
            <span className={styles.columnContact}>Contacto</span>
            <span className={styles.columnPassword}>Contraseña</span>
            <span className={styles.columnEmail}>Email</span>
            <span className={styles.columnRole}>Rol</span>
          </div>
          {allUsers.map((user) => (
            <div key={user.id} className={styles.tableRow}>
              <span className={styles.columnName}>{user.email || '-'}</span>
              <span className={styles.columnContact}>{user.email || '-'}</span>
              <span className={styles.columnPassword}>-</span>
              <span className={styles.columnEmail}>{user.email}</span>
              {user.email === userData.email ? (
                <span className={styles.columnRole}>{user.role}</span>
              ) : userData.role !== 'user' ? (
                <div
                  className={styles.filterSort}
                  onClick={() => handleDropdownToggle(user.id)}
                >
                  <b>{userOptions[user.id]}</b>
                  <FaChevronDown className={styles.chevronIcon} />
                  {openDropdown === user.id && (
                    <div ref={dropdownRef} className={styles.dropdownOptions}>
                      {options.map((option, index) => (
                        <div
                          key={option}
                          className={styles.dropdownOption}
                          onClick={() => handleOptionClick(user.id, option)}
                          style={{
                            borderBottom:
                              index === options.length - 1 && 'none',
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className={styles.columnRole}>{user.role}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPermissions;
