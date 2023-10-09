import React from 'react'
import styles from './button.module.scss'

type ButtonProps = {
    text:string;
    type?:string;
    disabled?: boolean;
    action?: () => void;
}

function Button(props:ButtonProps) {
  return (
    <button 
    onClick={props.action}
    className={
      props.type === "findSummoner" ? `${styles.button__findSummoner} ${styles.button}` 
      : styles.button
    }>
      {props.text}
    </button>
  )
}

export default Button