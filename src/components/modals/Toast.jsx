import { CgDanger } from "react-icons/cg"

export const Toast = ({ children }) => {

    return (
        <>
            <main>
                <section className={`flex justify-center items-center gap-x-2 px-4
                    bg-black text-white font-medium w-auto h-11 md:h-14 shadow-xl rounded-xs`}>
                    {children}
                </section>
            </main>
        </>
    )
}