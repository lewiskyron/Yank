import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: "https://api.groq.com/openai/v1/chat",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
	},
});

export default api;
