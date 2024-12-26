import styles from "./CustomSelect.module.css";
import { ReactComponent as GmailIcon } from "../../assets/gmail-icon.svg";

export function CustomSelect({ value, onChange, options }) {
  return (
    <div className={styles.selectWrapper}>
      <GmailIcon className={styles.icon} />
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
