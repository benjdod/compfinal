import React, { useEffect } from "react"
import moment from "moment"
import Chart from "chart.js"

export default (props) => {

    const chartLabels = props.labels;
    const caseData = props.cases;
    const deathData = props.deaths;
    const stateName = props.stateName || 'State'

    let caseMax = 0
    caseData.forEach(r => {
        if (r > caseMax)
        caseMax = r;
    })

    //caseMax += 10;

    useEffect(() => {
        let ctx = document.getElementById('state-chart').getContext('2d');
        console.log(ctx);
        let myChart = new Chart(ctx, {
            type: 'line',
            
            data: {
                labels: chartLabels.map(label => moment(new Date(label)).format('ll')),
                datasets: [
                    {
                    label: `Cases`,
                    data: caseData,
                    backgroundColor: 'rgba(255, 206, 99, 0.2)',
                    borderColor: 'rgba(255, 206, 99, 1)',
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHitRadius: 5,
                    pointHoverRadius: 5,
                    },
                    {
                        label: `Deaths`,
                        data: deathData,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 12,
                            }
                        }
                    ],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: caseMax,
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                    }
                },
                title: {
                    display: true,
                    text: `${stateName.replace(/([A-Z])/g, ' $1')} Case Data`
                }
            }
        });
    }, [])

    return (
        <div>
            <canvas id='state-chart'></canvas>
        </div>
    )
}