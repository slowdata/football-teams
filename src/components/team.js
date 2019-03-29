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
                <button onClick={() => deletePlayer(player.id)}>X</button>
                <button onClick={() => switchPlayer(player.id)}>{"->"}</button>
              </div>{" "}
            </li>
          ) : (
            <li key={player.id}>
              <button onClick={() => switchPlayer(player.id)}>{"<-"}</button>
              <button onClick={() => deletePlayer(player.id)}>{"X"}</button>
              {player.name}
            </li>
          )
        })}
    </ul>
  </div>
)

export default Team
