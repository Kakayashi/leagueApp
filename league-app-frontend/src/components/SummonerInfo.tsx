import React from 'react'
import styles from './summonerInfo.module.scss'
import SummonerMasteries from './SummonerMasteries'
import SummonerHistory from './SummonerHistory'

function SummonerInfo() {
  return (
    <div className={styles.summonerInfoWrapper} >
      <SummonerMasteries/>
      <SummonerHistory/>
    </div>
  )
}

export default SummonerInfo