

import { createClient } from "@supabase/supabase-js";

// Prefer Vite env variables. Create a Supabase client only when a valid URL is
// provided (must start with http:// or https://). If not configured, export a
// minimal stub to avoid crashing the app during development.
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = envUrl || "sb_publishable_SN8jJuzyxtETb2l6O5DQKw_6oiTSNVZ";
const supabaseAnonKey = envKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtYm15YXJhYmR2a3JrdHViZW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNjQ5OTksImV4cCI6MjEwNDk0MDk5OX0.-Y1obySNTu44ic9VsbRYsGC17RcLE1j5qfy9KeGYMDo";

let supabaseClient = null;

if (!supabaseUrl || !/^https?:\/\//i.test(supabaseUrl)) {
  // Invalid or missing URL — do not call createClient with a bad value.
  // This prevents the runtime error: "Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL."
  // Log a helpful message for the developer.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file (example: https://your-project.supabase.co)"
  );

  // Minimal stub with no-op methods that return a consistent error shape.
  const errorResult = async () => ({ data: null, error: new Error("Supabase not configured") });
  supabaseClient = {
    from: () => ({
      select: errorResult,
      insert: errorResult,
      update: errorResult,
      delete: errorResult,
    }),
    auth: {
      signIn: errorResult,
      signUp: errorResult,
      signOut: errorResult,
    },
    // allow direct rpc calls to gracefully fail
    rpc: errorResult,
  };
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
