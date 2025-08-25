import axios from 'axios'

export const axiosWrapper = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    timeout: 10000, // 10s timeout
    headers: {
        "Content-Type": "application/json",
    },
})
