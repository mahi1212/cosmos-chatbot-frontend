import { ReactNode, useState, createContext, useEffect, useContext } from 'react';

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

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedin, setIsLoggedin] = useState(false);

    const login = async (email: string, password: string) => { }
    const signup = async (name: string, email: string, password: string) => { }
    const logout = async () => { }

    useEffect(() => {
        // fetch user cookies are valid, skip login
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