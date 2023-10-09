import React from 'react'
import { Spell } from '../../pages/ChampionLeague'
import styles from './skinsCarousel.module.scss'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

export interface Skin{
  num: number,
  name:string,
}

interface SkinCarouselProps {
  skins: null|Array<Skin>;
  championId:string;
}

function SkinsCarousel({skins,championId}:SkinCarouselProps) {
  console.log('skins', skins)



  return (
    <div className={styles.carouselWrapper}>
      <h2>Skins: {skins?.length}</h2>
      <Splide
        options={ {
          type:'slide',
          perPage: 3,
          perMove: 2,
          pagination: true,
          autoplay: true,
          focus: 'center',
          breakpoints: {
            1200: {
              perPage: 1,
              perMove: 1,
            }
          }

        } }>
      {skins !==null && skins.map((skin, index)=>
        <SplideSlide key={skin.num+index}>
          <div className={styles.carouselItemWrapper}>
            <img className={styles.carouselItem} src={`https://opgg-static.akamaized.net/meta/images/lol/champion/centered/${championId}_${skin.num}.jpg`} />
            <span>{skin.name}</span>
          </div>
        </SplideSlide>
      )}
      </Splide>
    </div>
  )
}

export default SkinsCarousel