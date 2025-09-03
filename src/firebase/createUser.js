import { createUserWithEmailAndPassword } from "firebase/auth";


export const createUser = async(auth, email, password) => {
    try {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const newUser = userCredential.user
            console.log(newUser)
        })
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    }
}

