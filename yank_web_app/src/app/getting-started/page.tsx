import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { createClient } from "@/api/supabase/serverClient";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default async function GettingStarted() {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	return (
		<>
			<DefaultLayout user={user}>
				<div className="mb-6 flex items-center justify-between">
					<Breadcrumb pageName="Getting Started" />
				</div>
				<div className="container mx-auto px-4 py-16">
					<p className="text-xl text-gray-600 dark:text-gray-300">
						This is the getting started page
					</p>
				</div>
			</DefaultLayout>
		</>
	);
}
