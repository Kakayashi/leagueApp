import React from 'react'
import styles from './championElement.module.scss'

interface ChampionElementProps {
  name:  string;
  url:  string;
}

function ChampionElement(props:ChampionElementProps) {
  return (
    <div key={props.name} className={styles.wrapper}>
      <img alt={props.name} src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.name}_0.jpg`}/>
      <span>{props.name}</span>
    </div>
  )
}

export default ChampionElement