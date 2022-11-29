import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";
export const config = {
  api: { bodyParser: false },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const signature = req.headers["stripe-signature"] as string;
  const signingSecret = process.env.STRIPE_SIGNING_SECRET as string;
  const reqBuffer = await buffer(req);
  let event;
  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error: any) {
    res.status(400).send(`Webhook error: ${error.message}`);
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SERVICE_KEY as string
  );
  switch (event?.type) {
    case "customer.subscription.created":
      const { error } = await supabase
        .from("profiles")
        .update({ is_subscribed: true })
        //@ts-ignore
        .eq("stripe_id", event.data.object.customer);
      console.log(error);
      break;

    case "customer.subscription.deleted":
      await supabase
        .from("profiles")
        .update({ is_subscribed: false })
        // @ts-ignore
        .eq("stripe_id", event.data.object.customer);
      break;
  }

  res.send({ recieved: true });
};

export default handler;
