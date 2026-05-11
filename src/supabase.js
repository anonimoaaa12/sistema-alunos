import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kdxsmracggjqkdawhzsk.supabase.co";
const supabaseKey = "sb_publishable__bwSoJMeGUV2yy34Db_DQw_kUcRAb6x";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);