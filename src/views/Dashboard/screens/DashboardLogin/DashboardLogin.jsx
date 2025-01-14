import React, { useEffect, useState } from "react";
import styles from "./DashboardLogin.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";
import facturaLogo from "../../assets/logo-facturagpt.svg";
import { useDispatch, useSelector } from "react-redux";
import { OTPInput } from "../../components/OtpInput/OtpInput";
import { ReactComponent as OpenAiLogo } from "../../assets/openai.svg";
import { LockIcon, Mail } from "lucide-react";
import { ReactComponent as KeyIcon } from "../../assets/key-icon.svg";
import {
  createAccount,
  loginToManager,
  verifyOTP,
  sendOTP,
} from "../../../../actions/user";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import { setUser } from "../../../../slices/emailManagerSlices";
import sentEmail from "../../assets/sentEmail.svg";
import i18n from "../../../../i18";

const DashboardLogin = () => {
  const { t } = useTranslation("dahsboardLogin");
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [storedEmail, setStoredEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    if (!minLength.test(password)) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return false;
    }
    if (!hasUpperCase.test(password)) {
      setError("La contraseña debe contener al menos una letra mayúscula.");
      return false;
    }
    if (!hasLowerCase.test(password)) {
      setError("La contraseña debe contener al menos una letra minúscula.");
      return false;
    }
    if (!hasNumber.test(password)) {
      setError("La contraseña debe contener al menos un número.");
      return false;
    }

    setError("");
    return true;
  };

  useEffect(() => {
    console.log("location", location);
    if (location?.pathname === "/login" && mode !== "signin") setMode("signin");
    if (location?.pathname === "/register" && mode !== "signup")
      setMode("signup");
    if (location?.pathname === "/recover" && mode !== "forgot-password")
      setMode("forgot-password");
    if (location?.pathname === "/otp" && mode !== "otp") setMode("otp");
  }, [location]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let timer;
    if (mode === "otp" && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, resendTimer]);

  const clearStates = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setOtp("");
    setError("");
    setStoredEmail("");
    setStoredPassword("");
  };

  useEffect(() => {
    if (mode !== "otp") {
      setStoredEmail(email);
      setStoredPassword(password);
    }
  }, [email, password, mode]);

  const handleSignin = () => {
    if (error !== "") {
      return;
    }
    if (email.length > 1 && password.length > 1) {
      setIsLoading(true);
      dispatch(loginToManager({ email, password }))
        .unwrap()
        .then((response) => {
          let accountData = {
            email,
            role: response?.role,
            accessToken: response?.password,
            id: response?.id,
          };
          localStorage.setItem("user", JSON.stringify(accountData));
          clearStates();
          if (response.role !== "user") {
            navigate("/home");
          } else {
            navigate("/panel");
          }
        })
        .catch((error) => {
          setError(error.message || "Failed to sign in");

          setError(error.message || "Error al iniciar sesión");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSignup = async () => {
    if (storedEmail.length > 1 && storedPassword.length > 1) {
      setIsLoading(true);
      const language = await localStorage.getItem("language");
      console.log("language", language);
      dispatch(sendOTP({ email: storedEmail, language }))
        .unwrap()
        .then(() => {
          setMode("otp");
          navigate("/otp");
          setResendTimer(45);
        })
        .catch((error) => {
          setError(error.message || "Error al enviar código de verificación");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleVerifyOTP = (receivedOtp) => {
    console.log("on handleVerifyOTP", receivedOtp);
    if (receivedOtp.length === 6) {
      setIsLoading(true);
      console.log({ email: storedEmail, otp: receivedOtp });
      dispatch(verifyOTP({ email: storedEmail, otp: receivedOtp }))
        .unwrap()
        .then(() => {
          dispatch(
            createAccount({
              nombre,
              email: storedEmail,
              password: storedPassword,
            })
          )
            .unwrap()
            .then(() => {
              clearStates();
              setMode("signin");
              navigate("/login");
            })
            .catch((error) => {
              setError(error.message || "Error al crear cuenta");
            });
        })
        .catch((error) => {
          setError(error.message || "Error al verificar código");
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  };

  const handleResendOTP = () => {
    setIsLoading(true);
    dispatch(sendOTP({ email: storedEmail }))
      .unwrap()
      .then(() => {
        setResendTimer(45);
      })
      .catch((error) => {
        setError(error.message || "Error al reenviar código de verificación");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleForgotPassword = () => {
    if (email.length > 1 && recaptchaValue) {
      setIsLoading(true);
      // Implement Logic
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const renderTitle = () => {
    switch (mode) {
      case "signup":
        return t("title1");
      case "otp":
        return t("title2");

      case "forgot-password":
        return t("title3");

      default:
        return t("title4");
    }
  };

  const renderLogo = () => (
    <div className={styles.logoContainer}>
      <img
        onClick={() => navigate("/landing")}
        src={facturaLogo}
        alt="FacturaGPT"
        className={styles.logo}
      />
      <span className={styles.logoText}>
        Factura<strong>GPT</strong>
      </span>
    </div>
  );

  const renderForm = () => (
    <form className={styles.form}>
      {mode === "signup" && (
        <label className={styles.label}>
          Nombre Completo*
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Name"
            className={styles.input}
          />
        </label>
      )}
      <label className={styles.label}>
        {t("label1")}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={t("placeholder1")}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        {t("label2")}
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder={t("placeholder2")}
          className={styles.input}
        />
        <span className={styles.passwordRequirements}>
          {t("conditionPassword")}
        </span>
      </label>
      {mode === "signin" && (
        <div className={styles.forgotPasswordContainer}>
          <div className={styles.rememberMe}>
            <input type="checkbox" />
            <span>{t("remember")}</span>
          </div>
          <a
            href="#"
            className={styles.forgotPassword}
            onClick={(e) => {
              e.preventDefault();
              setMode("forgot-password");
              navigate("/recover");
            }}
          >
            {t("forgot")}
          </a>
        </div>
      )}
      <div
        onClick={() => (mode === "signin" ? handleSignin() : handleSignup())}
        className={`${styles.signInButton} ${isLoading ? styles.loading : ""}`}
      >
        {isLoading
          ? mode === "signin"
            ? "Signing in..."
            : "Signing up..."
          : mode === "signin"
            ? t("buttonRegister1")
            : t("buttonRegister2")}
      </div>
      {mode === "signin" && (
        <button
          onClick={() => loginWithRedirect()}
          className={styles.buttonOpenAi}
        >
          <OpenAiLogo />
          <span>{t("loginIAButton")}</span>
        </button>
      )}
    </form>
  );

  const renderForgotPasswordForm = () => (
    <div className={styles.rightContainer}>
      <div className={styles.forgotPasswordIcon}>
        <KeyIcon />
      </div>
      <h1 className={styles.forgotPasswordTitle}>{t("title3")}</h1>
      <p className={styles.forgotPasswordSubtitle}>{t("solution")}</p>
      <form className={styles.form}>
        <label className={styles.label}>
          {t("label1")}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={t("placeholder1")}
            className={styles.input}
          />
        </label>
        {/* <div className={styles.recaptchaContainer}>
          <div className="g-recaptcha" data-sitekey="your-site-key"></div>
        </div> */}
        <button
          type="button"
          onClick={handleForgotPassword}
          className={styles.continueButton}
          disabled={isLoading}
        >
          {isLoading ? t("buttonContinue2") : t("buttonContinue1")}
        </button>
      </form>
      <p className={styles.securityNote}>
        <span className={styles.lockIcon}>
          <img src={LockIcon} />
        </span>
        {t("security")}
      </p>
    </div>
  );

  if (mode === "otp") {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.rightContainer}>
            <div className={styles.mailIconContainer}>
              <img src={sentEmail} alt="sentEmail" />
            </div>
            <h1 className={styles.titleOtp}>{renderTitle()}</h1>
            <p className={styles.subtitleOtp}>
              Enviamos un código para que puedas continuar.
            </p>
            <p className={styles.emailDisplay}>{storedEmail}</p>
            <OTPInput onChange={setOtp} handleVerifyOTP={handleVerifyOTP} />
            <div className={styles.resendContainer}>
              <span>Didn't get the code? </span>
              {resendTimer > 0 ? (
                <span className={styles.timer}>{resendTimer}s</span>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className={styles.resendButton}
                  disabled={isLoading}
                >
                  Resend it
                </button>
              )}
            </div>
            <div
              onClick={() => handleVerifyOTP(otp)}
              className={`${styles.signInButton} ${
                isLoading ? styles.loading : ""
              }`}
            >
              {isLoading ? "Verifying..." : "Next"}
            </div>
            <p className={styles.error}>{error}</p>
            <p className={styles.securityNote}>
              <span className={styles.lockIcon}>
                <LockIcon />
              </span>{" "}
              Tu seguridad nos importa
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "forgot-password") {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.leftContainer}>{renderLogo()}</div>
          {renderForgotPasswordForm()}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.leftContainer}>{renderLogo()}</div>
        <div className={styles.rightContainer}>
          <h1 className={styles.title}>{renderTitle()}</h1>
          <p className={styles.subtitle}>{t("subTitle")}</p>
          {renderForm()}
          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.footerText}>
            {mode === "signin" ? t("notAccount1") : t("yesAccount1")}{" "}
            {t("notAccount2")}{" "}
            <a
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                navigate(mode === "signin" ? "/register" : "/login");
              }}
              className={styles.signUp}
            >
              {mode === "signin" ? t("register") : t("login")}
            </a>
          </p>
          <p className={styles.footer}>© {t("copyright")}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
