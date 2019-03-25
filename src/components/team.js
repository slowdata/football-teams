import React from "react"

import styles from "./team.module.css"

const Team = ({ number, players }) => (
  <div className={styles.card}>
    <header>{`team ${number}`}</header>
    <ul>
      {players.length > 0 &&
        players.map(player => {
          return number === 1 ? (
            <li key={`${Date.now()}${player}`}>
              {player}
              <button>-></button>
            </li>
          ) : (
            <li key={`${Date.now()}${player}`}>
              <button>{"<-"}</button>
              {player}
            </li>
          )
        })}
    </ul>
  </div>
)

export default Team
