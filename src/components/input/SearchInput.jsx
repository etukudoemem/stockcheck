import { useContext, useEffect, useState } from "react"
import { stockContext } from "../../context/stockContext"
import { useNavigate } from "react-router-dom"


export const SearchInput = () => {

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { url, token, searchResult, setSearchResult, searchInput, setSearchInput, addStock } = useContext(stockContext)

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
            alert('search term cannot be empty')
            return
            }
        setIsLoading(true)

        try {

            const response = await fetch(url+`search?${searchParams}`)
            const result = await response.json()
            console.log(result.result, result)
            if (isRunning) {
                setSearchResult(result.result)
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    


    return (
        <>
            <section className="w-95 h-auto relative text-black font-semibold text-center text-sm">
                <input className="w-[85%] md:w-100 bg-white h-12 md:h-10 rounded-lg px-5 py-2 outline-none
                    placeholder-slate-800/60 border-gray-500 border-1"
                    type="text" 
                    placeholder="find stock..."
                    value={searchInput} 
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchResult.length > 0 && <ul className="mx-auto text-left w-[85%] md:w-100 h-70 bg-[inherit]
                    cursor-pointer border-white shadow-xl mt-1 overflow-y-scroll border-1 border-gray-100 rounded-lg px-4 list">
                    {searchResult.map((stock, index) => 
                        <div key={index} className="flex gap-x-2 items-center">
                            <li className="w-full py-1 mb-1 ">
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
                <button onClick={() => fetchStock()}
                    className={`absolute h-12 md:h-10 px-4 py-2 right-[7%] md:right-[-20px] top-0 rounded-r-lg
                    text-white searchBtn cursor-pointer ${isLoading && "animate-pulse"}`}>
                    {!isLoading ? "Search" : "Searching..."}
                </button>
            </section>
        </>
    )
}