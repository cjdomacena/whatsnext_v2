import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const data = await fetch(
      `${process.env.TMDB_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
    );
    const results = await data.json();
    if (results.hasOwnProperty("success") && !results.success) {
      throw new Error(results.status_message);
    }
    return res.status(200).json(results);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
  }
}
