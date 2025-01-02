import { User, Minus } from "lucide-react";
import styles from "./CollaboratorManager.module.css";
import { useState } from "react";

export default function CollaboratorManager() {
  const [emails, setEmails] = useState([
    { address: "info@aythen.com", color: "purple" },
    { address: "info@facturagpt.com", color: "indigo" },
  ]);

  const getInitial = (email) => {
    return email.charAt(0).toUpperCase();
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email.address !== emailToRemove));
  };

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="collaborator" className={styles.label}>
          <div className={styles.labelContent}>
            <User className={styles.icon} />
            Añadir Colaborador
          </div>
        </label>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              id="collaborator"
              type="email"
              placeholder="example@email.com"
              className={styles.input}
            />
          </div>
          <button className={styles.button}>Invitar</button>
        </div>
      </div>

      <div className={styles.list}>
        {emails.map((email) => (
          <div key={email.address} className={styles.item}>
            <div className={styles.email}>
              <div className={`${styles.avatar} ${styles[email.color]}`}>
                {getInitial(email.address)}
              </div>
              {email.address}
            </div>
            <button
              className={styles.removeButton}
              onClick={() => removeEmail(email.address)}
              aria-label={`Remove ${email.address}`}
            >
              <Minus size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
