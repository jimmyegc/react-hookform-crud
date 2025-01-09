import React from 'react'
import styles from "./styles.module.scss";
export const Button = () => {
  return (
    <div>
      <h2>Button</h2>
      <button className={styles.buttonPrimary}>Click me</button>
      <button className={`btn btn-primary btn-outline ${styles.buttonPrimary}`}>Click me</button>
      <button className={`${styles.btnIco}`}>Click me</button>
      <button className={`${styles.btnCircle}`}>Click me</button>
    </div>
  )
}
