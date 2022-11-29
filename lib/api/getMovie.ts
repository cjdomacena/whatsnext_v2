import { BASE_URL } from "@lib/constants/config";

export const getMovie = async (id: string | number) => {
  try {
    const req = await fetch(`${BASE_URL}/api/movie/${id + ""}`);
    const res = await req.json();
    return res;
  } catch (error: any) {
    console.log(error);
  }
  return null;
};
