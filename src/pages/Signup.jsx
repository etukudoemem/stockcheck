import { useContext } from "react"
import { SignupButton } from "../components/buttons/SignupButton"
import { EmailInput } from "../components/input/EmailInput"
import { NameInput } from "../components/input/NameInput"
import { PasswordInput } from "../components/input/PasswordInput"
import { Link } from "react-router-dom"
import { userAuthContext } from "../context/userAuthContext"

export const Signup = () => {
    const { createNewUser } = useContext(userAuthContext)

    return (
        <>
            <form className="flex justify-center items-center bg" 
                onSubmit={(e) => createNewUser(e)}>
                <div className="h-[100vh] flex flex-col justify-center items-center gap-y-7 
                    text-center font-semibold w-full sm:w-97 relative sm:text-sm">
                    <h2 className="text-2xl md:text-3xl text-white font-bold mb-6">
                        Create Account
                    </h2>
                    <NameInput />
                    <EmailInput />
                    <PasswordInput />
                    <Link to={'..'} relative className="text-white text-xs mt-[-20px] cursor-pointer 
                        w-[85%] flex justify-end hover:text-slate-400">
                        <p className="">Have an account? Login</p>
                    </Link>
                    <SignupButton />
                </div>
            </form>
        </>
    )
}