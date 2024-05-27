import axios from 'axios'
import { useState } from 'react'

const Chats: React.FC = () => {
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChatResponse = async () => {
        console.log(message)
        if (message.length == 0) {
            alert('Please enter a message')
        }
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/vectorSearch`, {
                prompt: message,
                project: import.meta.env.VITE_PROJECT_NAME,
                n: 5,
                openai_api_key: import.meta.env.VITE_OPENAI_API_KEY
            })

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
    return (
        <div className='h-full bg-slate-100 sm:p-4 p-2 relative'>
            <div className='max-h-[75vh] overflow-y-auto py-10'>
                {/* first chat question*/}
                <p className="bg-slate-200 inline-block px-4 rounded-full py-1">
                    Hello sir, How can I assist you?
                </p>

                <div className='text-end w-full'>
                    {
                        response?.length > 0 && message &&
                        <p className='bg-indigo-600 text-white inline-block px-4 py-2 rounded-lg'>
                            {message}
                        </p>
                    }
                </div>

                {response?.map((res: any, index) => {
                    return (
                        <div key={index}
                            className={`text-start ${res.role == 'assistant' ? 'block' : 'hidden'} mt-3`}
                        >
                            <p className='bg-slate-200 text-black inline-block px-3 py-5 rounded-lg' >
                                {res.role == 'assistant' && res.content}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className='absolute w-[97%] flex gap-2 bottom-0'>
                <input
                    type="text"
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            handleChatResponse()
                        }
                    }}
                    placeholder="Enter a message"
                    style={{
                        position: "relative",
                        marginTop: '10px',
                        bottom: "20px",
                        width: "85%",
                        padding: "11px 10px",
                        outline: 'none',
                        border: "1px solid #ccc",
                        background: "#fff",
                        borderRadius: "5px"
                    }}
                />
                <button
                    onClick={handleChatResponse}
                    disabled={loading == true}
                    style={{
                        position: "relative",
                        marginTop: '10px',
                        bottom: "20px",
                        width: "15%",
                        padding: "10px",
                        outline: 'none',
                        border: "1px solid #ccc",
                        background: "#fff",
                        borderRadius: "5px",
                        cursor: 'pointer'
                    }}
                >
                    {
                        loading ? 'Loading..' : 'Send'
                    }
                </button>
            </div>

        </div >
    )
}

export default Chats