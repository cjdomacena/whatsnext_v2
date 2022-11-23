import { ReviewThread } from "@lib/types/common";
import { formatDate, getNumSentences } from "@lib/utils";
import Rating from "../Rating";
import { MdVerified } from "react-icons/md";
import { AiFillPushpin } from "react-icons/ai";
import Avatar from "../avatar";
import { useState } from "react";

type ReviewProps = {
  review: ReviewThread;
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
          <div className="">
            <h4 className="">{review.profiles.full_name}</h4>
            <span className="text-xs flex items-center gap-1">
              {review.profiles.is_verified ? (
                <>
                  {" "}
                  <MdVerified className="text-green-500" /> critic
                </>
              ) : null}
            </span>
          </div>
          <div className="flex gap-2">
            <Rating votes={review.rating * 2} />
            <p className="text-xs dark:text-neutral-500 font-medium text-neutral-300">
              {formatDate(review.created_at, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className=" whitespace-pre-wrap  mb-2 text-sm px-2">
        <p className={`${showAll ? "line-clamp-none" : "line-clamp-5"}`}>
          {review.review}
        </p>

        {numSentences > 5 ? (
          <button className="mt-2" onClick={() => setShowAll((prev) => !prev)}>
            Show {showAll ? "less" : "more"}
          </button>
        ) : null}
      </div>
    </li>
  );
};

export default Review;
