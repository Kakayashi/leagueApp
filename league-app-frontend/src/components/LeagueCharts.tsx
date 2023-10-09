import React from 'react';
import { AxisOptions, Chart } from "react-charts";
import styles from './leagueCharts.module.scss';

interface LeagueChartsProp {
    data: any;
}

function LeagueCharts(props: LeagueChartsProp) {
    const dataSecond: object[] = props.data.info.participants.map((summoner: any) => ({
        label: summoner.summonerName,
        data: [
            {
                primary: summoner.summonerName,
                dmg: summoner.totalDamageDealtToChampions,
                healing: summoner.totalHeal,
                taken: summoner.totalDamageTaken,
            }
        ]
    }));

    // const primaryAxis = React.useMemo<AxisOptions<typeof dataSecond[number]["data"][number]>>(
    //     () => ({
    //         position: "left",
    //         getValue: (datum) => datum.primary,
    //     }),
    //     []
    // );

    // const secondaryAxes = React.useMemo<AxisOptions<typeof dataSecond[number]["data"][number]>[]>(
    //     () => [
    //         {
    //             position: "bottom",
    //             getValue: (datum: { dmg: number }) => datum.dmg,
    //         },
    //     ],
    //     []
    // );

    return (
        <div className={styles.chartsWrapper}>
         {/* <Chart
          options={{
            dataSecond,
            primaryAxis,
            secondaryAxes,

            dark: true,
          }}
        />  */}
        </div>
    );
}

export default LeagueCharts;
