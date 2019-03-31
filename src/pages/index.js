import React, { Component } from "react"

import Input from "../components/input"
import Team from "../components/team"

import styles from "./index.module.css"

class Index extends Component {
  state = {
    name: "",
    team1: [],
    team2: [],
    error: 0,
    msg: "",
    teamsURI: "",
  }

  handleInputChange = e => {
    const name = e.target.value
    this.setState({ name })
  }

  addPlayer = e => {
    e.preventDefault()
    const { team1, team2, name } = this.state
    let msg = "Estás no bom caminho!! Mas ainda falta."
    let error = 1
    if (name) {
      if (team1.length < 7) {
        const player = { name, id: Date.now() }
        const newTeam = team1.concat([player])
        if (newTeam.length === 7 && team2.length === 7) {
          error = 2
          msg = "Conseguiste!! O Tiago vai ficar orgulhoso"
        }
        this.setState({ team1: newTeam, name: "", error, msg })
        this.creatURI()
      } else if (team2.length < 7) {
        const player = { name, id: Date.now() }
        const newTeam = team2.concat([player])
        if (newTeam.length === 7 && team1.length === 7) {
          error = 2
          msg = "Conseguiste!! O Tiago vai ficar orgulhoso"
        }
        this.setState({ team2: newTeam, name: "", error, msg })
        this.creatURI()
      } else {
        this.setState({
          error: 2,
          msg: "Conseguiste!! O Tiago vai ficar orgulhoso",
        })
        this.creatURI()
      }
    }
  }

  handleDelete = id => {
    const { team1, team2 } = this.state
    let player = team1.find(player => player.id === id)
    let msg = "Estás no bom caminho!! Mas ainda falta."
    let error = 0
    if (player) {
      const team = team1.filter(player => player.id !== id)
      if (team.length > 0) error = 1
      this.setState({ team1: team, error, msg })
    } else {
      player = team2.find(player => player.id === id)
      if (player) {
        const team = team2.filter(player => player.id !== id)
        if (team.length > 0) error = 1
        this.setState({ team2: team, error, msg })
      } else {
        this.setState({ error })
      }
    }
  }

  handleSwitchPlayer = id => {
    const { team1, team2 } = this.state
    const index = team1.findIndex(player => player.id === id)
    if (index > -1) {
      const p1 = team1[index]
      const p2 = team2[index]
      if (p2) {
        team1[index] = p2
        team2[index] = p1
        this.setState({ team1, team2 })
        this.creatURI()
      }
    } else {
      const index = team2.findIndex(player => player.id === id)
      const p1 = team1[index]
      const p2 = team2[index]
      if (p1) {
        team1[index] = p2
        team2[index] = p1
        this.setState({ team1, team2 })
        this.creatURI()
      }
    }
  }

  creatURI = () => {
    const team1Params = `team1=${encodeURIComponent(
      JSON.stringify(this.state.team1)
    )}`
    const team2Params = `team2=${encodeURIComponent(
      JSON.stringify(this.state.team2)
    )}`

    const paramsURI = `${team1Params}&${team2Params}`

    const {
      location: { href },
    } = this.props

    const teamsURI = `${href}?${paramsURI}`

    this.setState({ teamsURI })
  }

  handleClick = () => {
    this.teamsURI.select()
    document.execCommand("copy")
  }

  componentDidMount = () => {
    const {
      location: { search },
    } = this.props

    if (search) {
      const teams = search.replace("?", "").split("&")
      const t1 = decodeURIComponent(teams[0])
      const t2 = decodeURIComponent(teams[1])

      const team1 = JSON.parse(
        t1.substr(t1.split("=")[0].length + 1, t1.length)
      )

      const team2 = JSON.parse(
        t2.substr(t2.split("=")[0].length + 1, t2.length)
      )

      if (team1.length === 7 && team2.length === 7) {
        const error = 2
        const msg = "Conseguiste!! O Tiago vai ficar orgulhoso"
        this.setState({ team1, team2, error, msg })
      } else {
        this.setState({ team1, team2 })
      }
    }
  }

  render() {
    const { team1, team2, name, error, msg, teamsURI } = this.state

    return (
      <>
        <h2 className={styles.title}>O Tiago manda fazer as equipas!</h2>
        <Input
          name={name}
          handleChange={this.handleInputChange}
          handleSubmit={this.addPlayer}
        >
          Adicionar
        </Input>
        <div className={styles.container}>
          <Team
            number={1}
            players={team1}
            deletePlayer={this.handleDelete}
            switchPlayer={this.handleSwitchPlayer}
          />
          <Team
            number={2}
            players={team2}
            deletePlayer={this.handleDelete}
            switchPlayer={this.handleSwitchPlayer}
          />
        </div>
        {error > 0 &&
          (error > 1 ? (
            <div className={styles.msgOk}>
              {msg}
              <span role="img" aria-label="blink with thung emoji">
                😜
              </span>
              <div className={styles.teamsURI}>
                <input
                  readOnly
                  value={teamsURI}
                  ref={_teamsURI => (this.teamsURI = _teamsURI)}
                />
                <button onClick={this.handleClick}>Copiar</button>
              </div>
            </div>
          ) : (
            <div className={styles.msgError}>
              {msg}
              <span role="img" aria-label="blink with thung emoji">
                😜
              </span>
            </div>
          ))}
      </>
    )
  }
}

export default Index
