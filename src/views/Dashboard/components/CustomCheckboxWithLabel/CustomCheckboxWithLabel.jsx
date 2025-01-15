import styles from "./CustomCheckboxWithLabel.module.css";

const CustomCheckboxWithLabel = ({
  label,
  selectedNetworks,
  handleSelectAll,
  checked,
  onChange,
}) => {
  return (
    <div className={styles.checkboxContainer}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label && <label>{label}</label>}
    </div>
  );
};

export default CustomCheckboxWithLabel;
