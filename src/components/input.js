import React from "react"

import styles from "./input.module.css"

const Input = ({ name, handleChange, handleSubmit, children }) => (
  <form className={styles.playerInput} onSubmit={handleSubmit}>
    <input
      type="text"
      value={name}
      onChange={handleChange}
      placeholder="Adicione um jogador"
    />
    <button type="submit">{children}</button>
  </form>
)

export default Input
