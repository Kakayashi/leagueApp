import React from 'react'
import LeagueNavbar from '../components/LeagueNavbar';
import WrapperBackground from '../components/ui/WrapperBackground';
import BannerSmall from '../components/ui/Banner';
import LeagueGameInfo from '../components/LeagueGameInfo';


function LeagueGame() {

  return (
    <>
        <LeagueNavbar/>
        <BannerSmall text='Game' />
        <WrapperBackground>
            <LeagueGameInfo/>
        </WrapperBackground>
    </>
  )
}

export default LeagueGame