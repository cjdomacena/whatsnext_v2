import { IMAGE_URL } from "@lib/constants/config";
import Image from "next/image";
type PosterProps = {
  posterPath: string;
};

const Poster: React.FC<PosterProps> = ({ posterPath }) => {
  return (
    <div className="w-[300px] h-[450px] relative">
      <Image
        src={`${
          posterPath
            ? IMAGE_URL + "/w300_and_h450_bestv2" + posterPath
            : "/assets/fallback.png"
        }`}
        fill
        alt=""
        sizes="(max-width: 768px) 50vw,
      (max-width: 1200px) 50vw,
     50vw"
        className="rounded  dark:drop-shadow-[0_5px_35px_rgba(32,32,32,0.6)] drop-shadow-2xl"
      />
    </div>
  );
};

export default Poster;
