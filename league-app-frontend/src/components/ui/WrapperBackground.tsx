import React from 'react'
import styles from './WrapperBackground.module.scss'

interface CardProps {
    children:  React.ReactNode;
}

function WrapperBackground({children}:CardProps) {
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            {children}
        </div>
    </div>
  )
}

export default WrapperBackground