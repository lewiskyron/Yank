/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { type User } from "@supabase/supabase-js";
import supabaseClient from "@/api/supabase/supabaseClient";
import AlertError from "../Alerts/AlertError";

interface FlashcardsProps {
	user: User | null;
}

const Flashcards: React.FC<FlashcardsProps> = ({ user }) => {
	const [flashcards, setFlashcards] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchFlashcards = async () => {
		if (!user) {
			setFlashcards([]);
			return;
		}

		setLoading(true);
		setError(null);

		const { data, error } = await supabaseClient
			.from("Flashcard")
			.select("*")
			.eq("user_id", user.id);

		if (error) {
			console.error("Error fetching flashcards:", error);
			setError("Failed to load flashcards.");
		} else if (data) {
			setFlashcards(data);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchFlashcards();
	}, [user]);

	return (
		<div className="p-6">
			<h1 className="mb-4 text-2xl font-semibold">Your Flashcards</h1>

			{loading && <p className="text-gray-500">Loading flashcards...</p>}
			{error && <AlertError errors={[error]} />}

			{!loading && !error && flashcards.length === 0 && (
				<p className="text-gray-500">No flashcards found. Add some!</p>
			)}

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{flashcards.map((flashcard) => (
					<div
						key={flashcard.flashcards_id}
						className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
					>
						<p className="text-gray-700">{flashcard.text}</p>
					</div>
				))}
			</div>

			<button
				onClick={fetchFlashcards}
				className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-2xl font-bold text-white shadow-md transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
				aria-label="Refresh flashcards"
			>
				🔄
			</button>
		</div>
	);
};

export default Flashcards;
