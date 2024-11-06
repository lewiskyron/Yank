import Flashcards from "@/components/Dashboard/Flashcards";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createClient } from "@/api/supabase/serverClient";

export const metadata: Metadata = {
	title:
		"Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
	description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default async function Home() {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	return (
		<>
			<DefaultLayout user={user}>
				<Breadcrumb pageName="Flashcards" />
				<Flashcards user={user} />
			</DefaultLayout>
		</>
	);
}
