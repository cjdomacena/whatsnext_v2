import { SupabaseClient } from "@supabase/supabase-js";

export const getReviews = async (movieId: number, supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*,profiles(full_name,is_verified)")
    .eq("movie_id", movieId)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
