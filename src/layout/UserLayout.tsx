import { useAtomValue } from "jotai";
import { Outlet } from "react-router-dom"
import HomeHeader from "src/components/HomeHeader/HomeHeader"
import { darkMoodAtom } from "src/store/jotai";

const UserLayout: React.FC = () => {
    const darkMode = useAtomValue(darkMoodAtom);

    return (
        <div className={`${darkMode && 'dark'} font-sans bg-white dark:bg-neutral-900 min-h-[100vh]`}>
            <HomeHeader />
            <div className="max-w-7xl mx-auto px-2">
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout