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
// import Chat from "../../components/Chat/Chat.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const PanelTemplate = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // const [fromPath, setFromPath] = useState("chat");

  // useEffect(() => {
  //   setFromPath(fromPath);
  //   navigate("/admin/"+fromPath);
  // }, [fromPath]);

  // const [fromPath, setFromPath] = useState(() => {
  //   const savedPath = localStorage.getItem('lastPath');
  //   return savedPath || "chat";
  // });

  const [fromPath, setFromPath] = useState(() => {
    const savedPath = localStorage.getItem('lastPath');
    const currentPath = window.location.pathname.split('/admin/')[1];
    return currentPath && currentPath !== savedPath ? currentPath : (savedPath || "chat");
  });

  useEffect(() => {
    localStorage.setItem('lastPath', fromPath);
    navigate("/admin/" + fromPath);
  }, [fromPath]);

  return (
    <>
      <NavbarAdmin fromPath={fromPath} setFromPath={setFromPath} />
      <div className={styles.container}>
        {((fromPath !== 'accounts') &&
          fromPath !== 'chat'
        ) && (
            <FileExplorer isOpen={isOpen} setIsOpen={setIsOpen} />
          )}
        {children}
      </div>
    </>
  );
};

export default PanelTemplate;
