export const Toast = ({ children }) => {

    return (
        <>
            <main>
                <section className={`flex justify-center items-center gap-x-2 px-6 py-4 border-1 border-slate-200
                    text-slate-900 font-medium w-auto h-13 md:h-15 shadow-xl rounded-xs bg-slate-100`}>
                    {children}
                </section>
            </main>
        </>
    )
}