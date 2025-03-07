import React, { useState, useRef } from "react";
import emptyImage from "../../assets/ImageEmpty.svg";
import styles from "./ProfileModalTemplate.module.css";
import { ReactComponent as CameraIcon } from "../../assets/camIconBW.svg";

const ProfileModalTemplate = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Función para redimensionar la imagen a 500x500px
  const resizeImage = (
    file,
    maxWidth = 500,
    maxHeight = 500,
    quality = 0.7
  ) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Mantener la proporción de la imagen
          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxWidth;
              height = maxWidth / aspectRatio;
            } else {
              height = maxHeight;
              width = maxHeight * aspectRatio;
            }
          }

          // Crear un canvas para redimensionar la imagen
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          // Convertir el canvas a Blob y reducir la calidad
          canvas.toBlob(
            (blob) => {
              const resizedImageUrl = URL.createObjectURL(blob);
              resolve(resizedImageUrl);
            },
            "image/jpeg",
            quality
          );
        };
      };
    });
  };

  // Maneja la subida y redimensionamiento de la imagen
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const resizedImageUrl = await resizeImage(file, 500, 500, 0.7);
      setSelectedImage(resizedImageUrl);
    }
  };

  // Simula el clic en el input file oculto
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.profileModalContainer}>
      <div className={styles.profileModalTemplate}>
        {/* Mostrar la imagen subida o la imagen por defecto */}
        <img src={selectedImage || emptyImage} alt="Profile" />

        <div className={styles.camContainer} onClick={triggerFileInput}>
          <CameraIcon className={styles.icon} />
        </div>

        {/* Input oculto para subir la imagen */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }} // Oculta el input
        />
      </div>
    </div>
  );
};

export default ProfileModalTemplate;
