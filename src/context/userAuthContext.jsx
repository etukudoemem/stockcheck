import { createContext, useState } from "react";
import { app } from "../firebase/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { userObserver } from "../firebase/userObserver";

export const userAuthContext = createContext(null)

export const UserAuthContextProvider = ({ children }) => {

    const auth = getAuth(app)
    const navigate = useNavigate()

    const [input, setInput] = useState({
            name: true,
            email: true,
            password: true,
        })

    const [userStatus, setUserStatus] = useState(false)

    const [toast, setToast] = useState({
            signupSuccess: false,
            loginSuccess: false,
            logoutSuccess: false,
            addedAlready: false,
            notLoggedIn: false,
            emptySearch: false,
            networkError: false,
            credentialsError: false,
            passwordError: false,
            fetchFailed: false
        })

    const activateToast = (toast, toastType) => {
        setTimeout(() => {
            toast[toastType] = true
            setToast({...toast, toastType})
        }, 1300)
    }

    const observeUserStatus = () => {
        userObserver(setUserStatus)
    }
    observeUserStatus()

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
        // console.log(name, email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/")
                activateToast(toast, "signupSuccess")
                const newUser = userCredential.user
                console.log(newUser)
            })
            .catch ((error) => {
                if (error.message === "Firebase: Error (auth/network-request-failed).") {
                    activateToast(toast, "networkError")
                    return
                } 
                if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                    activateToast(toast, "passwordError")
                    return
                } 
            })     
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
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/")
                activateToast(toast, "loginSuccess")
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                if (error.message === "Firebase: Error (auth/network-request-failed).") {
                    activateToast(toast, "networkError")
                    return
                }
                if (error.message === "Firebase: Error (auth/invalid-credential).") {
                    activateToast(toast, "credentialsError")
                    return
                }
            });
    }

    const logUserOut = () => {
        signOut(auth)
            .then(() => {
                activateToast(toast, "logoutSuccess")
                console.log("user logged out successfully.")
            })
            .catch ((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                return
            })
    }

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
        if (toast.logoutSuccess) {
            setTimeout(() => {
                setToast({...toast, logoutSuccess:false})
            }, 3000)
            return
        }
        if (toast.addedAlready) {
            setTimeout(() => {
                setToast({...toast, addedAlready:false})
            }, 3000)
            return
        }
        if (toast.notLoggedIn) {
            setTimeout(() => {
                setToast({...toast, notLoggedIn:false})
            }, 3000)
            return
        }
        if (toast.emptySearch) {
            setTimeout(() => {
                setToast({...toast, emptySearch:false})
            }, 3000)
            return
        }
        if (toast.networkError) {
            setTimeout(() => {
                setToast({...toast, networkError:false})
            }, 3000)
            return
        }
        if (toast.credentialsError) {
            setTimeout(() => {
                setToast({...toast, credentialsError:false})
            }, 3000)
            return
        }
        if (toast.passwordError) {
            setTimeout(() => {
                setToast({...toast, passwordError:false})
            }, 3000)
            return
        }
        if (toast.fetchFailed) {
            setTimeout(() => {
                setToast({...toast, fetchFailed:false})
            }, 3000)
            return
        }

    }
    deactivateToast()
    

    const contextValues = {
        input,
        setInput,
        userStatus,
        setUserStatus,
        toast,
        setToast,
        createNewUser,
        logUserIn,
        logUserOut,
        observeUserStatus,
        activateToast,
        deactivateToast
    }

    return <userAuthContext.Provider value={contextValues}>
        {children}
    </userAuthContext.Provider>
}