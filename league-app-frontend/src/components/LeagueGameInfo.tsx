import React from 'react'
import styles from './leagueGameInfo.module.scss'
import { useQuery } from 'react-query';
import { fetchGame } from '../fetchers/summoner';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import LeagueCharts from './LeagueCharts';

function LeagueGameInfo() {
    const { gameId, region }= useParams();
    const navigate = useNavigate(); 


    const {isLoading, data, refetch, isFetching} = useQuery(
        ["summoner4"],
        ()=>fetchGame(gameId,region),
        {refetchOnWindowFocus: false},
        );
    
    const handleLoadSummoner = (summonerName:string) =>{
        navigate(`/lol/summoner/${summonerName}/${region}`)
    }

    const handleLoadChampion = (champion:string) =>{
        navigate(`/lol/championss/${champion}`)
    }

  return (
    <div className={styles.gameWrapper}>
        {isLoading ? <h2>Loading</h2> : 
        <>
            <h2>Scoreboard</h2>
            <div className={styles.gameTable} >
                { data.info.participants.map((summoner:any, index:number)=>
                <>
                {index === 0 && <div className={styles.teamBlue} >Blue Tean</div>}
                {index === 5 && <div className={styles.teamRed}>Red Team</div>}
                <div key={`gameTable${summoner.championName}`} className={styles.gameTable__item}>
                    {/* summoner champion info */}
                    <img alt='champion' className={styles.championImg} onClick={()=>handleLoadChampion(summoner.championName)} src={`https://lolcdn.darkintaqt.com/cdn/champion/${summoner.championId}/tile`} />
                    <span className={styles.gameTable__level} >{summoner.champLevel}</span>
                    {/* summoner spell */}
                    <div className={styles.gameTable__summonerSpell}>
                        <img alt='item' src={`https://lolcdn.darkintaqt.com/cdn/spells/${summoner.summoner1Id}`} />
                        <img alt='item' src={`https://lolcdn.darkintaqt.com/cdn/spells/${summoner.summoner2Id}`} />
                    </div>
                    {/* summoner name */}
                    <div className={styles.gameTable__summonerName}>
                        <span onClick={()=>handleLoadSummoner(summoner.summonerName)} >{summoner.summonerName.length > 15 ? summoner.summonerName.slice(0, 15) + '...' : summoner.summonerName }</span>
                        <p>lvl: {summoner.summonerLevel}</p>
                    </div>
                    {/* summoner stats */}
                    <div className={styles.gameTable__stats} >
                        <div>{summoner.kills}/<span>{summoner.deaths}</span>/{summoner.assists} </div>
                    {/* summoner items */}
                        <div className={styles.gameTable__shopItems}>
                            <div className={styles.gameTable__shopItem}> { summoner.item0 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${summoner.item0}.png`} />} </div>
                            <div className={styles.gameTable__shopItem}> { summoner.item1 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${summoner.item1}.png`} />} </div>
                            <div className={styles.gameTable__shopItem}> { summoner.item2 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${summoner.item2}.png`} />} </div>
                            <div className={styles.gameTable__shopItem}> { summoner.item3 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${summoner.item3}.png`} />} </div>
                            <div className={styles.gameTable__shopItem}> { summoner.item4 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${summoner.item4}.png`} />} </div>
                            <div className={styles.gameTable__shopItem}> { summoner.item5 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${summoner.item5}.png`} />} </div>
                            <div className={styles.gameTable__shopItem}> { summoner.item6 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${summoner.item6}.png`} />} </div>
                        </div>
                    </div>
                    {/* summoner items */}
                    <div className={styles.gameTable__minions}>
                        cs:<br/> <span>{summoner.totalMinionsKilled}</span>
                    </div>
                </div>
                </>
                )}
            </div>
            <h2>Stats</h2>
            <LeagueCharts data={data}/>
        </>} 
    </div>
  )
}

export default LeagueGameInfo