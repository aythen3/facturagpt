import React from "react";
import styles from "./LinesLandingSection.module.css";
import { ReactComponent as LogoGPT } from "../../assets/FacturaGPTW.svg";
import { ReactComponent as Lines } from "../../assets/Lines.svg";
import { ReactComponent as ExcelCircle } from "../../assets/excelCircle.svg";
import { ReactComponent as DriveCircle } from "../../assets/driveCircle.svg";
import { ReactComponent as GmailCircle } from "../../assets/gmailCircle.svg";
import { ReactComponent as OneDriveCircle } from "../../assets/oneDriveCircle.svg";
import { ReactComponent as OutlookCircle } from "../../assets/outlookCircle.svg";
import { ReactComponent as SharePointCircle } from "../../assets/sharePointCircle.svg";
import { ReactComponent as WhatsappCircle } from "../../assets/whatsappCircle.svg";
import { ReactComponent as StripeCircle } from "../../assets/stripeCircle.svg";
import { ReactComponent as PaypalCircle } from "../../assets/paypalCircle.svg";
import { ReactComponent as A3Circle } from "../../assets/a3Circle.svg";
import { ReactComponent as OdooCircle } from "../../assets/odooCircle.svg";
import { ReactComponent as EsPublicoCircle } from "../../assets/esPublicoCircle.svg";
import { ReactComponent as HoldedCircle } from "../../assets/holdedCircle.svg";
import { ReactComponent as DropBoxCircle } from "../../assets/dropboxCircle.svg";
import { ReactComponent as HubSpotCircle } from "../../assets/hubSpotCircle.svg";
import { ReactComponent as AgenciaTributariaCircle } from "../../assets/agenciaTributariaCircle.svg";
import { ReactComponent as LinesLandingSectionImg } from "../../assets/linesLandingSection.svg";
import { ReactComponent as ArrowDiagonal } from "../../assets/arrowDiagonalWhite.svg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const icons = [
  { Component: StripeCircle, uniqueClass: styles.uniqueStripe },
  { Component: HubSpotCircle, uniqueClass: styles.uniqueHubSpot },
  { Component: GmailCircle, uniqueClass: styles.uniqueGmail },
  { Component: SharePointCircle, uniqueClass: styles.uniqueSharePoint },
  { Component: DriveCircle, uniqueClass: styles.uniqueDrive },
  {
    Component: AgenciaTributariaCircle,
    uniqueClass: styles.uniqueAgenciaTributaria,
  },
  { Component: OdooCircle, uniqueClass: styles.uniqueOdoo },
  { Component: OutlookCircle, uniqueClass: styles.uniqueOutlook },
  { Component: ExcelCircle, uniqueClass: styles.uniqueExcel },
  { Component: OneDriveCircle, uniqueClass: styles.uniqueOneDrive },
  { Component: WhatsappCircle, uniqueClass: styles.uniqueWhatsapp },
  { Component: PaypalCircle, uniqueClass: styles.uniquePaypal },
  { Component: EsPublicoCircle, uniqueClass: styles.uniqueEspublico },
  { Component: A3Circle, uniqueClass: styles.uniqueA3 },
  { Component: HoldedCircle, uniqueClass: styles.uniqueHolded },
  { Component: DropBoxCircle, uniqueClass: styles.uniqueDropBox },
];

const LinesLandingSection = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.linesContainer}>
      {/* {icons.map(({ Component, uniqueClass }, index) => (
        <Component key={index} className={`${styles.logo} ${uniqueClass}`} />
      ))} */}
      <h3>
        Una suite completa con funciones avanzadas de análisis, alertas y
        automatización.
      </h3>
      <LinesLandingSectionImg />
      {/* <div className={styles.linesContent}>
        <Lines className={styles.lines} />
        <div className={styles.LinesLogoContainer}>
          <LogoGPT className={styles.logo} />
        </div>
        <Lines className={styles.linesR} />
      </div> */}
      <p>¿No encuentras tu conexión?</p>
      <Button
        headerStyle={{
          borderRadius: "999px",
          background: "#10a37e68",
          alignItems: "center",
          display: "flex",
          gap: "10px",
        }}
        action={() => navigate("/contact")}
      >
        Contacta con ventas <ArrowDiagonal style={{ height: "8px" }} />
      </Button>
    </section>
  );
};

export default LinesLandingSection;
