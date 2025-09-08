import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"

export const StockQuoteInfo = ({ stockPricesData}) => {

    return (
        <>
            {stockPricesData.length > 0 ? stockPricesData.map((spd) => {
                return (
                    <section key={spd.t}
                        className="w-full md:w-[80%] h-auto px-4 md:mx-auto">
                    <h2 className="text-xl w-full my-5 text-center font-semibold">Pricing Info</h2>
                    <div className="flex justify-between w-full h-auto border-b-1 border-b-black py-5
                        border-t-4 border-[#e96262] ">
                        <p>Current Price</p>
                        <p>${spd.c}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Change</p>
                        <div className={`flex items-center ${spd.d > 0 ? "text-green-500" : "text-red-500"}`}>
                            {spd.d > 0 ? <TiArrowSortedUp size={20}/> : <TiArrowSortedDown size={20}/>}
                            <p>${spd.d}</p>
                        </div>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Percentage Change</p>
                        <div className={`flex items-center ${spd.d > 0 ? "text-green-500" : "text-red-500"}`}>
                            {spd.dp > 0 ? <TiArrowSortedUp size={20}/> : <TiArrowSortedDown size={20}/>}
                            <p>{spd.dp}%</p>
                        </div>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>High Price of the day</p>
                        <p>${spd.h}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Low Price of the day</p>
                        <p>${spd.l}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Open Price of the day</p>
                        <p>${spd.o}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Previous Close price</p>
                        <p>${spd.pc}</p>
                    </div>
                </section> 
                )
            })
                :
                <div className="flex justify-center items-center text-sm 
                    font-semibold pb-10 text-red-500">
                    Couldn't update current Pricing Info...
                </div>}
        </>
    )
}