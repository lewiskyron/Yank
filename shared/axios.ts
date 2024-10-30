import axios, { AxiosInstance } from "axios";

const createApi = (apiKey: string): AxiosInstance => {
	return axios.create({
		baseURL: "https://api.groq.com/openai/v1/chat",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
	});
};

export default createApi;
