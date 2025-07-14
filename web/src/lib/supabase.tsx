import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_PUBLIC_SUPABASE_URL ?? "http://localhost:54321";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY ?? "xxxx";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
