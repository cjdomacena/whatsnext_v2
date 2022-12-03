import { SupabaseClient } from "@supabase/supabase-js";

export const getProfile = async (
  username: string,
  supabase: SupabaseClient
) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return data;
};
