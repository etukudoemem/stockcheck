import { useState, useEffect, useContext } from "react"
import { Header } from "../components/Header"
import { stockContext } from "../context/stockContext"
import { TrendingTable } from "../components/TrendingTable"
import { Toast } from "../components/modals/Toast"
import { userAuthContext } from "../context/userAuthContext"
import { FaCheckCircle } from "react-icons/fa"


export const Home = () => {

    const [isLoading, setIsLoading] = useState(false)

    const { toast, observeUserStatus } = useContext(userAuthContext)
    observeUserStatus()

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
            
            <main className="text-black w-full h-auto flex flex-col gap-y-20 relative">
                <section className={`fixed top-17 transition-all duration-300 ease-in-out
                    ${toast.loginSuccess ? "right-1" : "right-[-100%]"}`}>
                    <Toast>
                        <FaCheckCircle size={20}/>
                        <p>Login Successful!</p>
                    </Toast>
                </section>
                <section className={`fixed top-17 transition-all duration-300 ease-in-out
                    ${toast.signupSuccess ? "right-1" : "right-[-100%]"}`}>
                    <Toast>
                        <FaCheckCircle size={20}/>
                        <p>Account Created!</p>
                    </Toast>
                </section>
                <section className="flex flex-col justify-center items-center text-center 
                    w-full gap-y-15 mt-40">
                    <Header />
                </section>
                <section className="w-full h-auto pb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center leading-normal">
                        Trending Stocks
                    </h2>
                    {TrendingStocks.length > 0 ? <TrendingTable TrendingStocks={TrendingStocks} /> : 
                    <div className="flex justify-center items-center text-sm 
                        font-semibold pb-10 text-red-500">
                        No data to display...
                    </div>}
                </section>
            </main>
        </>
    )
}