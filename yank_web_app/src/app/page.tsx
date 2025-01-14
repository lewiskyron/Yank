import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createClient } from "@/api/supabase/serverClient";

export const metadata: Metadata = {
	title: "Yank - Build Flashcards at the speed of light",
	description: "Revolutionize Learning: AI-Powered Spaced Repetition Platform",
};

export default async function Home() {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	return (
		<>
			<DefaultLayout user={user}>
				<Breadcrumb pageName="Home" />
			</DefaultLayout>
		</>
	);
}
