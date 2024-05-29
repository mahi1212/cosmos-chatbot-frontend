
import { Outlet } from "react-router-dom"
import Sidebar from "src/components/Global/Sidebar/Sidebar"

const ServiceLayout: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-3">

            <div className="grid grid-cols-12 min-h-[85vh] h-full">
                <div className="col-span-12 sm:col-span-3 ">
                    <Sidebar />
                </div>
                <div className="col-span-12 sm:col-span-9 mt-3 sm:mt-0">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default ServiceLayout