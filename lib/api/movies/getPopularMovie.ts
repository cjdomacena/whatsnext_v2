import { BASE_URL } from "@lib/constants/config";

export const getPopularMovie = async () => {
  try {
    const req = await fetch(`${BASE_URL}/api/list/movie/popular`);
    const res = await req.json();

    if (res.hasOwnProperty("error")) {
      throw new Error(res.error);
    }

    return res;
  } catch (e) {
    console.log(e);
  }
};
