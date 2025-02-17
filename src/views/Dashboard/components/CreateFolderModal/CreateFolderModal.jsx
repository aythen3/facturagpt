import React, { useState } from "react";
import styles from "./CreateFolderModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { createFolder } from "../../../../actions/scaleway";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import InputComponent from "../InputComponent/InputComponent";
import SearchSVG from "../Automate/svgs/SearchSVG";
import CustomAutomationsWrapper from "../CustomAutomationsWrapper/CustomAutomationsWrapper";
import OptionsSwitchComponent from "../OptionsSwichComponent/OptionsSwitchComponent";
import DeleteButton from "../DeleteButton/DeleteButton";
import { ReactComponent as TwoPeople } from "../../assets/twoPeopleWhite.svg";
const CreateFolderModal = ({ onClose, location }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { createFolderLoading } = useSelector((state) => state.scaleway);

  const [isClosing, setIsClosing] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [addColab, setAddColab] = useState(false);
  const [showSelectOutputLocation, setShowSelectOutputLocation] =
    useState(false);

  const [emailInput, setEmailInput] = useState(""); // Estado para el input de correo
  const [emailList, setEmailList] = useState([]); // Estado para la lista de correos

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCreateFolder = async () => {
    if (folderName === "") return;
    console.log("Creating folder on", `${location}${folderName}`);
    await dispatch(createFolder({ folderPath: `${location}${folderName}` }));
    setFolderName("");
    handleClose();
  };

  // Función para agregar el correo al estado
  const handleAddEmail = () => {
    setEmailList([...emailList, emailInput]);
    setEmailInput("");
  };

  // Función para eliminar un correo de la lista
  const handleDeleteEmail = (index) => {
    const updatedList = emailList.filter((_, i) => i !== index);
    setEmailList(updatedList);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${styles.modalContent} ${isClosing ? styles.scaleDown : ""}`}
      >
        <HeaderCard title={"Nueva Carpeta"} setState={handleClose}>
          <Button type="white" action={handleClose}>
            Cancelar
          </Button>
          <Button action={handleCreateFolder}>
            {createFolderLoading ? "Creando..." : "Guardar"}
          </Button>
        </HeaderCard>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.contentInnerContainer}>
              <span>Nombre de la carpeta</span>
              <input
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                type="text"
                placeholder="Nombre"
                className={styles.input}
              />
            </div>

            <div className={styles.contentInnerContainer}>
              <span className={styles.titleContentInput}>Ubicación</span>
              <InputComponent
                readOnly={true}
                value={location.replace(user.id, "Inicio")}
                textButton="Seleccionar Ubicación"
                placeholder="/Inicio"
                icon={<SearchSVG />}
                action={() => setShowSelectOutputLocation(true)}
              />
            </div>

            <CustomAutomationsWrapper Icon={<TwoPeople />}>
              <div className={styles.infoContainerWrapper}>
                <div className={styles.infoContainer}>
                  <div>Añadir Colaboradores</div>
                </div>

                <OptionsSwitchComponent
                  border={"none"}
                  marginLeft={"auto"}
                  isChecked={addColab || false}
                  setIsChecked={setAddColab}
                />
              </div>
              <div
                className={`${styles.contentContainerWrapp} ${
                  addColab ? styles.active : styles.disabled
                }`}
              >
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <div className={styles.inviteButton} onClick={handleAddEmail}>
                  Invitar
                </div>
              </div>
              {/* Renderiza la lista de correos */}
              <div className={styles.emailList}>
                {emailList.map((email, index) => (
                  <div key={index} className={styles.emailItem}>
                    <div className={styles.nameEmail}>
                      <div className={styles.logo}>{email.slice(0, 1)}</div>
                      <span>{email}</span>
                    </div>

                    <DeleteButton
                      action={(e) => {
                        e.stopPropagation();
                        handleDeleteEmail(index);
                      }}
                    />
                  </div>
                ))}
              </div>
            </CustomAutomationsWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
