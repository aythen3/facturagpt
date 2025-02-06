import React from "react";
import styles from "./NewProduct.module.css";
const NewProduct = ({ setShowNewProduct }) => {
  return (
    <div>
      <div className={styles.bg} onClick={() => setShowNewProduct(false)}></div>
      <div className={styles.newProductContainer}>nuevo activo</div>
    </div>
  );
};

export default NewProduct;
