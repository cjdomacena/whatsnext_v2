import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { media, id, page } = req.query;
  const hasWatchProviderFilter = Object.prototype.hasOwnProperty.call(
    req.query,
    "providers"
  );
  const watchRegionFilter = hasWatchProviderFilter
    ? `&with_watch_providers=${req.query.providers}&watch_region=US`
    : "";

  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/discover/${media}?api_key=${
        process.env.TMDB_API_KEY
      }&with_genres=${id}&sort_by=popularity.desc${watchRegionFilter}&page=${
        page ?? 1
      }`
    );

    const results = await data.json();
    const hasError = Object.prototype.hasOwnProperty.call(results, "success");

    if (hasError && !results.success) {
      throw new Error(results.status_message);
    }
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=5400"
    );
    return res.status(200).json(results);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
    return res.status(500).json({ error: "Something went wrong..." });
  }
}
