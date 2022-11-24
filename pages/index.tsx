import { Carousel, HeroText } from "@components/ui/home";
import { t } from "@lib/constants/testData";

import { NextPage } from "next";

const Home: NextPage = () => {
  // const { data, status } = useQuery<QueryResult<TrendingMovie>, Error>(
  //   ["trending", "movie"],
  //   getTrendingMovie,
  //   { ...QUERY_CONFIG }
  // );
  const data = t.json;
  return (
    <section className="h-full">
      <div className="min-h-[calc(100vh-70px)] grid place-items-center my-12">
        <div className=" ">
          <HeroText />
        </div>
        <Carousel data={data.results} />
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
