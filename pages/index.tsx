import { HeroText, Carousel } from "@components/ui/home";
import { t } from "@lib/constants/config";
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
      <div className="min-h-screen grid place-items-center">
        <div className=" ">
          <HeroText />
        </div>
      </div>
      <div className="min-h-screen">
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
