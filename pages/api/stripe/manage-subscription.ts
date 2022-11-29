import { BASE_URL } from "@lib/constants/config";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const { data } = await supabase
      .from("profiles")
      .select("stripe_id")
      .eq("id", session.user.id)
      .single();

    const stripe = new Stripe(process.env.STRIPE_KEY as string, {
      apiVersion: "2022-11-15",
    });
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: data?.stripe_id,
      return_url: BASE_URL,
    });
    res.redirect(303, stripeSession.url);
    return;
  }
  res.status(403).json("Unauthorized Request");
  return;
};

export default handler;
