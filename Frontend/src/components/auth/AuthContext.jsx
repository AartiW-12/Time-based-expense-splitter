
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authReady, setAuthReady] = useState(false);

    function generateUserId(name) {
        console.log("Username : ", name)
        return 'user-' + name.toLowerCase();
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('smartSplit-user')
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser))
            setIsAuthenticated(true)
        }
        setAuthReady(true)
    }, [])

    
    const login = (email, password) => {

        let currentEmail = "aartiwhaval12@gmail.com"
        let currentPassword = 'Aarti@1234'
        let fullName = "Aarti Whaval"

        if (email === currentEmail && password === currentPassword) {

            const username = fullName.split(" ")[0]; // 👈 Aarti
            const currentUserId = generateUserId(username);

            const userData = {
                userId: currentUserId,
                email: email,
                fullName: fullName,
                username: username   // 👈 important
            }

            setUser(userData)
            setIsAuthenticated(true)
            localStorage.setItem('smartSplit-user', JSON.stringify(userData))
            localStorage.setItem('smartSplit-status', 'loggedIn')
            return true
        }
        return false
    }

    const signUp = (email, password, name) => {
        const username = name.split(" ")[0];

        // ✅ Stable userId based on username (not random every time)
        const stableId = "user-" + username.toLowerCase();

        const userData = {
            userId: stableId,
            email: email,
            fullName: name,
            username: username
        }

        setUser(userData);
        setIsAuthenticated(true)
        localStorage.setItem('smartSplit-user', JSON.stringify(userData))
        localStorage.setItem('smartSplit-status', 'loggedIn')  // 👈 ADD THIS
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('smartSplit-user')
        localStorage.removeItem('smartSplit-status')
    }

    if(!authReady) {
        return null;
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}