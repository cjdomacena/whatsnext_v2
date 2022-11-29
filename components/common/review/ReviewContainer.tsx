import { ReviewThread } from "@lib/types/common";
import Review from "./Review";

type CommentProps = {
  reviews: ReviewThread[];
};

const ReviewContainer: React.FC<CommentProps> = ({ reviews }) => {
  return (
    <ul className="space-y-4 mt-4">
      {reviews.length === 0 ? (
        <p className="text-xs text-center pt-4">
          Be the first to add a review!
        </p>
      ) : (
        reviews.map((review) => <Review key={review.id} review={review} />)
      )}
    </ul>
  );
};

export default ReviewContainer;
