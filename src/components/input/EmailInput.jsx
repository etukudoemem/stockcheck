import { useContext } from "react"
import { FaEnvelope } from "react-icons/fa"
import { userAuthContext } from "../../context/userAuthContext"


export const EmailInput = () => {
    const { input, setInput } = useContext(userAuthContext)

    return (
        <>
            <div className="w-full sm:w-97 relative flex flex-col justify-center items-center">
                <FaEnvelope color="black" className="absolute top-4 left-[10.5%]" size={16}/>
                <input className="w-[85%] sm:87 h-12 rounded-t-lg px-[10%] py-2 outline-none
                    placeholder-slate-800/60 bg-white border-b-2 border-black"
                    type="email" 
                    name="email"
                    placeholder="email"
                    onChange={() => setInput({...input, email:true})}
                    />
                {!input.email && <div className="absolute text-red-600 text-[12px] w-[85%] 
                    sm:w-83 text-left top-12">
                    <p>please enter your email</p>
                </div>}
            </div>
        </>
    )
}