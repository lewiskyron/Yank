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

	

	const backgroundImage: Array<string> = [
		"https://wbxueysawskymjeqmssw.supabase.co/storage/v1/object/public/profile_backgrounds//paul-earle-xJ2tjuUHD9M-unsplash.jpg",
		"https://wbxueysawskymjeqmssw.supabase.co/storage/v1/object/public/profile_backgrounds//pawel-czerwinski-ZlHvmQ0igW4-unsplash.jpg",
		"https://wbxueysawskymjeqmssw.supabase.co/storage/v1/object/public/profile_backgrounds//sumner-mahaffey-7Y0NshQLohk-unsplash.jpg",
		"https://wbxueysawskymjeqmssw.supabase.co/storage/v1/object/public/profile_backgrounds//tyler-lastovich-1755wsQzce8-unsplash.jpg",
		"https://wbxueysawskymjeqmssw.supabase.co/storage/v1/object/public/profile_backgrounds//vinoth-ragunathan-cvQ6wD3bPYE-unsplash.jpg",
	];

	const ranadomBackgroundImage = backgroundImage[Math.floor(Math.random() * backgroundImage.length)];



	return (
		<DefaultLayout user={user}>
			<div className="mx-auto w-full max-w-[970px]">
				<Breadcrumb pageName="Profile" />

				<ProfileBox user={user} backgroundImage={ranadomBackgroundImage} />
			</div>
		</DefaultLayout>
	);
}
