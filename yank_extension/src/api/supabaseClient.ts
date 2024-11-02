import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types.ts";

const supabase: SupabaseClient<Database> = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabase;
