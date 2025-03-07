import React, { useState, useEffect } from "react";
import styles from "./TeamSheet.module.css";
import { ReactComponent as PlayIcon } from "../../../assets/PlayIcon.svg";
import { ReactComponent as PauseIcon } from "../../../assets/PauseIcon.svg";
import { ReactComponent as StopIcon } from "../../../assets/StopIcon.svg";
import EmptyImage from "../../../assets/ImageEmpty.svg";
import Button from "../../Button/Button";
import TeamList from "../TeamList/TeamList";
import Timer from "../Timer/Timer";

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
      <div className={styles.btnOptionsContainer}>
        <Button headerStyle={{ borderRadius: "99px" }} action={handleInvite}>
          Invitar
        </Button>
      </div>
      <TeamList teams={teams} onSelectTeam={handleSelectTeam} />
      {selectedTeam && (
        <Timer
          onPlay={handlePlay}
          onPause={handlePause}
          onStop={handleStop}
          time={selectedTeam.time}
        />
      )}
    </div>
  );
};

export default TeamSheet;
