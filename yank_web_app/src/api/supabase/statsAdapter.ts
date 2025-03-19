import supabaseClient from "./supabaseClient";
import type { User } from "@supabase/supabase-js";
import type { DbFlashcard } from "@/types/flashcard.types";

interface StatsResponse {
	statusCode: number;
	error?: string;
	data?: DbFlashcard[];
	dueCardsCount?: number;
}

export const updateGoalToServer = async (
	user: User | null,
	cardsPerDay: number,
): Promise<StatsResponse> => {
	if (!user) {
		return {
			statusCode: 401,
			error: "Unauthorized",
		};
	}
	const { data, error } = await supabaseClient
		.from("flashcards_statistics")
		.upsert({ daily_goal: cardsPerDay, user_id: user.id })
		.select();

	if (error) {
		return {
			statusCode: 500,
			error: "Error updating goal",
		};
	}

	return {
		statusCode: 200,
		data: data,
	};
};

export const getUserGoal = async (user: User | null) => {
	if (!user) {
		return {
			statusCode: 401,
			error: "Unauthorized",
		};
	}

	const { data, error } = await supabaseClient
		.from("flashcards_statistics")
		.select("*")
		.eq("user_id", user.id);

	if (error) {
		return {
			statusCode: 500,
			error: "Error updating goal",
		};
	}

	return {
		statusCode: 200,
		data: data,
	};
};

export const getDueCards = async (userId: string): Promise<StatsResponse> => {
	if (!userId) {
		return {
			statusCode: 401,
			error: "Unauthorized",
		};
	}

	let dueCardsCount: number = 0;
	const dueCards: DbFlashcard[] = [];
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Set the time to midnight

	const { data, error } = await supabaseClient
		.from("Flashcard")
		.select("*")
		.eq("user_id", userId);

	if (data && data.length > 0) {
		data.forEach((card) => {
			const dueDate = new Date(card.due);
			dueDate.setHours(0, 0, 0, 0); // Set the time to midnight

			if (dueDate <= today) {
				dueCardsCount++;
				dueCards.push(card);
			}
		});
	}

	if (error) {
		return {
			statusCode: 500,
			error: "Error updating goal",
		};
	}

	return {
		statusCode: 200,
		data: dueCards,
		dueCardsCount: dueCardsCount,
	};
};

export async function trackDailyReview(
	userId: string | null,
	folderId: number,
): Promise<StatsResponse> {
	if (!userId) {
		return {
			statusCode: 401,
			error: "Unauthorized",
		};
	}
	const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

	const { data } = await supabaseClient
		.from("daily_review_summary")
		.select("*")
		.eq("user_id", userId)
		.eq("folder_id", folderId)
		.eq("date_key", today);

	if (data && data.length > 0) {
		const currentCount = data[0].cards_reviewed;
		const { error: upsertError, status } = await supabaseClient
			.from("daily_review_summary")
			.update({
				cards_reviewed: currentCount + 1,
			})
			.match({
				user_id: userId,
				folder_id: folderId,
				date_key: today,
			});

		if (upsertError) {
			console.log(upsertError);
		}
		return {
			statusCode: status,
		};
	} else {
		const { error: insertError, status } = await supabaseClient
			.from("daily_review_summary")
			.insert({
				user_id: userId,
				folder_id: folderId,
				cards_reviewed: 1,
				date_key: today,
			});
		if (insertError) {
			console.log(insertError);
			return {
				statusCode: 500,
				error: "Error updating goal",
			};
		}
		return {
			statusCode: status,
		};
	}
}

export async function weeklyReviewInsights(userId: string) {
	if (!userId) {
		return {
			statusCode: 401,
			error: "Unauthorized",
		};
	}
	const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
	const sixDaysAgo = new Date();
	sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
	const sixDaysAgoStr = sixDaysAgo.toISOString().split("T")[0];

	const { data, error, status } = await supabaseClient
		.from("daily_review_summary")
		.select("*")
		.eq("user_id", userId)
		.gte("date_key", sixDaysAgoStr)
		.lte("date_key", today)
		.order("date_key", { ascending: true });

	if (error) {
		console.log(error);
	}
	return {
		statusCode: status,
		data: data,
	};
}

export async function getUserStreak(userId: string) {
	const { data, error } = await supabaseClient
		.from("user_streaks")
		.select("*")
		.eq("user_id", userId);

	if (error) {
		console.log(error);
	}

	return {
		statusCode: 200,
		data: data,
	};
}
