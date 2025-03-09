import React, { useEffect, useState } from "react";
import styles from "./NewBIll.module.css";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import Preview from "../Preview/Preview";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Factura from "../../assets/facturaEjemplo.png";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import { ReactComponent as WhiteFolder } from "../../assets/whiteFolder.svg";
import { ReactComponent as GrayChevron } from "../../assets/grayChevron.svg";
import { ReactComponent as ArrowSquare } from "../../assets/whiteArrowSquareIn.svg";
import { ReactComponent as WhiteText } from "../../assets/whiteText.svg";
import { ReactComponent as WhiteClock } from "../../assets/whiteClock.svg";
import { getOneDocsById } from "@src/actions/docs";

import SearchSVG from "../Automate/svgs/SearchSVG";

import CustomAutomationsWrapper from "../CustomAutomationsWrapper/CustomAutomationsWrapper";
import InputComponent from "../InputComponent/InputComponent";
import SelectLocation from "../SelectLocation/SelectLocation";
import Advertency from "../Automate/Components/Advertency/Advertency";
import AddEmailsInput from "../Automate/Components/AddEmailsInput/AddEmailsInput";
import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import OptionsSwitchComponent from "../OptionsSwichComponent/OptionsSwitchComponent";
const company = {
  email: "coolmail@mail.com",
  phone: "341-59-15",
  website: "www.domain.com",
  address:
    "Pasaje Barcelona núm. 8, (08130), Santa Perpetua De Mogoda, Barcelona, Cataluña",
  cnae: "1234",
};

const NewBIll = ({ setShowNewBill }) => {
  const { user, updatingUserLoading } = useSelector((state) => state.user);
  const [hasNote, setHasNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showInfoMobileBill, setShowInfoMobileBill] = useState(false);

  console.log(`usuario: ${user}`);

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
  const [showContent, setShowContent] = useState({
    info1: false,
    info2: false,
    info3: false,
    info4: false,
    info5: false,
    info6: false,
    info7: false,
  });

  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);
  const [activateRename, setActivateRename] = useState(false);
  // const handleConfigurationChange = (key, value) => {
  //   setConfiguration((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  // const addConnection = (connection) => {
  //   const updatedConnections = [
  //     ...(configuration?.emailConnectionData || []),
  //     connection,
  //   ];
  //   handleConfigurationChange("emailConnectionData", updatedConnections);
  //   if (!configuration?.selectedEmailConnection) {
  //     handleConfigurationChange("selectedEmailConnection", connection.email);
  //   }
  // };
  const dispatch = useDispatch();

  const [editingNote, setEditingNote] = useState(false);
  const [editorContentFinal, setEditorContentFinal] = useState("");

  console.log(`usuario: ${user}`);

  const { id } = useParams();

  useEffect(() => {
    // console.log("id", id);
    // if (id) {
    //   setFileUploaded(true);
    // }

    const fn = async () => {
      setFileUploaded(true);
      // const db = await connectDB('db_automations')
      // const automation = await db.get(id)
      // console.log('automation', automation)

      const response = await dispatch(
        getOneDocsById({
          docId: id,
        })
      );
      console.log("db", response);
    };

    if (id) {
      fn();
    }
  }, [id]);

  const [createdNote, setCreatedNote] = useState(false);
  const [noteColor, setNoteColor] = useState("tagGreen");
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    <div>
      <div className={styles.bg} onClick={() => setShowNewBill(false)}></div>
      <div className={styles.newBillContainer}>
        <HeaderCard title={"Nueva factura"} setState={setShowNewBill}>
          <Button type="white">Ver Email</Button>
          <Button type="gray">
            <input type="checkbox" name="sendEmail" className={styles.accent} />
            Enviar por correo
          </Button>
          <Button>Guardar</Button>
        </HeaderCard>
        <div className={styles.newBillContent}>
          {/* <div className={styles.containerLeftSide}>
            <InvoiceForm
              hasNote={hasNote}
              handleAddNote={handleAddNote}
              noteText={noteText}
              handleNoteChange={handleNoteChange}
              handleNoteBlur={handleNoteBlur}
              isEditingNote={isEditingNote}
              handleEditNote={handleEditNote}
              customStyles={{ overflowY: "initial" }}
            />
            <div className={styles.wrapperContainer}>
              {" "}
              <CustomAutomationsWrapper Icon={<WhiteFolder />}>
                <div
                  className={styles.infoContainerWrapper}
                  onClick={() =>
                    setShowContent({
                      ...showContent,
                      info1: !showContent.info1,
                    })
                  }
                >
                  <GrayChevron />
                  <div className={styles.infoContainer}>
                    <div>Decide dónde guardar los documentos procesados</div>
                    <span>
                      Elige una ubicación en FacturaGPT para organizar tus
                      archivos procesados
                    </span>
                  </div>
                </div>
                <div
                  className={`${styles.contentContainer} ${showContent.info1 ? styles.active : styles.disabled}`}
                >
                  <div className={styles.contentInput}>
                    <p className={styles.titleContentInput}>Ubicación</p>

                    <InputComponent
                      readOnly={true}
                      // value={configuration?.folderLocation}
                      // setValue={(value) =>
                      //   handleConfigurationChange("folderLocation", value)
                      // }
                      textButton="Seleccionar Ubicación"
                      placeholder="/Inicio"
                      icon={<SearchSVG />}
                      action={() => setShowSelectOutputLocation(true)}
                    />
                  </div>
                  <Advertency
                    text={
                      "El primer día de cada mes se guardará la factura creada con la fecha actualizada en la ubicación seleccionada"
                    }
                  />
                </div>
              </CustomAutomationsWrapper>
              <CustomAutomationsWrapper Icon={<WhiteClock />}>
                <div
                  className={styles.infoContainerWrapper}
                  onClick={() =>
                    setShowContent({
                      ...showContent,
                      info2: !showContent.info2,
                    })
                  }
                >
                  <GrayChevron />
                  <div className={styles.infoContainer}>
                    <div>
                      Quieres que se cree un documento recurrente a partir de
                      este?
                    </div>
                    <span>
                      Elige la frecuencia en la que se debe generar el documento
                      recurrente
                    </span>
                  </div>
                </div>
                <div
                  className={`${styles.contentContainer} ${showContent.info2 ? styles.active : styles.disabled}`}
                >
                  <div className={styles.contentInputInputs}>
                    <div className={styles.column}>
                      <p>Fecha</p>
                      <CustomDropdown
                        editable={true}
                        editing={true}
                        options={["Primer día del mes", "Último día del mes"]}
                        // selectedOption={userData?.currency}
                        // setSelectedOption={(option) =>
                        //   handleChange({ name: "currency", newValue: option })
                        // }
                      />
                    </div>
                    <div className={styles.column}>
                      <p>Fecha</p>
                      <CustomDropdown
                        editable={true}
                        editing={true}
                        options={["Feb 2025", "May 2025", "Abr 2025"]}
                        // selectedOption={userData?.currency}
                        // setSelectedOption={(option) =>
                        //   handleChange({ name: "currency", newValue: option })
                        // }
                      />
                    </div>
                  </div>
                  <CustomAutomationsWrapper Icon={<WhiteText />}>
                    <div className={styles.infoContainerWrapper}>
                      <div
                        className={styles.infoContainer}
                        onClick={() =>
                          setShowContent({
                            ...showContent,
                            info5: !showContent.info5,
                          })
                        }
                      >
                        <div>Renombra automáticamente tus archivos</div>
                        <span>
                          Configura nombres claros y personalizados para
                          mantener todo organizado.
                        </span>
                      </div>
                      <OptionsSwitchComponent
                        border={"none"}
                        marginLeft={"auto"}
                        isChecked={activateRename || false}
                        setIsChecked={setActivateRename}
                      />
                    </div>
                    <div
                      className={`${styles.contentContainer} ${activateRename ? styles.active : styles.disabled}`}
                    >
                      <InputComponent
                        placeholder="Escribe [id], [title], [date], [totalamount], [contactid], [category] para personalizar los documentos subidos"
                        typeInput="text"
                        // value={configuration?.fileName || ""}
                        // setValue={(value) =>
                        //   handleConfigurationChange("fileName", value)
                        // }
                      />
                    </div>
                  </CustomAutomationsWrapper>
                </div>
              </CustomAutomationsWrapper>
            </div>
            {showSelectOutputLocation && (
              <SelectLocation
                onClose={() => setShowSelectOutputLocation(false)}
                pickLocation={(location) => {
                  console.log("location", location);
                  handleConfigurationChange("folderLocation", location);
                }}
              />
            )}
          </div> */}
          <InvoiceForm
            hasNote={hasNote}
            setHasNote={setHasNote}
            handleAddNote={handleAddNote}
            noteText={noteText}
            handleNoteChange={handleNoteChange}
            handleNoteBlur={handleNoteBlur}
            isEditingNote={isEditingNote}
            handleEditNote={handleEditNote}
            showInfoMobileBill={showInfoMobileBill}
            setShowInfoMobileBill={setShowInfoMobileBill}
          />
          <Preview
            companyInfo={company}
            document={Factura}
            handleAddNote={handleAddNote}
            setSelectedCurrency={setSelectedCurrency}
            selectedCurrency={selectedCurrency}
            setShowInfoMobileBill={setShowInfoMobileBill}
            isNewBill={true}
            setEditingNote={setEditingNote}
            editingNote={editingNote}
            setCreatedNote={setCreatedNote}
            createdNote={createdNote}
            noteColor={noteColor}
            editorContentFinal={editorContentFinal}
            setEditorContentFinal={setEditorContentFinal}

            // customStyles={{ paddingBottom: "230px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewBIll;
