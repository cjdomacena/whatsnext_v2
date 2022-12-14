import { formatDate, getNumSentences } from "@lib/utils";
import { MdVerified } from "react-icons/md";
import { AiFillPushpin } from "react-icons/ai";
import Avatar from "../avatar";
import { useState } from "react";
import { Tooltip } from "../util";
import { IReview } from "@lib/types/supabase/database";

type ReviewProps = {
  review: IReview;
};

const Review: React.FC<ReviewProps> = ({ review }) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const numSentences = getNumSentences(review.review);
  return (
    <li
      className={` p-4 relative ${
        review.is_featured ? "dark:bg-white/5 bg-neutral-100 rounded" : ""
      }`}
    >
      {review.is_featured ? (
        <div className="flex gap-1 items-center  w-fit text-xs  absolute top-4 right-4">
          <AiFillPushpin />
          <p>Featured Review</p>
        </div>
      ) : null}

      <div className="flex gap-2 items-center mb-4">
        <Avatar name={review.profiles.full_name} />
        <div className="space-y-1">
          <div className="flex">
            <span className="text-xs flex items-center">
              {review.profiles.is_subscribed ? (
                <Tooltip
                  trigger={
                    <div>
                      <MdVerified className="text-amber-500 w-4 h-4 mr-1" />
                    </div>
                  }
                  portal={<p className="text-xs">Verified Critic</p>}
                />
              ) : null}
            </span>
            <h4 className="">{review.profiles.full_name}</h4>
          </div>
          <div className="flex gap-2 items-end">
            <p className="text-sm dark:text-amber-500 text-amber-500 font-medium">
              {Math.ceil(review.rating)}{" "}
              <span className="text-xs dark:text-amber-500/60 font-medium text-neutral-300">
                {" "}
                out of 5
              </span>
            </p>
            {/* <Rating votes={} /> */}
            <p className="text-xs dark:text-neutral-500 font-medium text-neutral-300 mb-[1px]">
              {formatDate(review.created_at, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className=" whitespace-pre-wrap  text-sm px-2 ">
        <p
          className={`${
            showAll ? "line-clamp-none" : "line-clamp-5"
          } leading-normal`}
        >
          {review.review}
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
    </li>
  );
};

export default Review;
