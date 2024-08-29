import { useSetAtom } from "jotai";
import { IoMdTrash } from "react-icons/io";
import { PiSmileyLight, PiSmileySadLight } from "react-icons/pi";
import { useAuth } from "src/context/AuthContent";
import { chatIdAtom, deleteModalAtom, hideSidebarAtom } from "src/store/jotai";
import LoginToContinue from "src/assets/images/login-to-continue.svg";
import { NavLink } from "react-router-dom";

interface ChatHistoryProps {
    history: ChatHistoryItem[];
    chat_id: string;
}
interface ChatHistoryItem {
    title: string;
    _id: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ history, chat_id }) => {
    const auth = useAuth();
    const setChat_id = useSetAtom(chatIdAtom)
    const setHidden = useSetAtom(hideSidebarAtom)
    const setDeleteModal = useSetAtom(deleteModalAtom)

    // console.log(history)
    // console.log(auth?.isLoggedin)

    return (
        <div className="py-2 md:min-h-[400px]">
            {/* if history is blank */}
            {/* if history has one item and its title is 'No title */}
            <>
                {
                    history.length == 0 || history.length == 1 && history[0].title == 'No title' &&
                    <p
                        className={`py-2 px-3 bg-slate-100 rounded-md flex justify-between items-center gap-2 transition-all duration-300 ease-in-out mb-2`}
                    >
                        Start your cosmos conversation
                        <PiSmileyLight className="mt-[2px]" />
                    </p>
                }
            </>
            {/* if no auth or loggedin is false */}
            <>
                {
                    (auth?.isLoggedin == false || !auth) &&
                    <div
                        className={`py-2 px-3 flex-col rounded-md flex justify-between items-center gap-2 transition-all duration-300 ease-in-out mb-2 mt-36 md:mt-28`}
                    >

                        <img src={LoginToContinue} alt="icon" className="w-full h-[200px] object-contain " />
                        <NavLink to={'/login'} className=" uppercase font-semibold text-black dark:text-gray-300 ">Login to save your chat</NavLink>
                    </div>
                }
            </>
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
                            className={`py-2 px-3 bg-slate-100 dark:bg-neutral-800 text-black dark:text-gray-300 rounded-md flex justify-between items-center gap-2 cursor-pointer transition-all ease-in-out mb-2 ${chat_id == item._id && 'font-semibold'}`}
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
                                    className={`p-2 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-red-200 dark:hover:bg-blue-800 transition-all ease-in-out`}
                                    onClick={() => {
                                        setDeleteModal(true)
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