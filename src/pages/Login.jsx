import { useNavigate, Link } from "react-router-dom"
import { LoginButton } from "../components/buttons/LoginButton"
import { EmailInput } from "../components/input/EmailInput"
import { PasswordInput } from "../components/input/PasswordInput"
import { Toast } from "../components/modals/Toast"
import { CgDanger } from "react-icons/cg"
import { useContext } from "react"
import { userAuthContext } from "../context/userAuthContext"

export const Login = () => {
    const navigate = useNavigate()
    const { logUserIn, toast } = useContext(userAuthContext)
    return (
        <>
            <section className={`fixed top-17 transition-all duration-300 ease-in-out
                ${toast.networkError ? "right-1" : "right-[-100%]"}`}>
                <Toast>
                    <CgDanger size={20}/>
                    <p>Network Error</p>
                </Toast>
            </section>
            <section className={`fixed top-17 transition-all duration-300 ease-in-out
                ${toast.credentialsError ? "right-1" : "right-[-100%]"}`}>
                <Toast>
                    <CgDanger size={20}/>
                    <p>Invalid Details</p>
                </Toast>
            </section>
            <form className="flex justify-center items-center bg" onSubmit={(e) => logUserIn(e)}>
                <div className="h-[100vh] flex flex-col justify-center items-center gap-y-7 
                    text-center font-semibold sm:text-sm relative w-full sm:w-97">
                    <h2 className="text-2xl md:text-3xl text-white font-bold mb-6">
                        Welcome Back!
                    </h2>
                    <EmailInput />
                    <PasswordInput />
                    <Link to={'signup'} className="text-white text-xs mt-[-20px] cursor-pointer 
                        w-[85%] flex justify-end hover:text-slate-400">
                        <p>New? Create account</p>
                    </Link>
                    <LoginButton />
                </div>
            </form>
        </>
    )
}