import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProfileBox from "@/components/ProfileBox";
import { createClient } from "@/api/supabase/serverClient";

export const metadata: Metadata = {
	title: "Yank",
	description:
		"This is a web app where users can create and review flashcards.",
};

export default async function Profile() {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	return (
		<DefaultLayout user={user}>
			<div className="mx-auto w-full max-w-[970px]">
				<Breadcrumb pageName="Profile" />

				<ProfileBox user={user} />
			</div>
		</DefaultLayout>
	);
}
