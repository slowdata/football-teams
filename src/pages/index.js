import React, { Component } from "react"

import Input from "../components/input"
import Team from "../components/team"

import styles from "./index.module.css"

class Index extends Component {
  state = {
    name: "",
    team1: [],
    team2: [],
    error: false,
  }

  handleInputChange = e => {
    const name = e.target.value
    this.setState({ name })
  }

  addPlayer = e => {
    console.log(e)
    e.preventDefault()
    const { team1, team2, name } = this.state
    if (team1.length <= 7) {
      const newTeam = team1.concat([...name])
      this.setState({ team1: newTeam, name: "" })
    } else if (team2 <= 7) {
      const newTeam = team2.concat([...name])
      this.setState({ team2: newTeam, name: "" })
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    const { team1, team2, name } = this.state
    return (
      <>
        <h2 className={styles.title}>Por favor faça as suas equipas</h2>
        <Input
          name={name}
          handleChange={this.handleInputChange}
          handleSubmit={this.addPlayer}
        />
        <div className={styles.container}>
          <Team number={1} players={team1} />
          <Team number={2} players={team2} />
        </div>
      </>
    )
  }
}

export default Index

// const players = ["joao", "ricardo", "pedro", "hugo"]
