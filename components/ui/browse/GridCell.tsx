import Rating from "@components/common/util/Rating";
import { IMAGE_URL } from "@lib/constants/config";
import { motion } from "framer-motion";
import Link from "next/link";

type GridCellProps = {
  poster_path: string;
  title: string;
  ratings: number;
  media: string;
  id: string | number;
  withMedia?: boolean;
};

const GridCell = ({
  poster_path,
  title,
  ratings,
  media,
  id,
  withMedia = false,
}: GridCellProps) => {
  return (
    <motion.div
      className=" space-y-2 w-full mx-auto"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
    >
      <Link href={`/details/${media}/${id}`}>
        <div className="w-full h-full max-h-[350px] rounded relative flex overflow-hidden group cursor-pointer">
          <img
            src={
              poster_path
                ? `${IMAGE_URL}/w342${poster_path}`
                : "/assets/fallback.png"
            }
            alt={title}
            className="2xl:object-cover xl:object-cover lg:object-cover md:object-cover object-contain 
            2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full max-w-[320px]
            group-hover:scale-110 transition-transform h-full mx-auto
            "
            loading="eager"
          />

          <div className="h-full w-full bg-neutral-900/40  z-10 absolute top-0 left-0 rounded group-hover:bg-neutral-900/10 transition-colors " />
        </div>
      </Link>

      <div className="2xl:w-full xl:w-full lg:w-full md:w-full max-w-[220px] mx-auto">
        {media !== "person" ? (
          <div className="flex gap-1 items-start">
            <p className="text-xs">{Math.floor((ratings / 2) * 10) / 10}</p>
            <Rating votes={ratings} />
          </div>
        ) : null}
        <div className="w-fit">
          <Link href={`/details/${media}/${id}`}>
            <h4 className=" -tracking-wider font-medium w-fit">{title}</h4>
          </Link>
          {withMedia ? <p className="text-xs uppercase">{media}</p> : null}
        </div>
      </div>
    </motion.div>
  );
};

export default GridCell;
