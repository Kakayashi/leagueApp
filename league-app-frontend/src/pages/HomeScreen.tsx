import React, {useState} from 'react'
import styles from './homeScreen.module.scss'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useNavigate  } from "react-router-dom";


function HomeScreen() {
    const [redirect, setRedirect] = useState("");
    const navigate = useNavigate();


    const delayRedirect = (url:string) => {
        url ==="/lol" ? setRedirect("lol") : setRedirect("tft");        
        setTimeout(()=>{navigate(url)} ,1000);
    }

  return (
    <div className={styles.homeScreenWrapper} >
            <div className={redirect === "tft" ? `${styles.homeScreenWrapperTabSelected} ${styles.tftWrapper} ${styles.homeScreenWrapperTab}` : redirect !=="lol" ? `${styles.tftWrapper} ${styles.homeScreenWrapperTab}` : `${styles.homeScreenWrapperTabNoSelected} ${styles.tftWrapper}`}>
                <Card>
                    <h1>Teamfight Tactics</h1>
                    <ul>
                        <li><b>Character and Item Database:</b> <span>The application includes a complete database containing information about all available characters and items in TFT</span></li>
                        <li><b>Tips and Strategies:</b> <span>The app provides advice on team composition, builds, and gameplay tactics.</span></li>
                        <li><b>Team Composition Generator:</b> <span>enables users to experiment with different team compositions, helping them choose the best combination of champions and items </span></li>
                    </ul>
                    <Button action={()=>delayRedirect("/tft")} text={"Go to tftApp!"} />
                </Card>
            </div>
            <div className={styles.homeScreenWrapperBorder}></div>
            <div className={redirect === "lol" ? `${styles.homeScreenWrapperTabSelected} ${styles.lolWrapper} ${styles.homeScreenWrapperTab}` : redirect !=="tft" ? `${styles.lolWrapper} ${styles.homeScreenWrapperTab}` : `${styles.homeScreenWrapperTabNoSelected} ${styles.lolWrapper}`}>
                <Card>
                    <h1>League Of Legends</h1>
                    <ul>
                        <li><b>Character and Item Database:</b> <span>The application includes a complete database containing information about all available characters and items in TFT</span></li>
                        <li><b>Tips and Strategies:</b> <span>The app provides advice on team composition, builds, and gameplay tactics.</span></li>
                        <li><b>Team Composition Generator:</b> <span>enables users to experiment with different team compositions, helping them choose the best combination of champions and items </span></li>
                    </ul>
                        <Button action={()=>delayRedirect("/lol")} text={"Go to LeagueApp!"} />

                </Card>
            </div>
    </div>
  )
}

export default HomeScreen