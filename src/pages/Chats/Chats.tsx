// import axios from 'axios'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { RiRobot3Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContent'
import { getSingleChat, sendChatRequest } from 'src/helpers/api-communicator'
import { chatIdAtom, limitAtom, titleAtom, usageAtom, usagePercentageAtom } from 'src/store/jotai'
import { VscSend } from 'react-icons/vsc'
import { BiLoader } from 'react-icons/bi'
import { IoCopyOutline } from 'react-icons/io5'

interface MessageInterface {
    role: 'system' | 'user' | 'assistant',
    content: string
}

const Chats: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [percentage, setPercentage] = useAtom(usagePercentageAtom)
    const usage = useAtomValue(usageAtom)
    const limit = useAtomValue(limitAtom)
    // console.log(percentage, usage)

    useEffect(() => {
        setPercentage((usage / limit) * 100);
    }, [usage]);
    // const [response, setResponse] = useState([])
    // const handleChatResponse = async () => {
    //     console.log(message)
    //     if (message.length == 0) {
    //         alert('Please enter a message')
    //     }
    //     setLoading(true)
    //     try {
    //         const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/wf/vectorSearch`, {
    //             prompt: message,
    //             project: import.meta.env.VITE_PROJECT_NAME,
    //             n: 5,
    //             openai_api_key: import.meta.env.VITE_OPENAI_API_KEY
    //         })

    //         // console.log(res)
    //         if (res) {
    //             console.log('Here')
    //             console.log(res.data.response.matching_texts)
    //             const openAiResponse = await axios.post(`http://localhost:5000/chat-completion`, {
    //                 mainPrompt: message,
    //                 context: res.data.response.matching_texts
    //             })
    //             console.log('Here 2')

    //             console.log(openAiResponse.data.text)
    //             setResponse(openAiResponse.data.text)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     } finally {
    //         setLoading(false)
    //     }

    // }

    const [message, setMessage] = useState('')
    const [chats, setChats] = useState<MessageInterface[]>([])
    const [title, setTitle] = useAtom(titleAtom)
    const [chat_id, setChat_id] = useAtom(chatIdAtom)
    const chatContainerRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chats]);

    useEffect(() => {
        setChat_id(localStorage.getItem('chat_id') || '')
    }, [])


    // console.log(title)
    // console.log(chats)
    // console.log(chat_id)


    const handleChatCompletion = async () => {
        // console.log('hit')
        if (loading) return

        if (auth?.user == null) {
            toast.error('Please login to continue')
            navigate('/login')
            return
        }

        if (message.length === 0) {
            // alert('Please enter a message');
            toast.error('Please enter a message')
            return;
        }

        if (percentage >= 100) {
            toast.error('You have reached the maximum usage limit. Please upgrade your plan')
            return
        }

        setLoading(true);

        if (chats.length == 0) {
            setTitle(message)
        }

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
                toast.error('No chat avaiable')
            }).finally(() => {
                toast.dismiss('fetching-chats')
            })
        }
    }, [auth?.user, chat_id])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard')
        });
    };

    const isCodeBlock = (content: string) => {
        const codeBlockRegex = /^```[\s\S]*```$/;
        return codeBlockRegex.test(content.trim());
    }

    const formatContent = (content: string) => {
        if (isCodeBlock(content)) {
            // Strip the leading and trailing triple backticks
            const codeContent = content.replace(/^```/, '').replace(/```$/, '');
            return (
                <pre className="bg-gray-900 p-3 my-2 rounded-md overflow-x-auto">
                    <code>{codeContent}</code>
                </pre>
            );
        } else {
            return <p>{content}</p>;
        }
    }

    return (
        <div className='h-full bg-slate-100 sm:p-4 p-2 relative rounded-md'>
            {/* for title of page using react Helmet*/}
            <Helmet>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Chats - Cosmos AI </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className='text-end flex justify-center'>
                {
                    title && title !== "" && title !== "No title" && (
                        <p className='text-center border-b-2 w-full pb-4 font-semibold text-sm'>CONTEXT - {title.toUpperCase()}</p>
                    )
                }
            </div>
            <div className='max-h-[75vh] overflow-y-auto pb-10'>
                {/* first chat question if chat is empty*/}
                <div className='flex items-center gap-2 my-4'>
                    <RiRobot3Fill className='min-w-10 min-h-10 border-2 rounded-full p-2' />
                    <p className={`rounded-lg py-2 px-5 inline shadow-md bg-gray-100 dark:bg-gray-800 text-gray-100`}>
                        Hello sir, How can I assist you?
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-5 pb-8" >
                    {chats.map((chat, index) => (
                        <div key={index} className={` flex items-start space-x-3 ${chat.role === 'user' ? 'justify-end' : ''} ${index == 0 && 'mt-4 md:mt-0'}`}>
                            {chat.role === 'assistant' && (
                                <RiRobot3Fill className='min-w-10 min-h-10 border-2 rounded-full p-2' />
                            )}


                            <div className={`relative rounded-lg py-2 px-5 inline shadow-md text-gray-100 sm:max-w-[80%] max-w-[72%] ${chat.role === 'user' ? 'bg-blue-700' : 'bg-gray-800'}`}>
                                <button
                                    onClick={() => copyToClipboard(chat.content)}
                                    className={`absolute bottom-0 p-2 bg-slate-200 rounded-md hover:bg-blue-100 text-black transition-all duration-300 ease-in-out ${chat.role === 'user' ? '-left-10' : '-right-10'}`}
                                >
                                    <IoCopyOutline />
                                </button>

                                {formatContent(chat.content)}
                            </div>


                            {chat.role === 'user' && (
                                // <RiRobot3Fill className='w-10 h-10 border-2 rounded-full p-2' />
                                <p className='w-10 h-10 border-2 rounded-full p-2 text-center bg-slate-800 text-white'>{auth?.user?.name.charAt(0).toUpperCase()}</p>
                            )}
                        </div>
                    ))}

                    {
                        loading && <div className={`flex items-start space-x-3 justify-start mt-4 md:mt-0`}>
                            <RiRobot3Fill className='min-w-10 min-h-10 border-2 rounded-full p-2' />
                            <div className="rounded-lg py-2 px-5 inline shadow-md text-gray-100 bg-gray-800 max-w-[80%]" >
                                Mahi bot is thinking...
                            </div>
                        </div>
                    }

                    <div ref={chatContainerRef} />
                </div>
            </div>

            <div className="absolute bottom-0 w-[97%] bg-slate-100 flex gap-2">
                <input
                    disabled={loading}
                    type="text"
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                    value={message}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) {
                            console.log('Shift + Enter')
                            setMessage(message + '\n')
                            return
                        }

                        if (e.key === 'Enter') {
                            handleChatCompletion()
                        }

                    }}
                    placeholder={chats?.length == 0 ? 'Write your first message..' : 'Enter a message'}
                    className="relative mt-2 mb-[20px] w-[85%] p-[11px] pr-10 outline-none border border-gray-300 bg-white rounded"
                />
                <button
                    onClick={handleChatCompletion}
                    disabled={loading === true}
                    className={`relative mt-2 mb-[20px] w-[15%] p-[10px] outline-none border border-gray-300 bg-white rounded cursor-pointer ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {loading ? <p className='flex justify-center items-center gap-2'>
                        <span className='hidden md:block'>Loading..</span>
                        <BiLoader className='w-4 h-4 mt-1 animate-spin' />
                    </p> :
                        <p className='flex justify-center items-center gap-2'>
                            <span className='hidden md:block'>Send</span>
                            <VscSend className='w-4 h-4 mt-1' />
                        </p>
                    }
                </button>
            </div>

        </div >
    )
}



export default Chats