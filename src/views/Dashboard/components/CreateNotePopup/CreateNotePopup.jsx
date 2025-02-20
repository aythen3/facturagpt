import React, { useState } from "react";
import styles from "./CreateNotePopup.module.css";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import Toolbar from "../Toolbar/Toolbar";
import CircleTagsComponent from "../CircleTagsComponent/CircleTagsComponent";
const CreateNotePopup = ({
  setHasNote,
  noteText,
  setNoteText,
  setNoteColor,
  noteColor,
  setCreatedNote,
  editorContentFinal,
  setEditorContentFinal,
}) => {
  const [selectedTag, setSelectedTag] = useState(noteColor);
  const [editorContent, setEditorContent] = useState("");

  return (
    <div>
      <div className={styles.bg} onClick={() => setHasNote(false)}></div>
      <div className={styles.CreateNotePopup}>
        <HeaderCard title={"Nueva Nota"}>
          <Button type="white">Cancel</Button>
          <Button
            action={() => {
              console.log("Contenido del editor:", editorContent);
              setNoteColor(selectedTag);
              setCreatedNote(true);
              setHasNote(false);
              setEditorContentFinal(editorContent);
            }}
          >
            Guardar
          </Button>
        </HeaderCard>
        <div className={styles.containerCreateNotepopup}>
          <div className={styles.contentCreateNotePopup}>
            <Toolbar onContentChange={setEditorContent} />
            <CircleTagsComponent
              renderAllTags={true}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              noteColor={noteColor}
            />
          </div>
        </div>
        <div className={styles.button}>Eliminar Nota</div>
      </div>
    </div>
  );
};

export default CreateNotePopup;
