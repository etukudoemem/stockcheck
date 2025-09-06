import { useContext, useEffect, useState } from "react"
import { stockContext } from "../../context/stockContext"
import { useNavigate } from "react-router-dom"
import { userAuthContext } from "../../context/userAuthContext"


export const SearchInput = () => {

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { url, token, searchResult, setSearchResult, searchInput, setSearchInput, addStock } = useContext(stockContext)
    const { toast, activateToast } = useContext(userAuthContext)
    
    useEffect(() => {
        const clearSearchResult = () => {
            if (!searchInput) {
                setSearchResult([])
            }
        }

        clearSearchResult()
        }, [searchInput])

    const params = {
        q: searchInput,
        token
    }
    const searchParams = new URLSearchParams(params)

    let isRunning = true
    const fetchStock = async () => {
        if (params.q.length < 1) {
            activateToast(toast, "emptySearch")
            return
            }

        try {
            setIsLoading(true)
            const response = await fetch(url+`search?${searchParams}`)
            const result = await response.json()
            if (isRunning) {
                setSearchResult(result.result)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            <section className="w-full flex flex-col justify-center h-auto text-black font-semibold text-center text-sm relative">
                <div className="flex justify-center items-center">
                    <input className="w-[65%] md:w-100 h-12 bg-white rounded-l-lg px-5 py-2 outline-none
                        placeholder-slate-800/60 border-gray-500 border-1"
                        type="text" 
                        placeholder="find stock..."
                        value={searchInput} 
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button onClick={() => fetchStock()}
                        className={`h-12 px-4 py-2 rounded-r-lg text-white searchBtn 
                        cursor-pointer ${isLoading && "animate-pulse"}`}>
                        {!isLoading ? "Search" : "Searching..."}
                    </button>
                </div>
                {searchResult.length > 0 && <ul className="text-left w-[85%] md:w-120 h-60 mx-auto
                    cursor-pointer shadow-xl mt-2 overflow-y-scroll rounded-lg px-4 z-5 bg-white">
                    {searchResult.map((stock, index) => 
                        <div key={index} className="flex gap-x-2 items-center">
                            <li className="w-full py-1 mb-1">
                                {stock.description} ({stock.symbol})
                                <div className="flex items-center gap-x-2 py-1 pr-2 ">
                                    <button onClick={() => navigate(`stockdetails/${stock.symbol}`)}
                                        className="w-auto h-auto px-2 py-1 text-white font-bold text-[8px] bg-black rounded
                                        cursor-pointer hover:bg-gray-500 hover:text-white">
                                        View
                                    </button>
                                    <button onClick={() => addStock(stock.symbol)}
                                        className="w-auto h-auto px-2 py-1 text-white font-bold text-[8px] bg-black rounded
                                        cursor-pointer hover:bg-gray-500 hover:text-white">
                                        Add to Watch list
                                    </button>
                                </div>
                            </li>
                        </div>
                        )
                    }
                </ul>}
            </section>
        </>
    )
}