const SUPABASE_URL = "https://mwwlsoqdsowvimvdtpyp.supabase.co";
const SUPABASE_KEY = "TVOJ_PUBLISHABLE_KEY";

window.db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase client:", supabase);
console.log("window.supabase:", window.supabase);