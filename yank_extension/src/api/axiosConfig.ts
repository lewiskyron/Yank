import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: "https://api.openai.com/v1/chat", // OPENAI API 
	// baseURL: "https://api.groq.com/openai/v1/chat",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
	},
});

export default api;
