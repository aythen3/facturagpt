import styles from "./InvoicePanel.module.css";
import FileExplorer from "../../components/FileExplorer/FileExplorer.jsx";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.jsx";
import Preview from "../../components/Preview/Preview.jsx";
import FloatingMenu from "../../components/FloatingMenu/FloatingMenu.jsx";

const company = {
  email: "test@test.com",
  phone: "123456789",
  website: "test.com",
  address: "1234 Test St",
  cnae: "1234",
};

export default function InvoicePanel() {
  return (
    <>
      <div className={styles.container}>
        <FileExplorer />
        <InvoiceForm />
        <Preview companyInfo={company} />
      </div>
      <FloatingMenu />
    </>
  );
}
