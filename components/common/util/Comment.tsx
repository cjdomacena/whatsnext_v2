import { formatDate } from "@lib/utils";
import Link from "next/link";
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
  return (
    <div>
      <div className="p-4 dark:bg-neutral-800 bg-neutral-100 rounded w-full space-y-2 relative">
        <div>
          <Link href={`/details/${type}/${movie_id}`}>
            <h4 className="text-lg font-medium">{movie_title}</h4>
          </Link>
          <div className="w-fit">
            <Rating votes={rating * 2} />
          </div>
        </div>
        <p>{review}</p>
        <p className="text-xs">
          {formatDate(created_at, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
        <p className="text-xs absolute right-4 top-2">Review</p>
        <button
          className="text-xs text-red-500"
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
