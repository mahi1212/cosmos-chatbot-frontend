import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post('/user/login', { email, password }, { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Login failed');
    }
    const data = res.data;
    return data;
};

export const signupUser = async (name: string, email: string, password: string) => {
    const res = await axios.post('/user/signup', { name, email, password }, { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Signup failed');
    }
    const data = res.data;
    return data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get('/user/auth-status', { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to authenticate user');
    }
    const data = res.data;
    return data;
};

export const sendChatRequest = async (message: string, chat_id: string) => {
    const res = await axios.post('/chat/new', { message, chat_id }, { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to send chat request');
    }
    const data = res.data;
    return data;
};

export const getAllChats = async () => {
    const res = await axios.get('/chat/get-all-chats', { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to get chat history');
    }
    const data = res.data;
    return data;
};

export const getSingleChat = async (chat_id: string) => {
    const res = await axios.get(`/chat/get-chat?id=${chat_id}`, { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to get chat history');
    }
    const data = res.data;
    return data;
};

export const deleteSingleChat = async (chat_id: string) => {
    const res = await axios.delete('/chat/delete-single-chat', {
        data: { chat_id },
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to delete chat history');
    }
    const data = res.data;
    return data;
};

export const logoutUser = async () => {
    const res = await axios.get('/user/logout', { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to logout');
    }
    const data = res.data;
    return data;
};

export const getSettings = async (id: string) => {
    const res = await axios.get('/user/settings?id=' + id, { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to get settings');
    }
    const data = res.data;
    return data;
};

interface SettingsInterface {
    system_prompt?: string,
    gpt_version?: string,
    temperature?: number,
    max_tokens?: number,
    top_p?: number,
    frequency_penalty?: number,
    token_usage?: number
}

export const updateSettings = async (settings: SettingsInterface) => {
    const res = await axios.patch('/user/settings', { settings }, { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to update settings');
    }
    const data = res.data;
    return data;
};

export const translateText = async (content: string, operation: string, target_language: string) => {
    const res = await axios.post('/translation/translate-rewrite', { content, operation, target_language }, { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to translate text');
    }
    const data = res.data;
    return data;
};

export const makePayment = async (session_id: string) => {
    const res = await axios.patch('/user/payment', { session_id }, { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to make payment');
    }
    const data = res.data;
    return data;
};

export const checkTier = async () => {
    const res = await axios.get('/user/check-tier', { 
        withCredentials: true 
    });

    if (res.status !== 200) {
        throw new Error('Unable to check tier');
    }
    const data = res.data;
    return data;
};
