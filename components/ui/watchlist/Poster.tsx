import { BLUR_DATA, IMAGE_URL } from "@lib/constants/config";
import { formatDate } from "@lib/utils";
import Image from "next/image";
import Link from "next/link";

type PosterProps = {
  poster_path: string;
  title: string;
  title_id: number | string;
  media_type: "movie" | "tv";
  handler: () => void;
  isDisabled: boolean;
  created_at: string;
};

const Poster = ({
  poster_path,
  title,
  title_id,
  media_type,
  handler,
  isDisabled,
  created_at,
}: PosterProps) => {
  return (
    <div>
      <Link
        href={`/details/${media_type}/${title_id}`}
        className="space-y-2 group "
      >
        <div className="min-h-[450px] w-full relative ">
          <Image
            src={`${IMAGE_URL}/w500${poster_path}`}
            alt=""
            fill
            className="rounded object-cover group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:z-20 transition-transform"
            placeholder="blur"
            blurDataURL={BLUR_DATA}
            loading={"eager"}
          />
        </div>
        <div>
          <h4 className="font-bold text-xl line-clamp-1">{title}</h4>
          <p className="text-xs">
            Added:{" "}
            {formatDate(created_at, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </Link>
      {isDisabled ? null : (
        <div className="text-xs text-red-500 mt-4">
          <button onClick={handler}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Poster;
