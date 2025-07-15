import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_PUBLIC_SUPABASE_URL || "http://localhost:54321";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || "your-local-anon-key";

if (!import.meta.env.VITE_PUBLIC_SUPABASE_URL) {
  console.warn(
    "⚠️ VITE_PUBLIC_SUPABASE_URL not set. Using fallback http://localhost:54321"
  );
}

if (!import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    "⚠️ VITE_PUBLIC_SUPABASE_ANON_KEY not set. Using fallback anon key"
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
