import { Outlet } from "react-router-dom"
import HomeHeader from "../components/HomeHeader/HomeHeader"

const UserLayout: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto font-mono ">
            <HomeHeader />
            <Outlet />
        </div>
    )
}

export default UserLayout