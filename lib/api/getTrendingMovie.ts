export const getTrendingMovie = async () => {
  try {
    const req = await fetch(`/api/trending/movie`);
    const res = await req.json();

    if (res.hasOwnProperty("error")) {
      throw new Error(res.error);
    }

    return res;
  } catch (e) {
    alert(e);
  }
};
