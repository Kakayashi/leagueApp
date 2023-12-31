import React from 'react';
import styles from './card.module.scss';

interface CardProps {
    children:  React.ReactNode;
}

function Card({children}:CardProps) {
  return (
    <div className={styles.card} >{children}</div>
  )
}

export default Card