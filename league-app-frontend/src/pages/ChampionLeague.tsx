import React, {useState} from 'react'
import LeagueNavbar from '../components/LeagueNavbar'
import BannerSmall from '../components/ui/Banner'
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import { fetchChampion } from '../fetchers/lol_champions';
import ChampionInfo from '../components/ChampionInfo';
import WrapperBackground from '../components/ui/WrapperBackground';
import SpellIcon from '../components/ui/SpellIcon';
import styles from './championLeague.module.scss'
import SpellInfo from '../components/SpellInfo';
import SkinsCarousel from '../components/ui/SkinsCarousel';
import ChampionStats from '../components/ChampionStats';

export interface Spell{
  description:string,
  name:string,
  videoKey:string,
  image:{
      full:string,
  }
  skins:[
    {
      num: number,
      name:string,
    }
  ]
}

const spellName = ["Q1","W1","E1","R1"];

function ChampionLeague() {
  const [sellectedSpell, setSellectedSpell] = useState<Spell|null>(null);
  let { championName } = useParams<string>();
  
  const handleSetSellectedSpell = (spell:Spell) =>{
    console.log('spell', spell)
    setSellectedSpell(spell === sellectedSpell ? null : spell)
  }
  
  const {isLoading, data} = useQuery(
    ["lol_champions",championName],
    () => fetchChampion(championName ? championName : "Teemo"),
  );

  console.log('data', data)
  
  return (
    <>
        <LeagueNavbar/>
        <BannerSmall text='Champion' />
        <WrapperBackground> 
          {isLoading ? <h1>Loading...</h1> : <ChampionInfo champion={data} />}  
          <div className={styles.iconWrapper}>
            {isLoading ? <h1>Loading...</h1> : data.spells.map((spell:Spell,index:number)=><SpellIcon spellKey={spellName[index]} isSelected={sellectedSpell===spell} action={handleSetSellectedSpell} key={spell.name} spell={spell} />)}
          </div>
          <div className={styles.spellInfoWrapper} >
            {!isLoading && <SpellInfo selectedSpell={sellectedSpell} championKey={data.key} />}
          </div>
          <div>
            {!isLoading && <SkinsCarousel skins={data.skins} championId={data.id}/> }
          </div>
          <div>
            {!isLoading && <ChampionStats stats={data.stats} /> }
          </div>
        </WrapperBackground>
    </>
  )
}

export default ChampionLeague