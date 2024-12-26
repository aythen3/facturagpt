import React, { useState } from 'react';
import styles from './AccountSettings.module.css';

const AccountSettings = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [password, setPassword] = useState('********');
  const [phone, setPhone] = useState('+34 000000000');
  const [country, setCountry] = useState('España');
  const [province, setProvince] = useState('Madrid');
  const [postalCode, setPostalCode] = useState('00000');
  const [city, setCity] = useState('Madrid');
  const [street, setStreet] = useState('Calle Falsa 123');
  const [cif, setCif] = useState('A12345678');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <form className={styles.accountSettings} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter your name'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='phone'>Phone Number</label>
        <input
          type='tel'
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Enter your phone number'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='country'>Country</label>
        <input
          type='text'
          id='country'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Enter your country'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='province'>Province</label>
        <input
          type='text'
          id='province'
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          placeholder='Enter your province'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='postalCode'>Postal Code</label>
        <input
          type='text'
          id='postalCode'
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder='Enter your postal code'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter your city'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder='Enter your street'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='cif'>CIF</label>
        <input
          type='text'
          id='cif'
          value={cif}
          onChange={(e) => setCif(e.target.value)}
          placeholder='Enter your CIF'
        />
      </div>
      <button type='submit' className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default AccountSettings;
