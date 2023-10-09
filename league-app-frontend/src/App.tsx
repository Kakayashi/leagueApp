import React from 'react';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import HomeLeague from './pages/HomeLeague';
import HomeTft from './pages/HomeTft';
import {Route, Routes} from 'react-router-dom'
import SummonerLeague from './pages/SummonerLeague'
import ChampionsLeague from './pages/ChampionsLeague';
import ChampionLeague from './pages/ChampionLeague';
import LeagueGame from './pages/LeagueGame';


function App() {


  return (
    <div className='.app' >
    <Routes>
      <Route path='/' element={<HomeScreen/>} />
      <Route path='/lol/' element={<HomeLeague/>} />
      <Route path='/lol/summoner' element={<HomeLeague/>} />
      <Route path='/lol/champions' element={<ChampionsLeague/>} />
      <Route path='/lol/championss/:championName' element={<ChampionLeague/>} />
      <Route path='/lol/summoner/:summonerName/:region' element={<SummonerLeague/>} />
      <Route path='/lol/game/:gameId/:region' element={<LeagueGame/>} />
      <Route path='/tft' element={<HomeTft/>} />
    </Routes>
    </div>
  );
}

export default App;
