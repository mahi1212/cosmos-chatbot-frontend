import { FcGlobe } from "react-icons/fc"
import { useLocation } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci"
import ChatHistory from "src/components/Chats/History/ChatHistory"
import RewriteHistory from "src/components/Rewrite/History/RewriteHistory"
import SettingOption from "./SettingOption"
// import { useAuth } from "src/context/AuthContent"
import { useEffect } from "react"
import { getAllChats } from "src/helpers/api-communicator"
import { useAtom, useAtomValue } from "jotai"
import { chatHistoryAtom, chatIdAtom, titleAtom } from "src/store/jotai"


const Sidebar: React.FC = () => {
  const [history, setHistory] = useAtom(chatHistoryAtom)

  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname)
  // const auth = useAuth();

  const [chat_id, setChat_id] = useAtom(chatIdAtom)
  const [title, setTitle] = useAtom(titleAtom)
  // console.log(title)
  // console.log(history)
  useEffect(() => {
    getAllChats().then((data) => {
      setHistory(data.history)
    })
  }, [chat_id, title])

  return (
    <div className="bg-slate-200 h-full relative rounded-md p-3 " >
      {/* header */}
      <div className="flex gap-2 items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FcGlobe className="animate-spin text-lg" />
          <p className="text-lg">COSMOS AI</p>
        </div>
        {/* for adding new chat */}
        <div className='has-tooltip cursor-pointer'
          onClick={() => {
            setChat_id('')
            setTitle('')
          }}>
          <span className='tooltip rounded shadow-lg px-4 py-2 bg-slate-100 text-slate-500 -mt-2 -ms-28 w-28 inline'>
            New Chat
          </span>
          <CiSquarePlus
            className="text-lg text-green-800 cursor-pointer w-6 h-6 hover:text-slate-500 transition-all duration-300 ease-in-out"
          />
        </div>

      </div>

      {/* History list */}
      <div className="max-h-[75vh] overflow-y-auto ">
        {
          pathname.includes('chats') ? <ChatHistory history={history} chat_id={chat_id} /> : <RewriteHistory />
        }
      </div>

      {/* <Systemprompt /> */}
      <SettingOption />
    </div>
  )
}

export default Sidebar