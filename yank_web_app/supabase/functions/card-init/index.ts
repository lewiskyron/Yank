/* eslint-disable */
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import type { Tables } from "../../../src/types/database.types.ts";
import { createClient } from "npm:@supabase/supabase-js@2.45.6";
import { Card, createEmptyCard } from "npm:ts-fsrs@4.6.0";

console.log("Hello from Card-init Functions!");

const supabase = createClient(
	Deno.env.get("SUPABASE_URL"),
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
);

type CardRecord = Tables<"Flashcard">;

interface CardPayload {
	type: "INSERT" | "UPDATE" | "DELETE";
	record: CardRecord;
	schema: "public";
}

Deno.serve(async (req) => {
	try {
		if (req.method !== "POST") {
			console.error("Invalid request method:", req.method);
			return new Response(JSON.stringify({ error: "Method not allowed" }), {
				status: 405,
				headers: { "Content-Type": "application/json" },
			});
		}

		const FlashcardRecordPayload: CardPayload = await req.json();
		const { flashcard_id } = FlashcardRecordPayload.record;
		const card: Card = createEmptyCard();

		const responseData = {
			state: card.state, // The current state of the card (New, Learning, Review, Relearning)
			due: card.due, // Date when the card is next due for review
			stability: card.stability, // A measure of how well the information is retained
			difficulty: card.difficulty, // Reflects the inherent difficulty of the card content
			scheduled_days: card.scheduled_days, // The interval at which the card is next scheduled
			reps: card.reps, // Total number of times the card has been reviewed
			lapses: card.lapses, // Times the card was forgotten or remembered incorrectly
			last_review: card.last_review, // The most recent review date, if applicable
		};

		console.log(responseData);

		const { error } = await supabase
			.from("Flashcard")
			.update(responseData)
			.eq("flashcard_id", flashcard_id);

		if (error) {
			console.error("Database error:", error);
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}

		return new Response(
			JSON.stringify({ message: "Flashcard fsrs record updated successfully" }),
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	} catch (error) {
		console.error("Unexpected error:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
});
