import { CgDanger } from "react-icons/cg"

export const Toast = ({ children }) => {

    return (
        <>
            <main>
                <section className={`flex justify-center items-center gap-x-3
                    bg-black text-white font-medium w-50 h-11 md:w-55 md:h-14 shadow-xl rounded-xs`}>
                    {children}
                </section>
            </main>
        </>
    )
}