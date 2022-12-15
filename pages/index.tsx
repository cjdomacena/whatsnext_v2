import { Carousel, HeroText } from "@components/ui/home";
import { getPopularMovie } from "@lib/api/movies/getPopularMovie";
import { getTrendingMovie } from "@lib/api/movies/getTrendingMovie";
import { getTrendingTV } from "@lib/api/tv/getTrendingTV";
import { IQueryResult } from "@lib/types/movies.type";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { AiOutlineSwapRight } from "react-icons/ai";

interface HomeProps {
  trendingTV: IQueryResult[];
  trendingMovie: IQueryResult[];
  popularMovie: IQueryResult[];
}

export const getStaticProps: GetStaticProps = async () => {
  const { results: trendingTV } = await getTrendingTV();
  let { results: trendingMovie } = await getTrendingMovie();
  let { results: popularMovie } = await getPopularMovie();

  return {
    props: {
      trendingTV,
      trendingMovie,
      popularMovie,
    },
    revalidate: 3600,
  };
};

const Home: NextPage<HomeProps> = ({
  trendingMovie,
  trendingTV,
  popularMovie,
}) => {
  const router = useRouter();

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

        <Carousel data={trendingMovie} media="movie" />
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

        <Carousel data={trendingTV} media="tv" />
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

        <Carousel data={popularMovie} media="movie" />
      </div>
    </section>
  );
};

export default Home;
