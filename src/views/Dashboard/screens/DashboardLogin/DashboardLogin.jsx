import React, { useEffect, useState } from "react";
import styles from "./DashboardLogin.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OTPInput } from "../../components/OtpInput/OtpInput";

import {
  createAccount,
  loginToManager,
  sendOTP,
  verifyOTP,
} from "../../../../actions/emailManager";
import { ReactComponent as OpenAiLogo } from "../../assets/openai.svg";
import { Key, LockIcon } from "lucide-react";
import { ReactComponent as KeyIcon } from "../../assets/key-icon.svg";
import facturaLogo  from "../../assets/FacturaLogoGreen.svg"

const DashboardLogin = () => {
  const { user } = useSelector((state) => state.emailManager);
  const dispatch = useDispatch();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
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

  useEffect(() => {
    if (user?.email && user?.id && user?.role) {
      localStorage.setItem("emailManagerAccount", JSON.stringify(user));
      navigate("/dashboard/home");
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
    if (email.length > 1 && password.length > 1) {
      setIsLoading(true);
      dispatch(loginToManager({ email, password }))
        .unwrap()
        .then(() => {
          clearStates();
        })
        .catch((error) => {
          setError(error.message || "Failed to sign in");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSignup = () => {
    if (
      storedEmail.length > 1 &&
      storedPassword.length > 1 &&
      storedPassword === repeatPassword
    ) {
      setIsLoading(true);
      dispatch(sendOTP({ email: storedEmail }))
        .unwrap()
        .then(() => {
          setMode("otp");
          setResendTimer(45);
        })
        .catch((error) => {
          setError(error.message || "Failed to send OTP");
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
            createAccount({ email: storedEmail, password: storedPassword })
          )
            .unwrap()
            .then(() => {
              clearStates();
              setMode("signin");
            })
            .catch((error) => {
              setError(error.message || "Failed to create account");
            });
        })
        .catch((error) => {
          setError(error.message || "Failed to verify OTP");
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
        setError(error.message || "Failed to resend OTP");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleForgotPassword = () => {
    if (email.length > 1 && recaptchaValue) {
      setIsLoading(true);
      // Here you would implement your forgot password logic
      // For now, we'll just simulate it with a timeout
      setTimeout(() => {
        setIsLoading(false);
        // You might want to show a success message or navigate to a different mode
      }, 2000);
    }
  };

  const renderTitle = () => {
    switch (mode) {
      case "signup":
        return "¡Bienvenido!";
      case "otp":
        return "Por favor, revisa tu correo";
      case "forgot-password":
        return "¡Ups! ¿Te olvidaste de la contraseña?";
      default:
        return "¡Estás de vuelta!";
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
      <span className={styles.logoText}>FacturaGPT</span>
    </div>
  );

  const renderForm = () => {
    const [nombre, setNombre] = useState("")
    return(
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
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Example@email.com"
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="at least 8 characters"
          className={styles.input}
        />
        <span className={styles.passwordRequirements}>
          8 characters minimum, and at least 1 uppercase letter and 1 number
        </span>
      </label>
      {mode === "signin" && (
        <div className={styles.forgotPasswordContainer}>
          <div className={styles.rememberMe}>
            <input type="checkbox" />
            <span>Recuérdame</span>
          </div>
          <a
            href="#"
            className={styles.forgotPassword}
            onClick={(e) => {
              e.preventDefault();
              setMode("forgot-password");
            }}
          >
            ¿Olvidaste la contraseña?
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
            ? "Sign in"
            : "Sign up"}
      </div>
      {mode === "signin" && (
        <button className={styles.buttonOpenAi}>
          <OpenAiLogo />
          <span>Empezar con OpenAI</span>
        </button>
      )}
    </form>
    )
  };

  const renderForgotPasswordForm = () => (
    <div className={styles.rightContainer}>
      <div className={styles.forgotPasswordIcon}>
        <KeyIcon />
      </div>
      <h1 className={styles.forgotPasswordTitle}>
        ¡Ups! ¿Te olvidaste de la contraseña?
      </h1>
      <p className={styles.forgotPasswordSubtitle}>
        No te preocupes, esto pasa. Ingresa tu email registrado a tu cuenta de
        Usuario para resetear tu contraseña
      </p>
      <form className={styles.form}>
        <label className={styles.label}>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Example@email.com"
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
          {isLoading ? "Procesando..." : "Continuar"}
        </button>
      </form>
      <p className={styles.securityNote}>
        <span className={styles.lockIcon}>
          <LockIcon size={14} />
        </span>
        Tu seguridad nos importa
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
            {error && <p className={styles.error}>{error}</p>}
            <p className={styles.securityNote}>
              <span className={styles.lockIcon}>🔒</span> Tu seguridad nos
              importa
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
          <p className={styles.subtitle}>
            Controla tu facturación, controla tu negocio.
          </p>
          {renderForm()}

          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.footerText}>
            {mode === "signin" ? "Don't you" : "Already"} have an account?{" "}
            <a
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className={styles.signUp}
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </a>
          </p>
          <p className={styles.footer}>© 2024 ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
