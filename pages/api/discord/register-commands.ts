import { NextApiRequest, NextApiResponse } from "next";

import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";

import { SEARCH_COMMAND, INVITE_COMMAND } from "@lib/constants/commands";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const commands = await fetch(
    `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/commands`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      },
      method: "PUT",
      body: JSON.stringify([SEARCH_COMMAND]),
    }
  );
  if (commands.ok) {
    return res.status(200).send({ message: "commands registered!" });
  } else {
    const text = await commands.json();
    return res
      .status(500)
      .send({ error: "Error registering commands", message: text });
  }
}
