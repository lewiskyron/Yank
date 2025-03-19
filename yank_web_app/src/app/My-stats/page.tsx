import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { createClient } from "@/api/supabase/serverClient";
import StatsContent from "@/components/UserStats/index";

export default async function MyStats() {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	const userName = user?.user_metadata?.full_name || user?.email || "User";

	return (
		<DefaultLayout user={user}>
			<div className="flex min-h-[10px] items-center justify-center">
				<h2 className="text-center text-3xl font-black tracking-tight">
					Welcome <span className="text-[#4F46E5]">{userName}!</span>
				</h2>
			</div>
			<StatsContent user={user} />
		</DefaultLayout>
	);
}
