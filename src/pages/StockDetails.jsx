// import { useContext } from "react"
import { StockChart } from "../components/StockChart"
import { StockQuoteInfo } from "../components/StockQuoteInfo"
import { useContext, useEffect, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { stockContext } from "../context/stockContext"
import { useParams } from "react-router-dom"

export const StockDetails = () => {
    const [stockInfo, setStockInfo] = useState("")
    const { symbol } = useParams()
    const { url, token } = useContext(stockContext)
    const { data: stockPricesData } = useFetch(url + `quote?symbol=${symbol}&token=` + token, symbol)

    useEffect(() => {
        let isRunning = true
        const fetchInfo = async() => {
            try {
                const response = await fetch(url + `search?q=${symbol}&token=` + token)
                const result = await response.json()
                const finalResult = result.result[0].description
                console.log(finalResult)
                if (isRunning) {
                    setStockInfo(finalResult)  
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchInfo()
        return () => isRunning = false
    }, [symbol])
    
    return (
        <>
            <main className=" w-full h-[100vh]">
                <section className="my-20">
                    <StockChart symbol={symbol} stockInfo={stockInfo} />
                </section>
                <section className="pb-30"> 
                    <StockQuoteInfo stockPricesData={stockPricesData}/>
                </section>
            </main>
        </>
    )
}