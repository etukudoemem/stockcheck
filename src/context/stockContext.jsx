import { createContext, useState, useEffect} from "react";

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
    const clearSymbolsStorage = () => {
        window.localStorage.removeItem("symbolsList")
    }
    
    const url = "https://finnhub.io/api/v1/"
    const token = "d2i40cpr01qucbnn2fogd2i40cpr01qucbnn2fp0"
    const [watchListSymbols, setwatchListSymbols] = useState(initialState)
    const [TrendingStocks, setTrendingStocks] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [watchListStocks, setWatchListStocks] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [input, setInput] = useState({
        name: true,
        email: true,
        password: true,
    })

    useEffect(() => {
        const setWatchListStorage = () => {
            window.localStorage.setItem("symbolsList", JSON.stringify(watchListSymbols))
        }
        setWatchListStorage()
    }, [watchListSymbols])
        

    const getFormData = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        if (name?.length < 1) {
            setInput({...input, name:false})
            return
        } 
        if (email.length < 1) {
            setInput({...input, email:false})
            return
        } 
        if (password.length < 1) {
            setInput({...input,  password:false})
            return
        } 
        console.log(name, email, password)
    }

    const addStock = async(stockSymbol) => {
        const isInList = watchListSymbols.find((sym) => sym === stockSymbol)
        if (isInList) {
            alert("stock already on watch list")
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
    console.log(watchListSymbols)

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
        getFormData,
        input,
        setInput,
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
        clearSymbolsStorage
    }

    return <stockContext.Provider value={contextValues}>
            {children}
        </stockContext.Provider>
}