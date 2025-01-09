import styles from './InvoicePanel.module.css';
import FileExplorer from '../../components/FileExplorer/FileExplorer.jsx';
import InvoiceForm from '../../components/InvoiceForm/InvoiceForm.jsx';
import Preview from '../../components/Preview/Preview.jsx';
import FloatingMenu from '../../components/FloatingMenu/FloatingMenu.jsx';
import Navbar from '../../components/Navbar/Navbar';
import { useState } from 'react';
import Automate from '../../components/Automate/Automate.jsx';
import { useSelector } from 'react-redux';
import PanelAutomate from '../../components/Automate/panelAutomate/PanelAutomate.jsx';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin.jsx';

const company = {
  email: 'coolmail@mail.com',
  phone: '341-59-15',
  website: 'www.domain.com',
  address:
    'Pasaje Barcelona núm. 8, (08130), Santa Perpetua De Mogoda, Barcelona, Cataluña',
  cnae: '1234',
};

export default function InvoicePanel() {
  const [isModalAutomate, setIsModalAutomate] = useState(false);
  const [typeContentAutomate, setTypeContentAutomate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModalAutomate = () => {
    setIsModalAutomate(true);
  };
  const closeModalAutomate = () => {
    setTypeContentAutomate('');
    setIsModalAutomate(false);
  };

  const handleShowContentAutomate = (type) => {
    setIsModalAutomate(false);
    setTypeContentAutomate(type);
  };

  const handleCloseContentAutomate = (type) => {
    setIsModalAutomate(false);
    setTypeContentAutomate('');
  };

  return (
    <>
      <NavbarAdmin />
      <div className={styles.container}>
        <FileExplorer isOpen={isOpen} setIsOpen={setIsOpen} />
        <InvoiceForm />
        <Preview companyInfo={company} />
        <FloatingMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openModalAutomate={openModalAutomate}
          closeModalAutomate={closeModalAutomate}
        />
      </div>

      {isModalAutomate && (
        <Automate
          typeContent={handleShowContentAutomate}
          close={closeModalAutomate}
          isGeneral={true}
          // fullContent={true}
        />
      )}

      {typeContentAutomate && (
        <PanelAutomate
          typeContent={handleShowContentAutomate}
          close={handleCloseContentAutomate}
          type={typeContentAutomate}
        />
      )}
    </>
  );
}
