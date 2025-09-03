import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/firebase"
import { useContext } from "react";
import { userAuthContext } from "../context/userAuthContext";


const { activateToast, toast, logoutSuccess} = useContext(userAuthContext)

export const logUserOut = () => {
    const auth = getAuth(app)
    try {
        signOut(auth)
            .then(() => {
                activateToast(toast, "logoutSuccess")
            })
    } catch (error) {
        console.log(error.code, error.message)
    }    
}