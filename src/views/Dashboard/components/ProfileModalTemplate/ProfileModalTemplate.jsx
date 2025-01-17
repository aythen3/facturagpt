import React from "react";
import styles from "./ProfileModalTemplate.module.css";
import { ReactComponent as CameraIcon } from "../../assets/camIconBW.svg";
const ProfileModalTemplate = () => {
  return (
    <div>
      <div className={styles.profileModalTemplate}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmD5LDETnDoug6dzPqtQxYypnsFl3TcA0_aQ&s"
          alt=""
        />
        <div className={styles.camContainer}>
          <CameraIcon className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default ProfileModalTemplate;
