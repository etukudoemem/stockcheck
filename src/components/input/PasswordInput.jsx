import { useState, useContext } from "react"
import { FaLock } from "react-icons/fa"
import { PiEyeClosedBold } from "react-icons/pi"
import { VscEye } from "react-icons/vsc"
import { userAuthContext } from "../../context/userAuthContext"

export const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { input, setInput } = useContext(userAuthContext)

    return (
        <>
            <div className="w-full sm:w-97 relative flex flex-col justify-center items-center">
                <FaLock color="black" className="absolute top-4 left-[10.5%]" size={16}/>
                <input className="w-[85%] sm:87 h-12 rounded-t-lg px-[10%] py-2 outline-none
                    placeholder-slate-800/60 bg-white border-b-2"
                    type= {showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    onChange={() => setInput({...input, password:true})}
                />
                {!input.password && <div className="absolute text-red-600 text-[12px] cursor-pointer w-[85%] 
                    sm:w-83 text-left top-12">
                    <p>please enter your password</p>
                </div>}
                {showPassword ? 
                    <PiEyeClosedBold onClick={() => setShowPassword(false)}
                        color="black" className="absolute top-4 right-[11%] cursor-pointer" size={20}/> 
                    :
                    <VscEye onClick={() => setShowPassword(true)}
                        color="black" className="absolute top-4 right-[11%] cursor-pointer" size={20}/>
                }
            </div>
        </>
    )
}