import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import FoldersBox from "@/components/FoldersBox";
import { createClient } from "@/api/supabase/serverClient";
import CreateFolder from "@/components/FoldersBox/CreateFolder";

export const metadata: Metadata = {
	title: "Yank Folders Page | Yank - Yank Dashboard",
	description: "This is Yank Folders page for Yank.studio",
};

export default async function Folders() {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	return (
		<>
			<DefaultLayout user={user}>
				<div className="mb-6 flex items-center justify-between">
					<Breadcrumb pageName="Folders" />
					<CreateFolder user={user} />
				</div>
				<FoldersBox user={user} />
			</DefaultLayout>
		</>
	);
}
