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
  const token = req.cookies["supabase-auth-token"];
  if (token && session?.user) {
    try {
      const stripe = new Stripe(process.env.STRIPE_KEY as string, {
        apiVersion: "2022-11-15",
      });
      // const customer = stripe.customers.retrieve()
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1M6jfyEbEpPvaCtH6HvxlBOm",
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `http://localhost:3000/auth/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/auth/checkout?success=false&session_id={CHECKOUT_SESSION_ID}`,
      });
      if (session) {
        return res.redirect(303, session.url as string);
      }
      return res.status(200).json({ message: "Something went wrong.." });
    } catch (e) {
      return res.status(400).json(e);
    }
  }
  res.status(403).json("Permission Denied");
}
