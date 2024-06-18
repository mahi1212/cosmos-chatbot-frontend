import { IoSettings } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const SettingOption = () => {
    const navigate = useNavigate()
    return (
        <div 
        className="py-2 w-full absolute bottom-1 left-0 p-4 "
        onClick={()=> {
            navigate('settings')
        }}
        >

            <div className="flex items-center w-full gap-2 cursor-pointer">
                <button className="bg-gray-800 p-[10px] rounded-md">
                    <IoSettings className="h-5 w-5 text-white dark:text-gray-300" />
                    <span className="sr-only">Send</span>
                </button>
                <div >
                    <p className="uppercase font-bold text-white dark:text-gray-300">Go to setting</p>
                    <p className="-mt-[2px] text-white dark:text-gray-300">Explore all options</p>
                </div>

            </div>
        </div>
    )
}

export default SettingOption