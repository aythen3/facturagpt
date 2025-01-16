import React, { useEffect, useState } from "react";
import styles from "./AccountSettings.module.css";
import editProfile from "../../assets/editProfile.svg";
import visa from "../../assets/visaPayment.png";
import mastercard from "../../assets/mastercardPayment.png";
import americanexpress from "../../assets/americanExpressPayment.png";
import paypal from "../../assets/paypalPayment.png";
import gpay from "../../assets/gPayment.png";
import metamask from "../../assets/metamaskPayment.png";
import coinbase from "../../assets/coinbasePayment.png";
import creditCard from "../../assets/creditCardIcon.png";
import spanish_flag from "../../assets/spain_flag.svg";
import english_flag from "../../assets/english_flag.svg";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import SeeHistory from "../SeeHistory/SeeHistory";
import { useDispatch, useSelector } from "react-redux";
import EditableInput from "./EditableInput/EditableInput";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { updateUser } from "../../../../actions/user";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("accountSetting");
  const { user, updatingUserLoading } = useSelector((state) => state.user);
  const { logout } = useAuth0();

  const [userData, setUserData] = useState();

  useEffect(() => {
    if (user) {
      const newUserData = {
        nombre: user?.nombre || "",
        email: user?.email || "",
        password: user?.password || "",
        phone: user?.phone || "",
        countryCode: user?.countryCode || "+34",
        cardNumber: user?.cardNumber || "",
        paymentMethod: user?.paymentMethod || "",
        plan: user?.plan || "Free",
        userDomain: user?.userDomain || "www.web.com",
        fiscalNumber: user?.fiscalNumber || "A12345678",
        currency: user?.currency || "EUR",
        language: user?.language || "ES",
      };
      console.log("setting user to ", newUserData);
      setUserData(newUserData);
    }
  }, [user]);

  const [seeHistory, setSeeHistory] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [editingCurrency, setEditingCurrency] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(false);

  const handleLogOut = () => {
    const isConfirm = confirm(t("confirmLogout"));
    if (isConfirm) {
      localStorage.removeItem("user");
      logout();
    }
  };
  const formatPhoneNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(?=\d)/g, "$1 ");
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleChange = ({ name, newValue }) => {
    console.log(`Setting ${name} to ${newValue}`);
    setUserData({ ...userData, [name]: newValue });
  };

  const handleSave = async () => {
    dispatch(updateUser({ userId: user.id, toUpdate: userData }));
  };

  return (
    <div className={styles.settingsProfile}>
      {seeHistory && user && (
        <div className={styles.seeHistoryContainer}>
          <SeeHistory
            setSeeHistory={setSeeHistory}
            seeHistory={seeHistory}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        </div>
      )}
      {userData && (
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
            <p>{user?.nombre}</p>
            <span>{user?.email}</span>
            <button>{t("changeAccount")}</button>
            <button
              style={{ cursor: "pointer", color: "red" }}
              onClick={handleLogOut}
            >
              {t("logout")}
            </button>
          </div>
        </div>
      )}

      {userData && (
        <div>
          <div className={styles.form}>
            <label>
              <div className={styles.row}>
                <p>{t("currentPlan")}</p>
                <span className={styles.taxes}>{t("taxes")}</span>
              </div>
              <div className={`${styles.row} ${styles.plan}`}>
                <p>
                  Plan <strong>{user?.plan || "Free"}</strong>
                </p>
                <span>322,20 € {t("day")} 1 Septiembre 2025</span>
              </div>
            </label>

            <label>
              <div className={styles.row}>
                <p>{t("lastBilling")}</p>
                <button onClick={() => setSeeHistory(true)}>
                  {t("record")}
                </button>
              </div>

              <div className={styles.row}>
                <p>
                  Plan <strong>{user?.plan || "Free"}</strong>
                </p>
                <p>1 Agosto 2025</p>
              </div>
            </label>

            <EditableInput
              label={t("fullName")}
              initialValue={user?.nombre}
              value={userData?.nombre}
              name="nombre"
              onSave={handleChange}
            />

            <EditableInput
              label={t("email")}
              initialValue={user?.email}
              value={userData?.email}
              type="email"
              name="email"
              onSave={handleChange}
            />

            <EditableInput
              label={t("password")}
              initialValue={"********"}
              value={userData?.password}
              type="password"
              name="password"
              verify={true}
              onSave={handleChange}
            />

            <label className={styles.label}>
              <div className={styles.row}>
                <p>{t("phone")}</p>
                <button type="button">{t("edit")}</button>
              </div>
              +34 000 000 000
              <div className={styles.phoneInputs}>
                <select
                  className={styles.countrySelect}
                  value={userData?.countryCode}
                  name="countryCode"
                  onChange={handleChange}
                >
                  <option value="+34">{t("spain")} (+34)</option>
                  <option value="+1">{t("unitedStates")} (+1)</option>
                  <option value="+44">{t("unitedKingdom")} (+44)</option>
                  <option value="+52">{t("mexico")} (+52)</option>
                  <option value="+91">{t("india")} (+91)</option>
                </select>
                <input
                  type="text"
                  placeholder="000 000 000"
                  className={styles.numberInput}
                  name="phone"
                  value={userData?.phone || ""}
                  onChange={handleChange}
                />
              </div>
            </label>

            <label>
              <div className={styles.row}>
                <p>{t("payMethods")}</p>
                <button type="button">{t("add")}</button>
              </div>
              {t("unknown")}
              <div className={styles.payContainer}>
                <div>
                  <div className={styles.paymentMethod}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={userData?.paymentMethod === "creditCard"}
                      onChange={handleChange}
                    />
                    <div className={styles.paymentContainer}>
                      <div className={styles.paymentImage}>
                        <img src={visa} alt="Visa logo" />
                      </div>
                      <div className={styles.paymentImage}>
                        <img src={mastercard} alt="Mastercard logo" />
                      </div>
                      <div className={styles.paymentImage}>
                        <img
                          src={americanexpress}
                          alt="American Express logo"
                        />
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
                      checked={userData?.paymentMethod === "paypal"}
                      onChange={handleChange}
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
                      value="gPay"
                      checked={userData?.paymentMethod === "gPay"}
                      onChange={handleChange}
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
                      value="crypto"
                      checked={userData?.paymentMethod === "crypto"}
                      onChange={handleChange}
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
              <div style={{ marginTop: "10px" }}>
                <div className={styles.row}>{t("cardNumber")}</div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className={styles.input}
                    name="cardNumber"
                    value={userData?.cardNumber}
                    onChange={(e) =>
                      handleChange({
                        name: "cardNumber",
                        newValue: e.target.value,
                      })
                    }
                  />
                  <img
                    src={creditCard}
                    alt="Credit Card Icon"
                    className={styles.icon}
                  />
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                Expire date
                <div className={styles.phoneInputs}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className={styles.numberInput}
                  />
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                Security Code
                <div className={styles.phoneInputs}>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="***"
                    className={styles.numberInput}
                  />
                </div>
              </div>
            </label>

            <label>
              <div className={styles.row}>
                <p>Detalles de facturación</p>
                <button type="button">{t("edit")}</button>
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

            <EditableInput
              label={"Número Fiscal"}
              initialValue={user?.fiscalNumber || ""}
              value={userData?.fiscalNumber}
              name="fiscalNumber"
              onSave={handleChange}
            />

            <EditableInput
              label={"Web o dominio corporativo"}
              initialValue={user?.userDomain || "www.web.com"}
              value={userData?.userDomain}
              name="userDomain"
              onSave={handleChange}
            />

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
                <div
                  className={styles.editButton}
                  onClick={() => {
                    console.log("clicking on edit button...");
                    if (editingCurrency) {
                      setEditingCurrency(false);
                    } else {
                      setEditingCurrency(true);
                    }
                  }}
                  type="button"
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {editingCurrency ? "Guardar" : "Editar"}
                </div>
              </div>
              {userData?.currency || "EUR"}
              <CustomDropdown
                editable={editingCurrency}
                options={["EUR", "USD"]}
                selectedOption={userData?.currency}
                setSelectedOption={(option) =>
                  handleChange({ name: "currency", newValue: option })
                }
              />
            </label>
            <label>
              <div className={styles.row}>
                <p>Idioma</p>
                <div
                  className={styles.editButton}
                  onClick={() => {
                    console.log("clicking on edit button...");
                    if (editingLanguage) {
                      setEditingLanguage(false);
                    } else {
                      setEditingLanguage(true);
                    }
                  }}
                  type="button"
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {editingLanguage ? "Guardar" : "Editar"}
                </div>
              </div>
              {userData?.language === "EN" ? "Ingles" : "Español"}
              <div>
                <div className={styles.flagContainers}>
                  <img
                    onClick={() => {
                      editingLanguage &&
                        handleChange({ name: "language", newValue: "ES" });
                    }}
                    className={styles.flagItem}
                    src={spanish_flag}
                  />
                  <img
                    onClick={() => {
                      editingLanguage &&
                        handleChange({ name: "language", newValue: "EN" });
                    }}
                    className={styles.flagItem}
                    src={english_flag}
                  />
                </div>
              </div>
            </label>
            <button onClick={handleSave} className={styles.save} type="submit">
              {updatingUserLoading ? "Guardando..." : t("saveChange")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
