import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zivbvabnwwhwdgrrxbcv.supabase.co";
const supabaseKey = "sb_publishable_YmtwRQsmlqhQCQ5T0do2Ig_nhySP9HW";

export const supabase = createClient(supabaseUrl, supabaseKey);
