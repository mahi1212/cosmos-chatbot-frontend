import { FcGlobe } from "react-icons/fc"
import { useLocation } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci"
import ChatHistory from "src/components/Chats/History/ChatHistory"
import RewriteHistory from "src/components/Rewrite/History/RewriteHistory"
import SettingOption from "./SettingOption"
// import { useAuth } from "src/context/AuthContent"
import { useEffect, useState } from "react"
import { getAllChats } from "src/helpers/api-communicator"


const Sidebar: React.FC = () => {
  const [history, setHistory] = useState([] as any[])
  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname)
  // const auth = useAuth();

  const [chat_id, setChat_id] = useState(localStorage.getItem('chat_id') || '')
  // console.log(history)
  useEffect(() => {
    getAllChats().then((data) => {
      setHistory(data.history)
    })
  }, [chat_id])

  return (
    <div className="bg-slate-200 h-full relative rounded-md p-3 " >
      {/* header */}
      <div className="flex gap-2 items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FcGlobe className="animate-spin text-lg" />
          <p className="text-lg">COSMOS AI</p>
        </div>
        {/* for adding new chat */}
        <CiSquarePlus
          className="text-lg text-green-800 cursor-pointer w-6 h-6"
          onClick={() => { 
            localStorage.removeItem('chat_id')
            window.location.reload()
          }}
        />
      </div>

      {/* History list */}
      <div className="max-h-[75vh] overflow-y-auto ">
        {
          pathname.includes('chats') ? <ChatHistory history={history} chat_id={chat_id} /> : <RewriteHistory />
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