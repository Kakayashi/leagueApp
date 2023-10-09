import React from 'react'
import styles from './ChampionInfo.module.scss'

interface Champion {
    id: string;
    key: string;
    name: string;
    blurb:string;
    partype:string;
    title:string;
    lore:string;
    image:{
      full:string;
    }
    tags: string[];
}

interface ChampionInfoProps{
    champion:Champion
}

function ChampionInfo({champion}:ChampionInfoProps) {
  return (
    <>
        <div className={styles.info}>
            <img alt={champion.name} src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}/>
            <div className={styles.info__row}>
                <h1>{champion.name}</h1>
                <p><i>"{champion.title}"</i></p>
                <span><b>Description:</b></span>
                <p>{champion.lore}</p>
                <span><b>Tags:</b></span>
                <ul>
                    {champion.tags.map((tag,index) => <li key={tag+index}>{tag}</li>)}
                </ul>
                <span><b>Resources:</b></span>
                <p>{champion.partype}</p>                
            </div>
        </div>
    </>
  )
}

export default ChampionInfo