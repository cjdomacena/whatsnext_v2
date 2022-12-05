import Rating from "@components/common/util/Rating";
import { BLUR_DATA, IMAGE_URL } from "@lib/constants/config";
import { IQueryResult } from "@lib/types/movies";
import Image from "next/image";
import Link from "next/link";

type CarouselSlideProps = {
  movie: IQueryResult;
  media: "tv" | "movie";
};
const CarouselSlide: React.FC<CarouselSlideProps> = ({ movie, media }) => {
  return (
    <Link href={`/details/${media}/${movie.id}`}>
      <div className="keen-slider__slide max-w-xs 2xl:h-[350px] xl:h-[350px] lg:h-[350px] md:h-[350px] h-[450px] overflow-x-hidden group relative w-full">
        <Image
          src={`${
            movie.poster_path
              ? IMAGE_URL + "/w342" + movie.poster_path
              : "/assets/fallback.png"
          }`}
          alt=""
          loading="eager"
          className="rounded transition-transform group-hover:scale-125"
          fill
          placeholder="blur"
          blurDataURL={BLUR_DATA}
          sizes="(max-width: 768px) 50vw,
        (max-width: 1200px) 50vw,
       100vw"
        />
        <div className="h-full w-full bg-neutral-900/60  z-10 absolute top-0 left-0 rounded group-hover:bg-neutral-900/10 transition-colors " />
        <div className="absolute h-full w-full z-20 flex items-end">
          <div className="z-20 text-white p-4">
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
    </Link>
  );
};

export default CarouselSlide;
