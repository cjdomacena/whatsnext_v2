import { BASE_URL } from "@lib/constants/config";

export const getSearchResult = async (
  type: string,
  query: string,
  include_adult: boolean,
  page?: number
) => {
  try {
    const req = await fetch(
      `${BASE_URL}/api/list/search?type=${type}&include_adult=${include_adult}&query=${query}&page=${
        page ?? 1
      }`
    );
    const res = await req.json();
    const hasError = Object.prototype.hasOwnProperty.call(res, "error");
    if (hasError) {
      throw new Error(res.error);
    }
    // Rename object key for tv or multi
    if (type === "tv" || type === "multi") {
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
