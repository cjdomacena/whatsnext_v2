import { SupabaseClient } from "@supabase/supabase-js";

export const getVerifiedReview = async (
  title_id: string,
  media_type: string,
  supabase: SupabaseClient
) => {
  const ids = [436270, 119051, 12345];
  const { data, error } = await supabase
    .from("featured_reviews")
    .select("*, profiles(full_name)")
    .eq("media_type", "movie")
    .eq("movie_id", ids[Math.floor(Math.random() * 3)])
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return data;
};
