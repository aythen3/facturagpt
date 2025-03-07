// TeamList.js
import React from "react";
import styles from "./TeamList.module.css";
import EmptyImage from "../../../assets/ImageEmpty.svg";

const TeamList = ({ teams, onSelectTeam }) => {
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
  return (
    <div className={styles.teamsContainer}>
      {teams.map((team) => (
        <div
          key={team.id}
          onClick={() => onSelectTeam(team)}
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
                <div className={styles.headerTeamRight}>
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
                  {team.status === "pause" && <span>Pausado</span>}
                </div>
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
  );
};

export default TeamList;
