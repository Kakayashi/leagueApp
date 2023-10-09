import React, { useState, useEffect } from 'react'
import styles from './bannerSmall.module.scss'
import TextInput from './TextInput';
import SelectInput from './SelectInput';

type BannerSmallProps = {
  text:string;
}

function BannerSmall(props:BannerSmallProps) {

  return (
    <div className={styles.bannerBackground}>
      <div className={styles.bannerBlur}>
        <h1>{props.text}</h1>
      </div>
    </div>
  )
}

export default BannerSmall