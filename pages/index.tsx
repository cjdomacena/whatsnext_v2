import HeroText from "@components/ui/home/HeroText";
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
    </div>
  );
};

export default Home;
