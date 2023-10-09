import React, { useState, useEffect } from 'react'
import styles from './bannerSmall.module.scss'
import TextInput from './TextInput';
import SelectInput from './SelectInput';

type BannerSmallProps = {
  text:string;
  setChampionName: (value: string) => void;
  setRole: (value: string) => void;
  championName: string;
}

const roles = [
  "Any","Fighter","Tank","Mage","Assassin","Support","Marksman"
]

function BannerList(props:BannerSmallProps) {

  return (
    <div className={styles.bannerBackground}>
      <div className={styles.bannerBlur}>
        <h1>{props.text}</h1>
        <div className={styles.baner} >
          <div className={styles.banerBorder} ></div>
            <span>Champion Name:</span>
            <TextInput val={props.championName} setVal={props.setChampionName} placeholder='Champion name...' isSmall/>
            <span>Role:</span>
            <SelectInput isSmall isRole data={roles} setVal={props.setRole} />
        </div>
      </div>
    </div>
  )
}

export default BannerList