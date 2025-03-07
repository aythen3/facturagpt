import { useState } from "react";
import styles from "./DatePicker.module.css";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setIsEditing(false); // Después de seleccionar la fecha, ocultamos el input
  };

  return (
    <div className={styles.datePicker}>
      {/* Span siempre visible */}
      {/* <span onClick={() => setIsEditing(true)} className={styles.dateText}>
        {selectedDate}
      </span> */}

      {/* El input solo se muestra cuando isEditing es true */}
      {/* {isEditing && ( */}
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        autoFocus
        className={styles.input}
      />
      {/* )} */}
    </div>
  );
};

export default DatePicker;
