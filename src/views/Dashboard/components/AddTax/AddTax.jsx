import React, { useState } from 'react';
import HeaderCard from '../HeaderCard/HeaderCard';
import styles from './AddTax.module.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import Button from '../Button/Button';
import DiscardChange from '../DiscardChange/DiscardChange';
const AddTax = ({ setShowTaxModal }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [taxes, setTaxes] = useState([]);
  const [taxName, setTaxName] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [isCompound, setIsCompound] = useState(false);

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const handleAddTax = () => {
    if (taxName.trim() === '' || taxRate.trim() === '') return;

    const newTax = {
      name: taxName,
      rate: `${taxRate}%`,
      compound: isCompound ? 'Si' : 'No',
    };

    setTaxes([...taxes, newTax]);
    setTaxName('');
    setTaxRate('');
    setIsCompound(false);
  };

  const handleDeleteTax = (index) => {
    setTaxes(taxes.filter((_, i) => i !== index));
    setSelectedRow(null);
  };
  const [showDiscardChange, setShowDiscardChange] = useState(false);

  return (
    <div>
      <div className={styles.bg} onClick={() => setShowTaxModal(false)}></div>
      {showDiscardChange && (
        <DiscardChange
          actionSave={() => setShowDiscardChange(false)}
          actionDiscard={() => {
            setShowDiscardChange(false);
            setShowTaxModal(false);
          }}
        />
      )}
      <div
        className={`${styles.addTaxContainer} ${showDiscardChange && styles.opacity}`}
      >
        <HeaderCard title={'Seleccionar Impuesto'} setState={setShowTaxModal}>
          <Button type="white" action={() => setShowDiscardChange(true)}>
            Cancel
          </Button>
          <Button>Seleccionar</Button>
        </HeaderCard>
        <div className={styles.addTaxContent}>
          <div className={styles.taxes}>
            <div className={styles.column}>
              <p>Nombre del Impuesto</p>
              <input
                type="text"
                placeholder="[taxname]"
                value={taxName}
                onChange={(e) => setTaxName(e.target.value)}
              />
            </div>
            <div className={styles.column}>
              <p>Tasa de impuesto</p>
              <input
                type="number"
                placeholder="%"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </div>
            <div className={styles.compuesto}>
              <input
                type="checkbox"
                checked={isCompound}
                onChange={() => setIsCompound(!isCompound)}
              />
              <span>Impuesto compuesto</span>
            </div>
          </div>
          <div className={styles.tableTaxes}>
            <button onClick={handleAddTax}>Añadir Impuesto</button>
            <table>
              <thead>
                <tr>
                  <th className={styles.small}></th>
                  <th>Nombre del Impuesto</th>
                  <th>Tasa de Impuesto</th>
                  <th>Impuesto Compuesto</th>
                  <th className={styles.small}></th>
                </tr>
              </thead>
              <tbody>
                {taxes.map((tax, index) => (
                  <tr
                    key={index}
                    className={selectedRow === index ? styles.selectedRow : ''}
                    onClick={() => handleRowClick(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className={styles.small}>
                      <input
                        type="checkbox"
                        checked={selectedRow === index}
                        readOnly
                      />
                    </td>
                    <td>{tax.name}</td>
                    <td>{tax.rate}</td>
                    <td>{tax.compound}</td>
                    <td className={styles.small}>
                      <DeleteButton
                        action={(e) => {
                          e.stopPropagation();
                          handleDeleteTax(index);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTax;
