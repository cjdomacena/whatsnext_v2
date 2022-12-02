import { IMAGE_URL } from "@lib/constants/config";
import Image from "next/image";
import Link from "next/link";

type PosterProps = {
  poster_path: string;
  title: string;
  title_id: number | string;
  media_type: "movie" | "tv";
  handler: () => void;
};

const Poster = ({
  poster_path,
  title,
  title_id,
  media_type,
  handler,
}: PosterProps) => {
  return (
    <div>
      <Link href={`/details/${media_type}/${title_id}`} className="space-y-2">
        <div className=" h-[300px] w-full relative">
          <Image
            src={`${IMAGE_URL}/w300_and_h450_bestv2${poster_path}`}
            alt=""
            fill
            className="rounded"
          />
        </div>
        <h4 className="font-bold">{title}</h4>
      </Link>
      <div className="text-xs">
        <button onClick={handler}>Remove</button>
      </div>
    </div>
  );
};

export default Poster;
