import Rating from "@components/common/util/Rating";
import { IMAGE_URL } from "@lib/constants/config";
import Link from "next/link";

type GridCellProps = {
  poster_path: string;
  title: string;
  ratings: number;
  media: string;
  id: string | number;
};

const GridCell = ({
  poster_path,
  title,
  ratings,
  media,
  id,
}: GridCellProps) => {
  return (
    <div className=" space-y-2">
      <div className="w-full min-h-[320px] rounded relative">
        <Link href={`/details/${media}/${id}`}>
          <img
            src={`${IMAGE_URL}/w342${poster_path}`}
            alt={title}
            className="2xl:object-cover xl:object-cover lg:object-cover md:object-cover object-contain"
            loading="eager"
          />
        </Link>
      </div>

      <div>
        <div className="flex gap-1 items-start">
          <p className="text-xs">{Math.floor((ratings / 2) * 10) / 10}</p>
          <Rating votes={ratings} />
        </div>
        <Link href={`/details/${media}/${id}`}>
          <h4 className=" -tracking-wider font-medium">{title}</h4>
        </Link>
      </div>
    </div>
  );
};

export default GridCell;
