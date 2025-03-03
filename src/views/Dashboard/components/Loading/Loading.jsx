
import { useEffect } from "react";

import styles from "./Loading.module.css";

import IconLogo from "../../assets/FacturaLogoGreen.svg";

const Loading = () => {
    return (
        <div className={styles.loading}>
            <img src={IconLogo} alt="Logo" />
        </div>
    )
}

export default Loading;