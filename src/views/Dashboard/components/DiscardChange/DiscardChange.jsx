import React from 'react';
import HeaderCard from '../HeaderCard/HeaderCard';
import Button from '../Button/Button';
import styles from './DiscardChange.module.css';
const DiscardChange = ({ actionDiscard, actionSave }) => {
  return (
    <div className={styles.discardChangeContainer}>
      <HeaderCard title={'¿Quieres guardar antes de salir?'}>
        <Button action={actionDiscard} type="discard">
          Descartar
        </Button>
        <Button action={actionSave}>Guardar</Button>
      </HeaderCard>

      <div className={styles.content}>
        <p>Has realizado cambios que no se han guardado.</p>
        <p>
          Si decides no guardarlos, perderás permanentemente cualquier cambio
          realizado.
        </p>
      </div>
    </div>
  );
};

export default DiscardChange;
