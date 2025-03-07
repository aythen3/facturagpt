// Timer.js
import React, { useState, useEffect } from "react";
import { ReactComponent as PlayIcon } from "../../../assets/PlayIcon.svg";
import { ReactComponent as PauseIcon } from "../../../assets/PauseIcon.svg";
import { ReactComponent as StopIcon } from "../../../assets/StopIcon.svg";
import styles from "./Timer.module.css";

const Timer = ({ onPlay, onPause, onStop, time }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(time);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handlePlay = () => {
    setIsRunning(true);
    onPlay();
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause();
  };

  const handleStop = () => {
    setIsRunning(false);
    onStop();
    setElapsedTime(0);
  };

  return (
    <div className={styles.btnTimerContainer}>
      <button
        className={`${styles.btnTimer} ${styles.btnPlay}`}
        onClick={handlePlay}
      >
        <PlayIcon />
      </button>
      <button
        className={`${styles.btnTimer} ${styles.btnPause}`}
        onClick={handlePause}
      >
        <PauseIcon />
      </button>
      <button
        className={`${styles.btnTimer} ${styles.btnStop}`}
        onClick={handleStop}
      >
        <StopIcon />
      </button>
      <p>{formatTime(elapsedTime)}</p>
    </div>
  );
};

export default Timer;
