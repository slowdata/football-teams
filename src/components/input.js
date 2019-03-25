import React from "react"

import styles from "./input.module.css"

const Input = ({ name, handleChange, handleSubmit }) => (
  <form className={styles.playerInput} onSubmit={handleSubmit}>
    <input
      type="text"
      value={name}
      onChange={handleChange}
      placeholder="Adicione um jogador"
    />
    <button type="submit">Adicionar</button>
  </form>
)

export default Input
