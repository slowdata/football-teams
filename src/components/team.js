import React from "react"

import styles from "./team.module.css"

const Team = ({ number, players, deletePlayer, switchPlayer }) => (
  <div className={styles.card}>
    <header>{`team ${number}`}</header>
    <ul>
      {players.length > 0 &&
        players.map(player => {
          return number === 1 ? (
            <li key={player.id}>
              {player.name}
              <div className={styles.listButtons}>
                <button
                  className={styles.removeButton}
                  onClick={() => deletePlayer(player.id)}
                >
                  X
                </button>
                <button onClick={() => switchPlayer(player.id)}>{"->"}</button>
              </div>{" "}
            </li>
          ) : (
            <li key={player.id}>
              <div className={styles.listButtons}>
                <button onClick={() => switchPlayer(player.id)}>{"<-"}</button>
                <button
                  className={styles.removeButton}
                  onClick={() => deletePlayer(player.id)}
                >
                  {"X"}
                </button>
              </div>
              {player.name}
            </li>
          )
        })}
    </ul>
  </div>
)

export default Team
