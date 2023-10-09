import React, {useEffect, useState} from 'react'
import { useQuery } from "react-query";
import { fetchChampions } from '../fetchers/lol_champions';
import styles from './ChampionsList.module.scss'
import ChampionElement from './ui/ChampionElement';
import { Link } from "react-router-dom";

interface Champion {
    id: string;
    key: string;
    name: string;
    image:{
      full:string;
    }
}

interface ChampionsListProps{
  championName: string;
  championRole: string;
}

function ChampionsList({championName, championRole}:ChampionsListProps) {
    const [champions, setChampions] = useState<Champion[]>([]);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);


    const {isLoading, data} = useQuery(
        ["lol_champions"],
        fetchChampions,
    );

    let filteredChampions: Array<Champion> = [];

    useEffect(() => {
      setIsFiltered(false);
      if (!isLoading && data && data.data) {  
        const championsData = data.data;  
        
        Object.keys(championsData).forEach(championKey => {
          const champion = championsData[championKey];
          const championId = champion.id.toLowerCase();
    
          if ((championName === "" || champion.id.includes(championName)) &&
              (championRole === "Any" || champion.tags.includes(championRole))) {
                filteredChampions.push(champion);
          }
        });
      }
      setChampions(filteredChampions);
      setIsFiltered(true);
    }, [championName, championRole, isLoading, data]);

  if(isLoading === true){
    return (
      <div className={styles.wrapper}>
        <h1>Loading...</h1>
      </div>
      )
  }

  if(champions.length === 0){
    return (
    <div className={styles.wrapper}>
      <h1>0 champions with this filters</h1>
    </div>
    )

}

  return (
    <div className={styles.wrapper}>
        {isFiltered && !isLoading && champions.map((champion, index) =>{
          return(<Link key={champion.id+"List"+index+Math.random()} to={`/lol/championss/${champion.id}`}><ChampionElement name={champion.id} url={champion.image.full} /></Link>)
        } )}
    </div>
  )
}

export default ChampionsList