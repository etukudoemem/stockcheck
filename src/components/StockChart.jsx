import Chart  from "react-apexcharts"
import { Toast } from "./modals/Toast"
import { BsFillExclamationCircleFill } from "react-icons/bs"
import { useContext, useEffect } from "react"
import { stockContext } from "../context/stockContext"
import { userAuthContext } from "../context/userAuthContext"

export const StockChart = ({ symbol, stockInfo }) => {
    const { chartData, setChartData } = useContext(stockContext)
    const { toast, activateToast } = useContext(userAuthContext)
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
            enabled: false
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
            type: "datetime"
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
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.7,
                gradientToColors: ['#f4433697'], // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 0.7,
                opacityTo: 0,
                stops: [0, 100],
                // colorStops: [
                //     {
                //         offset: 10,
                //         color: '#F44336',
                //         opacity: 0.8
                //     },
                //     {
                //         offset: 80,
                //         color: '#ef817981',
                //         opacity: 0.5
                //     }
                // ],
            }
        },
        
    }

    const url = "https://api.stockdata.org/v1/data/eod?"
    const params = {
        // interval: "year",
        sort: "asc",
        date_from: "2025-08-04",
        // date_to: "2025-09-02",
        symbols: `${symbol}`,
        api_token: "ey3OKHtdJAxmll4vBj9voNW5SPMGqroCbnPsgLqa"
    }
    const searchParams = new URLSearchParams(params)
    useEffect(() => {
        let isRunning = true
        const fetchChartData = async() => {
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
                if (error) {
                    activateToast(toast, "fetchFailed")
                    return
                }
            }
        }
    fetchChartData()
    return () => isRunning = false
}, [])

    return (
        <>
            <section className="w-[95%] md:w-[80%] mx-auto">
                <section className={`fixed top-17 transition-all duration-300 ease-in-out
                    ${toast.fetchFailed ? "right-2" : "right-[-100%]"}`}>
                    <Toast>
                        <BsFillExclamationCircleFill size={20} className="text-red-500"/>
                        <p>Failed to fetch Chart data</p>
                    </Toast>
                </section>
                <Chart series={series} options={options} type="area" height={600}/> 
            </section>
        </>
    )
}