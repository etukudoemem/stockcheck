import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { FaCheckCircle } from "react-icons/fa"
import { Toast } from "../components/modals/Toast"
import { useContext } from "react"
import { userAuthContext } from "../context/userAuthContext"

export const Layout = () => {

    const { toast } = useContext(userAuthContext)
    return (
        <>
            <div className="">
                <div className="sticky top-0 z-10">
                    <Navbar />
                </div>
                <section className={`fixed top-17 transition-all duration-300 ease-in-out
                    ${toast.logoutSuccess ? "right-2" : "right-[-100%]"}`}>
                    <Toast>
                        <FaCheckCircle size={20} className="text-green-500"/>
                        <p>Logout Successful!</p>
                    </Toast>
                </section>
                <Outlet />
            </div>
        </>
    )
}