import React, { useState } from 'react';
import styles from './AccountSettings.module.css';
import editProfile from '../../assets/editProfile.svg';
import briefcase from '../../assets/briefcase.svg';
import whatsApp from '../../assets/whatsappIcon.svg';
import arrow from '../../assets/arrow.svg';

const AccountSettings = () => {
  const [accountType, setAccountType] = useState('Admin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [cif, setCif] = useState('');
  const [web, setWeb] = useState('');

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };
  const countries = [
    { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' },
    { name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
    { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
    { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(`.${styles.customSelect}`)) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div className={styles.settingsProfile}>
      <h3>Ajustes de Cuenta</h3>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img
            src="https://imgs.search.brave.com/yszRftL1W07LQ1giXc8GEbXRV3GF1_nphk6aeJp4AOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/bXlzdGVyaW91cy1w/cm9maWxlLXBpY3R1/cmUtdjAtbHZmZDgx/MnBwcTFlMS5qcGVn/P3dpZHRoPTY0MCZj/cm9wPXNtYXJ0JmF1/dG89d2VicCZzPTcx/MmIyNDNkMDBlMGI3/MDE3ODM1MmZhNWRj/MzhkNWZmNDVmM2Yz/OGE"
            alt=""
          />
          <div className={styles.editProfile}>
            <img src={editProfile} alt="" />
          </div>
        </div>
        <div className={styles.profileInfo}>
          <p>John Doe</p>
          <span>john.doe@gmail.com</span>
          <a href="#">Switch Account</a>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Tipo de Cuenta
            <div className={styles.accountType}>
              <img src={briefcase} alt="" />
              <input
                type="text"
                value={accountType}
                disabled
                onChange={(e) => setAccountType(e.target.value)}
              />
            </div>
          </label>
          <label>
            <p>
              Nombre Completo <span className={styles.required}>*</span>
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </label>
          <label>
            <p>
              Email <span className={styles.required}>*</span>
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@gmail.com"
            />
          </label>
          <label>
            <p>
              Contraseña <span className={styles.required}>*</span>
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
            <p className={styles.passwordRequirements}>
              At least <span>8 characters</span>, containing{' '}
              <span>a letter</span> and <span>a number</span>
            </p>
          </label>
          <label>
            <p>
              Teléfono <span className={styles.required}>*</span>
            </p>
            <div className={styles.phoneInputContainer}>
              <input
                type="text"
                className={styles.countryCodeInput}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                placeholder="+34"
              />
              <input
                type="tel"
                className={styles.phoneNumberInput}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="000000000"
              />
            </div>
          </label>
          <label className={styles.customSelect}>
            <p>País</p>
            <div className={styles.selectedOption} onClick={toggleDropdown}>
              <div className={styles.countryInfo}>
                <img src={selectedCountry.flag} alt={selectedCountry.name} />
                <span>{selectedCountry.name}</span>
              </div>
              <span>
                <img src={arrow} alt="" />
              </span>
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdownOptions}>
                {countries.map((country) => (
                  <div
                    key={country.name}
                    className={styles.dropdownOption}
                    onClick={() => handleSelect(country)}
                  >
                    <img src={country.flag} alt={country.name} />
                    <span>{country.name}</span>
                  </div>
                ))}
              </div>
            )}
          </label>

          <label>
            <p>
              Provincia/Estado <span className={styles.required}>*</span>
            </p>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="Provincia"
            />
          </label>
          <label>
            <p>
              Código Postal <span className={styles.required}>*</span>
            </p>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="00000"
            />
          </label>
          <label>
            <p>
              Ciudad <span className={styles.required}>*</span>
            </p>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="00000"
            />
          </label>
          <label>
            <p>
              Calle <span className={styles.required}>*</span>
            </p>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="00000"
            />
          </label>
          <label>
            <p>CIF o NIF</p>
            <input
              type="text"
              value={cif}
              onChange={(e) => setCif(e.target.value)}
              placeholder="00000"
            />
          </label>
          <label>
            <p>Web o dominio corporativo</p>
            <input
              type="url"
              value={web}
              onChange={(e) => setWeb(e.target.value)}
              placeholder="www.dominio.com"
            />
          </label>
          <label>
            <p>Logo</p>
            <div className={styles.fileInput}>
              Añade tu Logo
              <input type="file" />
            </div>
          </label>

          <label>
            <p>Añadir Firma</p>
            <div className={styles.fileInput}>
              Añade tu Firma
              <input type="file" />
            </div>
          </label>
          {/* 
          <label>
            <p>Chatear por WhatsApp</p>
            <button>
              <img src={whatsApp} alt='' />
              Abrir WhatsApp
            </button>
          </label> */}
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
