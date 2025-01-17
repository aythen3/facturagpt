import styles from "./PanelTemplate.module.css";
import FileExplorer from "../../components/FileExplorer/FileExplorer.jsx";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.jsx";
import Preview from "../../components/Preview/Preview.jsx";
import FloatingMenu from "../../components/FloatingMenu/FloatingMenu.jsx";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.jsx";
import { useState } from "react";
import Automate from "../../components/Automate/Automate.jsx";
import PanelAutomate from "../../components/Automate/panelAutomate/PanelAutomate.jsx";
import { useDispatch, useSelector } from "react-redux";
import Chat from "../../components/Chat/Chat.jsx";
const PanelTemplate = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <NavbarAdmin />
      <div className={styles.container}>
        <FileExplorer isOpen={isOpen} setIsOpen={setIsOpen} />

        {children}
      </div>
    </>
  );
};

export default PanelTemplate;
