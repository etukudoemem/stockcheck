// import { userAuthContext } from "../../context/userAuthContext"
// import { useContext } from "react"

export const SignupButton = () => {
    // const { isLoading } = useContext(userAuthContext)

    return (
        <>
        <div className="w-full sm:w-97 flex justify-center items-center relative">
            <button className="w-[85%] sm:87 h-12  bg-[#1e6ae1] text-white font-bold
                rounded-lg mt-8 cursor-pointer" type="submit">
                Sign Up
            </button>
        </div>
            
        </>
    )
}