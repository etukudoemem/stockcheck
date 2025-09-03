import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase";

export const userObserver = () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email, user.uid)
        } else {
            console.log("not logged in")
        }
    })
};
