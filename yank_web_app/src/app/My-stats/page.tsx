import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { createClient } from "@/api/supabase/serverClient";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import StatsContent from "@/components/UserStats/index";

export default async function MyStats() {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	return (
		<DefaultLayout user={user}>
			<div className="mb-6 flex items-center justify-between">
				<Breadcrumb pageName="My Stats" />
			</div>
			<StatsContent />
		</DefaultLayout>
	);
}
