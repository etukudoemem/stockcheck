import { useContext, useRef } from "react"
import { CgClose } from "react-icons/cg"
import { RiMenu4Fill } from "react-icons/ri"
import { Link, NavLink } from "react-router-dom"
import { userAuthContext } from "../context/userAuthContext"


export const Navbar = () => {
    const menuElement = useRef(null)
    const handleMenuList = () => {
        menuElement.current.classList.toggle("translate-x-full")
        }
    const { userStatus, logUserOut } = useContext(userAuthContext)

    return (
        <>
           <nav className="bg">
                <div className="w-full h-15 text-white flex justify-between items-center
                    py-5 px-4 md:py-8 md:px-12">
                    <div className="font-medium">
                       <Link to={'/'}>stockCheck</Link>
                    </div>
                    <RiMenu4Fill size={30} className="md:hidden cursor-pointer"
                        onClick={() => handleMenuList()}
                    />
                    <ul ref={menuElement}
                        className={`fixed md:static md:flex md:justify-between md:items-center text-white
                        w-65 h-[100vh] md:w-120 md:h-auto right-0 top-0 menuBg translate-x-full md:translate-x-0
                        px-7 md:px-0 duration-700 ease-in-out z-10 `}>

                        <CgClose className="mt-5 mb-20 md:hidden cursor-pointer" size={25}
                            onClick={() => handleMenuList()}
                        />
                        <NavLink to={"/"} onClick={() => handleMenuList()}>
                            <li className=" mb-8 md:mb-0">Home</li>
                        </NavLink>
                        <NavLink to={"watchlist"} onClick={() => handleMenuList()}>
                            <li className=" mb-8 md:mb-0">Watch List</li>
                        </NavLink>
                        
                        {userStatus ? 
                        <NavLink onClick={() => {
                            handleMenuList()
                            logUserOut()
                            }}
                            className="md:flex items-center justify-center mb-8 md:mb-0 md:border-2 border-white 
                                md:w-20 md:h-9 block rounded-full">
                           <li>Logout</li> 
                        </NavLink> :
                        <NavLink to={"login"} onClick={() => handleMenuList()}
                            className="md:flex items-center justify-center mb-8 md:mb-0 md:border-2 border-white 
                            md:w-20 md:h-9 block rounded-full">
                           <li>Login</li> 
                        </NavLink>}
                        {!userStatus && <NavLink to={"login/signup"} onClick={() => handleMenuList()}
                            className="md:flex items-center justify-center mb-8 md:mb-0 md:bg-[#b4051c] w-23 md:h-9 block rounded-full">
                            <li>Sign Up</li>
                        </NavLink>}
                    </ul>
                </div>
           </nav>
        </>
    )
}