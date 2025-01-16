import React, { useState } from "react";
import stripePurple from "../../assets/stripePurple.svg";
import styles from "./InfoBill.module.css";
import arrowDown from "../../assets/arrowDownBold.svg";
import minus from "../../assets/minus.svg";
import Tags from "../Tags/Tags";
import tagIcon from "../../assets/tagIcon.svg";

const InfoBill = ({ isEditing, setIsEditing }) => {
  const [parametersEditing, setParametersEditing] = useState({});
  const [articlesEditing, setArticlesEditing] = useState({});
  const [editUnitPrice, setEditUnitPrice] = useState({});
  const [seeParameters, setSeeParameters] = useState(false);
  const [seeArticles, setSeeArticles] = useState(false);
  const [articlesTags, setArticlesTags] = useState({});
  const [parameters, setParameters] = useState([
    { id: 1, name: "Parámetro 1", value: "Valor parámetro 1" },
    { id: 2, name: "Parámetro 2", value: "Valor parámetro 2" },
  ]);

  const articles = [
    {
      id: 1,
      name: "Articulo 1",
      description: "Descripción del Articulo 1",
      quantity: 1.0,
      unitPrice: "0.0€",
      amount: "0.0 €",
    },
    {
      id: 2,
      name: "Articulo 2",
      description: "Descripción del Articulo 2",
      quantity: 1.0,
      unitPrice: "0.0€",
      amount: "0.0 €",
    },
  ];

  const toggleEditing = (id) => {
    setParametersEditing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleArticleEditing = (id) => {
    setArticlesEditing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEditUnitPrice = (id) => {
    setEditUnitPrice((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddTag = (articleId, tag) => {
    setArticlesTags((prev) => {
      const currentTags = prev[articleId] || [];
      if (currentTags.includes(tag)) {
        // Si la etiqueta ya está, eliminarla
        return {
          ...prev,
          [articleId]: currentTags.filter((t) => t !== tag),
        };
      } else {
        // Si no está, agregarla
        return {
          ...prev,
          [articleId]: [...currentTags, tag],
        };
      }
    });
  };

  const handleAddParameter = () => {
    const newParameter = {
      id: parameters.length + 1,
      name: `Parámetro ${parameters.length + 1}`,
      value: `Valor parámetro ${parameters.length + 1}`,
    };
    setParameters((prev) => [...prev, newParameter]);
  };

  const handleDeleteParameter = (id) => {
    setParameters((prev) => prev.filter((param) => param.id !== id));
  };

  return (
    <div className={styles.infoBillContainer}>
      <div className={styles.btnSaveBill}>
        <button onClick={() => setIsEditing(false)}>Duplicar y Guardar</button>
        <button onClick={() => setIsEditing(false)}>Guardar Cambios</button>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.column}>
          <div className={styles.row}>
            <p>Subtotal</p>
            {/* <input type="text" placeholder="0,00 €" disabled={!isEditing} /> */}
            <span>0,00 €</span>
          </div>
          <div className={styles.row}>
            <p>Impuestos</p>
            <p className={styles.fax}>
              <input type="text" placeholder="21%" disabled={!isEditing} />
              <span>0,00 €</span>
            </p>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <select className={styles.currency} disabled={!isEditing}>
              <option value="EUR">EUR</option>
              <option value="EUR">EUR</option>
            </select>
            <div className={styles.state}>
              Estado:
              <img src={stripePurple} alt="" />
              <select disabled={!isEditing}>
                <option value="pagado">Pagado</option>
                <option value="pagado">Pagado</option>
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <p>Total</p>
            <input
              type="text"
              placeholder="0,00 €"
              disabled={!isEditing}
              className={styles.statesInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.clientInfo}>
        <div className={styles.column}>
          <p>De</p>
          <textarea
            className={styles.light}
            disabled={!isEditing}
            placeholder="Su empresa o nombre, y dirección"
          ></textarea>
        </div>
        <div className={styles.column}>
          <p>Facturar a</p>
          <input
            type="text"
            disabled={!isEditing}
            placeholder="Dirección de facturación de su cliente"
          />
          <input
            type="text"
            disabled={!isEditing}
            placeholder="Buscar contacto..."
          />
        </div>
      </div>
      <div className={styles.bill}>
        <div className={styles.column}>
          <div className={styles.row}>
            <div>
              <p># Factura</p>
              <input type="text" disabled={!isEditing} placeholder="0001" />
            </div>
            <div>
              <p># Orden de compra</p>
              <input type="text" disabled={!isEditing} placeholder="Opcional" />
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <p>Fecha</p>
              <select disabled={!isEditing}>
                <option value="25dec2025">25 Dec 2025</option>
                <option value="25dec2025">25 Dec 2025</option>
              </select>
            </div>
            <div>
              <p>Fecha vencimiento</p>
              <select disabled={!isEditing}>
                <option value="25dec2025">25 Dec 2025</option>
                <option value="25dec2025">25 Dec 2025</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.column} style={{ gap: "0" }}>
          <p>Condiciones y formas de pago</p>
          <textarea
            disabled={!isEditing}
            placeholder="ex. Payment is due within 15 days"
          ></textarea>
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
          <button onClick={handleAddParameter}>Añadir parámetro nuevo</button>
        </div>
        <div
          className={styles.seeParameters}
          onClick={() => setSeeParameters((prev) => !prev)}
        >
          <p>
            <img
              src={arrowDown}
              alt="Icon"
              className={seeParameters && styles.arrowDown}
            />
            Parámetros ({parameters.length})
          </p>
        </div>

        <div
          className={styles.parametersInfo}
          style={{
            height: seeParameters ? "auto" : "0px",
            padding: seeParameters ? "20px 0" : "0px",
            borderBottom: !seeParameters && "1px solid transparent",
          }}
        >
          {parameters.map((param) => (
            <div key={param.id}>
              <div className={styles.articleTitle}>
                <span>{param.name}</span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <p onClick={() => toggleEditing(param.id)}>
                    {parametersEditing[param.id] ? "Guardar" : "Editar"}
                  </p>
                  <img
                    src={minus}
                    alt="Icon"
                    className={styles.delete}
                    onClick={() => handleDeleteParameter(param.id)}
                  />
                </div>
              </div>
              <div className={styles.parametersInfoContainer}>
                <div className={styles.column}>
                  <p>Nombre del Parámetro</p>
                  <input
                    type="text"
                    placeholder={param.name}
                    disabled={!parametersEditing[param.id]}
                  />
                </div>
                <div className={styles.column}>
                  <p>Valor del Parámetro</p>
                  <input
                    type="text"
                    placeholder={param.value}
                    disabled={!parametersEditing[param.id]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.seeParameters}>
          <p onClick={() => setSeeArticles((prev) => !prev)}>
            <img
              src={arrowDown}
              alt="Icon"
              className={seeArticles && styles.arrowDown}
            />
            Artículos ({articles.length})
          </p>
        </div>
        <div
          className={styles.articleBill}
          style={{
            height: seeArticles ? "auto" : "0px",
            padding: seeArticles ? "20px 0" : "0px",
            borderBottom: !seeArticles && "1px solid transparent",
          }}
        >
          {articles.map((article) => (
            <div key={article.id}>
              <div className={styles.articleTitle}>
                <span>{article.name}</span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <p onClick={() => toggleArticleEditing(article.id)}>
                    {articlesEditing[article.id] ? "Guardar" : "Editar"}
                  </p>
                  <img src={minus} alt="Icon" className={styles.delete} />
                </div>
              </div>
              <div className={styles.articleBody}>
                <img
                  src="https://materialescomsa.com/wp-content/uploads/2019/07/22079.jpg"
                  alt=""
                />
                <div className={styles.info}>
                  <div>
                    <span className={styles.light}>{article.description}</span>
                    <span>{article.name}</span>
                    <Tags onTagClick={(tag) => handleAddTag(article.id, tag)} />
                    <button className={styles.addTag}>
                      <img src={tagIcon} alt="Icon" />
                      Añadir Etiqueta
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.articleTaxs}>
                <div className={styles.column}>
                  <p>Cant.</p>
                  <input
                    type="text"
                    placeholder={article.quantity}
                    disabled={!articlesEditing[article.id]}
                  />
                </div>
                <div className={styles.column}>
                  <p>Precio unit.</p>
                  <div className={styles.unitPrice}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder={article.unitPrice}
                        disabled={!editUnitPrice[article.id]}
                      />
                      {articlesEditing[article.id] && (
                        <span onClick={() => handleEditUnitPrice(article.id)}>
                          {editUnitPrice[article.id] ? "Guardar" : "Editar"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.column}>
                  <p>Importe</p>
                  <span className={styles.light}>{article.amount}</span>
                </div>
                <div className={styles.column}>
                  <p>Impuesto</p>
                  <button
                    className={styles.addTax}
                    disabled={!articlesEditing[article.id]}
                  >
                    Añadir Impuesto
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoBill;
