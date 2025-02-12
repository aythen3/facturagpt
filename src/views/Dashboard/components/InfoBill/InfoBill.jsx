import React, { useState } from "react";
import stripePurple from "../../assets/stripePurple.svg";
import styles from "./InfoBill.module.css";
import arrowDown from "../../assets/arrowDownBold.svg";
import minus from "../../assets/minus.svg";
import Tags from "../Tags/Tags";
import tagIcon from "../../assets/tagIcon.svg";
import InfoClientBill from "./InfoClientBill/InfoClientBill";
import profileImage from "../../assets/profileIcon.svg";
import { ReactComponent as GrabIcon } from "../../assets/grabIcon.svg";
import AddTax from "../AddTax/AddTax";
import AddDiscount from "../AddDiscount/AddDiscount";
const InfoBill = ({ isEditing, setIsEditing }) => {
  const [parametersEditing, setParametersEditing] = useState({});
  const [articlesEditing, setArticlesEditing] = useState({});
  const [editBaseImport, setEditBaseImport] = useState({});
  const [seeParameters, setSeeParameters] = useState(false);
  const [seeArticles, setSeeArticles] = useState(false);
  const [articlesTags, setArticlesTags] = useState({});
  const [parameters, setParameters] = useState([]);
  const [articles, setArticles] = useState([]);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
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

  const handleEditBaseImport = (id) => {
    setEditBaseImport((prev) => ({
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
  const handleAddActivo = () => {
    const newActivo = {
      id: articles.length + 1,
      quantity: 1.0,
      baseImport: "0.0€",
      amount: "0.0 €",
      id: articles.length + 1,
      name: `Articulo ${articles.length + 1}`,
      description: `Descripción del Articulo ${articles.length + 1}`,
    };
    setArticles((prev) => [...prev, newActivo]);
  };

  const handleDeleteParameter = (id) => {
    setParameters((prev) => prev.filter((param) => param.id !== id));
  };
  const handleDeleteActivo = (id) => {
    setArticles((prev) => prev.filter((param) => param.id !== id));
  };

  return (
    <div className={styles.infoBillContainer}>
      <div className={styles.infoBill}>
        <InfoClientBill
          name="Nombre de la cuenta"
          address="Email adress, Dirección, Población, Provincia, Código Postal, País"
          textareaPlaceHolder="Su empresa o nombre, y dirección"
          urlImg={profileImage}
        />
        <InfoClientBill
          name="Aythen"
          address="Email adress, Dirección, Población, Provincia, Código Postal, País"
          textareaPlaceHolder="Dirección de facturación del receptor"
        />
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
                  {parametersEditing[param.id] && (
                    <img
                      src={minus}
                      alt="Icon"
                      className={styles.delete}
                      onClick={() => handleDeleteParameter(param.id)}
                    />
                  )}
                </div>
              </div>
              <div className={styles.parametersInfoContainer}>
                <div className={styles.column}>
                  {parametersEditing[param.id] && <p>Nombre del Parámetro</p>}
                  <input
                    type="text"
                    placeholder={param.name}
                    disabled={!parametersEditing[param.id]}
                  />
                </div>
                <div className={styles.column}>
                  {parametersEditing[param.id] && <p>Valor del Parámetro</p>}
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

        <div className={styles.addParameters}>
          <button onClick={handleAddActivo}>Añadir Línea de Activos</button>
        </div>
        <div
          className={styles.seeParameters}
          onClick={() => setSeeArticles((prev) => !prev)}
        >
          <p>
            <img
              src={arrowDown}
              alt="Icon"
              className={seeArticles && styles.arrowDown}
            />
            Línea de Activos ({articles.length})
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
                <span></span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <p onClick={() => toggleArticleEditing(article.id)}>
                    {articlesEditing[article.id] ? "Guardar" : "Editar"}
                  </p>
                  <img
                    src={minus}
                    alt="Icon"
                    className={styles.delete}
                    onClick={() => handleDeleteActivo(article.id)}
                  />
                </div>
              </div>
              <div className={styles.articleBody}>
                <div className={styles.grab}>
                  <GrabIcon className={styles.icon} />
                  <img
                    src="https://materialescomsa.com/wp-content/uploads/2019/07/22079.jpg"
                    alt=""
                  />
                </div>
                <div className={styles.info}>
                  <div className={styles.test}>
                    <div className={styles.leftInfo}>
                      <span>{article.name}</span>
                      <span className={styles.light}>
                        {article.description}
                      </span>
                      <Tags
                        onTagClick={(tag) => handleAddTag(article.id, tag)}
                      />
                      <button className={styles.addTag}>
                        <img src={tagIcon} alt="Icon" />
                        Añadir Etiqueta
                      </button>
                    </div>
                    <div className={styles.rightInfo}>
                      <div>
                        <p>Recommended retail price (RRP)</p>
                        <p>90283912,38912 EUR</p>
                      </div>
                      <div>
                        <p>Floor Price</p>
                        <p>90283912,38912 EUR</p>
                      </div>
                      <div className={styles.button}>Ver Parámetros (2)</div>
                    </div>
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
                  <p>Base importe</p>
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
                        placeholder={article.baseImport}
                        disabled={!editBaseImport[article.id]}
                      />
                      {articlesEditing[article.id] && (
                        <span onClick={() => handleEditBaseImport(article.id)}>
                          {editBaseImport[article.id] ? "Guardar" : "Editar"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.column}>
                  <p>Retención</p>
                  <button
                    className={styles.addTax}
                    disabled={!articlesEditing[article.id]}
                  >
                    Añadir Retención
                  </button>
                </div>
                <div className={styles.column}>
                  <p>Impuesto</p>
                  <button
                    className={styles.addTax}
                    disabled={!articlesEditing[article.id]}
                    onClick={() => setShowTaxModal(true)}
                  >
                    Añadir Impuesto
                  </button>
                </div>
                <div className={styles.column}>
                  <p>Descuento</p>
                  <button
                    className={styles.addTax}
                    disabled={!articlesEditing[article.id]}
                    onClick={() => setShowDiscountModal(true)}
                  >
                    Añadir Descuento
                  </button>
                </div>

                <div className={styles.column}>
                  <p>Total (PVP)</p>
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
                        placeholder={article.baseImport}
                        disabled={!editBaseImport[article.id]}
                      />
                      {articlesEditing[article.id] && (
                        <span onClick={() => handleEditBaseImport(article.id)}>
                          {editBaseImport[article.id] ? "Guardar" : "Editar"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showDiscountModal && (
          <AddDiscount setShowDiscountModal={setShowDiscountModal} />
        )}
        {showTaxModal && <AddTax setShowTaxModal={setShowTaxModal} />}
      </div>
    </div>
  );
};

export default InfoBill;
