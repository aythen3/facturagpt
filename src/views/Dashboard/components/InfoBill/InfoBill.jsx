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
import NewContact from "../NewContact/NewContact";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AssetLine from "../AssetLine/AssetLine";
import ParameterGrab from "../ParameterGrab/ParameterGrab";
const InfoBill = ({ isEditing, setIsEditing }) => {
  const [parametersEditing, setParametersEditing] = useState({});
  const [articlesEditing, setArticlesEditing] = useState({});
  const [editBaseImport, setEditBaseImport] = useState({});
  const [seeParameters, setSeeParameters] = useState(true);
  const [seeArticles, setSeeArticles] = useState(true);
  const [articlesTags, setArticlesTags] = useState({});
  const [parameters, setParameters] = useState([]);
  const [articles, setArticles] = useState([]);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showNewContactPopup, setShowNewContactPopup] = useState(false);
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
      id: Date.now(),
      name: `Parámetro ${parameters.length + 1}`,
      value: `Valor parámetro ${parameters.length + 1}`,
    };
    setParameters((prev) => [...prev, newParameter]);
  };
  const handleAddActivo = () => {
    const newActivo = {
      quantity: 1.0,
      baseImport: "0.0€",
      amount: "0.0 €",
      id: Date.now(),
      name: ``,
      description: ``,
    };
    setArticles((prev) => [...prev, newActivo]);
  };

  const handleDeleteParameter = (id) => {
    setParameters((prev) => prev.filter((param) => param.id !== id));
  };
  const handleDeleteActivo = (id) => {
    setArticles((prev) => prev.filter((param) => param.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setArticles((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      console.log(active.id);
    }
  };
  const handleDragEndParameters = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setParameters((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      console.log(active.id);
    }
  };

  const handleInputChange = (id, field, value) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, [field]: value } : article
      )
    );
  };

  return (
    <div className={styles.infoBillContainer}>
      <div className={styles.infoBill}>
        <InfoClientBill
          name="Nombre de la cuenta"
          address="Email adress, Dirección, Población, Provincia, Código Postal, País"
          textareaPlaceHolder="Dirección de facturación del receptor"
          urlImg={profileImage}
          setShowNewContact={setShowNewContactPopup}
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

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEndParameters}
        >
          <SortableContext items={parameters.map((item) => item.id)}>
            <div
              className={styles.parametersInfo}
              style={{
                height: seeParameters ? "auto" : "0px",
                padding: seeParameters ? "20px 0" : "0px",
                borderBottom: !seeParameters && "1px solid transparent",
              }}
            >
              {parameters.map((param) => (
                <ParameterGrab
                  article={param}
                  parametersEditing={parametersEditing}
                  toggleEditing={toggleEditing}
                  handleDeleteParameter={handleDeleteParameter}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* <div
          className={styles.parametersInfo}
          style={{
            height: seeParameters ? "auto" : "0px",
            padding: seeParameters ? "20px 0" : "0px",
            borderBottom: !seeParameters && "1px solid transparent",
          }}
        ></div> */}

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

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={articles.map((item) => item.id)}>
            <div
              className={styles.parametersInfo}
              style={{
                height: seeArticles ? "auto" : "0px",
                padding: seeArticles ? "20px 0" : "0px",
                borderBottom: !seeArticles && "1px solid transparent",
              }}
            >
              <div className={styles.articleBill}>
                {articles.map((item) => (
                  <AssetLine
                    key={item.id}
                    article={item}
                    articlesEditing={articlesEditing}
                    editBaseImport={editBaseImport}
                    toggleArticleEditing={toggleArticleEditing}
                    handleDeleteActivo={handleDeleteActivo}
                    setShowTaxModal={setShowTaxModal}
                    setShowDiscountModal={setShowDiscountModal}
                    handleEditBaseImport={handleEditBaseImport}
                    handleInputChange={handleInputChange}
                  />
                ))}
              </div>
            </div>
          </SortableContext>
        </DndContext>
        {showDiscountModal && (
          <AddDiscount setShowDiscountModal={setShowDiscountModal} />
        )}
        {showTaxModal && <AddTax setShowTaxModal={setShowTaxModal} />}
        {showNewContactPopup && (
          <NewContact setShowNewContact={setShowNewContactPopup} />
        )}
      </div>
    </div>
  );
};

export default InfoBill;
