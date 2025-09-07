import { StockChart } from "../components/StockChart"
import { StockQuoteInfo } from "../components/StockQuoteInfo"
import { Toast } from "../components/modals/Toast"
import { BsFillExclamationCircleFill } from "react-icons/bs"
import { useContext, useEffect, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { stockContext } from "../context/stockContext"
import { useParams } from "react-router-dom"
import { userAuthContext } from "../context/userAuthContext"

export const StockDetails = () => {
    const [stockInfo, setStockInfo] = useState("")
    const { symbol } = useParams()
    const { url, token } = useContext(stockContext)
    const { toast, activateToast } = useContext(userAuthContext)
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
                if (error) {
                    activateToast(toast, "fetchFailed")
                    return
                }
                console.log(error + ":" + error.message)
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