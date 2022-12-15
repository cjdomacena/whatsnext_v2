import { BASE_URL } from "@lib/constants/config";

export const getTrendingTV = async () => {
  try {
    const req = await fetch(`${BASE_URL}/api/list/tv/week/trending`);
    const res = await req.json();
    const hasError = Object.prototype.hasOwnProperty.call(res, "error");
    if (hasError) {
      throw new Error(res.error);
    }
    // Rename object key for tv
    const modifiedResults = res.results.map(
      ({ name: title, ...rest }: any) => ({
        title,
        media_type: "movie",
        ...rest,
      })
    );
    res["results"] = modifiedResults;

    return res;
  } catch (e) {
    console.log(e);
  }
};
