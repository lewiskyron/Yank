import axios, { AxiosInstance } from "axios";

const GeminiApi: AxiosInstance = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/models',
  headers: {'Content-Type': 'application/json',
    'x-goog-api-key': process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
  params: {
    key: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },    
});

export default GeminiApi;