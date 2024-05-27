import { BiSend } from "react-icons/bi"
import { FcGlobe } from "react-icons/fc"
import { useLocation } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci"
import ChatHistory from "../Chats/History/ChatHistory"
import RewriteHistory from "../Rewrite/History/RewriteHistory"


const Sidebar: React.FC = () => {

  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname)

  return (
    <div className="bg-slate-200 h-full relative rounded-md p-2 md:p-4">
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

      <div className="py-4 w-full absolute bottom-2 left-0 p-4 bg-slate-200">
        {/* <p className="py-3">
          Any additional instruction?
        </p> */}
        <div className="flex items-center w-full gap-2">
          <input
            className="flex-1 rounded-sm p-2 focus:outline-none bg-slate-100"
            placeholder="additional instruction.."
            type="text"
          />
          <button className="bg-black p-2 rounded-md">
            <BiSend className="h-5 w-5 text-white" />
            <span className="sr-only">Send</span>
          </button>
        </div>
      </div>
      {/* <p className="cursor-pointer border-2 p-2 rounded-lg">
        <GoPerson />
      </p> */}
    </div>
  )
}

export default Sidebar