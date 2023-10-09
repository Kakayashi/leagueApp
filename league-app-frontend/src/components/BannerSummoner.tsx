import React, {useState} from 'react'
import styles from './banner.module.scss';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import SelectInput from './ui/SelectInput';
import { summonerByNameExample } from '../fetchers/twisted';
import { useNavigate, useParams  } from "react-router-dom";

function Banner() {
  let { summonerName, selectedRegion } = useParams();
  const [summonersName, setSummonersName] = useState(summonerName ? summonerName : '');
  const [region, setRegion] = useState(selectedRegion ? selectedRegion : 'eun1');

  const navigate = useNavigate();



  const handleInputChange = (value: string) => {
    console.log('valueText', value)
    setSummonersName(value);
  };

  const handleRegionChange = (value: string) => {
    console.log('valueSelect', value)
    setRegion(value);
  };

  const handleRedirectToSummonerPage = () =>{
    summonersName !== "" && navigate(`/lol/summoner/${summonersName}/${region}`)
  }

  const regions = [
    {name:"EUNE", code:"eun1"},
    {name:"EUW", code:"euw1"},
    {name:"NA", code:"na1"},
    {name:"KR", code:"kr"},
  ]


  return (
    <div className={styles.bannerBackground} >
      <div className={styles.bannerBlur}>
        <div className={styles.baner}>
          <div className={styles.bannerTitleWrapper}>
          <div className={styles.banerBorder} ></div>
            <div className={styles.bannerTitle}>FIND SUMMONER</div>
            <div className={styles.bannerTitleBorder}></div>
            <div className={styles.bannerInputWrapper}>
              <TextInput val={summonersName} setVal={handleInputChange} />
              <SelectInput data={regions} setVal={handleRegionChange}/>
              <Button action={handleRedirectToSummonerPage} type='findSummoner' text='Find'/>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Banner