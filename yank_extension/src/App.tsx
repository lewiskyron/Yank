import "./App.css";
import "./index.css";
import Home from "./Mycomponents/Home";
import supabase from "./api/supabaseClient";
import { useEffect, useState } from "react";

interface Flashcard {
	id: number;
	created_at?: number;
	content?: string;
}

function App() {
	const [fetchError, setFetchError] = useState<string | null>("");

	const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
	useEffect(() => {
		const fetchFlashcards = async () => {
			const { data, error } = await supabase.from("Flashcards").select();

			if (error) {
				setFetchError("Could not fetch Flashcards");
				console.log(error);
				setFlashcards([]);
			}
			if (data) {
				setFlashcards(data);
				setFetchError(null);
			}
		};
		fetchFlashcards();
	}, []);
	return (
		<>
			<div className="container mx-auto flex h-[360px] w-[360px] items-center justify-center rounded-lg">
				{fetchError && <p>{fetchError}</p>}
				{flashcards && (
					<div>
						{flashcards.map((flashcard) => (
							<p>{flashcard.content}</p>
						))}
					</div>
				)}
				<Home />
			</div>
		</>
	);
}
export default App;
