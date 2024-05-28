import { IoSettings } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const SettingOption = () => {
    const navigate = useNavigate()
    return (
        <div 
        className="py-2 w-full absolute bottom-1 left-0 p-4 bg-slate-200"
        onClick={()=> {
            navigate('settings')
        }}
        >

            <div className="flex items-center w-full gap-2 cursor-pointer">
                <button className="bg-gray-800 p-[10px] rounded-md">
                    <IoSettings className="h-5 w-5 text-white" />
                    <span className="sr-only">Send</span>
                </button>
                <div >
                    <p className="uppercase font-bold">Go to setting</p>
                    <p className="-mt-[2px]">Explore all options</p>
                </div>

            </div>
        </div>
    )
}

export default SettingOption