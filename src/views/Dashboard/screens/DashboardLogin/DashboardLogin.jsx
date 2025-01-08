import React, { useEffect, useState } from "react";
import styles from "./DashboardLogin.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import facturaLogo from "../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { OTPInput } from "../../components/OtpInput/OtpInput";
import { ReactComponent as OpenAiLogo } from "../../assets/openai.svg";
import { LockIcon } from "lucide-react";
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

const DashboardLogin = () => {
  const { t } = useTranslation("dahsboardLogin");
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const { user } = useSelector((state) => state.emailManager);
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
    if (user?.email && user?.id && user?.role) {
      localStorage.setItem("emailManagerAccount", JSON.stringify(user));
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("emailManagerAccount");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email && parsedUser?.id && parsedUser?.role) {
          dispatch(setUser(parsedUser));
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, [dispatch]);

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
        .then(() => {
          clearStates();
          navigate("/home");
        })
        .catch((error) => {
          setError(error.message || "Error al iniciar sesión");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSignup = () => {
    if (storedEmail.length > 1 && storedPassword.length > 1) {
      setIsLoading(true);
      dispatch(sendOTP({ email: storedEmail }))
        .unwrap()
        .then(() => {
          setMode("otp");
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

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      console.log({ email: storedEmail, otp });
      dispatch(verifyOTP({ email: storedEmail, otp }))
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
            })
            .catch((error) => {
              setError(error.message || "Error al crear cuenta");
            });
        })
        .catch((error) => {
          setError(error.message || "Error al verificar código");
        })
        .finally(() => {
          setIsLoading(false);
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
          <LockIcon size={14} />
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
              {/* <Mail size={32} className={styles.mailIcon} /> */}
              icon
            </div>
            <h1 className={styles.titleOtp}>{renderTitle()}</h1>
            <p className={styles.subtitleOtp}>
              Enviamos un código para que puedas continuar.
            </p>
            <p className={styles.emailDisplay}>{storedEmail}</p>
            <OTPInput onChange={setOtp} />
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
              onClick={handleVerifyOTP}
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
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
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
