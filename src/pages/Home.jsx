import { useState, useEffect, useContext } from "react"
import { Header } from "../components/Header"
import { stockContext } from "../context/stockContext"
import { TrendingTable } from "../components/TrendingTable"


export const Home = () => {

    const [isLoading, setIsLoading] = useState(false)

    const { url, token, TrendingStocks, setTrendingStocks} = useContext(stockContext)

    useEffect(() => {
        let isRunning = true
        const fetchStock = async () => {
            const symbols = ["AAPL", "NFLX", "GOOGL", "MSFT", "DIS", "TSLA", "NVDA", "AMZN", "META"]

            try {
                setIsLoading(true)

                let responses = await Promise.all(symbols.map((symbol) => {
                    return fetch(url + `quote?symbol=${symbol}&token=` + token)
                }))

                responses = await Promise.all(responses.map((response) => response.json()))
                
                const result = responses.map((response, index) => {
                    return {...response, s: symbols[index]}
                })
                
                if (isRunning) {
                    setTrendingStocks(result)
                 }
            } catch (error) {
                console.log(error)
            } 
            setIsLoading(false)
        }
        
        fetchStock()

        return () => isRunning = false
    }, [])

    return (
        <>
            <main className="text-black w-full h-auto flex flex-col gap-y-20">
                <section className="flex flex-col justify-center items-center text-center 
                    w-full gap-y-15 mt-40">
                    <Header />
                </section>
                <section className="w-full h-auto pb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center leading-normal">
                        Trending Stocks
                    </h2>
                    {TrendingStocks.length > 0 ? <TrendingTable TrendingStocks={TrendingStocks} /> : 
                    <div className="flex justify-center items-center text-lg 
                        font-semibold pb-10 text-red-500">
                        No data to display...
                    </div>}
                </section>
            </main>
        </>
    )
}