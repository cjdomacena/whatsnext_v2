export const IMAGE_URL = "https://image.tmdb.org/t/p";
export const QUERY_CONFIG = {
  cacheTime: 5000,
  staleTime: 5000,
  refetchOnWindowFocus: false,
  retry: 1,
};
const vercel_env = process.env.NEXT_PUBLIC_VERCEL_ENV;
export const BASE_URL = vercel_env
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const PROVIDER_ICON_URL = "https://www.themoviedb.org/t/p/original";

export const BLUR_DATA =
  "data:image/webp;base64,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";
