import Rating from "@components/common/util/Rating";
import { IMAGE_URL } from "@lib/constants/config";
import { IQueryResult } from "@lib/types/movies";
import Link from "next/link";

type CarouselSlideProps = {
  movie: IQueryResult;
  media: "tv" | "movie";
};
const CarouselSlide: React.FC<CarouselSlideProps> = ({ movie, media }) => {
  return (
    <Link href={`/details/${media}/${movie.id}`}>
      <div className="keen-slider__slide max-w-xs overflow-x-hidden group relative w-full max-h-[550px]">
        <div className="relative overflow-hidden">
          <img
            src={`${
              movie.poster_path
                ? IMAGE_URL + "/w342" + movie.poster_path
                : "/assets/fallback.png"
            }`}
            alt=""
            loading="eager"
            className="rounded transition-transform group-hover:scale-125 object-cover mx-auto"
          />
          <div className="h-full w-full bg-neutral-900/60  z-10 absolute top-0 left-0 rounded group-hover:bg-neutral-900/10 transition-colors " />
          <div className=" h-auto w-full flex items-end absolute bottom-0 px-4">
            <div className="z-20 text-white my-4">
              <div>
                <h3 className=" line-clamp-1 font-medium text-lg">
                  {movie.title}
                </h3>
              </div>
              <div className=" flex gap-1">
                <p className="text-xs">
                  {movie.vote_average === 0
                    ? "NA"
                    : Math.round((movie.vote_average / 2) * 10) / 10}
                </p>
                <Rating votes={movie.vote_average} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarouselSlide;
