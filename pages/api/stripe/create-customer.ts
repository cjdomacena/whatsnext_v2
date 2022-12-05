import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next/types";
import Stripe from "stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).json("Request not authorized.");
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SERVICE_KEY as string
  );
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY as string, {
      apiVersion: "2022-11-15",
    });
    const { data } = await stripe.customers.search({
      // eslint-disable-next-line no-useless-escape
      query: `email:\'xjohnx@testing.com\'`,
    });
    if (data.length === 0) {
      const customer = await stripe.customers.create({
        description: "Customer created from api!",
        name: req.body.record.full_name,
        email: req.body.record.email,
      });
      if (customer) {
        await supabase
          .from("profiles")
          .update({
            stripe_id: customer.id,
          })
          .eq("id", req.body.record.id);
      }

      return res.status(200).json({ userId: req.body.record.id });
    }
    return res.status(200).json({ message: "User already registered" });
  } catch (e) {
    return res.status(400).json(e);
  }
}
