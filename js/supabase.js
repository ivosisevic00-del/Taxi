// ===============================================
// ZDRAVI RAZUM ERP
// supabase.js
// ===============================================

const SUPABASE_URL = "https://mwwlsoqdsowvimvdtpyp.supabase.co";

const SUPABASE_KEY = "sb_publishable_WD0YaRZFdNSOWPpC9gaDVA_3srfc00g";

window.db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("✅ Supabase spojen");