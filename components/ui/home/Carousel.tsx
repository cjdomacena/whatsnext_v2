import { TrendingMovie } from "@lib/types/movies";
import CarouselSlide from "./CarouselSlide";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
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
        slides: { perView: 6, spacing: 15 },
      },
    },
    // Default behaviour
    slides: {
      perView: 1,
      spacing: 15,
    },
  });
  return (
    <motion.div
      ref={ref}
      className="w-full keen-slider overflow-x-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      {data.map((movie) => (
        <CarouselSlide key={movie.id} movie={movie} />
      ))}
    </motion.div>
  );
};

export default Carousel;
