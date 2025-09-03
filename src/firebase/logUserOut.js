import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/firebase"


export const logUserOut = () => {
    const auth = getAuth(app)
    try {
        signOut(auth)
            .then(() => {
                alert("user logged out")
            })
    } catch (error) {
        console.log(error.code, error.message)
    }    
}