import React, {useState, useEffect} from 'react'
import styles from './summonerHistory.module.scss'
import { useParams } from 'react-router-dom';
import { fetchHistory } from '../fetchers/summoner'
import { useQuery } from "react-query";
import Button from './ui/Button';
import { convertMillisecondsToMinutesSeconds } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';



function SummonerHistory() {
  let { summonerName, region } = useParams();
  const [limit, setLimit] = useState(6);
  const [playerName, setPlayerName] = useState(summonerName);
  const navigate = useNavigate();

  const {isLoading, data, refetch, isFetching} = useQuery(
    ["summoner3"],
    ()=>fetchHistory(playerName,region,limit),
    {refetchOnWindowFocus: false},
    );

    const handleLoadMoreHistory = () => {
      console.log('limit', limit);
      setLimit(limit + 5);
    };

    const handleRedirectToSummonerPage = (navName:string) =>{
      setPlayerName(navName);
      navigate(`/lol/summoner/${navName}/${region}`)
      setTimeout(refetch,100)
    }

    const handleRedirectToGame = (gameId:string) =>{
      navigate(`/lol/game/${gameId}/${region}`)
      setTimeout(refetch,100)
    }

    useEffect(() => {
      setPlayerName(summonerName);
      refetch();
    }, [limit]);

  return (
    <div className={styles.summonerHistoryWrapper} >
      <h3>Match History</h3>
      {isLoading || isFetching ? <h3>Loading</h3> : 
        <div className={styles.historyItems}>
          {
            data.map((match:any)=>{
              const participants = match?.info?.participants;
              let selectedParticipant

              for(const participant of participants){
                console.log('1', participant.summonerName, summonerName)
                if(participant.summonerName === summonerName){
                  selectedParticipant = participant;
                  break;
                }
              }

              console.log('match', match)
              console.log('selectedParticipant', selectedParticipant)
              const gameDate = new Date(match.info.gameCreation);

              return(

                <div className={styles.historyItem} key={`gameHistoryItem${match.info.gameId}`} >
                  <div className={selectedParticipant?.win === true ? `${styles.itemResult} ${styles.itemResult__win}` : `${styles.itemResult} ${styles.itemResult__lose}`} ></div>
                  <img alt='champion' src={`https://lolcdn.darkintaqt.com/cdn/champion/${selectedParticipant?.championId}/tile`} />
                  <div className={styles.itemStats}> 
                    <div className={styles.itemStats__top}>
                      <div className={styles.itemStats__info} >{selectedParticipant?.kills}/<span>{selectedParticipant?.deaths}</span>/{selectedParticipant?.assists} </div>
                      <div className={styles.itemStats__kda}>kda: {selectedParticipant?.challenges.kda.toFixed(2)}</div>
                      {/* summoner spells */}
                      <div className={styles.itemWrapper}>
                          <div className={styles.item}> <img alt='item' src={`https://lolcdn.darkintaqt.com/cdn/spells/${selectedParticipant?.summoner1Id}`} /></div>
                          <div className={styles.item}> <img alt='item' src={`https://lolcdn.darkintaqt.com/cdn/spells/${selectedParticipant?.summoner2Id}`} /></div>
                      </div>
                    </div>
                    {/* items */}
                    <div className={styles.itemWrapper} >
                      <div className={styles.item}> { selectedParticipant?.item0 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${selectedParticipant?.item0}.png`} />}  </div>
                      <div className={styles.item}> { selectedParticipant?.item1 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${selectedParticipant?.item1}.png`} />}  </div>
                      <div className={styles.item}> { selectedParticipant?.item2 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${selectedParticipant?.item2}.png`} />}  </div>
                      <div className={styles.item}> { selectedParticipant?.item3 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${selectedParticipant?.item3}.png`} />}  </div>
                      <div className={styles.item}> { selectedParticipant?.item4 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${selectedParticipant?.item4}.png`} />}  </div>
                      <div className={styles.item}> { selectedParticipant?.item5 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${selectedParticipant?.item5}.png`} />}  </div>
                      <div className={styles.item}> { selectedParticipant?.item6 !== 0 && <img alt='item' src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/item/${selectedParticipant?.item6}.png`} />}  </div>
                    </div>
                  </div>
                  <div className={styles.gameInfo}>
                    <div className={styles.gameInfo__type}><span>type: </span>{match.info.gameMode}</div>
                    <div className={styles.gameInfo__type}><span>duration: </span> {convertMillisecondsToMinutesSeconds(match.info.gameDuration)}</div>
                    <div className={styles.gameInfo__type}><span>date: </span> {`${gameDate.getDate()}.${gameDate.getMonth()}.${gameDate.getFullYear()}`} </div>
                    <div className={styles.gameInfo__type}><b>{match.info.gameVersion}</b></div>
                  </div>

                  <div className={styles.gameSmallTab} >
                    {
                      match.info.participants.map( (player:any)=>{

                        return(
                          <div onClick={()=>handleRedirectToSummonerPage(player.summonerName)} key={`smallTab${player?.championId}`} className={styles.gameSmallTab__item}>
                            <img alt='champion' src={`https://lolcdn.darkintaqt.com/cdn/champion/${player?.championId}/tile`} />
                            <span className={player.summonerName === summonerName ? styles.gameSmallTab__selected : styles.test}>{player.summonerName}</span>
                          </div>
                        )
                      } )
                    }
                  </div>
                  <Button action={()=>handleRedirectToGame(match.metadata.matchId)} text='More'/>

                </div>

              )
            })
          }
          <Button disabled={isFetching} text={isFetching ? `Loading` : `Load more`} action={handleLoadMoreHistory}/>
        </div>
        
      }
    </div>
  )
}

export default SummonerHistory