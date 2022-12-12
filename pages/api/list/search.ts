import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, include_adult, page, query } = req.query;

  const constructQueries = `language=en-US&include_adult=${include_adult}&query=${query}&page=${page}`;

  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/search/${type}?api_key=${process.env.TMDB_API_KEY}&${constructQueries}`
    );

    const results = await data.json();
    const hasError = Object.prototype.hasOwnProperty.call(results, "success");
    if (hasError && !results.success) {
      throw new Error(results.errors);
    }
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=3600"
    );
    return res.status(200).json(results);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
      return;
    }
    return res.status(500).json({ error: "Something went wrong..." });
  }
}
