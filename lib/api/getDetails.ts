import { BASE_URL } from "@lib/constants/config";

export const getDetails = async (id: string | number, type: "tv" | "movie") => {
  try {
    const req = await fetch(`${BASE_URL}/api/details/${type}/${id + ""}`);
    const res = await req.json();

    if (type === "tv") {
      const { name: title, ...rest } = res;
      return { title, ...rest };
    }

    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
