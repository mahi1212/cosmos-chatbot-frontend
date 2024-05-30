import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { PiSmileySadLight } from "react-icons/pi";
import { deleteSingleChat } from "src/helpers/api-communicator";

interface ChatHistoryProps {
    history: ChatHistoryItem[];
    chat_id: string;
}
interface ChatHistoryItem {
    title: string;
    _id: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ history, chat_id }) => {

    const handleClearChats = async (chat_id: string) => {
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
                history.map((item, index) => {
                    return <div
                        key={index}
                        className={`py-2 px-3 bg-slate-100 rounded-md flex justify-between items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out mb-2 ${chat_id == item._id && ' font-semibold'}`}
                        onClick={() => {
                            if (chat_id == item._id) {
                                return
                            }
                            localStorage.setItem('chat_id', item._id)
                            window.location.reload()
                        }}
                    >

                        <p>
                            {index + 1}. {item.title.slice(0, 20) + (item.title.length > 20 ? '...' : '')}
                        </p>


                        <div className="flex items-center gap-2">
                            <p className='p-2 bg-gray-200 rounded-full'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toast.error('Edit title feature !available yet')
                                }}
                            >
                                <MdModeEditOutline className="w-4 h-4" />
                            </p>
                            <button
                                className={`p-2 bg-gray-200 rounded-full hover:bg-red-200 transition-all duration-300 ease-in-out ${chat_id == item._id && 'text-gray-400 cursor-not-allowed'}`}
                                onClick={() => {
                                    if (chat_id == item._id) {
                                        toast.error('Active chat cannot be deleted')
                                        return
                                    }

                                    handleClearChats(item._id)
                                }}
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