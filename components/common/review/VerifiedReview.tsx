import { formatDate, getNumSentences } from "@lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillPushpin } from "react-icons/ai";
import { IoLockClosed } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import Avatar from "../avatar";
import Rating from "../util/Rating";

interface VerifiedReviewProps {
  media_type: string;
  movie_id: string;
  premium_review: string;
  created_at: string;
  id: string;
  profiles: {
    full_name: string;
  };
}

const VerifiedReview: React.FC<VerifiedReviewProps> = ({
  profiles,
  premium_review,
  created_at,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const numSentences = getNumSentences(premium_review);
  return (
    <div className="my-12 container mx-auto">
      <div className="p-6 dark:bg-neutral-800 bg-neutral-100 rounded space-y-2  mx-auto  relative">
        <div className="text-sm ">
          <div className="p-4">
            <div className="flex gap-2">
              <Avatar name={profiles.full_name} />
              <div>
                <div className="flex items-center">
                  <MdVerified className="text-amber-500 w-4 h-4 mr-1" />
                  <p>{profiles.full_name}</p>
                </div>

                <p>
                  {formatDate(created_at, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <Rating votes={8} />
              </div>
            </div>
          </div>
          <div className=" whitespace-pre-wrap  text-sm px-2 ">
            <p
              className={`${
                showAll ? "line-clamp-none" : "line-clamp-5"
              } leading-normal`}
            >
              {premium_review}
            </p>

            {numSentences > 5 ? (
              <button
                className="mt-4 text-xs bg-neutral-800 p-2 rounded w-fit text-[#fff6e2]"
                onClick={() => setShowAll((prev) => !prev)}
              >
                Show {showAll ? "less" : "more"}
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex gap-1 items-center  w-fit text-xs  absolute top-4 right-4">
          <AiFillPushpin />
          <p>Verified Critic</p>
        </div>
      </div>
    </div>
  );
};

export const VerifiedReviewBlurred = () => {
  const router = useRouter();
  return (
    <div className="my-12 container mx-auto">
      <div className="p-6 dark:bg-neutral-800 bg-neutral-100 rounded space-y-2  mx-auto  relative">
        <div className="select-none text-sm blur-md">
          <div className="p-4">
            <div className="flex gap-2">
              <Avatar name={"User Critic"} />
              <div>
                <p>User Critic</p>
                <p>
                  {formatDate(new Date().toString(), { dateStyle: "medium" })}
                </p>
                <Rating votes={8} />
              </div>
            </div>
          </div>
          <p className="  whitespace-pre-wrap">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
            soluta veniam eos quam. Quasi nesciunt, nobis aliquam, suscipit,
            necessitatibus nulla fugit soluta nihil tenetur explicabo ullam
            alias aspernatur quis perferendis. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit.
          </p>
          <p>
            nde soluta veniam eos quam. Quasi nesciunt, nobis aliquam, suscipit,
            necessitatibus nulla fugit soluta nihil tenetur explicabo ullam
            alias aspernatur quis perferendis. Unde soluta veniam eos quam.
            Quasi nesciunt, nobis aliquam, suscipit, necessitatibus nulla fugit
            soluta nihil tenetur explicabo ullam alias aspernatur quis
            perferendis.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full grid place-items-center">
          <button
            className="flex items-center gap-1 p-2 bg-blue-700 rounded"
            onClick={() => router.push("/pricing")}
          >
            <IoLockClosed />
            Get Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedReview;
