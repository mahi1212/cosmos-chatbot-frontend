
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "src/components/Global/Sidebar/Sidebar"
import { expendAtom, hideSidebarAtom } from "src/store/jotai"

const ServiceLayout: React.FC = () => {
    const [hidden, setHidden] = useAtom(hideSidebarAtom);

    // Custom hook to handle window resize
    const useWindowSize = () => {
        const [windowSize, setWindowSize] = useState({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        useEffect(() => {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowSize;
    };

    const size = useWindowSize();

    useEffect(() => {
        if (size.width < 1024) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    }, [size.width, setHidden]);

    return (
        <div className="max-w-7xl mx-auto sm:px-3">
            <div className="grid grid-cols-12 min-h-[90vh] sm:min-h-[85vh] h-full">
                <div className={` ${hidden ? 'fixed top-0 left-0 w-full h-full z-10 bg-white hidden' : 'col-span-12 lg:col-span-3'}`}>
                    <Sidebar />
                </div>
                <div className={`col-span-12 ${!hidden && 'lg:col-span-9'} mt-3 sm:mt-0`}>
                    <Outlet />
                </div>
            </div>
        </div >
    );
}

export default ServiceLayout