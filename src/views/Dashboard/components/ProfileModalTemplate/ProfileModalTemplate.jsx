import React from "react";
import emptyImage from "../../assets/ImageEmpty.svg";
import styles from "./ProfileModalTemplate.module.css";
import { ReactComponent as CameraIcon } from "../../assets/camIconBW.svg";

const ProfileModalTemplate = () => {
  return (
    <div>
      <div className={styles.profileModalTemplate}>
        <img src={emptyImage} alt="" />
        <div className={styles.camContainer}>
          <CameraIcon className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default ProfileModalTemplate;
