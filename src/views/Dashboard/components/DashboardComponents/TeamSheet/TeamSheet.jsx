import React, { useState, useEffect } from "react";
import styles from "./TeamSheet.module.css";
import { ReactComponent as PlayIcon } from "../../../assets/PlayIcon.svg";
import { ReactComponent as PauseIcon } from "../../../assets/PauseIcon.svg";
import { ReactComponent as StopIcon } from "../../../assets/StopIcon.svg";
import EmptyImage from "../../../assets/ImageEmpty.svg";
import Button from "../../Button/Button";

const TeamSheet = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setElapsedTime(team.time);
  };

  const updateTeamStatus = (status) => {
    if (selectedTeam) {
      setTeams((prevTeams) =>
        prevTeams.map((t) =>
          t.id === selectedTeam.id ? { ...t, time: elapsedTime, status } : t
        )
      );
    }
  };

  const handlePlay = () => {
    setIsRunning(true);
    updateTeamStatus("play");
  };
  const handlePause = () => {
    setIsRunning(false);
    updateTeamStatus("pause");
  };
  const handleStop = () => {
    setIsRunning(false);
    updateTeamStatus("stop");
    setSelectedTeam(null);
    setElapsedTime(0);
  };

  const handleInvite = () => {
    const newTeam = {
      id: Date.now(),
      name: `Nombre Contacto`,
      time: 0,
      transactions: 0,
      recognitions: 0,
      hourWorkeds: 0,
      total1: "0,00",
      total2: "0,00",
      percent: "0",
      status: "stop",
    };
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  return (
    <div>
      <div className={styles.btnTimerContainer}>
        <button
          disabled={!selectedTeam}
          className={`${styles.btnTimer} ${styles.btnPlay}`}
          onClick={handlePlay}
        >
          <PlayIcon />
        </button>
        <button
          disabled={!selectedTeam}
          className={`${styles.btnTimer} ${styles.btnPause}`}
          onClick={handlePause}
        >
          <PauseIcon />
        </button>
        <button
          disabled={!selectedTeam}
          className={`${styles.btnTimer} ${styles.btnStop}`}
          onClick={handleStop}
        >
          <StopIcon />
        </button>
        <p>{formatTime(elapsedTime)}</p>
      </div>
      <div className={styles.btnOptionsContainer}>
        <Button headerStyle={{ background: "transparent", color: "black" }}>
          Equipo
        </Button>
        <Button headerStyle={{ borderRadius: "99px" }} action={handleInvite}>
          Invitar
        </Button>
      </div>
      <div className={styles.teamsContainer}>
        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => handleSelectTeam(team)}
            className={styles.team}
          >
            <div className={styles.imgContainer}>
              <img src={EmptyImage} alt="" />
              <div
                className={styles.statusIndicator}
                style={{
                  backgroundColor:
                    team.status === "play"
                      ? "#10A37F"
                      : team.status === "stop"
                        ? "#ff0000"
                        : "#072146",
                }}
              ></div>
            </div>
            <div className={styles.contentTeam}>
              <div className={styles.headerTeam}>
                <div className={styles.headerTeamLeft}>
                  <p>{team.name}</p>
                  <div
                    className={styles.statusIndicator}
                    style={{
                      backgroundColor:
                        team.status === "play"
                          ? "#10A37F"
                          : team.status === "stop"
                            ? "#ff0000"
                            : "#072146",
                    }}
                  ></div>
                  <p>
                    {team.status === "stop"
                      ? `Activo hace ${Math.floor(team.time / 3600)} hora(s)`
                      : formatTime(team.time)}
                  </p>
                </div>
                <div className={styles.headerTeamRight}>
                  {team.total1}$ - {team.total2} ({team.percent}%)
                </div>
              </div>
              <div className={styles.teamDesc}>
                <p>
                  <span># Transacciones </span>
                  {team.transactions}
                </p>
                <p>
                  <span># Reconocimientos </span>
                  {team.recognitions}
                </p>
                <p>
                  <span># Horas trabajadas </span>
                  {team.hourWorkeds}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSheet;
