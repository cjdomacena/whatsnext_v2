import { SupabaseClient } from "@supabase/supabase-js";

export const subscriptionInfo: any = async (
  userId: string,
  supabase: SupabaseClient
) => {
  const { data } = await supabase
    .from("profiles")
    .select("is_subscribed, stripe_id")
    .eq("id", userId)
    .single();
  return data;
};
