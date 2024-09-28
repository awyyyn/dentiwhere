export const environment = {
	supabase: {
		url: import.meta.env.VITE_DB_URL!,
		anonKey: import.meta.env.VITE_DB_ANON_KEY!,
	},
	providersCallBackUrl: {
		facebook: import.meta.env.VITE_FACEBOOK_CALLBACK_URL!,
		google: import.meta.env.VITE_GOOGLE_CALLBACK_URL!,
	},
	maptilerApiKey: import.meta.env.VITE_MAPTILER_API_KEY,
};
