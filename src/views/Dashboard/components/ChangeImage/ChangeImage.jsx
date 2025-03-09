import React, { useRef, useState } from "react";
import emptyImage from "../../assets/ImageEmpty.svg";
import { ReactComponent as CamIconBW } from "../../assets/camIconWhiteFill.svg";
import { ReactComponent as Eye } from "../../assets/eyeIconNew.svg";
import { ReactComponent as EyeIconNewSlashed } from "../../assets/eyeIconNewSlashed.svg";
import { resizeImage } from "../../../../utils/resizeImage";
import styles from "./ChangeImage.module.css";
import { round } from "@tensorflow/tfjs";
const ChangeImage = ({ rounded = false }) => {
  const [imageAsset, setImageAsset] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const resizedImage = await resizeImage(file);
      const imageUrl = URL.createObjectURL(resizedImage); // Convertimos la imagen redimensionada en una URL
      const fileNew = URL.createObjectURL(file); // Convertimos la imagen redimensionada en una URL

      //   setImageAsset(imageUrl);
      setImageAsset(imageUrl);
      console.log("Imagen redimensionada:", resizedImage);

      // Puedes subirla al servidor o mostrarla en la app
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    }
  };

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className={styles.ChangeImageContainer}>
      <div className={`${styles.imageContainer} ${rounded && styles.rounded}`}>
        <img src={imageAsset || emptyImage} alt="" />
        <div className={styles.optionsImage}>
          <CamIconBW onClick={handleIconClick} />
          {showImage ? (
            <Eye onClick={() => setShowImage(false)} />
          ) : (
            <EyeIconNewSlashed onClick={() => setShowImage(true)} />
          )}
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
      />
    </div>
  );
};

export default ChangeImage;
