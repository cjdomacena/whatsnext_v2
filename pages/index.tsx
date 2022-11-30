import { Carousel, HeroText } from "@components/ui/home";
import { getPopularMovie } from "@lib/api/movies/getPopularMovie";
import { getTrendingMovie } from "@lib/api/movies/getTrendingMovie";
import { getTrendingTV } from "@lib/api/tv/getTrendingTV";
import { QUERY_CONFIG } from "@lib/constants/config";
import { QueryResult } from "@lib/types/common";
import { TrendingMovie } from "@lib/types/movies";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import { GetServerSideProps, NextPage } from "next";
import { Suspense } from "react";
import { AiOutlineSwapRight } from "react-icons/ai";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["trending", "movie"],
    queryFn: getTrendingMovie,
  });

  await queryClient.prefetchQuery({
    queryKey: ["trending", "tv"],
    queryFn: getTrendingTV,
  });
  await queryClient.prefetchQuery({
    queryFn: getPopularMovie,
    queryKey: ["popular", "movie"],
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage = () => {
  const { data } = useQuery<QueryResult<TrendingMovie>, Error>(
    ["trending", "movie"],
    getTrendingMovie,
    { ...QUERY_CONFIG }
  );
  const { data: trendingTV } = useQuery<QueryResult<TrendingMovie>, Error>(
    ["trending", "tv"],
    getTrendingTV,
    { ...QUERY_CONFIG }
  );
  const { data: popularMovie } = useQuery<QueryResult<TrendingMovie>, Error>(
    ["popular", "movie"],
    getPopularMovie,
    { ...QUERY_CONFIG }
  );

  return (
    <Suspense>
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
            <button className="flex items-center gap-1 text-xs opacity-90">
              MORE <AiOutlineSwapRight className="w-4 h-4" />
            </button>
          </div>
          {data ? <Carousel data={data?.results} media="movie" /> : null}
        </div>

        {/* Trending TV */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-black text-2xl uppercase dark:text-neutral-300 -tracking-wider">
              Trending TV
            </h2>
            <button className="flex items-center gap-1 text-xs opacity-90">
              MORE <AiOutlineSwapRight className="w-4 h-4" />
            </button>
          </div>
          {trendingTV ? (
            <Carousel data={trendingTV?.results} media="tv" />
          ) : null}
        </div>

        {/* Popular Movies Today */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-black text-2xl uppercase dark:text-neutral-300 -tracking-wider">
              Popular Movies Today
            </h2>
            <button className="flex items-center gap-1 text-xs opacity-90">
              MORE <AiOutlineSwapRight className="w-4 h-4" />
            </button>
          </div>
          {popularMovie ? (
            <Carousel data={popularMovie?.results} media="movie" />
          ) : null}
        </div>
      </section>
    </Suspense>
  );
};

export default Home;
