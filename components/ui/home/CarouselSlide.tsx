import { BLUR_DATA, IMAGE_URL } from "@lib/constants/config";
import { TrendingMovie } from "@lib/types/movies";
import Image from "next/image";

type CarouselSlideProps = {
  movie: TrendingMovie;
};
const CarouselSlide: React.FC<CarouselSlideProps> = ({ movie }) => {
  return (
    <div className="keen-slider__slide max-w-xs h-[500px] overflow-x-hidden group relative">
      <Image
        src={`${IMAGE_URL}/w780${movie.poster_path}`}
        alt=""
        loading="lazy"
        className="rounded transition-transform object-fill"
        fill
        placeholder="blur"
        blurDataURL={BLUR_DATA}
        sizes="(max-width: 768px) 50vw,
        (max-width: 1200px) 50vw,
       100vw"
      />
      <div className="h-full w-full bg-neutral-900/40  z-10 absolute top-0 left-0 rounded hover:bg-neutral-900/10 transition-colors " />
    </div>
  );
};

export default CarouselSlide;
