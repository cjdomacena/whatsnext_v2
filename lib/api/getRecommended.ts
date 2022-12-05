import { BASE_URL } from "@lib/constants/config";
import * as Sentry from "@sentry/nextjs";

export const getRecommended = async (
  media: "tv" | "movie",
  id: number | string
) => {
  try {
    const req = await fetch(
      `${BASE_URL}/api/list/${media}/recommended?id=${id}`
    );
    const res = await req.json();

    if (res.hasOwnProperty("error")) {
      throw new Error(res.error);
    }
    // Rename object key for tv
    if (media === "tv") {
      const modifiedResults = res.results.map(
        ({ name: title, ...rest }: any) => ({ title, ...rest })
      );
      res["results"] = modifiedResults;
    }

    return res;
  } catch (e) {
    Sentry.captureException(e);
    console.log(e);
  }
};
