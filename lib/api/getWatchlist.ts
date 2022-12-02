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

export const getWatchListItem = async (
  username: string | undefined,
  supabase: SupabaseClient,
  title_id: string
) => {
  if (username) {
    const { data, error } = await supabase
      .from("watchlists")
      .select("*")
      .eq("username", username)
      .eq("title_id", title_id)
      .single();
    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }
    return data;
  }
  return null;
};
