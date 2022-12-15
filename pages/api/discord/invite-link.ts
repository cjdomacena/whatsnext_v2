import { NextApiRequest, NextApiResponse } from "next";

import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const discordInviteUrl = new URL(
      `https://discord.com/api/oauth2/authorize`
    );
    discordInviteUrl.searchParams.set(
      "client_id",
      process.env.APPLICATION_ID as string
    );
    discordInviteUrl.searchParams.set("permissions", String(8));
    discordInviteUrl.searchParams.set("scope", "bot");
    return res.redirect(discordInviteUrl.href);
  }

  return res.status(401).send({ message: "Unauthorized Request" });
}
