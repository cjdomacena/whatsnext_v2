import { formatDate, getNumSentences } from "@lib/utils";
import Link from "next/link";
import { useState } from "react";
import Rating from "./Rating";

type CommentProps = {
  movie_title: string;
  rating: number;
  review: string;
  loading: boolean;
  handleDelete: () => void;
  type: string;
  movie_id: string;
  created_at: string;
};

const Comment = ({
  movie_title,
  rating,
  handleDelete,
  review,
  loading,
  type,
  movie_id,
  created_at,
}: CommentProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const numSentences = getNumSentences(review);
  return (
    <div className="max-w-5xl">
      <div className="p-4 dark:bg-neutral-800 bg-neutral-100 rounded w-full space-y-2 relative">
        <div className="space-y-4">
          <div className="w-fit">
            <Link href={`/details/${type}/${movie_id}`}>
              <h4 className="text-lg font-medium">{movie_title}</h4>
            </Link>

            <Rating votes={rating * 2} />
          </div>
          <p className="text-xs">
            {formatDate(created_at, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
        <div className=" whitespace-pre-wrap  text-sm">
          <p
            className={`${
              showAll ? "line-clamp-none" : "line-clamp-5"
            } leading-normal`}
          >
            {review}
          </p>

          {numSentences > 5 ? (
            <button
              className="mt-4 text-xs bg-neutral-700 p-2 rounded w-fit text-[#fff6e2]"
              onClick={() => setShowAll((prev) => !prev)}
            >
              Show {showAll ? "less" : "more"}
            </button>
          ) : null}
        </div>

        <p className="text-xs absolute right-4 top-2">Review</p>
        <button
          className="text-xs text-red-500 "
          disabled={loading}
          onClick={handleDelete}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Comment;
