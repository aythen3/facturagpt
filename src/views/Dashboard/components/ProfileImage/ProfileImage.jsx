import React, { useState, useRef } from "react";
import styles from "./ProfileImage.module.css";
import ImageEmpty from "../../assets/ImageEmpty.svg";
import { ReactComponent as CamIconBW } from "../../assets/camIconBW.svg";

const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;

const ProfileImage = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // Función para manejar la carga y procesamiento de la imagen
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Escalar la imagen si supera los límites
          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const scaleFactor = Math.min(
              MAX_WIDTH / width,
              MAX_HEIGHT / height
            );
            width *= scaleFactor;
            height *= scaleFactor;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir el canvas a una imagen base64
          const resizedImage = canvas.toDataURL("image/jpeg", 0.9);
          setImage(resizedImage);
        };
      };
    }
  };

  // Función para activar el input de tipo file
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.profileImage}>
      <img src={image || ImageEmpty} alt="Profile" />
      <div className={styles.changeProfileImage} onClick={handleClick}>
        <CamIconBW />
      </div>
      {/* Input de tipo file oculto */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ProfileImage;
