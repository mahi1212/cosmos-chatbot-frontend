import axios from "axios"


export const loginUser = async (email: string, password: string) => {
    const res = await axios.post('/user/login', { email, password })

    if (res.status !== 200) {
        throw new Error('Login failed')
    }
    const data = await res.data;
    return data
}


export const signupUser = async (name: string, email: string, password: string) => {
    const res = await axios.post('/user/signup', {name, email, password })

    if (res.status !== 200) {
        throw new Error('Login failed')
    }
    const data = await res.data;
    return data
}

export const checkAuthStatus = async () => {
    const res = await axios.get('/user/auth-status')

    if (res.status !== 200) {
        throw new Error('Unable to authenticate user')
    }
    const data = await res.data;
    return data
}

export const sendChatRequest = async (message: string, chat_id: string) => {
    const res = await axios.post('/chat/new', { message, chat_id })

    if (res.status !== 200) {
        throw new Error('Unable to send chat request')
    }
    const data = await res.data;
    return data
}

export const getAllChats = async () => {
    const res = await axios.get('/chat/get-all-chats')

    if (res.status !== 200) {
        throw new Error('Unable to get chat history')
    }
    const data = await res.data;
    return data
}

export const getSingleChat = async (chat_id: string) => {
    const res = await axios.get(`/chat/get-chat?id=${chat_id}`)

    if (res.status !== 200) {
        throw new Error('Unable to get chat history')
    }
    const data = await res.data;
    return data
}

export const deleteSingleChat = async (chat_id: string) => {
    const res = await axios.delete('/chat/delete-single-chat', {
        data: { chat_id }
    })

    if (res.status !== 200) {
        throw new Error('Unable to deelete chat history')
    }
    const data = await res.data;
    return data
}

export const logoutUser = async () => {
    const res = await axios.get('/user/logout')
    if (res.status !== 200) {
        throw new Error('Unable to deelete chat history')
    }
    const data = await res.data;
    return data
}