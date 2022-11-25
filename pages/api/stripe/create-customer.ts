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
      const { data } = await stripe.customers.search({
        query: `email:\'xjohnx@testing.com\'`,
      });

      if (data.length === 0) {
        const newUser = await stripe.customers.create({
          description: "Customer created from api!",
          name: session.user.user_metadata.full_name,
          email: session.user.email,
        });
        return res.status(200).json({ userId: newUser.id });
      }
      return res.status(200).json({ message: "User already registered" });
    } catch (e) {
      return res.status(400).json(e);
    }
  }
  res.status(403).json("Permission Denied");
}
