import { createContext, useState } from "react";
import { createUser } from "../firebase/createUser";
import { userLogin } from "../firebase/userLogin";
import { app } from "../firebase/firebase"
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { userObserver } from "../firebase/userObserver";

export const userAuthContext = createContext(null)

export const UserAuthContextProvider = ({ children }) => {

    const navigate = useNavigate()

    const [input, setInput] = useState({
            name: true,
            email: true,
            password: true,
        })

    const [toast, setToast] = useState({
            signupSuccess: false,
            loginSuccess: false,
            logoutSuccess: false,
        })

    const activateToast = (toast, toastType) => {
        setTimeout(() => {
            toast[toastType] = true
            setToast({...toast, toastType})
        }, 2000)
    }

    const createNewUser = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        if (name.length < 1) {
            setInput({...input, name:false})
            return
        } 
        if (email.length < 1) {
            setInput({...input, email:false})
            return
        } 
        if (password.length < 1) {
            setInput({...input,  password:false})
            return
        } 
        console.log(name, email, password)
        const auth = getAuth(app)
        createUser(auth, email, password)

        navigate("/")
        activateToast(toast, "signupSuccess")
    }
    

    const logUserIn = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")
        if (email.length < 1) {
            setInput({...input, email:false})
            return
        } 
        if (password.length < 1) {
            setInput({...input,  password:false})
            return
        } 
        console.log(email, password)
        const auth = getAuth(app)
        userLogin(auth, email, password)

        navigate("/")
        activateToast(toast, "loginSuccess")
    }

    userObserver()

    const deactivateToast = () => {
        if (toast.signupSuccess) {
            setTimeout(() => {
                setToast({...toast, signupSuccess:false})
            }, 3000)
            return
        }
        if (toast.loginSuccess) {
            setTimeout(() => {
                setToast({...toast, loginSuccess:false})
            }, 3000)
            return
        }

    }
    deactivateToast()
    

    const contextValues = {
        input,
        setInput,
        toast,
        setToast,
        createNewUser,
        logUserIn,
        activateToast
    }

    return <userAuthContext.Provider value={contextValues}>
        {children}
    </userAuthContext.Provider>
}