import { FcGlobe } from "react-icons/fc"
import { useLocation } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci"
import ChatHistory from "src/components/Chats/History/ChatHistory"
import RewriteHistory from "src/components/Rewrite/History/RewriteHistory"
import SettingOption from "./SettingOption"


const Sidebar: React.FC = () => {

  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname)

  return (
    <div className="bg-slate-200 h-full relative rounded-md p-3" >
      {/* header */}
      <div className="flex gap-2 items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FcGlobe className="animate-spin text-lg" />
          <p className="text-lg">COSMOS AI</p>
        </div>
        {/* for adding new chat */}
        <CiSquarePlus className="text-lg text-green-800 cursor-pointer w-6 h-6" />
      </div>

      {/* History list */}
      <div className="max-h-[75vh] overflow-y-auto ">
        {
          pathname.includes('chats') ? <ChatHistory /> : <RewriteHistory />
        }
      </div>


      {/* <Systemprompt /> */}
      <SettingOption />
      {/* <p className="cursor-pointer border-2 p-2 rounded-lg">
        <GoPerson />
      </p> */}
    </div>
  )
}

export default Sidebar