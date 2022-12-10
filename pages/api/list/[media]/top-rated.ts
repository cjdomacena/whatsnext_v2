import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { media, page } = req.query;
  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/${media}/top_rated?api_key=${
        process.env.TMDB_API_KEY
      }&page=${page ?? 1}&region=US`
    );

    const results = await data.json();
    const hasError = Object.prototype.hasOwnProperty.call(results, "success");
    if (hasError && !results.success) {
      throw new Error(results.status_message);
    }
    return res.status(200).json(results);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
    return res.status(500).json({ error: "Something went wrong..." });
  }
}
