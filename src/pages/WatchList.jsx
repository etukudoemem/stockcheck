import { useContext, useEffect } from "react"
import { SearchInput } from "../components/input/SearchInput"
import { stockContext } from "../context/stockContext"
import { WatchListTable } from "../components/WatchListTable"

export const WatchList = () => {

    const { url, token, watchListSymbols, clearSymbolsStorage, setWatchListStocks } = useContext(stockContext)

    useEffect(() => {
        let isRunning = true
        const fetchWatchList = async() => {
            let responses = await Promise.all(watchListSymbols.map((symbol) => {
            return fetch(url + `quote?symbol=${symbol}&token=` + token)
                }))

            responses = await Promise.all(responses.map((response) => response.json()))
            const result = responses.map((response, index) => {
                return {...response, symbol: watchListSymbols[index]}
                    })
                console.log(result)
            if (isRunning) {
                setWatchListStocks(result)
                }
            }
        fetchWatchList()
        return () => isRunning = false
    }, [])

    const { watchListStocks } = useContext(stockContext)

    return (
        <>
            <main className="w-full h-auto text-black">
                <section className="w-full h-auto flex flex-col justify-center items-center 
                    gap-y-15">
                    <div className="w-full h-auto flex flex-col items-center justify-center gap-y-3">
                        <div className=" text-2xl md:text-4xl 
                        font-bold mt-40 w-[50%] text-center leading-normal">
                        <h2>Watch List Stocks</h2>
                    </div>
                    <p className="text-center w-[85%]">Add your favourite stocks to your watch list and track them with ease.</p>
                    </div>
                    
                    <SearchInput />
                    {/* button will only be present during development */}
                    <button onClick={clearSymbolsStorage}
                        className="bg-black text-white px-4 py-2">
                        Clear
                    </button>
                    {watchListStocks.length > 0 ? <div className="w-full h-auto pb-10">
                        <WatchListTable watchListStocks={watchListStocks}/>
                    </div> : 
                    <div className="flex justify-center items-center text-lg 
                        font-semibold pb-10">
                        Nothing on your watch list yet...
                    </div>}
                </section>
            </main>
        </>
    )
}