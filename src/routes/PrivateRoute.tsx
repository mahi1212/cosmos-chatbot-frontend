import { Navigate } from "react-router-dom";
import { useAuth } from "src/context/AuthContent"

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {

    const auth = useAuth();
    // console.log(auth)

    if (!auth) {
        return <div>Redirecting...</div>
    }

    if (auth.isLoggedin === false) {
        return <Navigate to="/login" />;
    }

    return children
}

export default PrivateRoute