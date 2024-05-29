import { ReactNode, useState, createContext, useEffect, useContext } from 'react';
import { checkAuthStatus, loginUser, logoutUser, signupUser } from 'src/helpers/api-communicator';

interface User {
    name: string;
    email: string;
}

interface UserAuth {
    isLoggedin: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;

}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedin, setIsLoggedin] = useState(false);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser(data)
            setIsLoggedin(true)
        }

    }
    const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if (data) {
            setUser(data) 
            setIsLoggedin(true)
        }
        
    }
    const logout = async () => {
        await logoutUser();
        setUser(null)
        setIsLoggedin(false)
        window.location.reload()
    }

    useEffect(() => {
        // fetch user cookies are valid, skip login
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser(data)
                setIsLoggedin(true)
            }
        }
        checkStatus()
    }, [])

    const value = {
        user,
        isLoggedin,
        login,
        signup,
        logout
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)