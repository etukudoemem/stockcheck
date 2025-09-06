import Chart  from "react-apexcharts"
import { useContext, useEffect } from "react"
import { stockContext } from "../context/stockContext"

export const StockChart = ({ symbol, stockInfo }) => {
    const { chartData, setChartData } = useContext(stockContext)
    const series = [
        {
            name: `${symbol} Stock`,
            data: chartData.map((d) => d.open)
        }
    ]

    const options = {
        chart: {
            type: "area",
            zoom: {
                enable: false
            },
            colors:['#F44336', '#E91E63', '#9C27B0'],
        },
        dataLabels: {
            enable: false
        },
        stroke: {
            curve: "smooth",
            lineCap: "round"
        },
        title: {
            text: `${stockInfo} (${symbol}) stocks analysis`,
            align: "left",
            style: {
                fontFamily: "Quicksand",
                fontSize: "14px",
                color: "#F44336"
            }
        },
        subtitle: {
            text: 'Price Movements',
            align: 'left',
            },
        labels: chartData.map((d) => d.date),
        xaxis: {
            type: "date"
        },
        yaxis: {
            opposite: false
        },
        legend: {
            horizontalAlign: 'left'
        },
        
        fill: {
            type: 'gradient',
            gradient: {
                // shade: 'light',
                type: "vertical",
                shadeIntensity: 0.7,
                gradientToColors: ['#F44336'], // optional, if not defined - uses the shades of same color in series
                // inverseColors: true,
                opacityFrom: 0.4,
                opacityTo: 1,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 10,
                        color: '#F44336',
                        opacity: 1
                    },
                    {
                        offset: 30,
                        color: '#f87970ff',
                        opacity: 1
                    }
                ],
                plotOptions: {
                    area: {
                        fillTo: "end",
                        range: [
                            {
                                from: -100,
                                to: 0,
                                color:"#f87970ff" 
                            }
                        ]
                    }
                }
            }
        },
        
    }

    const url = "https://api.stockdata.org/v1/data/eod?"
    const params = {
        // interval: "year",
        sort: "asc",
        date_from: "2025-08-04",
        date_to: "2025-09-02",
        symbols: `${symbol}`,
        api_token: "ey3OKHtdJAxmll4vBj9voNW5SPMGqroCbnPsgLqa"
    }
    const searchParams = new URLSearchParams(params)
    useEffect(() => {
        let isRunning = true
        const fetchStockData = async() => {
            try {
                const response = await fetch(url + `${searchParams}`)
                const result = await response.json()
                const finalResult = result.data.map((d) => {
                    return {date: (d.date).replace("T00:00:00.000Z", ""), open: d.open}
                })
                console.log(finalResult)
                if (isRunning) {
                    setChartData(finalResult)
                }
                console.log(chartData)
            } catch (error) {
                console.log(error + error.message)
            }
        }
    fetchStockData()
    return () => isRunning = false
}, [])
    // const date = "2025-09-02T00:00:00Z"
    // const newDate = date.replace("T00:00:00Z", "")

    return (
        <>
            <section className="w-[95%] md:w-[80%] mx-auto">
                <Chart series={series} options={options} height={600}/> 
            </section>
        </>
    )
}