import Rating from "@components/common/util/Rating";
import { IMAGE_URL, BLUR_DATA } from "@lib/constants/config";
import { motion } from "framer-motion";
import Image from "next/image";

type GridCellProps = {
  poster_path: string;
  title: string;
  ratings: number;
};

const child = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const GridCell = ({ poster_path, title, ratings }: GridCellProps) => {
  return (
    <motion.div className=" space-y-2" variants={child}>
      <div className="w-full min-h-[320px] rounded relative">
        <Image
          src={`${IMAGE_URL}/w342${poster_path}`}
          alt=""
          fill
          className="2xl:object-cover xl:object-cover lg:object-cover md:object-cover object-contain"
          placeholder="blur"
          blurDataURL={BLUR_DATA}
          sizes="(max-width: 768px) 50vw,
    (max-width: 1200px) 50vw,
   100vw"
        />
      </div>
      <div>
        <div className="flex gap-1 items-start">
          <p className="text-xs">{Math.floor((ratings / 2) * 10) / 10}</p>
          <Rating votes={ratings} />
        </div>
        <h4 className=" -tracking-wider font-medium">{title}</h4>
      </div>
    </motion.div>
  );
};

export default GridCell;
