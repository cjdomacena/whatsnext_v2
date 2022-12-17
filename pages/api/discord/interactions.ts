import { NextApiRequest, NextApiResponse } from "next";

import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";

import { SEARCH_COMMAND } from "@lib/constants/commands";
import { BASE_URL } from "@lib/constants/config";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = req.headers["x-signature-ed25519"] as string;
  const timestamp = req.headers["x-signature-timestamp"] as string;
  const rawBody = JSON.stringify(req.body);
  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY as string
  );
  if (!isValidRequest) {
    return res.status(401).end("Unauthorized Access");
  }

  const message = req.body;
  if (message.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  } else if (message.type === InteractionType.APPLICATION_COMMAND) {
    switch (message.data.name.toLowerCase()) {
      case SEARCH_COMMAND.name.toLowerCase(): {
        const query = message.data.options[0].value;
        const media_type = message.data.options[1]
          ? message.data.options[1].value
          : null;

        const constructFetchUrl = `${BASE_URL}/api/list/search?type=${
          media_type ?? "multi"
        }&query=${query}`;
        const data = await fetch(constructFetchUrl);
        const jsonData = await data.json();
        if (jsonData && jsonData.results.length > 0) {
          const url = new URL(BASE_URL + "/browse/search");
          if (media_type) {
            url.searchParams.set("type", media_type);
          }
          url.searchParams.set("query", query);
          return res.status(200).send({
            type: 4,
            data: {
              content: `<@${message.member.user.id}> I found ${
                media_type ? `[${media_type}]` : ""
              } [${query}] with ${jsonData.results.length} results. ${url}`,
            },
          });
        } else if (jsonData.results === 0) {
          return res.status(200).send({
            type: 4,
            data: {
              content: `0 results found for: Query = ${query} `,
            },
          });
        } else {
          return res.status(200).send({
            type: 4,
            data: {
              content: `0 results found for: ${
                media_type ? `[${media_type}]` : null
              } [query=${query}]`,
            },
          });
        }
      }
    }
    return res.status(400).send({ error: "Invalid Request" });
  }
}
