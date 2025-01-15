import React from "react";
import stripePurple from "../../assets/stripePurple.svg";
import styles from "./InfoBill.module.css";
import arrowDown from "../../assets/arrowDownBold.svg";
const InfoBill = () => {
  return (
    <div className={styles.infoBillContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.column}>
          <div className={styles.row}>
            <p>Subtotal</p>
            <span>0,00 €</span>
          </div>
          <div className={styles.row}>
            <p>Impuestos</p>
            <p className={styles.fax}>
              <span>21%</span>
              <span>0,00 €</span>
            </p>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <select className={styles.currency}>
              <option value="EUR">EUR</option>
            </select>
            <div className={styles.state}>
              Estado:
              <img src={stripePurple} alt="" />
              <select>
                <option value="pagado">Pagado</option>
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <p>Total</p>
            <span>0,00 €</span>
          </div>
        </div>
      </div>

      <div className={styles.clientInfo}>
        <div className={styles.column}>
          <p>De</p>
          <span className={styles.light}>Su empresa o nombre, y dirección</span>
        </div>
        <div className={styles.column}>
          <p>Facturar a</p>
          <span className={styles.light}>
            Dirección de facturación de su cliente
          </span>
        </div>
      </div>

      <div className={styles.bill}>
        <div className={styles.column}>
          <div className={styles.row}>
            <div>
              <p># Factura</p>
              <span className={styles.light}>0001</span>
            </div>
            <div>
              <p># Orden de compra</p>
              <span className={styles.light}>Opcional</span>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <p>Fecha</p>
              <select>
                <option value="25dec2025">25 Dec 2025</option>
              </select>
            </div>
            <div>
              <p>Fecha vencimiento</p>
              <select>
                <option value="25dec2025">25 Dec 2025</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <p>Condiciones y formas de pago</p>
          <p className={styles.light}>ex. Payment is due within 15 days</p>
        </div>
      </div>

      <div className={styles.logoSignature}>
        <div className={styles.logo}>
          <p>Logo</p>
          <div className={styles.square}></div>
        </div>
        <div className={styles.logo}>
          <p>Firma</p>
          <div className={styles.square}></div>
        </div>
      </div>

      <div className={styles.parameters}>
        <div className={styles.addParameters}>
          <button>Añadir parámetro nuevo</button>
        </div>
        <div className={styles.seeParameters}>
          <p>
            <img src={arrowDown} alt="Icon" />
            Parámetros (1)
          </p>
        </div>

        <div className={styles.parametersInfo}>
          <div className={styles.articleTitle}>
            <span>Parámetro 1</span>
            <div>Editar</div>
          </div>
          <div className={styles.parametersInfoContainer}>
            <div className={styles.column}>
              <p>Nombre del Parámetro</p>
              <input type="text" placeholder="Parámetro 1" />
            </div>
            <div className={styles.column}>
              <p>Valor del Parámetro</p>
              <input type="text" placeholder="Valor parámetro" />
            </div>
          </div>
        </div>

        <div className={styles.seeParameters}>
          <p>
            <img src={arrowDown} alt="Icon" />
            Artículos (2)
          </p>
        </div>
        <div className={styles.articleBill}>
          <div className={styles.articleTitle}>
            <span>Articulo 1</span>
          </div>
          <div className={styles.articleBody}>
            <img
              src="https://materialescomsa.com/wp-content/uploads/2019/07/22079.jpg"
              alt=""
            />
            <div className={styles.info}>
              <div>
                <span>Artículo 1</span>
                <span className={styles.light}>Nombre o Descripción</span>
              </div>
            </div>
          </div>
          <div className={styles.articleTaxs}>
            <div className={styles.column}>
              <p>Cant.</p>
              <input type="text" placeholder="1.0" />
            </div>
            <div className={styles.column}>
              <p>Precio unit.</p>
              <div className={styles.unitPrice}>
                <p className={styles.light}>0.0€</p>
              </div>
            </div>
            <div className={styles.column}>
              <p>Importe</p>
              <span className={styles.light}>0.0 €</span>
            </div>
            <div className={styles.column}>
              <p>Impuesto</p>
              <button className={styles.addTax}>Añadir Impuesto</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBill;
