import { SupabaseClient } from "@supabase/supabase-js";

export const getReviews = async (
  movieId: number | string,
  supabase: SupabaseClient
) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*,profiles(full_name,is_subscribed)")
    .eq("movie_id", movieId)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
