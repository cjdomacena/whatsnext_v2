import { HeroText } from "@components/ui/home";
import { getTrendingMovie } from "@lib/api/getTrendingMovie";
import { QUERY_CONFIG } from "@lib/constants/config";
import { QueryResult } from "@lib/types/common";
import { TrendingMovie } from "@lib/types/movies";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import { GetServerSideProps, NextPage } from "next";
import { Suspense } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["trending", "movie"],
    queryFn: getTrendingMovie,
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

  return (
    <Suspense>
      <section className="h-full">
        <div className="min-h-[calc(100vh-80px)]  mx-auto relative p-4 grid place-items-center">
          <div className="w-fit uppercase text-center mx-auto container">
            <HeroText />
          </div>
          {/* TODO: CREATE SEARCH HERE SO THEY CAN FIND STUFF... */}
        </div>
      </section>
    </Suspense>
  );
};

export default Home;
