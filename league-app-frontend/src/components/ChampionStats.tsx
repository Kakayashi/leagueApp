import React from 'react'
import styles from './championStats.module.scss'

interface ChampionStatsProps{
    stats:object;
}

function ChampionStats({stats}: ChampionStatsProps) {

    console.log('stats', stats)

  return (
    <div className={styles.statsWrapper}>
        <h2>Stats</h2>
        <div className={styles.statsTable} >
            {
                Object.entries(stats).map(([key, value]) => (
                <div key={key} className={styles.statsTable__row}>
                    <div className={styles.statsTable__rowTitle} >{key}:</div>
                    <div className={styles.statsTable__rowData} > {value}</div>
                </div>
                    
                ))
            }

        </div>
    </div>
  )
}

export default ChampionStats