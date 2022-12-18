import { IQueryResult } from "@lib/types/movies.type";
import CarouselSlide from "./CarouselSlide";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
type CarouselProps = {
  data: IQueryResult[];
  media: "tv" | "movie";
};
const Carousel: React.FC<CarouselProps> = ({ data, media }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    mode: "snap",
    breakpoints: {
      // 400px and up
      "(min-width: 600px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 800px)": {
        slides: { perView: 3, spacing: 15 },
      },

      // 1000px and up
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 15 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 5, spacing: 15 },
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
    created() {
      setLoaded(true);
    },
  });
  return (
    <>
      {loaded && instanceRef.current ? (
        <div className="w-fit ml-auto space-x-2">
          <button
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
          >
            <IoArrowBack />
          </button>
          <button
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          >
            <IoArrowForward />
          </button>
        </div>
      ) : null}

      <motion.div
        ref={ref}
        className="w-full keen-slider overflow-x-hidden relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        {data.map((movie) => (
          <CarouselSlide key={movie.id} movie={movie} media={media} />
        ))}
      </motion.div>
    </>
  );
};

export default Carousel;
