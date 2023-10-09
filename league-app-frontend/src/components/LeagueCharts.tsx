import React, {useState} from 'react';
import { AxisOptions, Chart } from "react-charts";
import styles from './leagueCharts.module.scss';

interface LeagueChartsProp {
    data: any;
}

function LeagueCharts(props: LeagueChartsProp) {
    const [options, setOptions] = useState(["totalDamageDealtToChampions"])
    const data = options.map(option=>{
        const summonerOptionData = props.data.info.participants.map((summoner: any) => ({
            primary: summoner.summonerName + " (" + summoner.championName+ ")",
            secondary: summoner[option]
    }))

        
        const result = {label:option, data:summonerOptionData.reverse()}
        return result
    })



    const primaryAxis = React.useMemo<
        AxisOptions<typeof data[number]["data"][number]>>(
        () => ({
        position: "left",
        getValue: (datum) => datum.primary,
        }),
        []
    );

    const secondaryAxes = React.useMemo<
        AxisOptions<typeof data[number]["data"][number]>[]>(
        () => [
        {
            position: "bottom",
            getValue: (datum) => datum.secondary,
        },
        ],
        []
    );
    // console.log('testData', data)

    const handleCheckboxChange = (value:string) => {
        if (options.includes(value) && options.length>1) {
          setOptions(options.filter(item => item !== value));
        } else {
            if(!options.includes(value)){
                setOptions([...options, value]);
            }
        }
      };
      //"totalDamageDealtToChampions","totalHeal","totalDamageTaken"
    return (
        <div className={styles.chartsWrapper}>
            <div className={styles.chartsCheckboxes} >
                <label>
                    <input
                    type="checkbox"
                    checked={options.includes('totalDamageDealtToChampions')}
                    onChange={() => handleCheckboxChange('totalDamageDealtToChampions')}
                    />
                    Damage dealt to champions
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={options.includes('totalHeal')}
                    onChange={() => handleCheckboxChange('totalHeal')}
                    />
                    Total heal
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={options.includes('totalDamageTaken')}
                    onChange={() => handleCheckboxChange('totalDamageTaken')}
                    />
                    Total damage taken
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={options.includes('goldEarned')}
                    onChange={() => handleCheckboxChange('goldEarned')}
                    />
                    Gold earned
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={options.includes('goldSpent')}
                    onChange={() => handleCheckboxChange('goldSpent')}
                    />
                    Gold spent
                </label>
            </div>
        <div className={styles.chart}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            dark: true,
          }}
        /> 
        </div>
        <div className={styles.chartLine}></div> 
        </div>
    );
}

export default LeagueCharts;
