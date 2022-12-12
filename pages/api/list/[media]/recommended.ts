import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { media, id } = req.query;

  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/${media}/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`
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
    return res.status(500).json({ error: "Something went wrong..." });
  }
}
