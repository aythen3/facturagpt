import React, { useState } from 'react';
import axios from 'axios';
import styles from './ContactForm.module.css';
import handPointer from '../../assets/handPointer.svg';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsMessageVisible(false);

    try {
      const response = await axios.post(
        'http://localhost:3006/api/user/newsletter',
        formData
      );

      if (response.status === 200) {
        setFormData({ name: '', email: '', message: '' });
        showMessage('Mensaje enviado exitosamente.', true);
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      showMessage(
        'Error al enviar el mensaje. Por favor, inténtelo de nuevo.',
        false
      );
    }
  };

  const showMessage = (message, success) => {
    setStatusMessage(message);
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000); // El mensaje desaparecerá después de 3 segundos
  };

  return (
    <div className={styles.container} id='contact'>
      <div className={styles.header}>
        <img src={handPointer} alt='' className={styles.leftImage} />
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Contáctenos</h2>
          <p className={styles.subtitle}>
            Estamos aquí para ayudar, solicite asistencia personalizada.
          </p>
        </div>
        <img src={handPointer} alt='' className={styles.rightImage} />
      </div>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Su nombre</label>
              <input
                type='text'
                name='name'
                placeholder='Introduce tu nombre'
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Tu correo electrónico</label>
              <input
                type='email'
                name='email'
                placeholder='Introduce tu correo electrónico'
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Tu mensaje</label>
              <textarea
                name='message'
                placeholder='Escribe tu mensaje aquí'
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type='submit' className={styles.button}>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>

      {isMessageVisible && (
        <div
          className={`${styles.statusMessage} ${
            statusMessage.includes('exitosamente')
              ? styles.success
              : styles.error
          }`}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
