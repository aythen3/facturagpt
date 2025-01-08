import React from "react";
import styles from "./TermsAndConditions.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation("termsAndCondition");
  return (
    <div className={styles.main}>
      <Navbar />
      <article className={styles.article}>
        <header>
          <h2>{t("title")}</h2>
          <span>{t("vigency")}</span>
          <p>{t("subTitle")}</p>
        </header>

        <section>
          <p>
            Estos Términos de Uso se aplican al uso de FacturaGPT y otros
            servicios para individuos, junto con cualquier aplicación de
            software y sitios web asociados (en conjunto, los “Servicios”).
            Estos Términos forman un acuerdo entre usted y Aythen, incluyen
            nuestras Condiciones del Servicio y disposiciones importantes para
            resolver disputas mediante arbitraje. Al usar nuestros Servicios,
            acepta estos Términos.
          </p>
          <p>
            Si reside en el Área Económica Europea, Suiza o el Reino Unido, su
            uso de los Servicios se rige por estos términos.
          </p>
          <p>
            Nuestras Condiciones Comerciales regulan el uso de FacturaGPT
            Enterprise, las API ofrecidas por FacturaGPT y otros servicios
            diseñados específicamente para empresas y desarrolladores. Estas
            condiciones incluyen detalles sobre el acceso, uso y tarifas
            aplicables, garantizando un marco claro para su funcionamiento.
          </p>
        </section>

        <section>
          <h3>{t("aboutTitle")}</h3>
          <p>
            {t("aboutText")}{" "}
            <a
              href="https://www.facturagpt.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.facturagpt.com
            </a>
          </p>
        </section>

        <section>
          <h3>{t("polAndPrivTitle")}</h3>
          <p>
            {t("polAndPrivSubTitle")}
            <ul>
              <li>{t("polAndPrivLi1")}</li>
              <li>
                {t("polAndPrivLi2")}
                <ul>
                  <li>{t("polAndPrivLi3")}</li>
                  <li>{t("polAndPrivLi4")}</li>
                  <li>{t("polAndPrivLi5")}</li>
                  <li>{t("polAndPrivLi6")}</li>
                  <li>{t("polAndPrivLi7")}</li>
                </ul>
              </li>
              <li>{t("polAndPrivLi8")}</li>
              <li>{t("polAndPrivLi9")}</li>
              <li>
                {t("polAndPrivLi10")}
                <ul>
                  <li>{t("polAndPrivLi11")}</li>
                  <li>{t("polAndPrivLi12")}</li>
                </ul>
              </li>
              <li>
                {t("polAndPrivLi13")}
                <ul>
                  <li>{t("polAndPrivLi14")}</li>
                  <li>{t("polAndPrivLi15")}</li>
                </ul>
              </li>
              <li>
                {t("polAndPrivLi16")}
                <ul>
                  <li>{t("polAndPrivLi17")}</li>
                  <li>{t("polAndPrivLi18")}</li>
                  <li>{t("polAndPrivLi19")}</li>
                </ul>
              </li>
              <li>{t("polAndPrivLi20")}</li>
            </ul>
          </p>
        </section>
        <section>
          <h3>{t("polCookiesTitle")}</h3>
          <p>
            {t("polCookiesSubTitle")}
            <ul>
              <li>{t("polCookiesLi1")}</li>
              <li>
                {t("polCookiesLi2")}

                <ul>
                  <li>{t("polCookiesLi3")}</li>
                  <li>{t("polCookiesLi4")}</li>
                  <li>{t("polCookiesLi5")}</li>
                </ul>
              </li>
              {t("polCookiesLi6")}

              <li></li>
              {t("polCookiesLi7")}

              <li></li>
            </ul>
          </p>
        </section>

        <section>
          <h3>{t("conditionUseTitle")}</h3>
          <p>
            {" "}
            <ul>
              <li>
                {t("conditionUseLi1")}
                <ul>
                  <li>{t("conditionUseLi2")}</li>
                </ul>
              </li>
              <li>
                {t("conditionUseLi3")}
                <ul>
                  <li>{t("conditionUseLi4")}</li>
                </ul>
              </li>
            </ul>
          </p>
        </section>

        <section>
          <h3>{t("paymentAndBillingTitle")}</h3>
          <p>
            <ul>
              <li>{t("paymentAndBillingLi1")}</li>
              <li>{t("paymentAndBillingLi2")}</li>
              <li>{t("paymentAndBillingLi3")}</li>
              <li>{t("paymentAndBillingLi4")}</li>
            </ul>
          </p>
        </section>

        <section>
          <h3>{t("modificationsServiceTitle")}</h3>
          <p>{t("modificationsServiceSubTitle")}</p>
        </section>

        <section>
          <h3>{t("suspensionTitle")}</h3>
          <p>
            <ul>
              <li>
                {t("suspensionLi1")}
                <ul>
                  <li>{t("suspensionLi2")}</li>
                  <li>{t("suspensionLi3")}</li>
                  <li>{t("suspensionLi4")}</li>
                </ul>
              </li>
              <li>{t("suspensionLi5")}</li>
            </ul>
          </p>
          <p>{t("suspensionFooter1")}</p>
          <p>{t("suspensionFooter2")}</p>
        </section>
        <section>
          <h3>{t("cancelTitle")}</h3>
          <p>
            {t("cancelSubTitle")}
            <ul>
              <li>{t("cancelLi1")}</li>
              <li>{t("cancelLi2")}</li>
            </ul>
          </p>
        </section>
        <section>
          <h3>{t("returnPolicyTitle")}</h3>
          <p>
            {t("returnPolicyText1")}{" "}
            <a
              href="soporteinfo@facturagpt.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              soporteinfo@facturagpt.com
            </a>{" "}
            {t("returnPolicyText2")}
          </p>
        </section>
        <section>
          <h3>{t("intellectualPropertyTitle")}</h3>
          <p>{t("intellectualPropertyText")}</p>
        </section>
        <section>
          <h3>{t("useofOurServicesTitle")}</h3>
          <p>{t("useofOurServicesText")}</p>
        </section>
        <section>
          <h3>{t("thirdPartyServicesTitle")}</h3>
          <p>{t("thirdPartyServicesText")}</p>
        </section>

        <section>
          <h3>{t("commentsTitle")}</h3>
          <p>{t("commentsText")}</p>
        </section>

        <section>
          <h3>{t("securityAndPrivacyTitle")}</h3>
          <p>{t("securityAndPrivacyText")}</p>
        </section>

        <section>
          <h3>{t("generalTermsTitle")}</h3>
          <p>
            {t("generalTermsText")}
            <ul>
              <li>{t("generalTermsLi1")}</li>
              <li>{t("generalTermsLi2")}</li>
            </ul>
          </p>
        </section>

        <section>
          <p>{t("footer")}</p>
        </section>
      </article>
    </div>
  );
};

export default TermsAndConditions;
