import React from 'react'
import styles from './leagueNavbar.module.scss'
import NavLink from './ui/NavLink'

function LeagueNavbar() {
  return (
        <div className={styles.navbar}>
            <div className={styles.navbar_list}>
                <h1>TftApp</h1>
                <NavLink text={"Home"} path={"/"} />
                <NavLink text={"Champions"} path={"/lol/champions"} />
                <NavLink text={"User"} path={"/lol/summoner"} />
            </div>
            <div>
                <NavLink text={"Return"} path={"/"} />
            </div>
        </div>
  )
}

export default LeagueNavbar