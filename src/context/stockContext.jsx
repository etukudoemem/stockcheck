import { createContext, useState, useEffect, useContext} from "react";
import { userAuthContext } from "./userAuthContext";

export const stockContext = createContext(null)

export const StockContextProvider = ({ children }) => {

    const getWatchListStorage = () => {
        const symbolsList = window.localStorage.getItem("symbolsList")
        if (symbolsList === null) {
            return []
        } else {
           return JSON.parse(symbolsList) 
        }
    }

    const initialState = getWatchListStorage()
    
    const url = "https://finnhub.io/api/v1/"
    const token = "d2i40cpr01qucbnn2fogd2i40cpr01qucbnn2fp0"
    const [watchListSymbols, setwatchListSymbols] = useState(initialState)
    const [TrendingStocks, setTrendingStocks] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [watchListStocks, setWatchListStocks] = useState([])
    const [chartData, setChartData] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const { toast, activateToast, deactivateToast } = useContext(userAuthContext)
    

    useEffect(() => {
        const setWatchListStorage = () => {
            window.localStorage.setItem("symbolsList", JSON.stringify(watchListSymbols))
        }
        setWatchListStorage()
    }, [watchListSymbols])
        

    
    const addStock = async(stockSymbol) => {
        const isInList = watchListSymbols.find((sym) => sym === stockSymbol)
        if (isInList) {
            activateToast(toast, "addedAlready")
            return 
        } else {
            setwatchListSymbols([stockSymbol, ...watchListSymbols])
        }
        let response = await fetch(url + `quote?symbol=${stockSymbol}&token=` + token)
        response = await response.json()
        
        response = {...response, symbol: stockSymbol}
        console.log(response)

        setWatchListStocks([response, ...watchListStocks])
    }
    // console.log(watchListSymbols)

    const deleteStock = (stockSymbol) => {
       const deletedStock = watchListStocks.find((stock) => {
            if (stock.symbol === stockSymbol) {
                return stock
            }
       })
       
       setWatchListStocks(watchListStocks.filter((stock) => {
            return stock !== deletedStock
       }))

       setwatchListSymbols(
            watchListSymbols.filter((symbol) => {
                return symbol !== deletedStock.symbol
            })
       )
    }
    const contextValues = {
        url,
        token,
        searchResult,
        setSearchResult,
        TrendingStocks,
        setTrendingStocks,
        searchInput,
        setSearchInput,
        addStock,
        deleteStock,
        watchListStocks,
        setWatchListStocks,
        watchListSymbols,
        setwatchListSymbols,
        chartData,
        setChartData
    }

    return <stockContext.Provider value={contextValues}>
            {children}
        </stockContext.Provider>
}