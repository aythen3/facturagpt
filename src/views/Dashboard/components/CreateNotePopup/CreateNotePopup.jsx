import React, { useEffect, useState } from "react";
import styles from "./CreateNotePopup.module.css";
import HeaderCard from "../HeaderCard/HeaderCard";
import Button from "../Button/Button";
import Toolbar from "../Toolbar/Toolbar";
import CircleTagsComponent from "../CircleTagsComponent/CircleTagsComponent";
const CreateNotePopup = ({
  hasNote,
  setHasNote,
  noteText,
  setNoteText,
  setNoteColor,
  noteColor,
  setCreatedNote,
  editorContentFinal,
  setEditorContentFinal,
  setEditingNote,
  isAnimating,
  setIsAnimating,
  editingNote,
}) => {
  const [selectedTag, setSelectedTag] = useState(noteColor);
  const [editorContent, setEditorContent] = useState(
    editingNote
      ? editorContentFinal == "Nueva nota"
        ? ""
        : editorContentFinal
      : ""
    // ? editorContentFinal
    // : editorContentFinal === "Nueva nota"
    //   ? ""

    //   : ""
  );

  const handleCloseNewClient = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setHasNote(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && hasNote) {
        setIsAnimating(true);
        setTimeout(() => {
          setHasNote(false);
          setIsAnimating(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasNote]);

  return (
    <div style={{ position: "absolute" }}>
      <div className={styles.bg} onClick={() => handleCloseNewClient()}></div>
      <div
        className={`${styles.CreateNotePopup}  ${isAnimating ? styles.scaleDown : styles.scaleUp}`}
      >
        <HeaderCard title={"Nueva Nota"}>
          <Button type="white" action={() => handleCloseNewClient()}>
            Cancel
          </Button>
          {/* {editorContentFinal}
          {editorContent} */}
          <Button
            action={() => {
              console.log("Contenido del editor:", editorContent);
              setNoteColor(selectedTag);
              setCreatedNote(true);
              handleCloseNewClient();
              setEditorContentFinal(
                editorContent == "" || editorContent == "<br>"
                  ? "Nueva nota"
                  : editorContent
              );
            }}
          >
            Guardar
          </Button>
        </HeaderCard>
        <div className={styles.containerCreateNotepopup}>
          <div className={styles.contentCreateNotePopup}>
            <Toolbar
              onContentChange={setEditorContent}
              editorContent={editorContent}
            />
            <CircleTagsComponent
              renderAllTags={true}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              noteColor={noteColor}
            />
          </div>
        </div>
        {editingNote && (
          <div
            className={styles.button}
            onClick={() => {
              setNoteColor(selectedTag);
              setCreatedNote(false);
              handleCloseNewClient();
              setEditorContentFinal("");
            }}
          >
            Eliminar Nota
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNotePopup;
