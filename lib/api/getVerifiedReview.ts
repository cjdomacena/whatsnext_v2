import { SupabaseClient } from "@supabase/supabase-js";

export const getVerifiedReview = async (
  title_id: string,
  media_type: string,
  supabase: SupabaseClient
) => {
  const { data, error } = await supabase
    .from("featured_reviews")
    .select("*, profiles(full_name)")
    .eq("media_type", "movie")
    .eq("movie_id", 12345)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return data;
};
