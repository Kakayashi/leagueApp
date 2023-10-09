import React from 'react'
import { fetchLastVersion } from '../../fetchers/lol_champions'
import { useQuery } from "react-query";
import styles from './spellIcon.module.scss'
import { Spell } from '../../pages/ChampionLeague';


interface SpellIconProps {
    spell:Spell;
    action: (spell:Spell)=>void;
    isSelected:boolean;
    spellKey:string;
}

function SpellIcon(props:SpellIconProps) {
  let newSpell = props.spell
  newSpell.videoKey = props.spellKey;


    const {isLoading, data} = useQuery(
        ["lol_champions"],
        fetchLastVersion,
      );
    const url = `http://ddragon.leagueoflegends.com/cdn/${data}/img/spell/${props.spell.image.full}`;
  return (
    <>
         {!isLoading && 
          <div  onClick={()=>props.action(newSpell)} className={props.isSelected ? `${styles.spellIcon} ${styles.spellIcon__selected}` : styles.spellIcon}>
            <img src={url} alt='xd'/>
            <span>{props.spell.name}</span>
          </div>}
  
    </>
  )
}

export default SpellIcon