import React, { useState } from 'react';
import styles from './AccountSettings.module.css';
import editProfile from '../../assets/editProfile.svg';
import visa from '../../assets/visaPayment.png';
import mastercard from '../../assets/mastercardPayment.png';
import americanexpress from '../../assets/americanExpressPayment.png';
import paypal from '../../assets/paypalPayment.png';
import gpay from '../../assets/gPayment.png';
import metamask from '../../assets/metamaskPayment.png';
import coinbase from '../../assets/coinbasePayment.png';
import creditCard from '../../assets/creditCardIcon.png';
import spanish_flag from '../../assets/spain_flag.svg';
import english_flag from '../../assets/english_flag.svg';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

const AccountSettings = () => {
  const { t } = useTranslation('accountSetting');
  const { logout } = useAuth0();

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

  const handleLogOut = () => {
    const isConfirm = confirm(t('confirmLogout'));
    if (isConfirm) {
      logout();
    }
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
          <button>{t('changeAccount')}</button>
          <button
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={handleLogOut}
          >
            {t('logout')}
          </button>
        </div>
      </div>

      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <div className={styles.row}>
              <p>{t('currentPlan')}</p>
              <span className={styles.taxes}>{t('taxes')}</span>
            </div>
            <div className={`${styles.row} ${styles.plan}`}>
              <p>
                Plan <strong>Plus</strong>
              </p>
              <span>322,20 € {t('day')} 1 Septiembre 2025</span>
            </div>
          </label>

          <label>
            <div className={styles.row}>
              <p>{t('lastBilling')}</p>
              <button>{t('record')}</button>
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
              <p>{t('fullName')}</p>
              <button type="button">{t('edit')}</button>
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
              <p>{t('email')}</p>
              <button type="button">{t('edit')}</button>
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
              <p>{t('password')}</p>
              <button type="button">{t('edit')}</button>
            </div>
            <div className={styles.inputWrapper}>
              ****
              <input
                type="password"
                placeholder="****"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={styles.verify} onClick={handlePasswordVerify}>
                {t('verify')}
              </span>
            </div>
            {passwordError && (
              <span className={styles.error}>{passwordError}</span>
            )}
          </label>

          <label className={styles.label}>
            <div className={styles.row}>
              <p>{t('phone')}</p>
              <button type="button">{t('edit')}</button>
            </div>
            +34 000 000 000
            <div className={styles.phoneInputs}>
              <select
                className={styles.countrySelect}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+34">{t('spain')} (+34)</option>
                <option value="+1">{t('unitedStates')} (+1)</option>
                <option value="+44">{t('unitedKingdom')} (+44)</option>
                <option value="+52">{t('mexico')} (+52)</option>
                <option value="+91">{t('india')} (+91)</option>
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
              <p>{t('payMethods')}</p>
              <button type="button">{t('add')}</button>
            </div>
            {t('unknown')}
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
            <div style={{ marginTop: '10px' }}>
              <div className={styles.row}>{t('cardNumber')}</div>
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
            </div>
            <div style={{ marginTop: '10px' }}>
              Expire date
              <div className={styles.phoneInputs}>
                <input
                  type="text"
                  placeholder="000 000 000"
                  className={styles.numberInput}
                />
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              {' '}
              Security Code
              <div className={styles.phoneInputs}>
                <input
                  type="text"
                  placeholder="000 000 000"
                  className={styles.numberInput}
                />
              </div>
            </div>
          </label>

          <label>
            <div className={styles.row}>
              <p>Detalles de facturación</p>
              <button type="button">{t('edit')}</button>
            </div>
            Sin especificar
            <div className={styles.facturacion}>
              <input type="radio" name="facturacion" value="facturacion" />
              <div className={styles.facturacionZip}>
                Email adress, Zip code / Postcode, Country of residence
                <button>Editar</button>
              </div>
            </div>
            <div>
              <span>info@email.com</span> <button>Editar</button>
            </div>
            <div className={styles.info}>
              <input
                type="text"
                placeholder="Email Adress"
                className={styles.numberInput}
              />
              <input
                type="text"
                placeholder="Zip code / Postcode"
                className={styles.numberInput}
              />
            </div>
            Country of residence
            <input
              type="text"
              placeholder="Spain"
              className={styles.numberInput}
            />
          </label>

          <label>
            <div className={styles.row}>
              <p>Número Fiscal</p>
              <button type="button">{t('edit')}</button>
            </div>
            000000
            <input type="text" placeholder="000 000 000" />
          </label>

          <label>
            <div className={styles.row}>
              <p>Web o dominio corporativo</p>
              <button type="button">{t('edit')}</button>
            </div>
            www.web.com
            <input type="text" placeholder="www.web.com" />
          </label>

          <label>
            <div className={styles.row}>
              <p>Logo corporativo</p>
              <button type="button">Añadir</button>
            </div>
            <div className={styles.logoCorporativo}>
              <div className={styles.container}>
                <input type="radio" name="corporativeLogo1" />
                <img
                  src="https://www.surforma.com/media/filer_public_thumbnails/filer_public/25/c7/25c793ae-4b50-40f3-a954-1fdc52c999fd/l4068.jpg__800x600_q95_crop_subsampling-2_upscale.jpg"
                  alt=""
                />
                <div className={styles.delete}>-</div>
              </div>
              <div className={styles.container}>
                <input type="radio" name="corporativeLogo1" />
                <img
                  src="https://www.surforma.com/media/filer_public_thumbnails/filer_public/25/c7/25c793ae-4b50-40f3-a954-1fdc52c999fd/l4068.jpg__800x600_q95_crop_subsampling-2_upscale.jpg"
                  alt=""
                />
                <div className={styles.delete}>-</div>
              </div>
            </div>
          </label>

          <label>
            <div className={styles.row}>
              <p>Firma</p>
              <button type="button">Añadir</button>
            </div>
            <div className={styles.logoCorporativo}>
              <div className={styles.container}>
                <input type="radio" name="corporativeLogo1" />
                <img
                  src="https://www.surforma.com/media/filer_public_thumbnails/filer_public/25/c7/25c793ae-4b50-40f3-a954-1fdc52c999fd/l4068.jpg__800x600_q95_crop_subsampling-2_upscale.jpg"
                  alt=""
                />
                <div className={styles.delete}>-</div>
              </div>
              <div className={styles.container}>
                <input type="radio" name="corporativeLogo1" />
                <img
                  src="https://www.surforma.com/media/filer_public_thumbnails/filer_public/25/c7/25c793ae-4b50-40f3-a954-1fdc52c999fd/l4068.jpg__800x600_q95_crop_subsampling-2_upscale.jpg"
                  alt=""
                />
                <div className={styles.delete}>-</div>
              </div>
            </div>
          </label>

          <label>
            <div className={styles.row}>
              <p>Divisa</p>
              <button type="button">Editar</button>
            </div>
            EUR
            <div>
              <select className={styles.divisa}>
                <option value="EUR">EUR</option>
                <option value="DOLAR">DOLAR</option>
              </select>
            </div>
          </label>
          <label>
            <div className={styles.row}>
              <p>Idioma</p>
              <button type="button">Editar</button>
            </div>
            Español
            <div>
              <div className={styles.flagContainers}>
                <img src={spanish_flag} />
                <img src={english_flag} />
              </div>
            </div>
          </label>
          <button className={styles.save} type="submit">
            {t('saveChange')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
