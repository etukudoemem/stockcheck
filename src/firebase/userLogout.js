import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase"


export const userLogout = (auth) => {
    try {
        signOut(auth)
            .then(() => {
                console.log("user logged out successfully.")
            })
    } catch (error) {
        console.log(error.code, error.message)
    }    
}