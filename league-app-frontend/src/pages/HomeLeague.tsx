import React from 'react'
import styles from './homeLeague.module.scss' 
import LeagueNavbar from '../components/LeagueNavbar'
import Banner from '../components/BannerSummoner'

function HomeLeague() {
  return (
    <>
        <LeagueNavbar/>
        <Banner/>
        <div className={styles.background}></div>
    </>
    
  )
}

export default HomeLeague