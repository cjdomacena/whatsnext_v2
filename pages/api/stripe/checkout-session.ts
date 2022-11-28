import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next/types";
import Stripe from "stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const { data, error } = await supabase
      .from("profiles")
      .select("stripe_id")
      .eq("id", session.user.id)
      .single();

    if (data) {
      try {
        const stripe = new Stripe(process.env.STRIPE_KEY as string, {
          apiVersion: "2022-11-15",
        });
        // const customer = stripe.customers.retrieve()
        const checkoutSession = await stripe.checkout.sessions.create({
          customer: data?.stripe_id,
          line_items: [
            {
              price: "price_1M9AT7EbEpPvaCtHGMmL4WdO",
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `http://localhost:3000/payment/success`,
          cancel_url: `http://localhost:3000/payment/failed`,
          payment_method_types: ["card"],
        });
        if (session) {
          return res.redirect(303, checkoutSession.url as string);
        }
        return res.status(200).json({ message: "Something went wrong.." });
      } catch (e) {
        return res.status(400).json(e);
      }
    }
    return res.status(401).send(`Something went wrong: ${error.message}`);
  }
  res.status(403).json("Permission Denied");
}
