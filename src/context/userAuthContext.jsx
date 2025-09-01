import { createContext, useState } from "react";
// import { getAuth, createUserWithEmailandPassword } from "firebase/auth";

export const userAuthContext = createContext(null)

export const UserAuthContextProvider = ({ children }) => {

    const [input, setInput] = useState({
            name: true,
            email: true,
            password: true,
        })
    
    const getFormData = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        if (name?.length < 1) {
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
        }

    const createNewUser = () => {
        
    }



    const contextValues = {
        // getFormData,
        input,
        setInput,
    }

    return <userAuthContext.Provider value={contextValues}>
        {children}
    </userAuthContext.Provider>
}