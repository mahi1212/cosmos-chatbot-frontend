import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { PiSmileySadLight } from "react-icons/pi";
import { deleteSingleChat } from "src/helpers/api-communicator";
import { chatIdAtom, titleAtom } from "src/store/jotai";

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
    const title = useAtomValue(titleAtom)

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
            {
                history
                // remove last one if its title is 'No title'
                .filter((item) => item.title != 'No title' )
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
                        }}
                    >
                        <p>
                            {index + 1}. {item?.title?.slice(0, 20) + (item?.title?.length > 20 ? '...' : '')}
                        </p>


                        <div className="flex items-center gap-2">
                            
                            <button
                                className={`p-2 bg-gray-200 rounded-full hover:bg-red-200 transition-all duration-300 ease-in-out ${chat_id == item._id && 'text-gray-400 cursor-not-allowed'}`}
                                onClick={() => {
                                    if (chat_id == item._id) {
                                        toast.error('Active chat cannot be deleted')
                                        return
                                    }

                                    handleDeleteChat(item._id)
                                }}
                                aria-label={'Delete chat'}
                            >
                                <IoMdTrash className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                })


            }
            {
                history.length == 0 &&
                <p
                    className={`py-2 px-3 bg-slate-100 rounded-md flex justify-between items-center gap-2 transition-all duration-300 ease-in-out mb-2`}
                >
                    No chats available
                    <PiSmileySadLight />
                </p>
            }
        </div>
    )
}

export default ChatHistory