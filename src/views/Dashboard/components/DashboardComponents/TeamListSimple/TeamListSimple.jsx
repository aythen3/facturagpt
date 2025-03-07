// TeamListSimple.js
import React, { useState } from "react";
import styles from "./TeamListSimple.module.css";
import EmptyImage from "../../../assets/ImageEmpty.svg";

const TeamListSimple = ({ teams, type }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className={styles.teamsContainer}>
      {teams.map((team) => (
        <div
          key={team.id}
          onClick={() => handleSelectTeam(team)}
          className={styles.team}
        >
          <div className={styles.imgContainer}>
            <img src={EmptyImage} alt="" />
          </div>
          <div className={styles.contentTeam}>
            <div className={styles.headerTeam}>
              <div className={styles.headerTeamLeft}>
                <p>{team.name}</p>
              </div>
              <div className={styles.headerTeamRight}>
                <p>
                  {type == "contact"
                    ? `${team.firtsPrice}€ - ${team.secondPrice}€ (${team.percent}%)`
                    : `PVP medio ${team.pvp}€`}
                </p>
              </div>
            </div>
            <div className={styles.teamDesc}>
              <p>
                <span># Transacciones </span>
                {team.transactions}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamListSimple;
