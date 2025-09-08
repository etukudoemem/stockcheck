import { useState, useEffect } from "react"

export const useFetch = (url, symbol) => {

    const [data, setData] = useState([])

    useEffect(() => {
        let isRunning = true
        const fetchData = async(url) => {
            try {
                const response = await fetch(url)
                const result = await response.json()
                if (isRunning) {
                   setData([result]) 
                }
            } catch (error) {
            }
        }
        fetchData(url)
    }, [symbol])
    return {data}
}