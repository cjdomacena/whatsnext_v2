import { BLUR_DATA, IMAGE_URL } from "@lib/constants/config";
import Image from "next/image";
import Link from "next/link";

type PosterProps = {
  poster_path: string;
  title: string;
  title_id: number | string;
  media_type: "movie" | "tv";
  handler: () => void;
  isDisabled: boolean;
};

const Poster = ({
  poster_path,
  title,
  title_id,
  media_type,
  handler,
  isDisabled,
}: PosterProps) => {
  return (
    <div>
      <Link
        href={`/details/${media_type}/${title_id}`}
        className="space-y-2 group"
      >
        <div className=" h-[450px] w-full relative">
          <Image
            src={`${IMAGE_URL}/original${poster_path}`}
            alt=""
            fill
            className="rounded object-cover group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:z-20 transition-transform"
            placeholder="blur"
            blurDataURL={BLUR_DATA}
            loading={"eager"}
          />
        </div>
        <h4 className="font-bold text-xl">{title}</h4>
      </Link>
      {isDisabled ? null : (
        <div className="text-xs text-red-500">
          <button onClick={handler}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Poster;
