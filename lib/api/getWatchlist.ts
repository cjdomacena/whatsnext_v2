import { SupabaseClient } from "@supabase/supabase-js";

export const getWatchList = async (
  username: string | undefined,
  supabase: SupabaseClient
) => {
  if (username) {
    const { data, error } = await supabase
      .from("watchlists")
      .select("*")
      .eq("username", username);
    if (error) throw error;
    return data;
  }
  return null;
};
