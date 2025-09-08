import { useContext } from "react"
import { SignupButton } from "../components/buttons/SignupButton"
import { EmailInput } from "../components/input/EmailInput"
import { NameInput } from "../components/input/NameInput"
import { PasswordInput } from "../components/input/PasswordInput"
import { Toast } from "../components/modals/Toast"
import { Link } from "react-router-dom"
import { userAuthContext } from "../context/userAuthContext"
import { BsFillExclamationCircleFill } from "react-icons/bs"

export const Signup = () => {
    const { createNewUser, toast } = useContext(userAuthContext)

    return (
        <>
            <section className={`fixed top-17 transition-all duration-300 ease-in-out
                ${toast.networkError ? "right-2" : "right-[-100%]"}`}>
                <Toast>
                    <BsFillExclamationCircleFill size={20} className="text-red-500"/>
                    <p>Network Error. Sign up failed</p>
                </Toast>
            </section>
            <section className={`fixed top-17 transition-all duration-300 ease-in-out
                ${toast.passwordError ? "right-1" : "right-[-130%]"}`}>
                <Toast>
                    <BsFillExclamationCircleFill size={20} className="text-red-500"/>
                    <p>Password should have at least six(6) Characters</p>
                </Toast>
            </section>
            <form className="flex justify-center items-center bg" 
                onSubmit={(e) => createNewUser(e)}>
                <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-y-7 
                    text-center font-semibold sm:w-97 relative sm:text-sm">
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