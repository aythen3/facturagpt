import styles from "./InvoicePanel.module.css";
import FileExplorer from "../../components/FileExplorer/FileExplorer.jsx";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.jsx";
import Preview from "../../components/Preview/Preview.jsx";
import FloatingMenu from "../../components/FloatingMenu/FloatingMenu.jsx";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import Automate from "../../components/Automate/Automate.jsx";
import { useSelector } from "react-redux";

const company = {
  email: "coolmail@mail.com",
  phone: "341-59-15",
  website: "www.domain.com",
  address:
    "Pasaje Barcelona núm. 8, (08130), Santa Perpetua De Mogoda, Barcelona, Cataluña",
  cnae: "1234",
};

export default function InvoicePanel() {
  const { showAutomate } = useSelector((state) => state.menuAutomate);
  const [isModalAutomate, setIsModalAutomate] = useState(false);

  const openModalAutomate = () => {
    setIsModalAutomate(true);
  };
  const closeModalAutomate = () => {
    setIsModalAutomate(false);
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.container}>
        <FileExplorer />
        <InvoiceForm />
        <Preview companyInfo={company} />
      </div>
      <FloatingMenu
        openModalAutomate={openModalAutomate}
        closeModalAutomate={closeModalAutomate}
      />

      {isModalAutomate && <Automate close={closeModalAutomate} />}
    </>
  );
}
