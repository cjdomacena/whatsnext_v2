import { BASE_URL } from "@lib/constants/config";

export const getTrending = async (
  media: string,
  window: string,
  page?: number
) => {
  try {
    const req = await fetch(
      `${BASE_URL}/api/list/${media}/${window}/trending?page=${page ?? 1}`
    );
    const res = await req.json();
    const hasError = Object.prototype.hasOwnProperty.call(res, "error");

    if (hasError) {
      throw new Error(res.error);
    }
    if (media === "tv") {
      const modifiedResults = res.results.map(
        ({ name: title, ...rest }: any) => ({ title, ...rest })
      );
      res["results"] = modifiedResults;
    }

    return res;
  } catch (e) {
    console.log(e);
  }
};
