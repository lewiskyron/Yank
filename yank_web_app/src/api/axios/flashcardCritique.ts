import { TransformedFlashcard } from "@/types/flashcard.types";
import geminiAPI from "./configAxios";
import { CritiqueResponse } from "@/types/flashcard.types";

type CritiqueResult = {
	success: boolean;
	data?: CritiqueResponse;
	error?: string;
};

export async function getCritique(
	flashcard: TransformedFlashcard | null,
	userAnswer: string,
): Promise<CritiqueResult> {
	if (!flashcard) {
		return {
			success: false,
			error: "No flashcard provided",
		};
	}

	if (!userAnswer.trim()) {
		return {
			success: false,
			error: "No answer provided",
		};
	}

	try {
		const prompt = `You are an expert educational AI tutor. You are reviewing a student's answer to a flashcard question Question: ${flashcard.question} 
        and Student's answer: ${userAnswer}.Please respond as if you are a knowledgeable teacher talking directly to the student.Please evaluate the student's answer and provide:
        1. Description of the student's response into on of these buckets: [Correct, Wrong or Not Quite]
        2. For correct answer provide what is done well and the key words that the user got right
        3. For Not quite: Provide critique separating the right and wrong parts. Let this be detailed and concise.
        4. For wrong: Explain why the answer is wrong and provide the correct answer. . Let this be detailed and concise.

        Respond in JSON format with the following structure:
        {
        "evaluation": "",
        "critique": {
            "correct_parts": "",
            "incorrect_parts": "",
            "corrected_answer": ""
        }
        Note that if the answer is correct, the incorrect_parts and corrected_answer fields should be empty.
        `;
		const requestBody = {
			contents: [
				{
					parts: [
						{
							text: prompt,
						},
					],
				},
			],
			tools: [
				{
					google_search: {},
				},
			],
		};

		const response = await geminiAPI.post(
			`/gemini-2.0-flash:generateContent`,
			requestBody,
		);

		if (response.status === 429) {
			return {
				success: false,
				error:
					"Oops! You have exceeded your daily quota. Please try again tomorrow.",
			};
		}

		if (
			response.status === 500 ||
			response.status === 503 ||
			response.status === 503
		) {
			return {
				success: false,
				error: "Oops! Something went wrong. Please try again later.",
			};
		}

		if (response.status !== 200) {
			return {
				success: false,
				error: "Oops! Something went wrong. Please try again later.",
			};
		}

		const text = response.data.candidates[0].content.parts[0].text;
		const jsonString = text
			.replace(/^```json\s*/, "") // remove ```json plus any newline/spaces
			.replace(/```$/, "") // remove the closing backticks
			.trim();
		let parsedText: CritiqueResponse;
		try {
			parsedText = JSON.parse(jsonString);
		} catch (e) {
			return {
				success: false,
				error: "Invalid JSON response",
			};
		}
		return {
			success: true,
			data: parsedText,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}
