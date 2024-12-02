import axios from 'axios';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next';




export const api = axios.create({
  baseURL: '/',
  withCredentials: true // Importante para enviar cookies
});

// Adiciona um interceptador de requisições
api.interceptors.request.use(
  (config) => {
    // 1. Obter o token do cookie
    
    const accessToken = getCookie('accessToken');
   //  2. Adicionar o token ao header Authorization
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Lida com erros na requisição
    return Promise.reject(error);
  }
);