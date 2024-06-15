import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { PiSmileySadLight } from "react-icons/pi";
import { deleteSingleChat } from "src/helpers/api-communicator";
import { chatIdAtom, hideSidebarAtom, titleAtom } from "src/store/jotai";

interface ChatHistoryProps {
    history: ChatHistoryItem[];
    chat_id: string;
}
interface ChatHistoryItem {
    title: string;
    _id: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ history, chat_id }) => {
    const setChat_id = useSetAtom(chatIdAtom)
    const [title, setTitle] = useAtom(titleAtom)
    const [hidden, setHidden] = useAtom(hideSidebarAtom)

    
    // console.log(history)
    const handleDeleteChat = async (chat_id: string) => {
        try {
            toast.loading('Clearing chats...', { id: 'clearing-chats' })
            await deleteSingleChat(chat_id)
            toast.success('Chats cleared successfully', { id: 'clearing-chats' })
        } catch (e) {
            console.log(e)
            toast.error('Unable to clear chats')
        }
    }

    return (
        <div className="py-2">
            {/* if history is blank */}
            {/* if history has one item and its title is 'No title */}
            {
                history.length == 0 || history.length == 1 && history[0].title == 'No title' &&
                <p
                    className={`py-2 px-3 bg-slate-100 rounded-md flex justify-between items-center gap-2 transition-all duration-300 ease-in-out mb-2`}
                >
                    No chats available
                    <PiSmileySadLight />
                </p>
            }

            {/* map hisotry */}
            {
                history
                    // remove last one if its title is 'No title'
                    .filter((item) => item.title != 'No title')
                    // add new item at the end with title 'No title'
                    // .concat({ title: 'Running context', _id: '' })
                    .map((item, index) => {
                        return <div
                            key={index}
                            className={`py-2 px-3 bg-slate-100 rounded-md flex justify-between items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out mb-2 ${chat_id == item._id && 'font-semibold'}`}
                            onClick={() => {
                                if (chat_id == item._id) {
                                    return
                                }
                                setChat_id(item._id)
                                // if window width is less than 1024px then hide sidebar
                                if (window.innerWidth < 1024) {
                                    setHidden(true)
                                }
                            }}
                        >
                            <p>
                                {index + 1}. {item?.title?.slice(0, 20) + (item?.title?.length > 20 ? '...' : '')}
                            </p>


                            <div className="flex items-center gap-2">

                                {/* delete a chat */}
                                <button
                                    className={`p-2 bg-gray-200 rounded-full hover:bg-red-200 transition-all duration-300 ease-in-out`}
                                    onClick={() => {
                                        // if (chat_id == item._id) {
                                        //     toast.error('Active chat cannot be deleted')
                                        //     return
                                        // }
                                        handleDeleteChat(item._id)
                                        setChat_id('')
                                        setTitle('')
                                    }}
                                    aria-label={'Delete chat'}
                                >
                                    <IoMdTrash className="w-4 h-4" />
                                </button>
                            </div>

                        </div>
                    })


            }

        </div>
    )
}

export default ChatHistory