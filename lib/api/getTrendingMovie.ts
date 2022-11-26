export const getTrendingMovie = async () => {
  try {
    const req = await fetch(`http://localhost:3000/api/trending/movie`);
    const res = await req.json();

    if (res.hasOwnProperty("error")) {
      throw new Error(res.error);
    }

    return res;
  } catch (e) {
    console.log(e);
  }
};
