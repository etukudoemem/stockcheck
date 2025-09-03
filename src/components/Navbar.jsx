import { useRef } from "react"
import { CgClose } from "react-icons/cg"
import { RiMenu4Fill } from "react-icons/ri"
import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {
    
    const menuElement = useRef(null)
    const handleMenuList = () => {
        menuElement.current.classList.toggle("translate-x-full")
        }

    return (
        <>
           <nav className="bg-[#000815]">
                <div className="w-full h-15 text-white flex justify-between items-center
                    py-5 px-4 md:py-8 md:px-12">
                    <div className="">
                       <Link to={'/'}>stockCHECK</Link>
                    </div>
                    
                    <RiMenu4Fill size={30} className="md:hidden cursor-pointer"
                        onClick={() => handleMenuList()}
                    />
                    <ul ref={menuElement}
                        className={`fixed md:static md:flex md:justify-between md:items-center text-white
                        w-65 h-full md:w-120 md:h-auto right-0 top-0 menuBg translate-x-full md:translate-x-0
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
                        
                        <NavLink to={"login"} onClick={() => handleMenuList()}
                            className="flex items-center justify-center mb-8 md:mb-0 border-2 border-white 
                            w-20 h-10 block rounded-full">
                            Login
                        </NavLink>
                        <NavLink to={"login/signup"} onClick={() => handleMenuList()}
                            className="flex items-center justify-center mb-8 md:mb-0 bg-[#b4051c] w-23 h-10 block rounded-full">
                            Sign Up
                        </NavLink>
                    </ul>
                </div>
           </nav>
        </>
    )
}