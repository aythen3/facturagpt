import styles from "./InvoicePanel.module.css";
import FileExplorer from "../../components/FileExplorer/FileExplorer.jsx";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.jsx";
import Preview from "../../components/Preview/Preview.jsx";
import FloatingMenu from "../../components/FloatingMenu/FloatingMenu.jsx";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.jsx";
import { useState } from "react";
import Automate from "../../components/Automate/Automate.jsx";
import Factura from "../../assets/facturaEjemplo.png";

import PanelAutomate from "../../components/Automate/panelAutomate/PanelAutomate.jsx";
import { useDispatch, useSelector } from "react-redux";
import Chat from "../../components/Chat/Chat.jsx";
const company = {
  email: "coolmail@mail.com",
  phone: "341-59-15",
  website: "www.domain.com",
  address:
    "Pasaje Barcelona núm. 8, (08130), Santa Perpetua De Mogoda, Barcelona, Cataluña",
  cnae: "1234",
};

export default function InvoicePanel() {
  const [isModalAutomate, setIsModalAutomate] = useState(false);
  const [typeContentAutomate, setTypeContentAutomate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [activateChat, setActivateChat] = useState(false);
  const { user, updatingUserLoading } = useSelector((state) => state.user);
  console.log(`usuario: ${user}`);
  const openModalAutomate = () => {
    setIsModalAutomate(true);
  };
  const closeModalAutomate = () => {
    setTypeContentAutomate("");
    setIsModalAutomate(false);
  };

  const handleShowContentAutomate = (type) => {
    setIsModalAutomate(false);
    setTypeContentAutomate(type);
  };

  const handleCloseContentAutomate = (type) => {
    setIsModalAutomate(false);
    setTypeContentAutomate("");
  };

  const handleFileChangeInvoice = (event) => {
    if (event.target.files.length > 0) {
      setFileUploaded(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      setFileUploaded(true);
    }
  };

  return (
    <>
      <NavbarAdmin setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className={styles.container}>
        <FileExplorer isOpen={isOpen} setIsOpen={setIsOpen} />

        {!fileUploaded ? (
          <div
            className={styles.inputContainer}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleFileChangeInvoice}
              placeholder="Selecciona una factura o arrastra"
              id="InvoiceInput"
            />
            <label
              onClick={() => document.querySelector("#InvoiceInput").click()}
            >
              Selecciona una factura o arrastra y suelta <br /> Digitaliza y
              gestiona todos tus documentos con FacturaGPT.
            </label>
          </div>
        ) : (
          <>
            <InvoiceForm />
            <Preview companyInfo={company} document={Factura} />
          </>
        )}
        {/* <FloatingMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openModalAutomate={openModalAutomate}
          closeModalAutomate={closeModalAutomate}
        /> */}
      </div>

      {/* {isModalAutomate && (
        <Automate
          typeContent={handleShowContentAutomate}
          close={closeModalAutomate}
          isModalAutomate={isModalAutomate}
          setIsModalAutomate={setIsModalAutomate}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
      )}

      {typeContentAutomate && (
        <PanelAutomate
          typeContent={handleShowContentAutomate}
          close={handleCloseContentAutomate}
          type={typeContentAutomate}
        />
      )} */}
    </>
  );
}
