import { useContext, useEffect } from "react"
import { SearchInput } from "../components/input/SearchInput"
import { stockContext } from "../context/stockContext"
import { WatchListTable } from "../components/WatchListTable"
import { CgDanger } from "react-icons/cg"
import { userAuthContext } from "../context/userAuthContext"
import { Toast } from "../components/modals/Toast"

export const WatchList = () => {

    const { toast } = useContext(userAuthContext)

    const { url, token, watchListSymbols, setWatchListStocks } = useContext(stockContext)

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
                // console.log(result)
            if (isRunning) {
                setWatchListStocks(result)
                }
            }
        fetchWatchList()
        return () => isRunning = false
    }, [])

    const { watchListStocks } = useContext(stockContext)

    return (
        <>  <section className={`fixed top-17 transition-all duration-300 ease-in-out
                ${toast.addedAlready ? "right-1" : "right-[-100%]"}`}>
                <Toast>
                    <CgDanger size={20}/>
                    <p>Already on List!</p>
                </Toast>
            </section>
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
                    {watchListStocks.length > 0 ? <div className="w-full h-auto pb-10">
                        <WatchListTable watchListStocks={watchListStocks}/>
                    </div> : 
                    <div className="flex justify-center items-center text-sm 
                        font-semibold pb-10">
                        Nothing on your watch list yet...
                    </div>}
                </section>
            </main>
        </>
    )
}