import styles from "./InvoicePanel.module.css";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.jsx";
import Preview from "../../components/Preview/Preview.jsx";
import { useState, useEffect } from "react";
import Factura from "../../assets/facturaEjemplo.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate.jsx";
import SkeletonScreen from "../../components/SkeletonScreen/SkeletonScreen.jsx";
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
  const [fileUploaded, setFileUploaded] = useState(false);
  const { user, updatingUserLoading } = useSelector((state) => state.user);
  const [hasNote, setHasNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);

  console.log(`usuario: ${user}`);

  const { id } = useParams();

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

  const handleAddNote = () => {
    setHasNote(true);
    setNoteText("");
  };

  const handleEditNote = () => {
    setIsEditingNote((prev) => !prev);
  };

  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleNoteBlur = () => {
    setIsEditingNote(false);
  };

  useEffect(() => {
    console.log("id", id);
    if (id) {
      setFileUploaded(true);
    }
  }, [id]);

  return (
    <PanelTemplate>
      {/* <NavbarAdmin setIsOpen={setIsOpen} isOpen={isOpen} /> */}
      {/* <div className={styles.container}> */}
      {/* <FileExplorer isOpen={isOpen} setIsOpen={setIsOpen} /> */}

      {!fileUploaded ? (
        <SkeletonScreen
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileChange={handleFileChangeInvoice}
          inputId="InvoiceInput"
          labelText="Selecciona una factura o arrastra y suelta"
          helperText="Digitaliza y gestiona todos tus documentos con FacturaGPT."
          showInput={true} // Puedes cambiarlo a false para ocultar el input
          enableLabelClick={true} // Puedes cambiarlo a false para desactivar el click en el label/>
        />
      ) : (
        // <div
        //   className={styles.inputContainer}
        //   onDragOver={handleDragOver}
        //   onDrop={handleDrop}
        // >
        //   <input
        //     type="file"
        //     onChange={handleFileChangeInvoice}
        //     placeholder="Selecciona una factura o arrastra"
        //     id="InvoiceInput"
        //   />
        //   <label
        //     onClick={() => document.querySelector("#InvoiceInput").click()}
        //   >
        //     Selecciona una factura o arrastra y suelta <br /> Digitaliza y
        //     gestiona todos tus documentos con FacturaGPT.
        //   </label>
        // </div>
        <>
          <InvoiceForm
            hasNote={hasNote}
            handleAddNote={handleAddNote}
            noteText={noteText}
            handleNoteChange={handleNoteChange}
            handleNoteBlur={handleNoteBlur}
            isEditingNote={isEditingNote}
            handleEditNote={handleEditNote}
          />
          <Preview
            companyInfo={company}
            document={Factura}
            handleAddNote={handleAddNote}
          />
        </>
      )}
    </PanelTemplate>
  );
}
