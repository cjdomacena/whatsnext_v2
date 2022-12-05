import { BASE_URL } from "@lib/constants/config";

export const getTrendingMovie = async () => {
  try {
    const req = await fetch(`${BASE_URL}/api/list/movie/week/trending`);
    const res = await req.json();
    const hasError = Object.prototype.hasOwnProperty.call(res, "error");

    if (hasError) {
      throw new Error(res.error);
    }

    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};
