import React, {useEffect, useState} from 'react'
import LeagueNavbar from '../components/LeagueNavbar'
import Banner from '../components/BannerSummoner'
import { useParams } from 'react-router-dom';
import { fetchSummoner } from '../fetchers/summoner';
import { useQuery } from "react-query";
import styles from './summonerLeague.module.scss'
import WrapperBackground from '../components/ui/WrapperBackground'
import SummonerInfo from '../components/SummonerInfo';



function SummonerLeague() {
  let { summonerName, region } = useParams();

  
  const {isLoading, data, isError, refetch} = useQuery(
    ["summoner1"],
    ()=>fetchSummoner(summonerName,region),
    { refetchOnWindowFocus: false},
  );
  


  useEffect(()=>{
    refetch();
  },[summonerName,region])

  console.log('dataasd', data)

  return (
    <>
        <LeagueNavbar/>
        <Banner/>
        <WrapperBackground>
          {isLoading ? <div className={styles.summonerWrapper}><h1>Loading...</h1></div> :
            isError ? <div className={styles.summonerWrapper}><h1>Wrong summoner name or server!</h1></div> :
            <>
            <div className={styles.summonerWrapper}>
              <div className={styles.summonerInfo}>
                <img alt='Summoner icon' src={`http://ddragon.leagueoflegends.com/cdn/13.18.1/img/profileicon/${data.resPUUID.profileIconId}.png`} />
                <div className={styles.summonerInfo__name}>
                  <h2>{data.resPUUID.name}</h2>
                  <span>lvl: {data.resPUUID.summonerLevel}</span>
                </div>
              </div>
               {isLoading ? <div>Loading...</div> : data.responseDivision.map((division:any)=>
                <div key={"div" + division.rank} className={styles.division}>
                  <img alt='division' src={`https://opgg-static.akamaized.net/images/medals_new/${division.tier}.png?image=q_auto,f_webp,w_144&v=1695767548184`} />
                  <div className={styles.division_stats}>
                    <span>{`${division.tier} ${division.rank}`}</span>
                    <p>{division.queueType === "RANKED_SOLO_5x5" ? "Ranked Solo/duo": "Ranked Flex"}</p>
                    <p><span className={styles.division_statsWin}>W: <b>{division.wins}</b></span> <span className={styles.division_statsLose}>L: <b>{division.losses}</b></span></p>
                  </div>
                </div>
              )}
            </div>
            <SummonerInfo/>

          </>
          }
          </WrapperBackground>
        

    </>
    
  )
}

export default SummonerLeague