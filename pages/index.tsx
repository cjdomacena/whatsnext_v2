import { Loader } from "@components/common/util";
import { Carousel, HeroText } from "@components/ui/home";
import { getPopularMovie } from "@lib/api/movies/getPopularMovie";
import { getTrendingMovie } from "@lib/api/movies/getTrendingMovie";
import { getTrendingTV } from "@lib/api/tv/getTrendingTV";
import { QUERY_CONFIG } from "@lib/constants/config";
import { QueryResult } from "@lib/types/common";
import { IQueryResult } from "@lib/types/movies";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AiOutlineSwapRight } from "react-icons/ai";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: trendingMovie, isLoading: loadingMovie } = useQuery<
    QueryResult<IQueryResult>,
    Error
  >(["trending", "movie"], getTrendingMovie, {
    keepPreviousData: true,
    ...QUERY_CONFIG,
  });
  const { data: trendingTV, isLoading: loadingTV } = useQuery<
    QueryResult<IQueryResult>,
    Error
  >(["trending", "tv"], getTrendingTV, {
    enabled: !!trendingMovie,
    keepPreviousData: true,
    ...QUERY_CONFIG,
  });
  const { data: popularMovie, isLoading: loadingPopular } = useQuery<
    QueryResult<IQueryResult>,
    Error
  >(["popular", "movie"], getPopularMovie, {
    enabled: !!trendingTV,
    keepPreviousData: true,
    ...QUERY_CONFIG,
  });

  return (
    <section className="h-auto my-8 container mx-auto space-y-12 p-4">
      <div className="w-fit py-12">
        <HeroText />
      </div>
      {/* Trending Movie */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-black text-2xl uppercase dark:text-neutral-300 -tracking-wider">
            Trending Movies
          </h2>
          <button
            className="flex items-center gap-1 text-xs opacity-90"
            onClick={() => router.push("/browse/movie/trending")}
          >
            MORE <AiOutlineSwapRight className="w-4 h-4" />
          </button>
        </div>

        {loadingMovie ? <Loader /> : null}
        {trendingMovie && !loadingMovie ? (
          <Carousel data={trendingMovie?.results} media="movie" />
        ) : null}
      </div>

      {/* Trending TV */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-black text-2xl uppercase dark:text-neutral-300 -tracking-wider">
            Trending TV
          </h2>
          <button
            className="flex items-center gap-1 text-xs opacity-90"
            onClick={() => router.push("/browse/tv/trending")}
          >
            MORE <AiOutlineSwapRight className="w-4 h-4" />
          </button>
        </div>
        {loadingTV ? <Loader /> : null}
        {trendingTV ? <Carousel data={trendingTV?.results} media="tv" /> : null}
      </div>

      {/* Popular Movies Today */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-black text-2xl uppercase dark:text-neutral-300 -tracking-wider">
            Popular Movies Today
          </h2>
          <button
            className="flex items-center gap-1 text-xs opacity-90"
            onClick={() => router.push("/browse/movie/popular")}
          >
            MORE <AiOutlineSwapRight className="w-4 h-4" />
          </button>
        </div>
        {loadingPopular ? <Loader /> : null}
        {popularMovie ? (
          <Carousel data={popularMovie?.results} media="movie" />
        ) : null}
      </div>
    </section>
  );
};

export default Home;
