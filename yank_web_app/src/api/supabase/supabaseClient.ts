import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseClient: SupabaseClient = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default supabaseClient;
