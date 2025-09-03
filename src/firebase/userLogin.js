import { signInWithEmailAndPassword } from "firebase/auth";

export const userLogin = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
};
    