import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export const Layout = () => {

    return (
        <>
            <div className="">
                <div className="sticky top-0 z-10">
                    <Navbar />
                </div>
                <Outlet />
            </div>
        </>
    )
}