import { BASE_URL } from "@lib/constants/config";

export const getUpcoming = async (page?: number) => {
  try {
    const req = await fetch(
      `${BASE_URL}/api/list/movie/upcoming?page=${page ?? 1}`
    );
    const res = await req.json();
    const hasError = Object.prototype.hasOwnProperty.call(res, "error");

    if (hasError) {
      throw new Error(res.error);
    }
    return res;
  } catch (e) {
    console.log(e);
  }
};
