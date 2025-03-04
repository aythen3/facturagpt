import styles from "./InvoicePanel.module.css";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.jsx";
import Preview from "../../components/Preview/Preview.jsx";
import { useState, useEffect } from "react";
import Factura from "../../assets/facturaEjemplo.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate.jsx";
import SkeletonScreen from "../../components/SkeletonScreen/SkeletonScreen.jsx";
import SelectLocation from "../../components/SelectLocation/SelectLocation.jsx";
// import { dispatch } from "d3";
import { getOneTransactionById } from "@src/actions/transactions";


const company = {
  email: "coolmail@mail.com",
  phone: "341-59-15",
  website: "www.domain.com",
  address:
    "Pasaje Barcelona núm. 8, (08130), Santa Perpetua De Mogoda, Barcelona, Cataluña",
  cnae: "1234",
};

export default function InvoicePanel() {
  const dispatch = useDispatch()

  const [isModalAutomate, setIsModalAutomate] = useState(false);
  const [typeContentAutomate, setTypeContentAutomate] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  const { user, updatingUserLoading } = useSelector((state) => state.user);
  const [hasNote, setHasNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("tagGreen");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
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
      setShowSelectLocation(true);
    }
  };

  const handleAddNote = () => {
    setHasNote(true);
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

  const handleLabelClick = () => {
    setShowSelectLocation(true);
  };

  useEffect(() => {
    // console.log("id", id);
    // if (id) {
    //   setFileUploaded(true);
    // }

    const fn = async () => {
      // const db = await connectDB('db_automations')
      // const automation = await db.get(id)
      // console.log('automation', automation)

      const response = await dispatch(getOneTransactionById({
        transactionId: id
      }))
      console.log('db', response)
    }

    if(id) {
      fn()
    }

  }, [id]);



  const [mobileSelectedDocument, setMobileSelectedDocument] = useState(false);
  const [showInfoMobileBill, setShowInfoMobileBill] = useState(false);

  return (
    <PanelTemplate
      mobileSelectedDocument={mobileSelectedDocument}
      setMobileSelectedDocument={setMobileSelectedDocument}
    >
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
          showInput={true}
          enableLabelClick={true}
          onLabelClick={handleLabelClick}
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
            setHasNote={setHasNote}
            handleAddNote={handleAddNote}
            noteText={noteText}
            handleNoteChange={handleNoteChange}
            handleNoteBlur={handleNoteBlur}
            isEditingNote={isEditingNote}
            handleEditNote={handleEditNote}
            noteColor={noteColor}
            setNoteColor={setNoteColor}
            setEditingNote={setEditingNote}
            editingNote={editingNote}
            idFile={id}
            showInfoMobileBill={showInfoMobileBill}
            setShowInfoMobileBill={setShowInfoMobileBill}
          />
          {showSelectLocation && (
            <SelectLocation onClose={() => setShowSelectLocation(false)} />
          )}
          <Preview
            companyInfo={company}
            document={Factura}
            handleAddNote={handleAddNote}
            setEditingNote={setEditingNote}
            editingNote={editingNote}
            setShowInfoMobileBill={setShowInfoMobileBill}
            setMobileSelectedDocument={setMobileSelectedDocument}
          />
        </>
      )}
    </PanelTemplate>
  );
}
