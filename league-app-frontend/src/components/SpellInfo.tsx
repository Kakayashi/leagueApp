import React, {useState, useEffect} from 'react'
import { Spell } from '../pages/ChampionLeague';
import ReactPlayer from 'react-player/lazy'
import { formatString } from '../utils/helpers';
import styles from './spellInfo.module.scss';
import { getWindowSize } from '../utils/helpers';


interface SpellInfoProps{
    selectedSpell: Spell|null;
    championKey:string;
}



function SpellInfo({selectedSpell,championKey}:SpellInfoProps) {
    console.log('selectedSpell', selectedSpell)
    const formatedKey = formatString(championKey,4);
    const url=`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formatedKey}/ability_${formatedKey}_${selectedSpell?.videoKey}.webm`;

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

  return (
    <>
        {selectedSpell !== null &&
            <div className={styles.spellInfoWrapper}>
                <div className={styles.spellInfoDesc}>
                    <h2>Description:</h2>
                    <p> {selectedSpell.description} </p>
                </div>
                <ReactPlayer width={ windowSize.innerWidth>640 ? '540px' : '360px' } controls={true} loop={true} playing={true} url={url} />

            </div>
        }
    </>
  )
}

export default SpellInfo