import React from "react";
import styles from "./TagsLanding.module.css";
import { ReactComponent as Arrow } from "../../assets/grayArrow.svg";
const TagsLanding = () => {
  const tags1 = [
    "⌛️ Ahorra tiempo",
    " ✅  Datos disponibles y en tiempo real",
    " 🚦 Reduce errores",
  ];
  const tags2 = [
    " 🤵 Gestiona Clientes y Proveedores",
    " 🎖️ Gestiona tus Activos",
    " 🧾 Emite y Recibe facturas",
  ];
  const tags3 = [
    "📊  Analiza tus datos",
    "💸 Automatiza Pagos",
    " 🖇️ Conecta con terceros",
    "💬 Chatea con FacturaGPT ",
  ];
  return (
    <section className={styles.TagsLandingContainer}>
      <div className={styles.tagLanding}>
        {tags1.map((tag) => (
          <div className={styles.tag}>
            {tag} <Arrow />
          </div>
        ))}
      </div>
      <div className={styles.tagLanding}>
        {tags2.map((tag) => (
          <div className={styles.tag}>
            {tag} <Arrow />
          </div>
        ))}
      </div>
      <div className={styles.tagLanding}>
        {tags3.map((tag) => (
          <div className={styles.tag}>
            {tag} <Arrow />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TagsLanding;
