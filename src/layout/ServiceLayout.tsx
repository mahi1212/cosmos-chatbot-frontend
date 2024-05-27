
import { Outlet } from "react-router-dom"
import Sidebar from "src/components/Sidebar/Sidebar"

const ServiceLayout : React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-12 min-h-[85vh]">
                <div className="col-span-3 ">
                    <Sidebar />
                </div>
                <div className="col-span-9">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default ServiceLayout