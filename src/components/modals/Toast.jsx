export const Toast = ({ children }) => {

    return (
        <>
            <main>
                <section className={`flex justify-center items-center gap-x-2 p-6 border-1 border-slate-200
                    text-slate-900 font-medium w-auto h-auto shadow-xl rounded-xs bg-slate-100`}>
                    {children}
                </section>
            </main>
        </>
    )
}