import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

export const api = axios.create({
    baseURL: BASE_URL,
    headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        Authorization : `Bearer ${localStorage.getItem('token') || ""}`
    },
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

