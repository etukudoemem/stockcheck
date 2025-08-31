import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"

export const TrendingTable = ({ TrendingStocks }) => {

    return (
        <section>
            <div className="w-full h-full flex flex-col items-center">
                {TrendingStocks ? <table className="table text-sm md:text-lg w-[85%] md:w-[80%] ">
                    <thead>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Change</th>
                            <th>Current Price</th>
                            <th>Percent Change</th>
                            <th>Today's High Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        TrendingStocks.map((stock, index) => 
                            <tr key={index} onClick={() => navigate(`stockdetails/${stock.s}`)}>
                                <td>{stock.s}</td>
                                <td className={`flex justify-center gap-x-1 items-center ${stock.d > 0 ? "text-green-500" : "text-red-500"} `}>
                                    <p>${stock.d}</p>
                                    <div>
                                        {stock.d > 0 ? <TiArrowSortedUp size={25}/> 
                                            : <TiArrowSortedDown size={25}/>}
                                    </div>
                                </td>
                                <td>${stock.c}</td>
                                <td className={`flex justify-center gap-x-[0.5px] items-center ${stock.dp > 0 ? "text-green-500" : "text-red-500"} `}>
                                    <p>{stock.dp}%</p>
                                    <div>
                                        {stock.dp > 0 ? <TiArrowSortedUp size={25}/> 
                                            : <TiArrowSortedDown size={25}/>}
                                    </div>
                                </td> 
                                <td>${stock.h}</td>
                            </tr>
                            )
                        }
                        {/* <tr>
                            <td >GOOGL</td>
                            <td>$1000.00</td>
                            <td>$10.00</td>
                            <td>1.00</td>
                            <td>$1010.00</td>
                        </tr>
                        <tr>
                            <td >MSFT</td>
                            <td>$1000.00</td>
                            <td>$10.00</td>
                            <td>1.00</td>
                            <td>$1010.00</td>
                        </tr>
                        <tr>
                            <td >TSLA</td>
                            <td>$1000.00</td>
                            <td>$10.00</td>
                            <td>1.00</td>
                            <td>$1010.00</td>
                        </tr>
                        <tr>
                            <td >TSLA</td>
                            <td>$1000.00</td>
                            <td>$10.00</td>
                            <td>1.00</td>
                            <td>$1010.00</td>
                        </tr> */}
                    </tbody>
                </table> : <div className="flex justify-center items-center text-lg 
                    font-semibold text-red-300 pb-10">
                    Oops...! Failed to fetch data
                </div>}
            </div>
        </section>
    )
}