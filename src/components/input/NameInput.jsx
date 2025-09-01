import { useContext } from "react"
import { FaUser } from "react-icons/fa"
import { userAuthContext } from "../../context/userAuthContext"

export const NameInput = () => {
    const { input, setInput } = useContext(userAuthContext)

    return (
        <>
            <div className="w-full sm:w-97 relative flex flex-col justify-center items-center">
                <FaUser color="black" className="absolute top-4 left-[10.5%]" size={16}/>
                <input className="w-[85%] sm:87 h-12 rounded-t-lg px-[10%] py-2 outline-none
                    placeholder-slate-800/60 bg-white border-b-2 border-black"
                    type="text" 
                    name="name"
                    placeholder="name"
                    onChange={() => setInput({...input, name:true})}
                    />
                {!input.name && <div className="absolute text-red-600 text-[12px] cursor-pointer w-[85%] 
                    sm:w-83 text-left top-12">
                    <p>please enter your name</p>
                </div>}
            </div>
        </>
    )
}