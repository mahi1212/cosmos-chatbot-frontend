import axios from 'axios'
import { useEffect, useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdTrash } from 'react-icons/io'
import { MdModeEditOutline } from 'react-icons/md'
import { RiRobot3Fill } from 'react-icons/ri'
import { useAuth } from 'src/context/AuthContent'
import { deleteSingleChat, getSingleChat, sendChatRequest } from 'src/helpers/api-communicator'


interface MessageInterface {
    role: 'system' | 'user' | 'assistant',
    content: string
}

const Chats: React.FC = () => {
    const auth = useAuth();
    // console.log(auth)

    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChatResponse = async () => {
        console.log(message)
        if (message.length == 0) {
            alert('Please enter a message')
        }
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/wf/vectorSearch`, {
                prompt: message,
                project: import.meta.env.VITE_PROJECT_NAME,
                n: 5,
                openai_api_key: import.meta.env.VITE_OPENAI_API_KEY
            })

            // console.log(res)
            if (res) {
                console.log('Here')
                console.log(res.data.response.matching_texts)
                const openAiResponse = await axios.post(`http://localhost:5000/chat-completion`, {
                    mainPrompt: message,
                    context: res.data.response.matching_texts
                })
                console.log('Here 2')

                console.log(openAiResponse.data.text)
                setResponse(openAiResponse.data.text)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }

    }

    const [message, setMessage] = useState('')
    const [chats, setChats] = useState<MessageInterface[]>([])
    const [title, setTitle] = useState('')
    const [chat_id, setChat_id] = useState(localStorage.getItem('chat_id') || '')

    useEffect(() => {
        setChat_id(localStorage.getItem('chat_id') || '')
    }, [])
    // console.log(title)
    // console.log(chats)
    // console.log(chat_id)
    const handleChatCompletion = async () => {
        if (message.length === 0) {
            alert('Please enter a message');
            return;
        }
        setLoading(true);

        const newMessage: MessageInterface = {
            role: 'user',
            content: message
        };

        setChats((prev) => [...prev, newMessage]);
        setMessage('');

        // Simulate a response from the assistant (for demonstration purposes)
        const chatData = await sendChatRequest(message, chat_id);

        setChats([...chatData.response]);
        setLoading(false);
    };

    console.log(chat_id)
    useLayoutEffect(() => {
        if (auth?.isLoggedin && auth?.user) {
            toast.loading('Fetching chats...', { id: 'fetching-chats' })
            getSingleChat(chat_id).then((data) => {
                // console.log(data.title)
                setTitle(data.title)
                setChats(data.chats)
                setChat_id(data._id)
                localStorage.setItem('chat_id', data._id)
                if (data.chats.length > 0) {
                    toast.success('Chats restored successfully', { id: 'fetching-chats' })
                }

            }).catch((e) => {
                // console.log(e)
                toast.error('Unable to fetch chats')
            }).finally(() => {
                toast.dismiss('fetching-chats')
            })
        }
    }, [auth?.user, chat_id])


    return (
        <div className='h-full bg-slate-100 sm:p-4 p-2 relative'>
            <div className='text-end flex justify-between py-2 sm:py-0'>
                <div className='flex items-center gap-2 cursor-pointer mb-5'>
                    {
                        title &&
                        <p>CONTENT - {title.toUpperCase()}</p>
                    }
                </div>
            </div>
            <div className='max-h-[75vh] overflow-y-auto pb-10'>
                {/* first chat question if chat is empty*/}
                <div className='flex items-center gap-2'>
                    <RiRobot3Fill className='min-w-10 min-h-10 border-2 rounded-full p-2' />
                    <p className={`rounded-lg py-2 px-5 inline shadow-md bg-gray-100 dark:bg-gray-800 text-gray-100`}>
                        Hello sir, How can I assist you?
                    </p>
                </div>

                {/* <div className='text-end w-full'>
                    {
                        response?.length > 0 && message &&
                        <p className='bg-indigo-600 text-white inline-block px-4 py-2 rounded-lg'>
                            {message}
                        </p>
                    }
                </div> */}

                {/* {response?.map((res: any, index) => {
                    return (
                        <div key={index}
                            className={`text-start ${res.role == 'assistant' ? 'block' : 'hidden'} mt-3`}
                        >
                            <p className='bg-slate-200 text-black inline-block px-3 py-5 rounded-lg' >
                                {res.role == 'assistant' && res.content}
                            </p>
                        </div>
                    )
                })} */}
                <div className="flex-1 overflow-y-auto space-y-5 pb-8">
                    {chats.map((chat, index) => (
                        <div key={index} className={`flex items-start space-x-3 ${chat.role === 'user' ? 'justify-end' : ''} ${index == 0 && 'mt-4 md:mt-0'}`}>
                            {chat.role === 'assistant' && (
                                <RiRobot3Fill className='min-w-10 min-h-10 border-2 rounded-full p-2' />
                            )}

                            <div className={`rounded-lg py-2 px-5 inline shadow-md text-gray-100 sm:max-w-[70%] max-w-[80%] ${chat.role === 'user' ? ' bg-blue-700' : 'bg-gray-800'}`}>
                                {chat.content}
                            </div>
                            {chat.role === 'user' && (
                                // <RiRobot3Fill className='w-10 h-10 border-2 rounded-full p-2' />
                                <p className='w-10 h-10 border-2 rounded-full p-2 text-center bg-slate-800 text-white'>{auth?.user?.name.charAt(0).toUpperCase()}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 flex w-[97%] gap-2 bg-slate-100">
                <input
                    type="text"
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                    value={message}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleChatCompletion()
                        }
                    }}
                    placeholder="Enter a message"
                    className="relative mt-2 mb-[20px] w-[85%] p-[11px] pr-10 outline-none border border-gray-300 bg-white rounded"
                />
                <button
                    onClick={handleChatCompletion}
                    disabled={loading === true}
                    className={`relative mt-2 mb-[20px] w-[15%] p-[10px] outline-none border border-gray-300 bg-white rounded cursor-pointer ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {loading ? 'Loading..' : 'Send'}
                </button>
            </div>

        </div >
    )
}



export default Chats