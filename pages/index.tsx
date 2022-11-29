import { HeroText } from "@components/ui/home";
import { getTrendingMovie } from "@lib/api/getTrendingMovie";
import { QUERY_CONFIG } from "@lib/constants/config";
import { QueryResult } from "@lib/types/common";
import { TrendingMovie } from "@lib/types/movies";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import { GetServerSideProps, NextPage } from "next";

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
    <section className="h-full">
      <div className="min-h-[calc(100vh-64px)] grid place-items-center">
        <div className=" ">
          <HeroText />
        </div>
        {/* <Suspense fallback={<h4>Loading...</h4>}>
          {data ? <Carousel data={data.results} /> : null}
        </Suspense> */}
      </div>
    </section>
  );
  // if (status === "error") {
  //   return <h1 className="text-center">Oops.. Something went wrong</h1>;
  // }
  // switch (status) {
  //   case "loading": {
  //     return null;
  //   }
  //   case "success": {
  //     return (
  //       <div>
  //         <HeroText />
  //         <Carousel data={data.results} />
  //       </div>
  //     );
  //   }
  // }
};

export default Home;
