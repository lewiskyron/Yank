import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SettingBoxes from "@/components/SettingBoxes";
import { createClient } from "@/api/supabase/serverClient";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
	description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

export default async function Settings() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	return (
		<DefaultLayout user={data.user}>
			<div className="mx-auto w-full max-w-[1080px]">
				<Breadcrumb pageName="Settings" />

				<SettingBoxes />
			</div>
		</DefaultLayout>
	);
}
