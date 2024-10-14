interface ImportMetaEnv {
	readonly VITE_GROQ_API_KEYY: string;
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_ANON_KEY: string;
	readonly VITE_PROJECT_REF: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
