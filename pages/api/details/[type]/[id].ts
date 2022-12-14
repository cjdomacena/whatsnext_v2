import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, type } = req.query;

  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,watch/providers`
    );
    const results = await data.json();
    const hasError = Object.prototype.hasOwnProperty.call(results, "success");

    if (hasError && !results.success) {
      throw new Error(results.status_message);
    }
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=3600"
    );
    return res.status(200).json(results);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
  }
}
