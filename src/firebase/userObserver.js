import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";


export const userObserver = (setStatus) => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setStatus(true)
        } else {
            setStatus(false)
        }
    })
};
