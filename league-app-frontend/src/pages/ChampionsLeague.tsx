import React, {useEffect, useState} from 'react'
import LeagueNavbar from '../components/LeagueNavbar'
import BannerSmall from '../components/ui/BannerList'
import WrapperBackground from '../components/ui/WrapperBackground'
import ChampionsList from '../components/ChampionsList'
import { useQuery } from "react-query";
import { fetchChampions } from '../fetchers/lol_champions'

function ChampionsLeague() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Any');

  const handleSetName = (championName:string) =>{
    setName(championName);
  }

  const handleSetRole = (role:string) =>{
    setRole(role);
  }

  return (
    <>
      <LeagueNavbar/>
      <BannerSmall text='CHAMPIONS' setChampionName={handleSetName} championName={name} setRole={handleSetRole} />
      <WrapperBackground>
        <ChampionsList championName={name} championRole={role} />
      </WrapperBackground>
    </>
  )
}

export default ChampionsLeague