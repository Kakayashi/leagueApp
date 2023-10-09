import React,{useState, useEffect} from 'react'
import styles from './summonerMasteries.module.scss'
import { useParams } from 'react-router-dom';
import { fetchMaestry } from '../fetchers/summoner'
import { useQuery } from "react-query";
import { addSpacesEveryNChars } from '../utils/helpers';
import Button from './ui/Button';

interface MasteryObject{
  championId: number,
  championLevel: number,
  championPoints: number,
  lastPlayTime: number,
}

function SummonerMasteries() {
  let { summonerName, region } = useParams();
  const [limit, setLimit] = useState(10);

  const {isLoading, data, refetch, isFetching} = useQuery(
    ["summoner2"],
    ()=>fetchMaestry(summonerName,region,limit),
    {refetchOnWindowFocus: false},
    );

  useEffect(() => {
    refetch();
  }, [limit,summonerName]);

  const handleLoadMoreMasteries = () => {
    console.log('limit', limit);
    setLimit(limit + 5);
  };

  return (
    <div className={styles.summonerMasteriesWrapper}>
      <div className={styles.masteriesItems}>
        <h3>Maestries</h3>
      {!isLoading && data.map((el:MasteryObject) =>{
        const lastPlayed = new Date(el.lastPlayTime);
        
        return(
          (
            <div key={`maestries${el.championId}`} className={styles.summonerItem}>
              <img alt='Champion icon' src={`https://lolcdn.darkintaqt.com/cdn/champion/${el.championId}/tile`} />
              <div className={styles.maestryInfo}>
                <span>Lvl: <b>{el.championLevel}</b></span>
                <span>Points: <b>{addSpacesEveryNChars(el.championPoints,3)}</b></span>
                <span>Last played: <b>{`${lastPlayed.getDate()}.${lastPlayed.getMonth()}.${lastPlayed.getFullYear()}`}</b></span>
              </div>
            </div>
          )
        )
      })}
      <Button disabled={isFetching} text={isFetching ? `Loading` : `Load more`} action={handleLoadMoreMasteries}/>
      </div>
    </div>
  )
}

export default SummonerMasteries