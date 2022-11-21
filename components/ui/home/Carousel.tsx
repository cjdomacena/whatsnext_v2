import { TrendingMovie } from "@lib/types/movies";
import CarouselSlide from "./CarouselSlide";
import { useKeenSlider } from "keen-slider/react";

type CarouselProps = {
  data: TrendingMovie[];
};
const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: "snap",
    breakpoints: {
      // 400px and up
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 800px)": {
        slides: { perView: 2, spacing: 15 },
      },
      // 1000px and up
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(min-width: 1440px)": {
        slides: { perView: 5, spacing: 15 },
      },
    },
    // Default behaviour
    slides: {
      perView: 1,
      spacing: 15,
    },
  });
  return (
    <div ref={ref} className="w-full keen-slider overflow-x-hidden my-8">
      {data.map((movie) => (
        <CarouselSlide key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Carousel;
