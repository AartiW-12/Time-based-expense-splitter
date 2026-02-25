
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }){

    const [user , setUser] = useState(null);
    const [isAuthenticated , setIsAuthenticated] = useState(false)

    function generateUserId(name){
        return 'User-'+name+Date.now() + Math.random().toString(36).substr(2, 9);
    }

    useEffect(()=>{
        const storedUser = localStorage.getItem('smartSplit-user')
        if(storedUser){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser))
            setIsAuthenticated(true)
        }
    },[])

    const login  = (email , password) => {
        // get email and password and Name  from API     
        let currentEmail =  "aartiwhaval12@gmail.com"
        let currentPassword = 'Aarti@1234'
        let currentName = "Aarti Whaval"
        let currentUserId = "user-"+currentName.split(" ")[0];

        if(email === currentEmail && password === currentPassword){
            const userData = {
                userId : currentUserId,
                email : email,
                name : currentName
            }
            setUser(userData)
            setIsAuthenticated(true)
            localStorage.setItem('smartSplit-user', JSON.stringify(userData))
            return true
        }
        return false
    }

    const signUp = (email , password , name) => {
        // // get email and password and Name  from API 
        // let currentEmail =  "aartiwhaval12@gmail.com"
        // let currentPassword = 'Aarti@1234'
        // let currentName = name

        const userData = {
            userId : generateUserId(name),
            email : email,
            name : name
        }

        setUser(userData);
        setIsAuthenticated(true)
        localStorage.setItem('smartSplit-user', JSON.stringify(userData))

    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('smartSplit-user')
    }

    return (
        <AuthContext.Provider value={{user , isAuthenticated, login , signUp , logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}