const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const APY_KEY = 'RGAPI-0f8497f3-fcd1-488a-92b4-367cb9124187';
const config = {
  headers: {
    'X-Riot-Token': APY_KEY // Dodanie klucza API jako nagłówka
  }
};


function getPlayerPUUID(playerName,region){
    return axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}`, config)
        .then(response=>{
            return response.data
        }).catch(err=>err);
}

function getRegion(region){
  switch(region){
    case "eun1":
    case "euw1":
      return "europe"
    case "america":
      return "america"
    case "kr":
    case "jp1":
        return "asia"
    case "sea":
        return "sea"
      
    default:
        console.log('badregion');
  }
}

app.get('/getSummoner/:playerName/:region', async(req, res) =>{
    const playerName = req.params.playerName;
    const region = req.params.region;

    try {
      const responsePUUID = await getPlayerPUUID(playerName, region);
      const responseDivision = await axios.get(`https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${responsePUUID.id}`,config)
        .then(response => response.data)
        .catch(err=>err)

      const finalResult = {
        resPUUID: responsePUUID,
        responseDivision: responseDivision,
      }

      res.json(finalResult);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
})

app.get('/getSummonerMastery/:playerName/:region/:count', async(req, res) =>{
    const playerName = req.params.playerName;
    const region = req.params.region;
    const count = req.params.count;
    

    try {
      const responsePUUID = await getPlayerPUUID(playerName, region).then(response =>{
        const puuid = response.puuid; 
        const config = {
            headers: {
              'X-Riot-Token': APY_KEY // Dodanie klucza API jako nagłówka
            }
          };
        

        axios.get(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=${count}`,config)
            .then(response2=>{
                res.json(response2.data);
            });

      }); 


        
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
})

app.get('/getHistory/:playerName/:region/:count', async(req, res) =>{
  const playerName = req.params.playerName;
  const region = req.params.region;
  const count = req.params.count;
  console.log('playerName', playerName)

  try {
    const responsePUUID = await getPlayerPUUID(playerName, region);
    const PUUID = responsePUUID.puuid;
    
    const matchesIDs = await axios.get(`https://${getRegion(region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?start=0&count=${count}`,config)
      .then(response => response.data)
      .catch(err=>err)
    
    let matchHistory =[];
    for(let i=0; i<matchesIDs.length; i++){
      const matchID= matchesIDs[i];
      const gameData = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}`,config)
        .then(response => response.data)
        .catch(err=>err)
      matchHistory.push(gameData);
    }

    res.json(matchHistory)
 
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
})


app.get('/getGame/:gameId/:region', async(req, res) =>{
  const gameId = req.params.gameId;
  const region = req.params.region;
  console.log('Load game', gameId)
  console.log('gameId', gameId)
  console.log('region', region)
  console.log('region', getRegion(region))

  try {    
    const gameResponse = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${gameId}`,config);
    
    console.log('first', gameResponse);
    res.json(gameResponse.data);

 
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
})



app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
