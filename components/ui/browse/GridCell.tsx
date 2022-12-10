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
    <div className=" space-y-2 w-fit mx-auto">
      <div className="w-full min-h-[350px] rounded relative flex">
        <Link href={`/details/${media}/${id}`}>
          <img
            src={
              poster_path
                ? `${IMAGE_URL}/w342${poster_path}`
                : "/assets/fallback.png"
            }
            alt={title}
            className="2xl:object-cover xl:object-cover lg:object-cover md:object-cover object-contain 
            2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full max-w-[320px]
            "
            loading="eager"
          />
        </Link>
      </div>

      <div className="2xl:w-full xl:w-full lg:w-full md:w-full max-w-[320px]">
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
          <p className="text-xs uppercase">{media}</p>
        </div>
      </div>
    </div>
  );
};

export default GridCell;
