import { getReviews } from "@lib/api/getReviews";
import { IReview } from "@lib/types/supabase/database";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Review from "./Review";

type CommentProps = {
  movie_id: string | number | undefined;
};

const ReviewContainer: React.FC<CommentProps> = ({ movie_id }) => {
  const supabase = useSupabaseClient();
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const {
    data: reviews,
    error,
    refetch,
  } = useQuery<IReview[], PostgrestError | Error>(
    ["reviews", { id: movie_id }],
    async () => getReviews(movie_id as string, supabase),
    {
      enabled: false,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!isHydrated) {
      refetch();
      setIsHydrated(true);
    }
  }, [isHydrated, refetch]);

  if (error) {
    return <h4>Something went wrong...</h4>;
  }
  return reviews ? (
    <ul className="space-y-4 mt-4">
      {reviews.length === 0 ? (
        <p className="text-xs text-center pt-4">
          Be the first to add a review!
        </p>
      ) : (
        reviews.map((review) => <Review key={review.id} review={review} />)
      )}
    </ul>
  ) : (
    <Loader />
  );
};

export default ReviewContainer;
