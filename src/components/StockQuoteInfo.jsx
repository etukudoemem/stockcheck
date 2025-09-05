
export const StockQuoteInfo = ({ stockPricesData}) => {

    return (
        <>
            {stockPricesData ? 
                <section className="w-full md:w-[80%] h-auto px-4 md:mx-auto">
                    <h2 className="text-xl w-full my-5 text-center font-semibold">Pricing Info</h2>
                    <div className="flex justify-between w-full h-auto border-b-1 border-b-black py-5
                        border-t-4 border-[#e96262] ">
                        <p>Current Price</p>
                        <p>${stockPricesData.c}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Change</p>
                        <p>${stockPricesData.d}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Percent Change</p>
                        <p>${stockPricesData.dp}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>High Price of the day</p>
                        <p>${stockPricesData.h}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Low Price of the day</p>
                        <p>${stockPricesData.l}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Open Price of the day</p>
                        <p>${stockPricesData.o}</p>
                    </div>
                    <div className="flex justify-between w-full h-auto border-b-1 border-black py-5">
                        <p>Previous close price</p>
                        <p>${stockPricesData.pc}</p>
                    </div>
                </section> :
                <div className="flex justify-center items-center text-sm 
                    font-semibold pb-10 text-red-500">
                    No data to display...
                </div>}
        </>
    )
}