import React, { useState } from 'react';
import styles from './AccountSettings.module.css';
import editProfile from '../../assets/editProfile.svg';
import briefcase from '../../assets/briefcase.svg';
import whatsApp from '../../assets/whatsappIcon.svg';
import arrow from '../../assets/arrow.svg';
import visa from '../../assets/visaPayment.png';
import mastercard from '../../assets/mastercardPayment.png';
import americanexpress from '../../assets/americanExpressPayment.png';
import paypal from '../../assets/paypalPayment.png';
import gpay from '../../assets/gPayment.png';
import metamask from '../../assets/metamaskPayment.png';
import coinbase from '../../assets/coinbasePayment.png';
import creditCard from '../../assets/creditCardIcon.png';

const AccountSettings = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+34');
  const [cardNumber, setCardNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fullName);
    console.log(email);
    console.log(password);
    console.log(phone);
    console.log(countryCode);
    console.log(cardNumber);
    console.log(paymentMethod);

    // const emailValue = e.target.value;
    // setEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('El correo electrónico no es válido.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordVerify = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'At least 8 characters, containing a letter and a number'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(emailValue)) {
    //   setEmailError('El correo electrónico no es válido.');
    // } else {
    //   setEmailError('');
    // }
  };

  const formatPhoneNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(?=\d)/g, '$1 ');
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <div className={styles.settingsProfile}>
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
          <button>Switch Account</button>
        </div>
      </div>

      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <div className={styles.row}>
              <p>Plan Actual</p>
              <span className={styles.taxes}>Impuestos no incluidos</span>
            </div>
            <div className={`${styles.row} ${styles.plan}`}>
              <p>
                Plan <strong>Plus</strong>
              </p>
              <span>322,20 € el día 1 Septiembre 2025</span>
            </div>
          </label>

          <label>
            <div className={styles.row}>
              <p>Última facturación</p>
              <button>Ver Historial</button>
            </div>
            <div className={styles.row}>
              <p>
                Plan <strong>Pro</strong>
              </p>
              <p>1 Agosto 2025</p>
            </div>
          </label>

          <label>
            <div className={styles.row}>
              <p>Nombre completo</p>
              <button type="button">Editar</button>
            </div>
            John Doe
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>

          <label>
            <div className={styles.row}>
              <p>Email</p>
              <button type="button">Editar</button>
            </div>
            j***e@gmail.com
            <input
              type="email"
              placeholder="john.doe@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <span className={styles.error}>{emailError}</span>}
          </label>
          <label className={styles.label}>
            <div className={styles.row}>
              <p>Contraseña</p>
              <button type="button">Editar</button>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                placeholder="****"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={styles.verify} onClick={handlePasswordVerify}>
                Verificar
              </span>
            </div>
            {passwordError && (
              <span className={styles.error}>{passwordError}</span>
            )}
          </label>

          <label className={styles.label}>
            <div className={styles.row}>
              <p>Teléfono</p>
              <button type="button">Editar</button>
            </div>
            +34 000 000 000
            <div className={styles.phoneInputs}>
              <select
                className={styles.countrySelect}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+34">España (+34)</option>
                <option value="+1">Estados Unidos (+1)</option>
                <option value="+44">Reino Unido (+44)</option>
                <option value="+52">México (+52)</option>
                <option value="+91">India (+91)</option>
                {/* Agrega más países según sea necesario */}
              </select>
              <input
                type="text"
                placeholder="000 000 000"
                className={styles.numberInput}
                value={formatPhoneNumber(phone)}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </label>

          <label>
            <div className={styles.row}>
              <p>Métodos de Pago</p>
              <button type="button">Añadir</button>
            </div>
            Desconocido
            <div className={styles.payContainer}>
              <div>
                <div className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === 'creditCard'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className={styles.paymentContainer}>
                    <div className={styles.paymentImage}>
                      <img src={visa} alt="Visa logo" />
                    </div>
                    <div className={styles.paymentImage}>
                      <img src={mastercard} alt="Mastercard logo" />
                    </div>
                    <div className={styles.paymentImage}>
                      <img src={americanexpress} alt="American Express logo" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className={styles.paymentImage}>
                    <img src={paypal} alt="Paypal logo" />
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="googlepay"
                    checked={paymentMethod === 'googlepay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className={styles.paymentImage}>
                    <img src={gpay} alt="Google pay logo" />
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="criptos"
                    checked={paymentMethod === 'criptos'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className={styles.paymentContainer}>
                    <div className={styles.paymentImage}>
                      <img src={metamask} alt="Metamask logo" />
                    </div>
                    <div className={styles.paymentImage}>
                      <img src={coinbase} alt="CoinBase logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>Card number</div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className={styles.input}
                value={formatCardNumber(cardNumber)}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <img
                src={creditCard}
                alt="Credit Card Icon"
                className={styles.icon}
              />
            </div>
            <button className={styles.save} type="submit">
              Guardar Cambios
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
