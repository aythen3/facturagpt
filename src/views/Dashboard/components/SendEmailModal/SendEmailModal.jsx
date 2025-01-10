import React, { useState } from 'react';
import styles from './SendEmailModal.module.css';
import Toolbar from '../Toolbar/Toolbar';
import pdf from '../../assets/pdfIcon.svg';
import jpg from '../../assets/jpgIcon.svg';
import png from '../../assets/pngIcon.svg';
import txt from '../../assets/txtIcon.svg';
import csv from '../../assets/csvIcon.svg';
import xml from '../../assets/xmlIconNew.svg';
import html from '../../assets/htmlIcon.svg';
import json from '../../assets/jsonIcon.svg';
import adjuntar from '../../assets/share.svg';
import minus from '../../assets/minus.svg';
import closeMenu from '../../assets/closeMenu.svg';
const SendEmailModal = () => {
  const files = [
    {
      img: pdf,
      title: 'Titulo del archivo',
      size: '557 kb',
    },
    {
      img: jpg,
      title: 'Titulo del archivo',
      size: '557 kb',
    },
    {
      img: png,
      title: 'Titulo del archivo',
      size: '557 kb',
    },
    {
      img: txt,
      title: 'Titulo del archivo',
      size: '557 kb',
    },
    {
      img: csv,
      title: 'Titulo del archivo',
      size: '557 kb',
    },
    {
      img: xml,
      title: 'Titulo del archivo',
      size: '557 kb',
    },
    {
      img: html,
      title: 'Titulo del archivo',
      size: '557 kb',
    },
    {
      img: json,
      title: 'Titulo del archivo',
      size: '557 kb',
    },
  ];

  return (
    <div className={styles.sendEmailModal}>
      <header className={styles.sendEmailHeader}>
        <h2>Send Email</h2>
        <div className={styles.options}>
          <span>coolemail@gmail.com</span>
          <select>
            <option value=''>Bandejas</option>
            <option value=''>Bandejas</option>
            <option value=''>Bandejas</option>
          </select>
          <img src={closeMenu} />
        </div>
      </header>
      <div className={styles.sendEmailContent}>
        <div className={styles.infOptions}>
          <input type='text' placeholder='Para: [email], ...' />
          <input type='text' placeholder='Asunto: [document_title]' />
          <Toolbar />
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #e3e3e3' }}>
        <div className={styles.attach}>
          <div>
            <img src={adjuntar} />
          </div>
          <p>Añadir Adjunto</p>
        </div>
        {files.map((file) => (
          <div className={styles.file}>
            <div className={styles.fileTitle}>
              <div>
                <img src={file.img} />
              </div>
              <p>{file.title}</p>
            </div>
            <div className={styles.sizeFile}>
              <p>{file.size}</p>
              <span>
                <img src={minus} alt='' />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btnContainerFiles}>
        <button className={styles.btnCancel}>Cancel</button>
        <button className={styles.btnSend}>Enviar</button>
      </div>
    </div>
  );
};

export default SendEmailModal;
