import { FcGlobe } from "react-icons/fc"
import { useLocation } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci"
import ChatHistory from "src/components/Chats/History/ChatHistory"
import RewriteHistory from "src/components/Rewrite/History/RewriteHistory"
import SettingOption from "./SettingOption"
// import { useAuth } from "src/context/AuthContent"
import { useEffect } from "react"
import { getAllChats } from "src/helpers/api-communicator"
import { useAtom } from "jotai"
import { chatHistoryAtom, chatIdAtom, hideSidebarAtom, titleAtom } from "src/store/jotai"
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";


const Sidebar: React.FC = () => {
  const [history, setHistory] = useAtom(chatHistoryAtom)
  const [hidden, setHidden] = useAtom(hideSidebarAtom)

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
    <div className={`bg-slate-200 h-full relative p-3 pb-14 rounded-md`}>
      {/* header */}
      <div className="flex gap-2 items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FcGlobe className="animate-spin text-lg" />
          <p className="text-lg">COSMOS AI</p>
        </div>
        {/* for adding new chat */}
        <div className="flex justify-center items-center gap-2">

          {/* new chat button */}

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

          {/* collapse button */}
          {
            hidden === true ? <button
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setHidden(false)}
            >
              <span>Show Sidebar</span>
            </button> : <TbLayoutSidebarLeftCollapseFilled
              className="text-lg cursor-pointer w-6 h-6 transition-all duration-300 ease-in-out"
              onClick={() => setHidden(true)}
            />
          }

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