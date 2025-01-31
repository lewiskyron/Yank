import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { createClient } from "@/api/supabase/serverClient";
import GettingStartedPage from "@/components/gettingStartedComponents";

export default async function GettingStarted() {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	return (
		<>
			<DefaultLayout user={user}>
				<GettingStartedPage user={user} />
			</DefaultLayout>
		</>
	);
}
