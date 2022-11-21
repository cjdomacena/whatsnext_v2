import { HeroText, Carousel } from "@components/ui/home";
import { getTrendingMovie } from "@lib/api/getTrendingMovie";
import { QUERY_CONFIG } from "@lib/constants/config";
import { QueryResult } from "@lib/types/common";
import { TrendingMovie } from "@lib/types/movies";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { data, status } = useQuery<QueryResult<TrendingMovie>, Error>(
    ["trending", "movie"],
    getTrendingMovie,
    { ...QUERY_CONFIG }
  );

  return (
    <div>
      <HeroText />

      {status === "success" ? <Carousel data={data.results} /> : null}
    </div>
  );
};

export default Home;
