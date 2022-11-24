import { BASE_URL } from "@lib/constants/config";

export const getTrendingMovie = async () => {
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  try {
    const req = await fetch(`${BASE_URL}/api/trending/movie`);
    const res = await req.json();

    if (res.hasOwnProperty("error")) {
      throw new Error(res.error);
    }

    return res;
  } catch (e) {
    alert(e);
  }
};
