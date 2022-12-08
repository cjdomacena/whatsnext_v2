import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { media } = req.query;

  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/watch/providers/${media}?api_key=${process.env.TMDB_API_KEY}&watch_region=US`
    );

    const results = await data.json();
    const hasError = Object.prototype.hasOwnProperty.call(results, "success");
    if (hasError && !results.success) {
      throw new Error(results.status_message);
    }

    const formatResult = results["results"].map((result: any) => {
      return {
        logo_path: result.logo_path ?? "",
        provider_name: result.provider_name ?? null,
        provider_id: result.provider_id,
        display_priority: result.display_priority,
      };
    });

    return res.status(200).json(formatResult);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
    return res.status(500).json({ error: "Something went wrong..." });
  }
}
